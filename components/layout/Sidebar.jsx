import React from 'react';
import { useRouter } from 'next/router';
import { 
  Home, 
  Car, 
  Tool, 
  Shield, 
  Gift, 
  Settings, 
  HelpCircle,
  Award,
  Activity,
  X
} from 'lucide-react';
import { cn } from '@/utils/helpers';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home
  },
  {
    name: 'My Vehicles',
    href: '/vehicles',
    icon: Car,
    badge: '2'
  },
  {
    name: 'Service History',
    href: '/services',
    icon: Tool
  },
  {
    name: 'Insurance',
    href: '/insurance',
    icon: Shield,
    badge: 'New'
  },
  {
    name: 'Rewards',
    href: '/rewards',
    icon: Gift
  },
  {
    name: 'Activity',
    href: '/activity',
    icon: Activity
  }
];

const secondaryNavigation = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  },
  {
    name: 'Help & Support',
    href: '/support',
    icon: HelpCircle
  }
];

const NavItem = ({ item, isActive, isMobile }) => {
  return (
    <a
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
      {item.badge && (
        <span className={cn(
          'ml-auto text-xs font-medium px-2 py-0.5 rounded-full',
          item.badge === 'New' 
            ? 'bg-blue-100 text-blue-600'
            : 'bg-gray-100 text-gray-600'
        )}>
          {item.badge}
        </span>
      )}
    </a>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r transition-transform duration-200 ease-in-out lg:translate-x-0 lg:z-30',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="h-full flex flex-col">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b">
            <img
              src="/api/placeholder/120/32"
              alt="Jerry Logo"
              className="h-8"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Membership status */}
          <div className="p-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Gold Member</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                2,500 points until Platinum
              </div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={pathname === item.href}
              />
            ))}

            <div className="my-6 border-t" />

            {secondaryNavigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <img
                src="/api/placeholder/40/40"
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">john@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;