import React from 'react';
import { cn } from '@/lib/utils';
import { 
  HomeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  CogIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ServerIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export interface SidebarProps {
  collapsed?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Store',
    href: '/store',
    icon: ShoppingBagIcon,
    badge: 'New',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    children: [
      { name: 'Dashboards', href: '/analytics/dashboards', icon: ChartBarIcon },
      { name: 'Data Sources', href: '/analytics/data-sources', icon: ServerIcon },
      { name: 'Reports', href: '/analytics/reports', icon: DocumentTextIcon },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    icon: ServerIcon,
  },
  {
    name: 'Team',
    href: '/team',
    icon: UserGroupIcon,
  },
  {
    name: 'Support',
    href: '/support',
    icon: QuestionMarkCircleIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.name}>
        <a
          href={item.href}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            level === 0 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-50 pl-6',
            'group'
          )}
        >
          <item.icon className={cn(
            'h-5 w-5 mr-3',
            level === 0 ? 'text-gray-500' : 'text-gray-400'
          )} />
          
          {!collapsed && (
            <>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <ChevronRightIcon 
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded ? 'rotate-90' : ''
                  )} 
                />
              )}
            </>
          )}
        </a>

        {hasChildren && !collapsed && (
          <div className={cn(
            'overflow-hidden transition-all duration-200',
            isExpanded ? 'max-h-96' : 'max-h-0'
          )}>
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn(
      'bg-white border-r border-gray-200 h-full transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          {collapsed ? (
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HM</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HM</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                HumbleMind
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map(item => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200">
          {!collapsed && (
            <div className="text-xs text-gray-500 text-center">
              © 2025 HumbleMind AI
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 