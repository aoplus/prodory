import type { Product, Solution, PricingPlan, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;

export const products: Product[] = [
  {
    "id": "ai-finops-dashboard",
    "title": "AO+ AI FinOps Dashboard",
    "tagline": "AI-powered cost visibility & optimization",
    "shortDescription": "Monitors multi-cloud spend, recommends rightsizing and reserved planning.",
    "longDescription": "Monitors AWS/GCP spend in real time; AI recommendations for rightsizing, reserved instance planning and cost-saving automation; CFO & IT reports.",
    "features": ["Real-time cloud spend monitoring","AI rightsizing recommendations","Reserved instances & RI planning","Anomaly detection & alerts","Executive PDF reports"],
    "delivery": "Phase 1: AI-assisted manual reports. Phase 2: SaaS dashboard with alerts.",
    "value": "Up to 30% cloud cost savings",
    "pricingNote": "Setup ₹1–2L, subscription ₹50k–₹2L/month",
    "stage": "productized",
    "industries": ["BFSI","SaaS","Logistics"]
  },
  {
    "id": "k8s-in-a-box",
    "title": "AO+ Kubernetes-in-a-Box",
    "tagline": "Secure production-ready Kubernetes / OpenShift installs",
    "shortDescription": "One-stop Kubernetes/OpenShift deployment with CI/CD and monitoring.",
    "longDescription": "Deploys secure production Kubernetes/OpenShift clusters with CI/CD, monitoring stack and AI anomaly detection. AWS, GCP or on-prem RHEL supported.",
    "features": ["Terraform + Ansible templates","Pre-configured CI/CD & GitOps","Prometheus/Grafana monitoring","Security hardening & RBAC","Disaster recovery automation"],
    "delivery": "Phase 1: Template-based delivery per client. Phase 2: One-click SaaS installer.",
    "value": "Deploy in weeks vs months; reduced downtime",
    "pricingNote": "One-time ₹5–10L + managed services retainer",
    "stage": "productized",
    "industries": ["SaaS","Healthcare","Manufacturing"]
  },
  {
    "id": "cloud-sentinel",
    "title": "AO+ Cloud Sentinel",
    "tagline": "Security, observability & compliance",
    "shortDescription": "Centralized monitoring with AI-driven anomaly detection.",
    "longDescription": "Prometheus/Grafana/OpenTelemetry stack + AI for anomaly detection in logs/metrics and compliance reporting (ISO, PCI-DSS, RBI).",
    "features": ["Log + metric ingestion","AI anomaly detection","Policy-as-code compliance reports","Incident runbooks","24/7 monitoring add-on"],
    "delivery": "Service -> SaaS platform with ingestion",
    "value": "Improves uptime & audit readiness",
    "pricingNote": "Subscription ₹75k–₹3L/month",
    "stage": "productized",
    "industries": ["BFSI","Healthcare","SaaS"]
  },
  {
    "id": "vmware-to-openshift",
    "title": "AO+ Virtualization Migration Assistant",
    "tagline": "VMware → OpenShift migration automation",
    "shortDescription": "Automates migrations from VMware to OpenShift.",
    "longDescription": "Discovery, dependency mapping, containerization playbooks and validated cutover runbooks to migrate VMware workloads to OpenShift (on-prem/cloud).",
    "features": ["Automated discovery","Dependency mapping","Containerization scripts","Rollback & DR playbooks","Testing automation"],
    "delivery": "Scripts + migration consultancy",
    "value": "30–50% infra cost reduction",
    "pricingNote": "Project ₹10–25L depending on scope",
    "stage": "service",
    "industries": ["Enterprise","BFSI"]
  },
  {
    "id": "redhat-automation-suite",
    "title": "AO+ Red Hat Automation Suite",
    "tagline": "Ansible-driven OS lifecycle & reliability",
    "shortDescription": "RHEL lifecycle automation, patching, and HA clusters.",
    "longDescription": "Ansible playbooks for OS lifecycle, RHEL HA cluster setups, and application consolidation with automation best-practices.",
    "features": ["Ansible playbooks","Patch & upgrade automation","RHEL HA setup","Process automation","Training & knowledge transfer"],
    "delivery": "Packaged playbooks + consulting or hosted copilot",
    "value": "Reduces manual tickets & human error",
    "pricingNote": "₹3–8L per engagement",
    "stage": "service",
    "industries": ["Enterprise","Manufacturing"]
  },
  {
    "id": "ai-infracopilot",
    "title": "AO+ AI InfraCopilot",
    "tagline": "ChatGPT for infrastructure (future SaaS)",
    "shortDescription": "Natural-language -> Terraform/Ansible generation, security & cost validation.",
    "longDescription": "User-friendly infra copilot that converts natural language into IaC, validates for security and cost, and suggests optimized deployments.",
    "features": ["NL to Terraform/Ansible","Security & cost validations","CI/CD integration","Policy guardrails","Multi-cloud deployment suggestions"],
    "delivery": "Future: multi-tenant SaaS",
    "value": "Accelerates infra onboarding & reduces misconfigurations",
    "pricingNote": "Future SaaS pricing ₹50k–₹5L/month",
    "stage": "saas",
    "industries": ["SaaS","DevOps"]
  },
  {
    "id": "cloudfinops",
    "title": "AO+ CloudFinOps",
    "tagline": "AI-powered cost visibility & optimization",
    "description": "Multi-cloud + SaaS cost visibility, anomaly detection and rightsizing recommendations. Freemium → Paid plans.",
    "features": [
      "Connectors for AWS, GCP, Azure",
      "AI-powered anomaly detection",
      "Rightsizing & budget alerts",
      "Executive dashboards"
    ],
    "pricingTier": "business",
    "shortDescription": "Multi-cloud + SaaS cost visibility, anomaly detection and rightsizing recommendations.",
    "longDescription": "Multi-cloud + SaaS cost visibility, anomaly detection and rightsizing recommendations. Freemium → Paid plans.",
    "delivery": "SaaS",
    "value": "Cost Savings",
    "pricingNote": "Freemium -> Paid",
    "stage": "saas",
    "industries": ["SaaS", "Enterprise"]
  },
  {
    "id": "docsai",
    "title": "AO+ DocsAI",
    "tagline": "Automated SOP & onboarding generator",
    "description": "Generate SOPs, runbooks, and training videos from workflows and recordings.",
    "features": [
      "AI-generated runbooks",
      "Video-based onboarding",
      "Versioned SOPs",
      "Multi-language support"
    ],
    "pricingTier": "starter",
    "shortDescription": "Generate SOPs, runbooks, and training videos from workflows and recordings.",
    "longDescription": "Generate SOPs, runbooks, and training videos from workflows and recordings.",
    "delivery": "SaaS",
    "value": "Time Savings",
    "pricingNote": "Starts with free tier",
    "stage": "saas",
    "industries": ["SaaS", "Enterprise", "BFSI", "Healthcare"]
  },
  {
    "id": "agents",
    "title": "AO+ Agents",
    "tagline": "Industry copilots for BFSI, DevOps, Logistics",
    "description": "AI agents for invoice reconciliation, infra scaling, compliance checks, logistics scheduling.",
    "features": [
      "Finance reconciliation agent",
      "DevOps provisioning agent",
      "Compliance monitoring agent",
      "Custom workflows"
    ],
    "pricingTier": "enterprise",
    "shortDescription": "AI agents for invoice reconciliation, infra scaling, compliance checks, logistics scheduling.",
    "longDescription": "AI agents for invoice reconciliation, infra scaling, compliance checks, logistics scheduling.",
    "delivery": "SaaS / Managed Service",
    "value": "Automation",
    "pricingNote": "Enterprise pricing",
    "stage": "saas",
    "industries": ["BFSI", "DevOps", "Logistics"]
  },
  {
    "id": "testgen",
    "title": "AO+ TestGen",
    "tagline": "AI-driven code test generation",
    "description": "Automate unit & integration test generation for Java, Python, Node apps.",
    "features": [
      "Unit + integration test automation",
      "Mutation testing suggestions",
      "CI/CD pipeline integration",
      "Coverage dashboards"
    ],
    "pricingTier": "business",
    "shortDescription": "Automate unit & integration test generation for Java, Python, Node apps.",
    "longDescription": "Automate unit & integration test generation for Java, Python, Node apps.",
    "delivery": "SaaS",
    "value": "Improved Code Quality",
    "pricingNote": "Business tier",
    "stage": "saas",
    "industries": ["SaaS", "DevOps"]
  },
  {
    "id": "aihub",
    "title": "AO+ AI Hub",
    "tagline": "India-first LLM & GenAI marketplace",
    "description": "Localized LLM marketplace and routing layer for cost, latency and compliance.",
    "features": [
      "LLM request routing",
      "Cost + latency optimization",
      "Marketplace for plugins & agents",
      "Indian data residency compliance"
    ],
    "pricingTier": "enterprise",
    "shortDescription": "Localized LLM marketplace and routing layer for cost, latency and compliance.",
    "longDescription": "Localized LLM marketplace and routing layer for cost, latency and compliance.",
    "delivery": "SaaS",
    "value": "GenAI optimization",
    "pricingNote": "Enterprise pricing",
    "stage": "saas",
    "industries": ["SaaS", "Enterprise"]
  }
];

export const bundles = [
    {
      "id": "ao-foundation",
      "title": "AO+ Foundation",
      "description": "AI FinOps + Cloud Migration Assessment",
      "products": ["ai-finops-dashboard","vmware-to-openshift"]
    },
    {
      "id": "ao-accelerator",
      "title": "AO+ Accelerator",
      "description": "Kubernetes-in-a-Box + Cloud Sentinel",
      "products": ["k8s-in-a-box","cloud-sentinel"]
    },
    {
      "id": "ao-enterprise",
      "title": "AO+ Enterprise",
      "description": "VMware Migration + OpenShift + Automation Suite",
      "products": ["vmware-to-openshift","k8s-in-a-box","redhat-automation-suite"]
    }
];

export const solutions: Solution[] = [
  {
    "id": "bfsi",
    "title": "Banking, Financial Services & Insurance",
    "description": "Reconciliation agents, secure FinOps, RBI-compliant data handling.",
    "useCases": [
      "Invoice reconciliation",
      "Regulatory compliance automation",
      "Cloud cost governance"
    ],
    "image": getImage("solution-bfsi")
  },
  {
    "id": "healthcare",
    "title": "Healthcare",
    "description": "Patient-data safe ML infra, compliance-ready FinOps, disaster recovery.",
    "useCases": [
      "HIPAA/DPDP data compliance",
      "Secure MLOps infrastructure",
      "Critical workload SRE"
    ],
    "image": getImage("solution-healthcare")
  },
  {
    "id": "saas",
    "title": "SaaS Startups",
    "description": "Kubernetes acceleration, CI/CD, cost governance and automated testing.",
    "useCases": [
      "One-click Kubernetes setup",
      "Continuous testing with AO+ TestGen",
      "Multi-cloud FinOps optimization"
    ],
    "image": getImage("solution-saas")
  },
  {
    "id": "logistics",
    "title": "Logistics",
    "description": "Scheduling & capacity agents, cost-aware infra, geo-fallback routing.",
    "useCases": [
      "AI scheduling agent",
      "Fleet cost optimization",
      "Geo-distributed failover"
    ],
    "image": getImage("solution-logistics")
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    "id": "starter",
    "name": "Starter",
    "price": "Free",
    "description": "For teams exploring AO+",
    "features": [
      "CloudFinOps Lite",
      "DocsAI basic (2 users)",
      "Community support"
    ],
    "cta": "Get Started"
  },
  {
    "id": "business",
    "name": "Business",
    "price": "₹25,000 / month",
    "description": "For growing teams and startups",
    "features": [
      "CloudFinOps Pro",
      "DocsAI up to 5 users",
      "TestGen integration",
      "Email support"
    ],
    "cta": "Start 14-day Trial",
    "isFeatured": true
  },
  {
    "id": "enterprise",
    "name": "Enterprise",
    "price": "₹5L – ₹25L ARR",
    "description": "Custom contracts for enterprises",
    "features": [
      "AO+ Cloud Suite (all products)",
      "Dedicated success manager",
      "Onsite support & SLA",
      "Custom AI agents"
    ],
    "cta": "Contact Sales"
  }
];

export const blogPosts: BlogPost[] = [
  {
    "id": "post1",
    "title": "Why FinOps Matters in 2025",
    "author": "AO+ Solutions",
    "date": "2025-09-11",
    "excerpt": "Cloud costs are growing 30% YoY. Here's how FinOps saves money for Indian enterprises.",
    "content": "Full article content goes here...",
    "image": getImage("blog-post1")
  },
  {
    "id": "post2",
    "title": "AI Agents for BFSI: The Next Big Leap",
    "author": "AO+ Solutions",
    "date": "2025-09-15",
    "excerpt": "Banks are embracing AI copilots to automate reconciliations and compliance.",
    "content": "Full article content goes here...",
    "image": getImage("blog-post2")
  }
];
