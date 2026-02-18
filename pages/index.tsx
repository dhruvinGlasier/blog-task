import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { blogPosts } from '@/lib/data';

export default function Home() {
  const router = useRouter();
  const featuredPost = blogPosts[0];

  return (
    <Layout showSidebar={false}>
      <div className="w-full py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-lg text-gray-600">
            Discover the latest articles and insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {post.date} • {post.author.name}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

