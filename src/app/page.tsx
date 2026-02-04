import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AwsLogo, GoogleLogo, AzureLogo } from '@/components/icons';
import {
  ArrowRight,
  BarChartBig,
  Clock,
  CircleDollarSign,
  Siren,
  AreaChart,
  Database,
  Package as K8sIcon,
  HardDrive,
  Shield,
  Replace,
  Target,
  IndianRupee,
  Handshake,
  Banknote,
  Briefcase,
  HeartPulse,
  Truck,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const trustSignals = [
  { text: 'Multi-Cloud Support', icons: [<AwsLogo key="aws" className="h-6 w-6" />, <AzureLogo key="azure" className="h-6 w-6" />, <GoogleLogo key="gcp" className="h-6 w-6" />] },
  { text: '₹100+ Cr Cloud Spend Managed' },
  { text: 'Built in India, for Indian Enterprises' },
  { text: '30-40% Average Cost Reduction' },
];

const problems = [
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    headline: 'No Granular Visibility',
    text: "Can't see cloud spend by team, project, or customer. The CFO asks 'where is ₹50L/month going?' You don't know.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    headline: 'Manual Processes',
    text: 'Engineers spend 10-15 hours per week building spreadsheets and generating reports, instead of optimizing.',
  },
  {
    icon: <CircleDollarSign className="h-10 w-10 text-primary" />,
    headline: 'Wasted Spend',
    text: 'Unused volumes, idle instances, orphaned snapshots. 25-40% of your bill is pure waste.',
  },
  {
    icon: <Siren className="h-10 w-10 text-primary" />,
    headline: 'Surprise Bills',
    text: 'Unexpected cost spikes with no early warning. You find out when the ₹18L invoice arrives (usually ₹8L).',
  },
];

const products = [
  {
    icon: <AreaChart className="h-8 w-8 text-primary" />,
    title: "AI FinOps Dashboard",
    description: "Real-time multi-cloud cost visibility with AI-powered insights. See spend by team, project, or customer—updated every 5 minutes.",
    features: ["Multi-cloud unified view", "Cost allocation & tagging", "Budget tracking & alerts"],
    cta: "/products/ai-finops-dashboard"
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Data FinOps Agent",
    description: "Optimize Snowflake and Databricks spend. Reduce AI/ML costs by 40-60% through warehouse rightsizing and query optimization.",
    features: ["Snowflake warehouse optimization", "Databricks cluster policies", "Query performance analysis"],
    cta: "/products/data-finops-agent"
  },
  {
    icon: <K8sIcon className="h-8 w-8 text-primary" />,
    title: "Kubernetes-in-a-Box",
    description: "Pod-level cost attribution for EKS, AKS, GKE, and OpenShift. Know exactly which workload is driving your K8s spend.",
    features: ["Pod-level cost breakdown", "Namespace allocation", "Rightsizing recommendations"],
    cta: "/products/k8s-in-a-box"
  },
  {
    icon: <HardDrive className="h-8 w-8 text-primary" />,
    title: "Storage Autoscaler",
    description: "Automatically rightsize EBS volumes, identify unused storage, and optimize S3. Save ₹5-15L/year on storage alone.",
    features: ["Automated volume rightsizing", "Unused volume detection", "S3 lifecycle optimization"],
    cta: "/products/storage-autoscaler"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Cloud Sentinel",
    description: "Security and compliance monitoring across clouds. RBI data residency checks, cost anomaly detection, and automated alerts.",
    features: ["Compliance monitoring (RBI, SOC2)", "Anomaly detection", "Security posture tracking"],
    cta: "/products/cloud-sentinel"
  },
  {
    icon: <Replace className="h-8 w-8 text-primary" />,
    title: "VMware Migration Assistant",
    description: "Automated VMware to OpenShift migration. Escape Broadcom pricing. Migrate 500 VMs in 6-8 weeks for ₹10-30L.",
    features: ["Automated discovery & assessment", "VM-to-container conversion", "Validation & testing"],
    cta: "/products/vmware-to-openshift"
  }
];

const differentiators = [
    {
        icon: <Target className="h-10 w-10 text-accent" />,
        headline: "Outcome-Focused",
        paragraph: "We don't just show you data—we deliver measurable cost reduction. Average 30% savings in 90 days. We only succeed when you save money."
    },
    {
        icon: <IndianRupee className="h-10 w-10 text-accent" />,
        headline: "India-First",
        paragraph: "Built for Indian compliance (RBI), pricing (₹-based, 30-50% cheaper), and support (IST hours). We understand the needs of Indian enterprises."
    },
    {
        icon: <Handshake className="h-10 w-10 text-accent" />,
        headline: "Partner-Backed",
        paragraph: "Official AWS, Azure, and GCP partner. Enterprise-grade SLAs, 99.9% uptime guarantee, and dedicated FinOps engineers for Business+ plans."
    }
];

