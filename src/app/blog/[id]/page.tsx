import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.id === params.id);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} | Prodory Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold !leading-tight tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Post Image */}
          <div className="relative my-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint="technology abstract"
              priority
            />
          </div>

          {/* Post Content */}
          <div
            className="text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}
