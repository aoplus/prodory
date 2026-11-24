// Site-wide facts and navigation.
// Each company fact below was checked against the live pages of aoplus.in (contact, about, footer) on 2026-11-24.
// Do not add a fact here until it is checked the same way. Unverified items: hello@prodory.com mailbox, grievance officer.

export const SITE = {
  url: 'https://prodory.com',
  name: 'Prodory',
  parent: 'AO Plus Solutions Pvt Ltd',
  founded: 2019,
  head: {
    line1: 'AO Plus Solutions Pvt Ltd',
    line2: '1-605, Lodha Signet One',
    line3: 'Dombivli, Maharashtra 421204, India',
  },
  cin: 'U72900MH2019PTC330456',
  dpiit: 'DPIIT Startup India',
  udyam: 'UDYAM-MH-33-0401680',
  gstin: '27AASCA6842P2ZQ',
  pan: 'AASCA6842P',
  sac: '998314',
  gstRate: '18%',
  phone: '+91 79778 75818',
  phoneTel: '+917977875818',
  whatsapp: 'https://wa.me/917977875818',
  calendly: 'https://calendly.com/aoplusin',
  email: 'hello@prodory.com',
  // Pages Function that receives every form on the site (same origin, no CORS).
  enquiryPath: '/api/enquiry',
} as const;

export const NAV_SERVICES = [
  { label: 'All services', href: '/services/' },
  { label: 'Kubernetes platforms', href: '/services/kubernetes-platforms/' },
  { label: 'VMware to OpenShift / KubeVirt', href: '/services/vmware-to-openshift-migration/' },
  { label: 'Sovereign & hybrid cloud', href: '/services/sovereign-hybrid-cloud/' },
  { label: 'Infrastructure automation & IaC', href: '/services/infrastructure-automation-iac/' },
  { label: 'Cloud & Kubernetes cost optimisation', href: '/services/cloud-finops-cost-optimization/' },
];

export const NAV_INDUSTRIES = [
  { label: 'BFSI & FinTech', href: '/industries/bfsi-fintech/' },
  { label: 'SaaS & digital natives', href: '/industries/saas-digital-natives/' },
  { label: 'India GCCs & global teams', href: '/industries/gcc-global-teams/' },
];

export const NAV_RESOURCES = [
  { label: 'Cloud waste calculator', href: '/tools/cloud-waste-calculator/' },
  { label: 'Delivery methodology', href: '/methodology/' },
  { label: 'Engagement models', href: '/engagement-models/' },
];

// Technologies Prodory builds with. Plain text on purpose: no partner logos and no partnership claims
// until formal partner status is verified.
export const WORKS_WITH = ['Kubernetes', 'Red Hat OpenShift', 'KubeVirt', 'Amazon EKS', 'Azure AKS', 'Google GKE', 'Terraform', 'OpenTofu', 'Ansible', 'Argo CD', 'Cilium', 'Karpenter'];
