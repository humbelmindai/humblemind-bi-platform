'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Button from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-provider';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Profile, Organization } from '@/types';
import { 
  UserCircleIcon, 
  BuildingOfficeIcon,
  CreditCardIcon,
  CogIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  BellIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Safely use auth context with fallback
  let authData: {
    user: SupabaseUser | null;
    profile: Profile | null;
    organization: Organization | null;
    updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  } = {
    user: null,
    profile: null,
    organization: null,
    updateProfile: async () => ({ error: null })
  };
  
  try {
    authData = useAuth();
  } catch (error) {
    // Auth context not available yet, use fallback values
    console.log('Auth context not available, using fallback values');
  }
  
  const { user, profile, organization, updateProfile } = authData;
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    company_name: profile?.company_name || '',
    role: profile?.role || 'user' as const,
    timezone: profile?.timezone || 'Africa/Johannesburg'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      if (!error) {
        setIsEditing(false);
      } else {
        console.error('Error updating profile:', error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      company_name: profile?.company_name || '',
      role: profile?.role || 'user' as const,
      timezone: profile?.timezone || 'Africa/Johannesburg'
    });
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: 'Personal Information',
      icon: UserCircleIcon,
      fields: [
        { label: 'Full Name', value: formData.full_name, key: 'full_name', type: 'text' },
        { label: 'Email', value: user?.email, key: 'email', type: 'email', disabled: true },
        { label: 'Company Name', value: formData.company_name, key: 'company_name', type: 'text' },
        { label: 'Role', value: formData.role, key: 'role', type: 'select', options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' },
          { value: 'owner', label: 'Owner' }
        ]},
        { label: 'Timezone', value: formData.timezone, key: 'timezone', type: 'text' }
      ]
    },
    {
      title: 'Organization',
      icon: BuildingOfficeIcon,
      fields: [
        { label: 'Organization Name', value: organization?.name || 'Not assigned', key: 'org_name', type: 'text', disabled: true },
        { label: 'Organization ID', value: organization?.id || 'Not assigned', key: 'org_id', type: 'text', disabled: true },
        { label: 'Subscription Tier', value: organization?.subscription_tier || 'starter', key: 'subscription_tier', type: 'text', disabled: true }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Billing & Payments',
      description: 'Manage your subscription and payment methods',
      icon: CreditCardIcon,
      href: '/billing',
      color: 'bg-blue-500'
    },
    {
      title: 'Security Settings',
      description: 'Update passwords and security preferences',
      icon: ShieldCheckIcon,
      href: '/settings/security',
      color: 'bg-green-500'
    },
    {
      title: 'Notifications',
      description: 'Configure email and push notifications',
      icon: BellIcon,
      href: '/settings/notifications',
      color: 'bg-purple-500'
    },
    {
      title: 'API Keys',
      description: 'Manage your API keys and integrations',
      icon: KeyIcon,
      href: '/settings/api-keys',
      color: 'bg-orange-500'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your personal information, organization details, and account preferences.
          </p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.full_name || 'User'}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-blue-600 capitalize">
                {profile?.role || 'User'}
              </p>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    variant="primary"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {profileSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <section.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              
              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={field.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        disabled={!isEditing || field.disabled}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        disabled={!isEditing || field.disabled}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 