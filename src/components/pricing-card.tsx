import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/lib/types';
import Link from 'next/link';

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={cn(
      'flex flex-col transition-all duration-300',
      plan.isFeatured 
        ? 'border-primary shadow-2xl shadow-primary/10 relative lg:-translate-y-4' 
        : 'border bg-card/30 hover:shadow-lg'
    )}>
      {plan.isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="pt-4">
          <span className="font-headline text-4xl font-bold">{plan.price}</span>
          {plan.id === 'business' && <span className="text-sm text-muted-foreground"> / month</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={plan.isFeatured ? 'default' : 'outline'}>
          <Link href="/contact">{plan.cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
