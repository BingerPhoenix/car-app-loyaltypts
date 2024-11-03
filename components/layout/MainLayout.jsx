import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Bell, Menu } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar>
        <div className="flex items-center gap-4">
          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="flex-1">
            <img
              src="/api/placeholder/120/32"
              alt="Jerry Logo"
              className="h-8"
            />
          </div>

          <NotificationsDropdown />

          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="rounded-full"
            />
          </div>
        </div>
      </Navbar>

      <div className="flex">
        <Sidebar 
          isOpen={isDesktop || sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;