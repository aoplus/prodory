// Priority 1 industry pages (blueprint section 10). Phase 2 verticals are gated behind real client evidence.
export type Industry = {
  slug: string;
  title: string;
  lead: string;
  points: string[];
  cta: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'bfsi-fintech',
    title: 'Banking, financial services and insurance',
    lead: 'Regulated infrastructure for banks, lenders, insurers and fintechs: residency, auditability and controls designed in from the start.',
    points: [
      'Residency and sovereignty design for regulated workloads',
      'Kubernetes security: admission policy, secrets management and network isolation',
      'Logging and audit retention to meet DPDP and sector rules, plus CERT-In log retention',
      'VMware exit for core banking and reporting systems, planned in waves with rollback',
    ],
    cta: 'Book a regulated cloud readiness review',
  },
  {
    slug: 'saas-digital-natives',
    title: 'SaaS and digital-native companies',
    lead: 'Platforms that scale with your product: multi-tenant clusters, delivery pipelines and control of unit cost.',
    points: [
      'Zero-to-production Kubernetes with a delivery path your engineers can use',
      'Multi-tenant cluster and namespace design',
      'Cost-of-goods work: attributing cloud spend per customer or feature',
      'Developer self-service with guardrails, not tickets',
    ],
    cta: 'Book a SaaS infrastructure review',
  },
  {
    slug: 'gcc-global-teams',
    title: 'Global capability centres',
    lead: 'A co-engineering pod that works in your time zone, under your repositories and your security rules.',
    points: [
      'Platform engineers embedded with your team, based in India',
      'Repositories and intellectual property owned by your organisation',
      'Overlap with US, UK and UAE working hours',
      'A handover plan that leaves your team able to run the platform without us',
    ],
    cta: 'Discuss a co-engineering pod',
  },
];
