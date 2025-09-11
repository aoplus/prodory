
import { BundleCard } from '@/components/bundle-card';
import { bundles, products } from '@/lib/data';
import type { Product } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Bundles | AO+ Cloud Platform',
  description: 'Explore our bundled solutions designed to accelerate your cloud and AI journey.',
};

export default function BundlesPage() {
  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Product Bundles
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Get started faster with our curated collections of products, designed to solve specific challenges and deliver value.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => {
            const bundleProducts = bundle.products.map(getProductById).filter((p): p is Product => !!p);
            return (
                <BundleCard key={bundle.id} bundle={bundle} products={bundleProducts} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
