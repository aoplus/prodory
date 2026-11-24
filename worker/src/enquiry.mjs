// Validation and classification for Prodory enquiries. Pure functions: no network, no I/O.
// Every enquiry becomes a CRM Lead on crm.aoplus.in (source Website, service "Cloud & DevOps").

export const CATEGORIES = {
  kubernetes: { label: 'Kubernetes platforms', slug: 'kubernetes-platforms' },
  vmware: { label: 'VMware to OpenShift / KubeVirt exit', slug: 'vmware-to-openshift-migration' },
  sovereign: { label: 'Sovereign and hybrid private cloud', slug: 'sovereign-hybrid-cloud' },
  iac: { label: 'Infrastructure automation and GitOps', slug: 'infrastructure-automation-iac' },
  finops: { label: 'Cloud and Kubernetes cost optimisation', slug: 'cloud-finops-cost-optimization' },
  gcc: { label: 'Co-engineering pod for a GCC or team', slug: 'gcc-global-teams' },
  general: { label: 'General enquiry', slug: 'general' },
};

export const BRAND_TAG = 'brand-prodory';
export const WEBSITE_LEAD_TAG = 'Website Lead';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const truthy = (v) => v === true || v === 'on' || v === 'true' || v === '1' || v === 1;

// input: a plain object (parsed JSON or form fields). Returns { ok, errors, data }.
export function validate(input = {}) {
  const errors = {};
  const data = {
    name: clip(input.name, 80),
    company: clip(input.company, 100),
    email: clip(input.email, 120).toLowerCase(),
    phone: clip(input.phone, 30),
    category: clip(input.category, 40) || 'general',
    requirement: String(input.requirement ?? '').trim().slice(0, 2000),
    consentContact: truthy(input.consent_contact),
    consentMarketing: truthy(input.consent_marketing),
    page: clip(input.page, 200),
    referrer: clip(input.referrer, 200),
    utm: {
      source: clip(input.utm_source, 100),
      medium: clip(input.utm_medium, 100),
      campaign: clip(input.utm_campaign, 100),
      content: clip(input.utm_content, 100),
    },
  };

  if (input.website) errors.form = 'spam'; // honeypot field must stay empty
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid work email address.';
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) errors.phone = 'Please enter a valid phone number, or leave it blank.';
    data.phone = data.phone.replace(/[^\d+]/g, '');
  }
  if (!CATEGORIES[data.category]) errors.category = 'Please choose an area of interest.';
  if (data.requirement.length < 10) errors.requirement = 'Please describe your requirement in a sentence or two.';
  if (!data.consentContact) errors.consent_contact = 'Please agree to be contacted about your enquiry.';

  return { ok: Object.keys(errors).length === 0, errors, data };
}

// Classification for CRM and Mautic. Mautic only receives contacts who ticked the marketing box.
export function classify(data) {
  const cat = CATEGORIES[data.category] || CATEGORIES.general;
  const tags = [WEBSITE_LEAD_TAG, `service-${cat.slug}`, BRAND_TAG];
  return {
    leadSource: 'Website',
    serviceLabel: cat.label,
    mauticTags: [...tags, data.consentMarketing ? 'consent-marketing' : null].filter(Boolean),
    mauticEligible: data.consentMarketing === true,
  };
}
