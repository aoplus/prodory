import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cloudy, Bot, TestTube, BrainCircuit } from 'lucide-react';
import type { Product } from '@/lib/types';

const productIcons: { [key: string]: React.ReactNode } = {
  'storage-autoscaler': <Cloudy className="h-8 w-8 text-primary" />,
  'data-finops-agent': <BrainCircuit className="h-8 w-8 text-primary" />,
  'ai-finops-dashboard': <Cloudy className="h-8 w-8 text-primary" />,
  'k8s-in-a-box': <Cloudy className="h-8 w-8 text-primary" />,
  'cloud-sentinel': <BrainCircuit className="h-8 w-8 text-primary" />,
  'vmware-to-openshift': <Cloudy className="h-8 w-8 text-primary" />,
  'redhat-automation-suite': <Bot className="h-8 w-8 text-primary" />,
  'ai-infracopilot': <BrainCircuit className="h-8 w-8 text-primary" />,
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
    <Card className="group flex transform flex-col overflow-hidden bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
      <CardHeader>
        <div className="mb-4">{productIcons[product.id]}</div>
        <CardTitle className="text-xl">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col">
        <p className="flex-grow text-muted-foreground">{product.tagline}</p>
        <Button asChild variant="link" className="mt-4 justify-start p-0 font-semibold text-primary/80 group-hover:text-primary">
          <Link href={`/products/${product.id}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
