// Cloudflare Pages Function: POST /api/enquiry (same origin as the site, so no CORS).
// Pipeline: src/lib/handler.mjs (validate -> CRM lead on crm.aoplus.in -> Mautic for consented contacts).
// Plain HTML form posts (no JavaScript) are redirected: /thank-you/ on success, /contact/?error=1 on failure.
import { handleEnquiry } from '../../src/lib/handler.mjs';

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  const type = request.headers.get('content-type') || '';
  const raw = await request.text();
  if (raw.length > 16 * 1024) return json(413, { ok: false, error: 'Request too large' });

  let input;
  try {
    input = type.includes('application/json') ? JSON.parse(raw || '{}') : Object.fromEntries(new URLSearchParams(raw));
  } catch {
    return json(400, { ok: false, error: 'Bad request' });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const out = await handleEnquiry(input, { ip, env });

  const wantsJson = (request.headers.get('accept') || '').includes('application/json') || type.includes('application/json');
  if (wantsJson) return json(out.status, out.body);

  if (out.status === 200) return new Response(null, { status: 303, headers: { Location: '/thank-you/' } });
  return new Response(null, { status: 303, headers: { Location: '/contact/?error=1' } });
}

// Anything other than POST gets a clear answer rather than the static 404 page.
export async function onRequest() {
  return json(405, { ok: false, error: 'Method not allowed' });
}
