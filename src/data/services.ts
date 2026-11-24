// Phase 1 service pages (blueprint section 9 and 11). Four pillars, plus the cost wedge as pillar 4A.
export type Service = {
  slug: string;
  title: string;
  lead: string;
  why: string[];
  scope: string[];
  outcomes: string[];
  cta: string;
  category: string; // enquiry area-of-interest value (see worker/src/enquiry.mjs)
};

export const SERVICES: Service[] = [
  {
    slug: 'kubernetes-platforms',
    title: 'Kubernetes platforms',
    lead: 'Production clusters you can operate: design, build, hardening and handover, in a repository you own.',
    why: [
      'Kubernetes is in production at most container users, but platform teams are often thin.',
      'Clusters drift: CPU overprovisioning across clusters has risen sharply in 2025–2026 telemetry studies.',
    ],
    scope: [
      'Cluster design for bare metal, VMs, or EKS, AKS and GKE',
      'Networking and policy (Cilium eBPF where it fits)',
      'Platform layer: ingress, observability, secrets and GitOps delivery',
      'Day-2 runbooks and an on-call handover',
    ],
    outcomes: [
      'Terraform modules and cluster repositories in your organisation',
      'A production readiness checklist, scored against the same criteria at handover',
      'Documented upgrade and recovery procedures',
      'Your team trained to operate the platform',
    ],
    cta: 'Request a Kubernetes readiness audit',
    category: 'kubernetes',
  },
  {
    slug: 'vmware-to-openshift-migration',
    title: 'VMware to OpenShift and KubeVirt',
    lead: 'Exit VMware on your timetable. Move workloads in waves, with a cost model you can check.',
    why: [
      'Broadcom’s VMware licensing moved to per-core subscriptions, with minimums and renewal penalties.',
      'Many organisations are now assessing OpenShift Virtualization and KubeVirt as the alternative.',
    ],
    scope: [
      'Inventory and dependency mapping for your virtual machines',
      'OpenShift Virtualization or KubeVirt target design, with a decision tree',
      'Wave plan, cutover runbooks and rollback steps',
      'Cost comparison against your current renewal terms',
    ],
    outcomes: [
      'A written decision: stay, re-platform or exit, with the reasons',
      'Migration waves with a tested rollback path for each',
      'Repositories for the target platform, owned by you',
    ],
    cta: 'Book a VMware exit TCO diagnostic',
    category: 'vmware',
  },
  {
    slug: 'sovereign-hybrid-cloud',
    title: 'Sovereign and hybrid private cloud',
    lead: 'Keep regulated data where your rules require it, and run the platform on your hardware or a hosting partner.',
    why: [
      'DPDP Act obligations take full effect on 13 May 2027: encryption, audit logs and breach reporting.',
      'RBI and CERT-In rules add data-localisation and incident-reporting duties for regulated entities.',
    ],
    scope: [
      'Residency and sovereignty mapping for each workload',
      'Private cloud design on your hardware or a hosting partner',
      'Controls mapped to DPDP and your sector regulator',
      'Logging and audit retention designed in from the start',
    ],
    outcomes: [
      'A control map your compliance team can review line by line',
      'A deployment you can audit and move',
      'Documented encryption, access and backup procedures',
    ],
    cta: 'Book a sovereign architecture briefing',
    category: 'sovereign',
  },
  {
    slug: 'infrastructure-automation-iac',
    title: 'Infrastructure automation and GitOps',
    lead: 'Replace manual changes with reviewed code, so every production change has a history and a rollback.',
    why: [
      'Manual changes (ClickOps) create drift that nobody can explain during an incident.',
      'Platform teams need a reviewed, repeatable path before an internal developer platform makes sense.',
    ],
    scope: [
      'Terraform and OpenTofu for cloud and data-centre resources',
      'Ansible for server and OS lifecycle, including RHEL patching',
      'GitOps delivery (Argo CD or Flux) with review gates and policy checks',
      'Migration of existing manual configuration into code',
    ],
    outcomes: [
      'Repositories in your own Git organisation',
      'A pull-request workflow with policy gates',
      'Module documentation and a maintenance guide',
    ],
    cta: 'Audit your automation maturity',
    category: 'iac',
  },
  {
    slug: 'cloud-finops-cost-optimization',
    title: 'Cloud and Kubernetes cost optimisation',
    lead: 'Find where the money goes, then fix it in the platform: nodes, storage, autoscaling and idle resources.',
    why: [
      'Self-estimated cloud waste rose in 2026 for the first time in five years.',
      'Buyers now want cost attribution per team or service, and changes delivered as code, not as dashboards.',
    ],
    scope: [
      'Two-week waste diagnostic across accounts and clusters',
      'Rightsizing and autoscaling changes made in code (Karpenter, Graviton/ARM, Spot where suitable)',
      'Storage cleanup: unused volumes, snapshots and lifecycle rules',
      'Cost attribution by team, namespace or service',
    ],
    outcomes: [
      'A ranked list of savings, each with the engineering effort it needs',
      'Changes delivered as pull requests you review and merge',
      'Cost reporting built on data you already have',
    ],
    cta: 'Get a two-week waste diagnostic',
    category: 'finops',
  },
];
