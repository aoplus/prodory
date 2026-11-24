// Site-wide facts and navigation. Source: redesign blueprint (2026-11-24) and AO Plus Solutions registrations.
// Only verified facts go here. Do not add client logos, testimonials, savings figures or partner badges
// until they are verified and approved (blueprint sections 1 and 3).

export const SITE = {
  url: 'https://prodory.com',
  name: 'Prodory',
  parent: 'AO Plus Solutions Pvt Ltd',
  founded: 2019,
  cin: 'U72900MH2019PTC330456',
  registrations: ['DPIIT Startup India', 'UDYAM-MH-33-0401680'],
  location: 'Dombivli, Maharashtra, India',
  email: 'hello@prodory.com',
  // Form endpoint: Cloudflare Pages Function in functions/api/enquiry.js (same origin, no CORS).
  enquiryUrl: '/api/enquiry',
  primaryCta: { label: 'Book a 30-min architecture review', href: '/architecture-review/' },
};

export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/bfsi-fintech/' },
  { label: 'Engagement', href: '/engagement-models/' },
  { label: 'Methodology', href: '/methodology/' },
  { label: 'Case studies', href: '/case-studies/' },
  { label: 'About', href: '/about/' },
];

export const PILLARS = [
  {
    slug: 'kubernetes-platforms',
    title: 'Kubernetes platforms',
    text: 'Production clusters on bare metal, VMs or public cloud (EKS, AKS, GKE), with the platform layer your teams run.',
  },
  {
    slug: 'vmware-to-openshift-migration',
    title: 'VMware to OpenShift and KubeVirt',
    text: 'Exit VMware on a planned timetable, wave by wave, with a cost model you can check line by line.',
  },
  {
    slug: 'infrastructure-automation-iac',
    title: 'Infrastructure automation and GitOps',
    text: 'Terraform, Ansible and GitOps, so every change is reviewed in a repository your organisation owns.',
  },
  {
    slug: 'cloud-finops-cost-optimization',
    title: 'Cloud and Kubernetes cost optimisation',
    text: 'Find waste in the cluster and the account, then fix it in code: rightsizing, autoscaling and idle storage.',
  },
];
