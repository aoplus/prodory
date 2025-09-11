import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AwsLogo, GoogleLogo, RedHatLogo } from '@/components/icons';
import { ArrowRight, CheckCircle, Cloudy, Bot, TestTube, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/lib/data';

const differentiators = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Outcome-Focused',
    description: 'We deliver measurable results, not just services. Your success is our primary metric.',
  },
  {
    icon: <Cloudy className="h-8 w-8 text-primary" />,
    title: 'India-First',
    description: 'Built in India, for Indian enterprises. We understand the local market and compliance landscape.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Partner-Backed',
    description: 'Leveraging strong partnerships with cloud leaders to bring you the best-in-class solutions.',
  },
];

const productIcons: { [key: string]: React.ReactNode } = {
  cloudfinops: <Cloudy className="h-6 w-6 text-primary" />,
  docsai: <BrainCircuit className="h-6 w-6 text-primary" />,
  agents: <Bot className="h-6 w-6 text-primary" />,
  testgen: <TestTube className="h-6 w-6 text-primary" />,
  aihub: <BrainCircuit className="h-6 w-6 text-primary" />,
  'storage-autoscaler': <Cloudy className="h-6 w-6 text-primary" />,
  'data-finops-agent': <BrainCircuit className="h-6 w-6 text-primary" />,
};

const partners = [
  { name: 'AWS', logo: <AwsLogo className="h-12 w-auto" /> },
  { name: 'Google Cloud', logo: <GoogleLogo className="h-12 w-auto" /> },
  { name: 'Red Hat', logo: <RedHatLogo className="h-12 w-auto" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,125,240,0.15)_0%,_transparent_40%)]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Intelligent Infrastructure.
            <br />
            <span className="text-primary">Made in India.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            AO+ Solutions provides AI-first cloud automation to help you innovate faster, optimize costs, and scale securely.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/contact">Book Free FinOps Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold">
              <Link href="/products">Explore Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section id="differentiators" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item.title} className="rounded-lg border bg-card p-8 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Product Suite</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A comprehensive set of tools to power your cloud and AI journey.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id} className="group flex transform flex-col overflow-hidden bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                 <CardHeader>
                  <div className="flex items-center gap-4">
                    {productIcons[product.id]}
                    <CardTitle>{product.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                  <p className="flex-grow text-muted-foreground">{product.tagline}</p>
                  <Button asChild variant="link" className="mt-4 justify-start p-0 font-semibold text-primary/80 group-hover:text-primary">
                    <Link href={`/products/${product.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold text-foreground">
            Trusted by the best, in partnership with leaders
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div key={partner.name} title={partner.name} className="opacity-60 transition-opacity duration-300 hover:opacity-100">
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
