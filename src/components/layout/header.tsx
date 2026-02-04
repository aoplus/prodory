'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-2xl font-bold text-primary">Prodory</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium text-secondary transition-colors hover:text-primary',
                pathname.startsWith(link.href) ? 'text-primary' : 'text-slate-600'
              )}
            >
              {link.label}
            </Link>
          ))}
           <Link
              href='/contact'
              className='text-sm font-medium text-slate-600 transition-colors hover:text-primary'
            >
              Contact Sales
            </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="#">Login</Link>
          </Button>
          <Button asChild variant="accent">
            <Link href="/contact">Book Free Assessment</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-4">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setSheetOpen(false)}>
                  <span className="text-xl font-bold text-primary">Prodory</span>
                </Link>
                <div className="flex flex-col gap-4">
                  {[...navLinks, { href: '/contact', label: 'Contact Sales' }].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname.startsWith(link.href) ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link
                      href="#"
                      onClick={() => setSheetOpen(false)}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      Login
                    </Link>
                </div>
                <Button asChild className="mt-4" variant="accent">
                  <Link href="/contact" onClick={() => setSheetOpen(false)}>Book Free Assessment</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
