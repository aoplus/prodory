// Enquiry pipeline: validate -> rate check -> CRM (mandatory) -> Mautic (consented only).
// Runtime-neutral: the caller passes `env` (config). Used by functions/api/enquiry.js.
// CRM failure: the visitor is told to email us. Nothing is silently dropped or reported as saved.
import { validate, classify } from './enquiry.mjs';
import * as crm from './crm.mjs';
import * as mautic from './mautic.mjs';

// Max `limit` submissions per IP per 10 minutes. In-memory per isolate: a soft limit, not a hard one.
const hits = new Map();
export function rateOk(ip, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(ip, arr); return false; }
  arr.push(now); hits.set(ip, arr); return true;
}

// Runs the full pipeline. Returns { status, body }.
export async function handleEnquiry(input, { ip = 'unknown', env = {} } = {}) {
  if (!rateOk(ip)) return { status: 429, body: { ok: false, error: 'Too many enquiries from this network. Please try again later or email hello@prodory.com.' } };

  const v = validate(input);
  if (v.errors.form === 'spam') return { status: 200, body: { ok: true } }; // silently accept honeypot hits
  if (!v.ok) return { status: 400, body: { ok: false, errors: v.errors } };

  const c = classify(v.data);
  try {
    await crm.recordEnquiry(v.data, c, env);
  } catch (e) {
    console.error('CRM write failed:', e.message);
    return { status: 503, body: { ok: false, error: 'We could not save your enquiry just now. Please email hello@prodory.com and we will reply within one working day.' } };
  }

  if (c.mauticEligible && mautic.enabled(env)) {
    try {
      await mautic.syncContact(v.data, c.mauticTags, env);
    } catch (e) {
      // Mautic is secondary: the lead is already in the CRM. Log it; the visitor's enquiry is safe.
      console.error('Mautic sync failed:', e.message);
    }
  }
  return { status: 200, body: { ok: true } };
}
