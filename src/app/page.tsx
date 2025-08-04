'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Button from '@/components/ui/button';
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  ServerIcon, 
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const features = [
    {
      icon: ChartBarIcon,
      title: 'AI-Powered Analytics',
      description: 'Advanced business intelligence with machine learning insights and predictive analytics.',
      color: 'bg-blue-500',
    },
    {
      icon: ShoppingBagIcon,
      title: 'E-commerce Platform',
      description: 'Complete online store with PayFast integration and subscription management.',
      color: 'bg-green-500',
    },
    {
      icon: ServerIcon,
      title: 'Service Management',
      description: 'Comprehensive platform for managing all your technology services and infrastructure.',
      color: 'bg-purple-500',
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Built-in collaboration tools for teams to work together effectively.',
      color: 'bg-orange-500',
    },
  ];

  const benefits = [
    {
      icon: SparklesIcon,
      title: 'AI-First Approach',
      description: 'Every feature powered by artificial intelligence for smarter business decisions.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-level security with POPIA, SAPHRA, and HIPAA compliance.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Local & Global',
      description: 'Built for South Africa with global scalability and international payment support.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Effective',
      description: 'Transparent pricing with no hidden fees and flexible subscription options.',
    },
  ];

  return (
    <MainLayout 
      showSidebar={false}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              HumbleMind
              <span className="block text-blue-200">Unified Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Complete technology ecosystem for business intelligence, e-commerce, and service management. 
              Built with kindness, authenticity, and genuine hard work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Explore Services
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From business intelligence to e-commerce, from team collaboration to service management - 
              we've built it all with our core values at heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className={`inline-flex p-3 rounded-lg text-white mb-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HumbleMind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe technology should serve people, not the other way around. 
              That's why every feature is designed with our core values in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already using HumbleMind to grow and succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HM</span>
                </div>
                <span className="text-xl font-semibold">HumbleMind</span>
              </div>
              <p className="text-gray-400">
                Technology that serves people, not the other way around.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Store</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HumbleMind AI Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </MainLayout>
  );
}
