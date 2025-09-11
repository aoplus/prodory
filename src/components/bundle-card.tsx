
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';
import type { Bundle, Product } from '@/lib/types';
import { Badge } from './ui/badge';

interface BundleCardProps {
  bundle: Bundle;
  products: Product[];
}

export function BundleCard({ bundle, products }: BundleCardProps) {
  return (
    <Card className="flex transform flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="mb-4">
            <Package className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl">{bundle.title}</CardTitle>
        <CardDescription>{bundle.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col">
        <div className="flex-grow">
            <h4 className="mb-2 font-semibold text-sm text-muted-foreground">Includes:</h4>
            <div className="flex flex-wrap gap-2">
                {products.map(product => (
                    <Badge key={product.id} variant="secondary">{product.title}</Badge>
                ))}
            </div>
        </div>
        <Button asChild variant="link" className="mt-4 justify-start p-0 font-semibold">
          <Link href={`/contact?bundle=${bundle.id}`}>
            Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
