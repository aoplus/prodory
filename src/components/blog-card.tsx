import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.id}`} className="block">
        <Image
          src={post.image}
          alt={post.title}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
          data-ai-hint="finance chart"
        />
      </Link>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          <Link href={`/blog/${post.id}`} className="hover:text-primary">{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{post.author}</p>
            <p className="text-xs text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
          </div>
        </div>
        <Link href={`/blog/${post.id}`} className="group flex items-center text-sm font-semibold text-primary hover:underline">
          Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
