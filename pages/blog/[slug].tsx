import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import Comments from '@/components/Comments';
import AboutAuthor from '@/components/AboutAuthor';
import RelatedArticles from '@/components/RelatedArticles';
import { blogPosts, BlogPost } from '@/lib/data';
import { isApiConfigured, fetchPostsFromApi, fetchPostFromApi } from '@/lib/api';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      
      {/* Hero Section - Full Width */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Breadcrumb */}
          <div className="text-center text-xs md:text-sm text-gray-400 mb-4">
            HOME / ARTICLES /
          </div>

          {/* Title */}
          <h1 className="text-[28px] md:text-5xl font-bold text-center mb-8 px-4 text-dark-blue">
            {post.title}
          </h1>
        </div>

        {/* Hero Image - Full Width, No Padding */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article + About Author with Sidebar */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pt-4">
          <div className="flex-1 min-w-0">
            {/* Article Metadata */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200 mb-8">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="font-medium text-gray-700 text-base md:text-base uppercase tracking-wide">
                  {post.author.name}
                </span>
              </div>
              <div className="text-gray-700 text-sm md:text-base">
                {post.date}
              </div>
            </div>

            {/* Article Body */}
            <article className="mb-8">
              <div className="text-gray-700 leading-relaxed text-base md:text-base whitespace-pre-line">
                {post.body.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            {/* About Author */}
            <AboutAuthor post={post} />
          </div>
          <aside className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </aside>
        </div>

        {/* Comments + Add A Comment - full width, no sidebar */}
        <div className="w-full py-8 border-t border-gray-200">
          <Comments postSlug={post.slug} />
        </div>

        {/* Related Articles - full width, no sidebar */}
        <div className="w-full py-8 border-t border-gray-200">
          <RelatedArticles />
        </div>
      </main>
    </div>
  );
}

function normalizePost(apiPost: unknown): BlogPost {
  const p = apiPost as Record<string, unknown>;
  return {
    slug: p.slug as string,
    title: p.title as string,
    date: p.date as string,
    author: p.author as BlogPost['author'],
    image: (p.image as string) || '',
    body: p.body as string,
    isEditorsPick: p.isEditorsPick as boolean | undefined,
    previousPost: p.previousPost as BlogPost['previousPost'],
    nextPost: p.nextPost as BlogPost['nextPost'],
  };
}

/** Attach previous/next post titles from ordered list so they show below nav buttons. */
function withPrevNext(post: BlogPost, allPosts: { slug: string; title: string }[]): BlogPost {
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? allPosts[index - 1] : null;
  const next = index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null;
  return {
    ...post,
    previousPost: prev ? { slug: prev.slug, title: prev.title } : (post.previousPost ?? null),
    nextPost: next ? { slug: next.slug, title: next.title } : (post.nextPost ?? null),
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  let slugs: string[] = [];
  if (isApiConfigured()) {
    try {
      const posts = await fetchPostsFromApi();
      slugs = (posts as { slug?: string }[]).map((p) => p.slug).filter(Boolean) as string[];
    } catch {
      slugs = blogPosts.map((p) => p.slug);
    }
  } else {
    slugs = blogPosts.map((p) => p.slug);
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  let post: BlogPost | null = null;
  let allPosts: { slug: string; title: string }[] = [];

  if (isApiConfigured()) {
    try {
      const apiPosts = await fetchPostsFromApi();
      const list = (apiPosts as { slug?: string; title?: string }[]) || [];
      allPosts = list.map((p) => ({ slug: p.slug || '', title: p.title || '' })).filter((p) => p.slug);
      const apiPost = list.find((p) => p.slug === slug);
      if (apiPost) post = normalizePost(apiPost);
    } catch {
      allPosts = blogPosts.map((p) => ({ slug: p.slug, title: p.title }));
      post = blogPosts.find((p) => p.slug === slug) || null;
    }
  }
  if (!post) {
    post = blogPosts.find((p) => p.slug === slug) || null;
  }
  if (allPosts.length === 0) {
    allPosts = blogPosts.map((p) => ({ slug: p.slug, title: p.title }));
  }

  if (!post) {
    return { notFound: true };
  }

  const postWithPrevNext = withPrevNext(post, allPosts);
  return { props: { post: postWithPrevNext } };
};

