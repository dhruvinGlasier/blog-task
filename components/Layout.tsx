import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showSidebar ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8">
            <div className="flex-1 min-w-0">
              {children}
            </div>
            <aside className="lg:w-80 flex-shrink-0">
              <Sidebar />
            </aside>
          </div>
        ) : (
          <div className="py-8">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}