const industries = [
    {
        icon: <Banknote className="h-8 w-8 text-primary"/>,
        name: "BFSI",
        pain: "Strict RBI compliance, high cloud costs, need for cost allocation by product/BU.",
        solution: "RBI-compliant FinOps with detailed cost allocation and automated compliance checks."
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary"/>,
        name: "SaaS Companies",
        pain: "Need to track COGS, optimize unit economics, and show investors improving gross margins.",
        solution: "Customer-level cost attribution, COGS tracking, and investor-ready reporting."
    },
    {
        icon: <HeartPulse className="h-8 w-8 text-primary"/>,
        name: "Healthcare",
        pain: "PHI/PII compliance, hybrid cloud complexity, and tight budget constraints.",
        solution: "HIPAA-compliant FinOps, hybrid cloud support, and cost optimization without risking data security."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        name: "Logistics",
        pain: "Managing seasonal spikes, massive data volumes, and IoT infrastructure costs.",
        solution: "Spike prediction, auto-scaling optimization, and seasonal budget management."
    }
]

const pricingTiers = [
    {
        name: "Starter",
        price: "₹49,999",
        billing: "(₹4,99,990/year)",
        label: "Best for growing companies",
        spend: "₹5-15L/month",
        features: ["AI FinOps Dashboard", "Cost allocation & tagging", "Email support (24hr response)"],
        roi: "Typical savings: ₹50K-2.25L/mo",
        cta: "Start Free Trial"
    },
    {
        name: "Professional",
        price: "₹1,49,999",
        billing: "(₹14,99,990/year)",
        label: "Best for enterprises",
        spend: "₹15-50L/month",
        features: ["Everything in Starter, plus:", "All products (K8s, Data, etc.)", "Slack support + monthly review"],
        roi: "Typical savings: ₹3-15L/mo",
        cta: "Start Free Trial",
        featured: true
    },
    {
        name: "Business",
        price: "₹2,99,999",
        billing: "(₹29,99,990/year)",
        label: "Best for large enterprises",
        spend: "₹50L-₹2Cr/month",
        features: ["Everything in Pro, plus:", "Dedicated FinOps engineer", "Quarterly business reviews"],
        roi: "Typical savings: ₹12.5-80L/mo",
        cta: "Contact Sales"
    },
    {
        name: "Enterprise",
        price: "Custom",
        billing: "",
        label: "Best for ₹2Cr+/month spend",
        spend: "₹2Cr+/month",
        features: ["Everything in Business, plus:", "Full-time FinOps engineer", "Custom integrations & SLAs"],
        roi: "Typical savings: ₹60L-₹1Cr+/mo",
        cta: "Contact Sales"
    }
]


