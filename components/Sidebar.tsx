import { trendingPosts, guides } from '@/lib/data';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Explore more */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">Explore more</h2>
        <div className="space-y-4">
          {trendingPosts.map((post) => (
            <div key={post.id} className="space-y-2">
              <div className="relative w-full h-32">
                <Image
                  src={post.image}
                  alt={post.description}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium">{post.category}</span>
                  <span>|</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tour Guides */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Guides</h2>
        <div className="space-y-4">
          {guides.map((guide) => (
            <div key={guide.id} className="flex items-start gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={guide.avatar}
                  alt={guide.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{guide.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{guide.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(guide.rating)
                          ? 'text-yellow-400 fill-current'
                          : i < guide.rating
                          ? 'text-yellow-400 fill-current opacity-50'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-600 ml-1">({guide.rating.toFixed(1)})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

