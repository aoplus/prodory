// CRM client for crm.aoplus.in (Frappe CRM app). Every Prodory enquiry creates one CRM Lead.
// Config comes in as `env`. Keys: CRM_AOPLUS_URL, CRM_AOPLUS_API_KEY, CRM_AOPLUS_API_SECRET.
// CRM_DRY_RUN=1 logs the payloads and writes nothing.
// Field names follow the AO+ website integration, verified against the live CRM Lead doctype:
// first_name, last_name, email, mobile_no, organization, source, status, custom_service_interest,
// custom_marketing_email_consent.

const cfg = (env = {}) => ({
  base: String(env.CRM_AOPLUS_URL || '').replace(/\/+$/, ''),
  key: env.CRM_AOPLUS_API_KEY || '',
  secret: env.CRM_AOPLUS_API_SECRET || '',
  dry: env.CRM_DRY_RUN === '1',
});

export const enabled = (env) => { const c = cfg(env); return !!(c.base && c.key && c.secret); };

async function call(env, method, path, body) {
  const c = cfg(env);
  const r = await fetch(c.base + path, {
    method,
    headers: { Authorization: `token ${c.key}:${c.secret}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`CRM ${method} ${path.split('?')[0]} ${r.status}`);
  return j;
}

// Every Prodory enquiry is a cloud / DevOps enquiry in the CRM's service list.
const SERVICE_INTEREST = 'Cloud & DevOps';

export function leadBody(d) {
  const parts = d.name.split(' ');
  return {
    first_name: parts.shift() || d.name,
    last_name: parts.join(' ') || undefined,
    email: d.email,
    mobile_no: d.phone || undefined,
    organization: d.company || undefined,
    source: 'Website',
    status: 'New',
    custom_service_interest: SERVICE_INTEREST,
    custom_marketing_email_consent: d.consentMarketing ? 1 : 0,
  };
}

// The note holds everything without a dedicated field: brand, category, requirement, page, referrer, UTM, consent.
export function noteHtml(d, c, when = new Date()) {
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const utm = Object.entries(d.utm).filter(([, v]) => v).map(([k, v]) => `utm_${k}=${esc(v)}`).join(', ') || '—';
  return `<p><b>Prodory website enquiry</b> (${esc(when.toISOString())})</p>
<p>Brand: <b>Prodory</b> (AO Plus Solutions Pvt Ltd)<br>Area of interest: <b>${esc(c.serviceLabel)}</b></p>
<p>Requirement: ${esc(d.requirement)}</p>
<p>Page: ${esc(d.page || '—')}<br>Referrer: ${esc(d.referrer || '—')}<br>UTM: ${utm}</p>
<p>Consent: contact about enquiry = yes; marketing = ${d.consentMarketing ? 'yes' : 'no'}</p>`;
}

// Creates a CRM Lead for this enquiry (always a new lead), then adds the note.
export async function recordEnquiry(d, c, env = {}) {
  const body = noteHtml(d, c);
  if (cfg(env).dry) { console.log('[CRM dry run] lead', JSON.stringify(leadBody(d)), 'note', body); return { name: 'DRY-RUN', created: true }; }
  const j = await call(env, 'POST', '/api/resource/CRM%20Lead', leadBody(d));
  const name = j.data && j.data.name;
  if (!name) throw new Error('CRM lead create returned no name');
  await call(env, 'POST', '/api/resource/Comment', { comment_type: 'Comment', reference_doctype: 'CRM Lead', reference_name: name, content: body });
  return { name, created: true };
}
