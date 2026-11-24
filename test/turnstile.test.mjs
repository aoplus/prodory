import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyTurnstile } from '../src/lib/handler.mjs';

const ok = (body) => async () => ({ json: async () => body });

test('turnstile is skipped when no secret is configured', async () => {
  assert.equal(await verifyTurnstile(undefined, '1.2.3.4', {}), true);
});

test('turnstile rejects a missing token when a secret is set', async () => {
  assert.equal(await verifyTurnstile('', '1.2.3.4', { TURNSTILE_SECRET_KEY: 's' }, ok({ success: true })), false);
});

test('turnstile accepts a token Cloudflare verifies', async () => {
  let sent;
  const f = async (url, opts) => { sent = { url, body: opts.body.toString() }; return { json: async () => ({ success: true }) }; };
  assert.equal(await verifyTurnstile('tok', '1.2.3.4', { TURNSTILE_SECRET_KEY: 's' }, f), true);
  assert.match(sent.url, /siteverify$/);
  assert.match(sent.body, /secret=s/);
  assert.match(sent.body, /response=tok/);
});

test('turnstile rejects a failed verification', async () => {
  assert.equal(await verifyTurnstile('tok', '1.2.3.4', { TURNSTILE_SECRET_KEY: 's' }, ok({ success: false })), false);
});
