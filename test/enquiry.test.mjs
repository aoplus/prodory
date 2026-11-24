import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, classify, BRAND_TAG } from '../src/lib/enquiry.mjs';
import { noteHtml, leadBody } from '../src/lib/crm.mjs';
import { handleEnquiry, rateOk } from '../src/lib/handler.mjs';

const good = {
  name: 'Asha Rao', company: 'Rao Components', email: 'Asha@Rao.in', phone: '+91 79778 75818',
  category: 'vmware', requirement: '40 VMs on vSphere, renewal in March, need an exit plan.',
  consent_contact: 'on', consent_marketing: 'on', page: '/services/vmware-to-openshift-migration/',
  utm_source: 'google', utm_campaign: 'vmware-exit',
};

test('valid enquiry passes and normalises email and phone', () => {
  const v = validate(good);
  assert.equal(v.ok, true);
  assert.equal(v.data.email, 'asha@rao.in');
  assert.equal(v.data.phone, '+917977875818');
  assert.equal(v.data.consentMarketing, true);
});

test('honeypot filled marks spam', () => {
  assert.equal(validate({ ...good, website: 'http://spam.example' }).errors.form, 'spam');
});

test('contact consent is required, marketing consent is optional', () => {
  assert.ok(validate({ ...good, consent_contact: undefined, consent_marketing: undefined }).errors.consent_contact);
  assert.equal(validate({ ...good, consent_marketing: undefined }).ok, true);
});

test('requirement and email are validated', () => {
  assert.ok(validate({ ...good, requirement: 'short' }).errors.requirement);
  assert.ok(validate({ ...good, email: 'not-an-email' }).errors.email);
});

test('every enquiry is a Cloud & DevOps lead with Prodory brand tag', () => {
  const c = classify(validate(good).data);
  assert.ok(c.mauticTags.includes(BRAND_TAG));
  assert.ok(c.mauticTags.includes('service-vmware-to-openshift-migration'));
  const body = leadBody(validate(good).data);
  assert.equal(body.custom_service_interest, 'Cloud & DevOps');
  assert.equal(body.source, 'Website');
});

test('only marketing-consented contacts are eligible for Mautic', () => {
  assert.equal(classify(validate(good).data).mauticEligible, true);
  const no = classify(validate({ ...good, consent_marketing: undefined }).data);
  assert.equal(no.mauticEligible, false);
  assert.equal(no.mauticTags.includes('consent-marketing'), false);
});

test('CRM note records brand, requirement and consent', () => {
  const d = validate(good).data;
  const html = noteHtml(d, classify(d));
  assert.match(html, /Prodory/);
  assert.match(html, /40 VMs on vSphere/);
  assert.match(html, /marketing = yes/);
});

test('rate limit allows 5 per window then blocks', () => {
  const ip = 'test-ip-' + Math.random();
  for (let i = 0; i < 5; i++) assert.equal(rateOk(ip), true);
  assert.equal(rateOk(ip), false);
});

test('pipeline in dry-run writes nothing and returns ok', async () => {
  const env = { CRM_DRY_RUN: '1', MAUTIC_DRY_RUN: '1', CRM_AOPLUS_URL: 'https://crm.example', CRM_AOPLUS_API_KEY: 'k', CRM_AOPLUS_API_SECRET: 's', MAUTIC_URL: 'https://m.example', MAUTIC_USER: 'u', MAUTIC_PASSWORD: 'p' };
  const out = await handleEnquiry({ ...good, email: 'dry-run@example.com' }, { ip: 'dry-' + Math.random(), env });
  assert.equal(out.status, 200);
  assert.equal(out.body.ok, true);
});

test('CRM failure returns 503 and tells the visitor to email, never a false success', async () => {
  const env = { CRM_AOPLUS_URL: 'http://127.0.0.1:9', CRM_AOPLUS_API_KEY: 'k', CRM_AOPLUS_API_SECRET: 's' };
  const out = await handleEnquiry({ ...good, email: 'queued@example.com' }, { ip: 'q-' + Math.random(), env });
  assert.equal(out.status, 503);
  assert.equal(out.body.ok, false);
  assert.match(out.body.error, /hello@prodory\.com/);
});
