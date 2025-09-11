import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cloudy, Bot, TestTube, BrainCircuit } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    <Card className={cn(
        "group flex flex-col bg-card/50 transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
        "border border-transparent"
    )}>
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {productIcons[product.id]}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col pt-0">
        <p className="flex-grow text-muted-foreground">{product.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {product.tags?.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href={`/products/${product.id}`} className="font-semibold text-sm text-primary group-hover:underline flex items-center gap-2">
            Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}
