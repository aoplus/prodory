import type { Product, Solution, PricingPlan, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;

export const products: Product[] = [
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
    "pricingTier": "business"
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
    "pricingTier": "starter"
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
    "pricingTier": "enterprise"
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
    "pricingTier": "business"
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
    "pricingTier": "enterprise"
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
    "price": "₹25,000",
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
