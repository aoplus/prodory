import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | AO+ Cloud Platform',
  description: 'Explore the AO+ Solutions product suite, including CloudFinOps, DocsAI, AI Agents, TestGen, and our AI Hub.',
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Product Suite
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A comprehensive set of AI-first tools designed to accelerate your business, optimize costs, and streamline operations.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
