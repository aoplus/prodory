// Enquiry pipeline: validate -> rate check -> CRM (mandatory) -> Mautic (consented only).
// Runtime-neutral: the caller passes `env` (config) and `enqueue` (where failed writes are kept).
// CRM failure: the enquiry is queued and the visitor still sees success, so nothing is lost.
import { validate, classify } from './enquiry.mjs';
import * as crm from './crm.mjs';
import * as mautic from './mautic.mjs';

// Max `limit` submissions per IP per 10 minutes. In-memory per process or isolate: a soft limit, not a hard one.
const hits = new Map();
export function rateOk(ip, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(ip, arr); return false; }
  arr.push(now); hits.set(ip, arr); return true;
}

// Runs the full pipeline. Returns { status, body }.
export async function handleEnquiry(input, { ip = 'unknown', env = {}, enqueue = async () => {} } = {}) {
  if (!rateOk(ip)) return { status: 429, body: { ok: false, error: 'Too many enquiries from this network. Please try again later or email us.' } };

  const v = validate(input);
  if (v.errors.form === 'spam') return { status: 200, body: { ok: true } }; // silently accept honeypot hits
  if (!v.ok) return { status: 400, body: { ok: false, errors: v.errors } };

  const c = classify(v.data);
  try {
    await crm.recordEnquiry(v.data, c, env);
  } catch (e) {
    console.error('CRM write failed, queued:', e.message);
    await enqueue({ at: new Date().toISOString(), data: v.data, classification: c });
    return { status: 200, body: { ok: true, queued: true } };
  }

  if (c.mauticEligible && mautic.enabled(env)) {
    try {
      await mautic.syncContact(v.data, c.mauticTags, env);
    } catch (e) {
      // Mautic is secondary: the lead is already in the CRM, so log and queue the Mautic part only.
      console.error('Mautic sync failed:', e.message);
      await enqueue({ at: new Date().toISOString(), data: v.data, classification: c, mauticOnly: true });
    }
  }
  return { status: 200, body: { ok: true } };
}

// Replays queued entries. `replay(entry)` must throw on failure. Returns the entries that still failed.
export async function replayQueue(entries, replay) {
  const keep = [];
  for (const entry of entries) {
    try { await replay(entry); }
    catch (e) { console.error('still failing', entry.at, e.message); keep.push(entry); }
  }
  return keep;
}

// Shared replay step: CRM first (unless mauticOnly), then Mautic if the contact is consented.
export function makeReplay(env) {
  return async (entry) => {
    if (!entry.mauticOnly) await crm.recordEnquiry(entry.data, entry.classification, env);
    if (entry.classification.mauticEligible && mautic.enabled(env)) await mautic.syncContact(entry.data, entry.classification.mauticTags, env);
  };
}
