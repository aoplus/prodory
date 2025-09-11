import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog-card';
import { Button } from '@/components/ui/button';
import { Download, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | AO+ Cloud Platform',
  description: 'Explore our blog, case studies, and playbooks to learn more about cloud automation and AI.',
};

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Insights and Resources
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Explore our latest articles, playbooks, and case studies to stay ahead in the world of cloud and AI.
          </p>
        </div>

        {/* Playbook Section */}
        <div className="mx-auto mt-16 max-w-4xl rounded-lg border bg-card p-8 shadow-sm">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <div className="flex justify-center md:col-span-1">
              <BookOpen className="h-24 w-24 text-primary" />
            </div>
            <div className="md:col-span-2">
              <h2 className="font-headline text-2xl font-semibold">Download Our FinOps Playbook</h2>
              <p className="mt-2 text-muted-foreground">
                Get our comprehensive guide to mastering cloud financial management for Indian enterprises.
              </p>
              <Button className="mt-4">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mt-20">
          <h2 className="text-center font-headline text-3xl font-bold text-foreground">
            From the Blog
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
