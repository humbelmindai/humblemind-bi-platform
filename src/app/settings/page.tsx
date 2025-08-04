'use client';

import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { 
  ShieldCheckIcon,
  BellIcon,
  KeyIcon,
  UserGroupIcon,
  CogIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Security',
      description: 'Manage passwords, two-factor authentication, and security preferences',
      icon: ShieldCheckIcon,
      href: '/settings/security',
      color: 'bg-green-500'
    },
    {
      title: 'Notifications',
      description: 'Configure email, push, and in-app notifications',
      icon: BellIcon,
      href: '/settings/notifications',
      color: 'bg-blue-500'
    },
    {
      title: 'API Keys',
      description: 'Manage API keys and integrations',
      icon: KeyIcon,
      href: '/settings/api-keys',
      color: 'bg-purple-500'
    },
    {
      title: 'Team Management',
      description: 'Manage team members and permissions',
      icon: UserGroupIcon,
      href: '/settings/team',
      color: 'bg-orange-500'
    },
    {
      title: 'Preferences',
      description: 'Customize your experience and preferences',
      icon: CogIcon,
      href: '/settings/preferences',
      color: 'bg-gray-500'
    },
    {
      title: 'Regional Settings',
      description: 'Language, timezone, and regional preferences',
      icon: GlobeAltIcon,
      href: '/settings/regional',
      color: 'bg-indigo-500'
    },
    {
      title: 'Data & Privacy',
      description: 'Manage data export, privacy settings, and compliance',
      icon: DocumentTextIcon,
      href: '/settings/privacy',
      color: 'bg-red-500'
    },
    {
      title: 'Analytics',
      description: 'Configure analytics and tracking preferences',
      icon: ChartBarIcon,
      href: '/settings/analytics',
      color: 'bg-teal-500'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings, security preferences, and platform configuration.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <a
              key={index}
              href={section.href}
              className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/profile"
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <UserGroupIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Edit Profile</span>
            </a>
            <a
              href="/billing"
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <CogIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Billing Settings</span>
            </a>
            <a
              href="/support"
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <DocumentTextIcon className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Get Support</span>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 