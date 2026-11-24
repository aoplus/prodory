// Cloudflare Worker: POST /enquiry for prodory.com forms.
// Pipeline: src/handler.mjs (validate -> CRM lead on crm.aoplus.in -> Mautic for consented contacts).
// Form posts without JavaScript get a redirect: /thank-you/ on success, /contact/?error=1 on failure.
import { handleEnquiry } from './handler.mjs';
import { enqueue } from './queue-d1.mjs';

const ALLOWED_ORIGINS = new Set(['https://prodory.com', 'https://www.prodory.com']);
const SITE = 'https://prodory.com';

function cors(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://prodory.com';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  };
}

const json = (status, body, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin) },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (url.pathname !== '/enquiry') return json(404, { ok: false, error: 'Not found' }, origin);
    if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' }, origin);

    const type = request.headers.get('content-type') || '';
    const raw = await request.text();
    if (raw.length > 16 * 1024) return json(413, { ok: false, error: 'Request too large' }, origin);

    let input;
    try {
      input = type.includes('application/json') ? JSON.parse(raw || '{}') : Object.fromEntries(new URLSearchParams(raw));
    } catch {
      return json(400, { ok: false, error: 'Bad request' }, origin);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const out = await handleEnquiry(input, {
      ip,
      env,
      enqueue: (entry) => enqueue(env.DB, entry),
    });

    const wantsJson = (request.headers.get('accept') || '').includes('application/json') || type.includes('application/json');
    if (wantsJson) return json(out.status, out.body, origin);

    if (out.status === 200) return Response.redirect(`${SITE}/thank-you/`, 303);
    return Response.redirect(`${SITE}/contact/?error=1`, 303);
  },
};
