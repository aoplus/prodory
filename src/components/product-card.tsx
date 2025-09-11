import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cloudy, Bot, TestTube, BrainCircuit } from 'lucide-react';
import type { Product } from '@/lib/types';

const productIcons: { [key: string]: React.ReactNode } = {
  cloudfinops: <Cloudy className="h-8 w-8 text-primary" />,
  docsai: <BrainCircuit className="h-8 w-8 text-primary" />,
  agents: <Bot className="h-8 w-8 text-primary" />,
  testgen: <TestTube className="h-8 w-8 text-primary" />,
  aihub: <BrainCircuit className="h-8 w-8 text-primary" />,
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex transform flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="mb-4">{productIcons[product.id]}</div>
        <CardTitle className="font-headline text-2xl">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col">
        <p className="flex-grow text-muted-foreground">{product.tagline}</p>
        <Button asChild variant="link" className="mt-4 justify-start p-0 font-semibold">
          <Link href={`/products/${product.id}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
