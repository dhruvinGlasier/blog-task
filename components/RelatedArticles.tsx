import Image from 'next/image';
import Link from 'next/link';
import { relatedArticles } from '@/lib/data';

export default function RelatedArticles() {
  return (
    <div className="mt-4">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Related articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.id}`}
            className="group cursor-pointer block"
          >
            <div className="relative w-full h-48 mb-3">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded group-hover:opacity-90 transition-opacity"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500">{article.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