export default function Home() {
  return (
    <div className="bg-background text-secondary-foreground font-sans">
      {/* Hero Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Reduce Cloud Costs by 25-40%. Automated.
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary">
                Prodory helps Indian enterprises optimize AWS, Azure, and GCP spend with AI-powered FinOps—at 30-50% lower cost than global tools. Real-time visibility, automated recommendations, measurable ROI.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button size="lg" variant="accent">
                  <Link href="/contact">Book Free Assessment</Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="flex h-full items-center justify-center">
                <div className="relative w-full max-w-lg">
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-xl"></div>
                    <div className="relative h-80 w-full rounded-xl bg-gradient-to-br from-primary to-accent p-8 shadow-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white/80">Dashboard Preview</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {trustSignals.map((signal) => (
              <div key={signal.text} className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                {signal.icons && <div className="flex gap-2">{signal.icons}</div>}
                <span>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Your Cloud Bill is Out of Control. Here's Why.
            </h2>
            <p className="mt-4 text-lg text-secondary">
              Most enterprises waste 25-40% of their cloud budget on unused resources, over-provisioning, and lack of visibility.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <div key={problem.headline} className="rounded-lg border border-gray-200 p-6">
                {problem.icon}
                <h3 className="mt-4 text-lg font-semibold">{problem.headline}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{problem.text}</p>
              </div>
            ))}
          </div>
           <p className="mt-12 text-center text-muted-foreground">Sound familiar? You're not alone. 80% of Indian enterprises face these exact challenges.</p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-muted py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              One Platform. Complete Cloud Cost Control.
            </h2>
            <p className="mt-4 text-lg text-secondary">
              Prodory's AI-powered FinOps platform gives you real-time visibility, automated optimization, and predictable cloud spending across AWS, Azure, and GCP.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                     {product.icon}
                     <CardTitle className="text-xl">{product.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{product.description}</p>
                   <ul className="mt-4 space-y-2 text-sm">
                    {product.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-accent" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                   </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="p-0">
                    <Link href={product.cta}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Differentiation Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Why Enterprises Choose Prodory
            </h2>
            <p className="mt-4 text-lg text-secondary">
              We deliver outcomes, not just dashboards.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
              {differentiators.map((d) => (
                  <div key={d.headline} className="text-center">
                      <div className="flex justify-center">{d.icon}</div>
                      <h3 className="mt-6 text-xl font-semibold">{d.headline}</h3>
                      <p className="mt-2 text-muted-foreground">{d.paragraph}</p>
                  </div>
              ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted py-20 sm:py-28">
          <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Results That Speak</h2>
                  <p className="mt-4 text-lg text-secondary">Real outcomes from real enterprises</p>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="text-center p-8">
                      <p className="text-5xl font-bold text-accent">₹100+ Cr</p>
                      <p className="mt-2 text-muted-foreground">Cloud Spend Under Management</p>
                  </Card>
                   <Card className="text-center p-8">
                      <p className="text-5xl font-bold text-accent">30-40%</p>
                      <p className="mt-2 text-muted-foreground">Average Cost Reduction</p>
                  </Card>
                   <Card className="text-center p-8">
                      <p className="text-5xl font-bold text-accent">10+ hrs/wk</p>
                      <p className="mt-2 text-muted-foreground">Engineering Time Saved</p>
                  </Card>
              </div>
               <div className="mt-16 mx-auto max-w-3xl text-center">
                    <div className="border-l-4 border-accent p-6 text-left bg-background rounded-r-lg">
                        <p className="italic text-lg text-muted-foreground">"[Customer testimonial will go here after pilot program]"</p>
                        <p className="mt-4 font-semibold">— [Name], [Title], [Company]</p>
                        <p className="mt-2 text-xs text-muted-foreground">Case studies available Q2 2026</p>
                    </div>
                </div>
          </div>
      </section>

      {/* Use Cases by Industry */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Built for Your Industry</h2>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {industries.map(industry => (
                    <Card key={industry.name} className="p-6">
                        <div className="flex items-center gap-4">
                            {industry.icon}
                            <h3 className="text-xl font-semibold">{industry.name}</h3>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-secondary">Pain:</span> {industry.pain}</p>
                        <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-secondary">Solution:</span> {industry.solution}</p>
                        <Button variant="link" className="p-0 mt-4"><Link href="#">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                    </Card>
                ))}
            </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="bg-muted py-20 sm:py-28">
          <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get Started in 3 Steps</h2>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                  <div className="relative p-6">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold border-4 border-muted">01</div>
                      <h3 className="mt-12 text-lg font-semibold">Free Assessment</h3>
                      <p className="text-sm text-muted-foreground mt-2">30-min consultation + analysis of your spend. We identify top 5 optimization opportunities.</p>
                      <p className="mt-2 text-xs font-bold text-accent">Week 1</p>
                  </div>
                   <div className="relative p-6">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold border-4 border-muted">02</div>
                      <h3 className="mt-12 text-lg font-semibold">Pilot Program</h3>
                      <p className="text-sm text-muted-foreground mt-2">60-90 day pilot at a discount. Connect your cloud accounts (read-only) and measure results.</p>
                       <p className="mt-2 text-xs font-bold text-accent">Weeks 2-12</p>
                  </div>
                   <div className="relative p-6">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold border-4 border-muted">03</div>
                      <h3 className="mt-12 text-lg font-semibold">Full Rollout</h3>
                      <p className="text-sm text-muted-foreground mt-2">After proven ROI, roll out to all accounts with ongoing optimization and QBRs.</p>
                       <p className="mt-2 text-xs font-bold text-accent">Month 4+</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Transparent, Scalable Pricing</h2>
                <p className="mt-4 text-lg text-secondary">Choose the plan that fits your cloud spend. All plans include multi-cloud support, unlimited users, and our AI FinOps platform.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 items-end">
                {pricingTiers.map(tier => (
                    <Card key={tier.name} className={cn("flex flex-col p-6", tier.featured && "border-2 border-accent relative -my-4")}>
                        {tier.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">⭐ Most Popular</div>}
                        <h3 className="text-lg font-semibold">{tier.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{tier.label}</p>
                        <p className="mt-4 text-4xl font-bold">{tier.price}<span className="text-sm font-normal text-muted-foreground">{tier.price !== "Custom" && "/mo"}</span></p>
                        <p className="text-xs text-muted-foreground">{tier.billing}</p>
                        <p className="mt-4 text-xs font-semibold">Cloud Spend: {tier.spend}</p>
                        <ul className="mt-6 space-y-3 text-sm flex-grow">
                            {tier.features.map(feature => (
                                <li key={feature} className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-0.5 text-accent flex-shrink-0"/>
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                         <p className="mt-6 text-xs text-muted-foreground"><span className="font-semibold text-secondary">ROI:</span> {tier.roi}</p>
                        <Button className="mt-6 w-full" variant={tier.featured ? "accent" : "outline"}>{tier.cta}</Button>
                    </Card>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button variant="link"><Link href="/pricing">See Detailed Pricing & Feature Comparison <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
            <div className="rounded-xl bg-gradient-to-r from-primary to-blue-800 p-12 text-center text-white">
                <h2 className="text-3xl font-bold sm:text-4xl">See Where You're Overspending. Free Assessment.</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">30-minute consultation. No obligation. We'll analyze your cloud spend and show you 3-5 optimization opportunities worth ₹5-15L/month in savings.</p>
                <Button size="lg" asChild className="mt-8 bg-white text-accent hover:bg-gray-100 font-bold">
                  <Link href="/contact">Book Free Assessment</Link>
                </Button>
                <p className="mt-4 text-xs text-blue-200">Typical findings: ₹5-15L/month in wasted spend. Assessment takes 30 minutes.</p>
            </div>
        </div>
      </section>

    </div>
  );
}
