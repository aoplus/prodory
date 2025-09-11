import { pricingPlans } from '@/lib/data';
import { PricingCard } from '@/components/pricing-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | AO+ Cloud Platform',
  description: 'Find the right plan for your team. AO+ Solutions offers flexible pricing from a free starter plan to enterprise solutions.',
};

export default function PricingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Flexible Pricing for Teams of All Sizes
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Choose a plan that fits your needs. Start for free and scale as you grow.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
        
        <div className="mt-16 text-center text-muted-foreground">
            <p>All prices are in INR and exclude applicable taxes.</p>
        </div>
      </div>
    </div>
  );
}
