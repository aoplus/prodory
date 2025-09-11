import Link from 'next/link';
import { CloudLightning } from 'lucide-react';

const footerNavs = {
  'Company': [
    { href: '/about', label: 'About' },
    { href: '/resources', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
  ],
  'Products': [
    { href: '/products/cloudfinops', label: 'CloudFinOps' },
    { href: '/products/docsai', label: 'DocsAI' },
    { href: '/products/agents', label: 'Agents' },
    { href: '/products/testgen', label: 'TestGen' },
    { href: '/products/aihub', label: 'AI Hub' },
  ],
  'Solutions': [
    { href: '/solutions', label: 'BFSI' },
    { href: '/solutions', label: 'Healthcare' },
    { href: '/solutions', label: 'SaaS' },
    { href: '/solutions', label: 'Logistics' },
  ]
};

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <CloudLightning className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">AO+ Solutions</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Intelligent Infrastructure. Made in India.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {Object.entries(footerNavs).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-headline font-semibold text-foreground">{title}</h4>
                <ul className="mt-4 space-y-2">
                  {links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AO+ Solutions Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
