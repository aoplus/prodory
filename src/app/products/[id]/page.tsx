import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SopGenerator from '@/components/sop-generator';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: `${product.title} | Prodory`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Product Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold text-primary">Product</p>
          <h1 className="mt-2 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{product.tagline}</p>
        </div>

        {/* Features and Description */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <h2 className="font-headline text-2xl font-semibold">Key Features</h2>
            <p className="mt-2 text-muted-foreground">{product.longDescription}</p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Conditional SOP Generator */}
        {product.id === 'docsai' && (
          <div className="mx-auto mt-24 max-w-5xl">
             <SopGenerator />
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
