import Link from 'next/link';
import { LinkedinLogo, TwitterLogo } from '@/components/icons';

const footerNavs = {
  'Products': [
    { href: '/products/ai-finops-dashboard', label: 'AI FinOps Dashboard' },
    { href: '/products/data-finops-agent', label: 'Data FinOps Agent' },
    { href: '/products/k8s-in-a-box', label: 'Kubernetes-in-a-Box' },
    { href: '/products/storage-autoscaler', label: 'Storage Autoscaler' },
    { href: '/products/cloud-sentinel', label: 'Cloud Sentinel' },
    { href: '/products/vmware-to-openshift', label: 'VMware Migration Assistant' },
  ],
  'Solutions': [
    { href: '/solutions#bfsi', label: 'For BFSI' },
    { href: '/solutions#saas', label: 'For SaaS' },
    { href: '/solutions#healthcare', label: 'For Healthcare' },
    { href: '/solutions#logistics', label: 'For Logistics' },
    { href: '/solutions#multi-cloud', label: 'Multi-Cloud FinOps' },
    { href: '/solutions#k8s', label: 'K8s Cost Optimization' },
  ],
  'Resources': [
    { href: '/resources', label: 'Blog' },
    { href: '/resources/case-studies', label: 'Case Studies' },
    { href: '/docs', label: 'Documentation' },
    { href: '/roi-calculator', label: 'ROI Calculator' },
    { href: '/resources/finops-guide', label: 'FinOps Guide' },
    { href: '/resources/webinars', label: 'Webinars' },
  ],
  'Company': [
    { href: '/about', label: 'About Prodory' },
    { href: '/about#ao-solutions', label: 'About AO+ Solutions' },
    { href: '/about#leadership', label: 'Leadership' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
    { href: '/contact', label: 'Contact' },
  ],
  'Legal': [
      { href: '/legal/privacy', label: 'Privacy Policy'},
      { href: '/legal/terms', label: 'Terms of Service'},
      { href: '/security', label: 'Security'},
      { href: '/compliance', label: 'Compliance'},
  ]
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Prodory</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              by AO+ Solutions Pvt Ltd
            </p>
             <div className="mt-6 flex space-x-4">
                <a href="#" className="text-secondary hover:text-primary"><LinkedinLogo className="h-6 w-6" /></a>
                <a href="#" className="text-secondary hover:text-primary"><TwitterLogo className="h-6 w-6" /></a>
            </div>
          </div>
          {Object.entries(footerNavs).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-foreground">{title}</h4>
                <ul className="mt-4 space-y-3">
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
        <div className="mt-16 border-t pt-8 text-sm text-muted-foreground md:flex md:justify-between">
          <p>&copy; {new Date().getFullYear()} Prodory. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a href="mailto:hello@prodory.com">hello@prodory.com</a>
            <a href="mailto:support@prodory.com">support@prodory.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
