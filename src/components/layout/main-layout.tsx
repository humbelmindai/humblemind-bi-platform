import React from 'react';
import { cn } from '@/lib/utils';
import Header from './header';
import Sidebar from './sidebar';
import { BaseComponentProps } from '@/types';

export interface MainLayoutProps extends BaseComponentProps {
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showSidebar = true,
  sidebarCollapsed = false,
  onSidebarToggle,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSidebar={showSidebar}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={onSidebarToggle}
      />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar collapsed={sidebarCollapsed} />
        )}
        
        <main className={cn(
          'flex-1 transition-all duration-300',
          showSidebar ? 'ml-64' : 'ml-0',
          sidebarCollapsed && showSidebar ? 'ml-16' : '',
          className
        )}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 