import Image from 'next/image';
import { AwsLogo, GoogleLogo, RedHatLogo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | AO+ Cloud Platform',
  description: 'Learn about AO+ Solutions, our mission, our team, and our commitment to building intelligent infrastructure for India.',
};

const partners = [
  { name: 'AWS', logo: <AwsLogo className="h-12 w-auto" /> },
  { name: 'Google Cloud', logo: <GoogleLogo className="h-12 w-auto" /> },
  { name: 'Red Hat', logo: <RedHatLogo className="h-12 w-auto" /> },
];

const aboutHeroImage = PlaceHolderImages.find(img => img.id === 'about-us-hero');
const founderImage = PlaceHolderImages.find(img => img.id === 'founder-story');

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          {aboutHeroImage && (
            <Image
              src={aboutHeroImage.imageUrl}
              alt={aboutHeroImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutHeroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-6xl">
            About AO+ Solutions
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We are architects of intelligent, automated, and efficient cloud infrastructure, built for India.
          </p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AO+ Solutions was founded on the belief that Indian enterprises deserve world-class technology that is both powerful and cost-effective. We are a B2B IT and AI-first cloud automation startup dedicated to helping businesses navigate the complexities of the modern cloud landscape.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our mission is to empower organizations with intelligent infrastructure, enabling them to focus on innovation while we handle the automation, optimization, and security of their cloud environments. From FinOps to generative AI, we provide outcome-focused solutions that deliver tangible business value.
            </p>
          </div>
        </div>
      </section>
      
      {/* Founder Story Section */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="lg:order-last">
                {founderImage && (
                    <div className="relative">
                        <div className="absolute -inset-2 rounded-xl bg-primary/10"></div>
                        <Image
                            src={founderImage.imageUrl}
                            alt={founderImage.description}
                            width={500}
                            height={500}
                            className="relative rounded-xl shadow-2xl"
                            data-ai-hint={founderImage.imageHint}
                        />
                    </div>
                )}
            </div>
            <div className="text-center lg:text-left">
              <h2 className="font-headline text-3xl font-bold">A Note from Our Founder</h2>
              <blockquote className="mt-6 border-l-4 border-primary pl-6 text-xl italic text-muted-foreground">
                "We started AO+ with a simple goal: to democratize access to high-end cloud automation and AI. We saw too many companies struggling with rising costs and operational overhead. Our platform is our answer—a suite of tools built to give every Indian business a competitive edge in the global market."
              </blockquote>
              <p className="mt-6 text-lg font-semibold text-foreground">— Founder, AO+ Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-semibold text-foreground">
            Our Valued Partners
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-12 md:gap-x-16">
            {partners.map((partner) => (
              <div key={partner.name} title={partner.name} className="opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
