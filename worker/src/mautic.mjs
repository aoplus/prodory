// Mautic contact sync for consented Prodory enquiries only. Config comes in as `env`.
// Keys: MAUTIC_URL, MAUTIC_USER, MAUTIC_PASSWORD. MAUTIC_DRY_RUN=1 logs and writes nothing.
// Rules: one contact per email. An existing contact is never overwritten: only tags are added and
// blank fields are filled. Mautic suppresses unsubscribed contacts, so no campaign mail goes to them.
// Engagement and campaigns are built in Mautic from the tags below; this code does not publish campaigns.

const cfg = (env = {}) => ({
  url: String(env.MAUTIC_URL || '').replace(/\/+$/, ''),
  user: env.MAUTIC_USER || '',
  pass: env.MAUTIC_PASSWORD || '',
  dry: env.MAUTIC_DRY_RUN === '1',
});

export const enabled = (env) => { const c = cfg(env); return !!(c.url && c.user && c.pass); };

async function call(env, method, path, body) {
  const c = cfg(env);
  const r = await fetch(c.url + path, {
    method,
    headers: { Authorization: 'Basic ' + btoa(`${c.user}:${c.pass}`), 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Mautic ${method} ${path.split('?')[0]} ${r.status}`);
  return j;
}

const firstContact = (j) => { const c = j && j.contacts; if (!c) return null; const k = Object.keys(c)[0]; return k ? c[k] : null; };

export function contactFields(d) {
  const parts = d.name.split(' ');
  return {
    firstname: parts.shift() || '',
    lastname: parts.join(' '),
    email: d.email,
    mobile: d.phone || '',
    company: d.company || '',
    website: d.page ? `https://prodory.com${d.page}` : '',
  };
}

// Returns { id, created }. Errors are thrown so the caller can queue a retry.
export async function syncContact(d, tags, env = {}) {
  if (cfg(env).dry) { console.log('[Mautic dry run] contact', d.email, 'tags', tags); return { id: 'DRY-RUN', created: true }; }
  const found = firstContact(await call(env, 'GET', `/api/contacts?search=${encodeURIComponent('email:' + d.email)}&limit=1`));
  if (found) {
    const existing = (found.fields && found.fields.all) || {};
    const fill = {};
    for (const [k, v] of Object.entries(contactFields(d))) { if (k !== 'email' && v && !existing[k]) fill[k] = v; }
    const j = await call(env, 'PATCH', `/api/contacts/${found.id}/edit`, { ...fill, tags });
    return { id: (j.contact && j.contact.id) || found.id, created: false };
  }
  const j = await call(env, 'POST', '/api/contacts/new', { ...contactFields(d), tags });
  return { id: j.contact && j.contact.id, created: true };
}
