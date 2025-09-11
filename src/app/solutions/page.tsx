import { solutions } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions by Industry | Prodory',
  description: 'Learn how Prodory provides tailored cloud and AI automation for BFSI, Healthcare, SaaS, and Logistics industries.',
};

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Solutions by Industry
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We provide specialized solutions to meet the unique challenges of your industry, ensuring compliance, efficiency, and innovation.
          </p>
        </div>

        <div className="mt-20 space-y-24">
          {solutions.map((solution, index) => (
            <div key={solution.id} className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={index % 2 === 1 ? 'md:order-last' : ''}>
                <h2 className="font-headline text-3xl font-bold text-foreground">{solution.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{solution.description}</p>
                <ul className="mt-6 space-y-3">
                  {solution.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-center">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="font-medium">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-lg shadow-xl">
                 <Image
                  src={solution.image}
                  alt={solution.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint="finance banking"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
