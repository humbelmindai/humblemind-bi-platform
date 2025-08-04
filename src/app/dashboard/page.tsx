'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/auth/protected-route';
import { useAuth } from '@/components/auth/auth-provider';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Profile, Organization } from '@/types';
import Button from '@/components/ui/button';
import MetricCard from '@/components/charts/metric-card';
import LineChartComponent from '@/components/charts/line-chart';
import BarChartComponent from '@/components/charts/bar-chart';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ServerIcon,
  PlusIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Safely use auth context with fallback
  let authData: {
    user: SupabaseUser | null;
    profile: Profile | null;
    organization: Organization | null;
  } = {
    user: null,
    profile: null,
    organization: null
  };
  
  try {
    authData = useAuth();
  } catch (error) {
    // Auth context not available yet, use fallback values
    console.log('Auth context not available, using fallback values');
  }
  
  const { user, profile, organization } = authData;

  const metrics = [
    {
      title: 'Total Revenue',
      value: 'R 45,231',
      change: '+20.1%',
      trend: 'up' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1%',
      trend: 'up' as const,
      icon: UserGroupIcon,
    },
    {
      title: 'Active Services',
      value: '12',
      change: '+19%',
      trend: 'up' as const,
      icon: ServerIcon,
    },
    {
      title: 'Analytics Usage',
      value: '573',
      change: '-12%',
      trend: 'down' as const,
      icon: ChartBarIcon,
    },
  ];

  // Sample chart data
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
  ];

  const userGrowthData = [
    { name: 'Jan', users: 1200 },
    { name: 'Feb', users: 1400 },
    { name: 'Mar', users: 1600 },
    { name: 'Apr', users: 1800 },
    { name: 'May', users: 2000 },
    { name: 'Jun', users: 2200 },
    { name: 'Jul', users: 2350 },
  ];

  return (
    <ProtectedRoute>
      <MainLayout 
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {profile?.full_name || user?.email || 'User'}!
              {organization && ` - ${organization.name}`}
            </p>
          </div>
          <Button>
            Generate Report
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <LineChartComponent 
              data={revenueData}
              dataKey="value"
              title="Revenue Trend"
              color="#3B82F6"
              height={250}
            />
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <BarChartComponent 
              data={userGrowthData}
              dataKey="users"
              title="User Growth"
              color="#10B981"
              height={250}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New service provisioned</p>
                  <p className="text-xs text-gray-500">AI Analytics Platform was successfully deployed</p>
                </div>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Payment received</p>
                  <p className="text-xs text-gray-500">Monthly subscription payment processed</p>
                </div>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Support ticket created</p>
                  <p className="text-xs text-gray-500">New support request for data integration</p>
                </div>
                <span className="text-xs text-gray-400">3 days ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" fullWidth leftIcon={<PlusIcon className="h-4 w-4" />}>
                Add Data Source
              </Button>
              <Button variant="outline" fullWidth leftIcon={<DocumentChartBarIcon className="h-4 w-4" />}>
                Create Dashboard
              </Button>
              <Button variant="outline" fullWidth leftIcon={<ChartBarIcon className="h-4 w-4" />}>
                Generate Report
              </Button>
              <Button variant="outline" fullWidth>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
    </ProtectedRoute>
  );
} 