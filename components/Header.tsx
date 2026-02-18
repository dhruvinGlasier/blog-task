import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Blog
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

