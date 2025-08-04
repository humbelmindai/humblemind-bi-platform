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
  CurrencyDollarIcon,
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Services', icon: ShoppingBagIcon },
    { id: 'bi', name: 'Business Intelligence', icon: ChartBarIcon },
    { id: 'platforms', name: 'Platform Development', icon: ServerIcon },
    { id: 'ai', name: 'AI & ML Services', icon: SparklesIcon },
    { id: 'hosting', name: 'Hosting & Infrastructure', icon: GlobeAltIcon },
    { id: 'support', name: 'Support & Maintenance', icon: ShieldCheckIcon }
  ];

  const services = [
    // Business Intelligence Services
    {
      id: 'bi-starter',
      name: 'BI Starter',
      category: 'bi',
      description: 'Perfect for small teams getting started with business intelligence',
      price: 'R299',
      period: 'month',
      features: [
        '2 users included',
        '5 data sources',
        'Basic dashboards',
        'Email support',
        'Standard reports'
      ],
      popular: false,
      status: 'available'
    },
    {
      id: 'bi-professional',
      name: 'BI Professional',
      category: 'bi',
      description: 'Advanced analytics for growing organizations',
      price: 'R899',
      period: 'month',
      features: [
        '10 users included',
        '20 data sources',
        'Advanced analytics',
        'Priority support',
        'Custom reports',
        'Real-time dashboards',
        'API access'
      ],
      popular: true,
      status: 'available'
    },
    {
      id: 'bi-enterprise',
      name: 'BI Enterprise',
      category: 'bi',
      description: 'Enterprise-grade business intelligence with AI insights',
      price: 'R2,499',
      period: 'month',
      features: [
        'Unlimited users',
        'Unlimited data sources',
        'AI-powered insights',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'White-label options'
      ],
      popular: false,
      status: 'available'
    },
    {
      id: 'bi-custom',
      name: 'BI Custom',
      category: 'bi',
      description: 'Tailored business intelligence solutions',
      price: 'From R5,000',
      period: 'month',
      features: [
        'Custom development',
        'Dedicated support team',
        'Custom features',
        'White-label solution',
        'SLA guarantees',
        'Training included'
      ],
      popular: false,
      status: 'custom'
    },

    // Platform Development Services
    {
      id: 'doctoraid-license',
      name: 'DoctorAid License',
      category: 'platforms',
      description: 'AI-powered healthcare management platform',
      price: 'R50,000',
      period: 'setup + R10,000/month',
      features: [
        'AI transcription (88% accuracy)',
        'Patient portal & telemedicine',
        'Medical aid integration',
        'Pharmacy integration',
        'SAPHRA, POPIA, HIPAA compliance',
        'Practice management dashboard',
        '24/7 support'
      ],
      popular: false,
      status: 'available'
    },
    {
      id: 'section21-platform',
      name: 'Section 21 Cannabis Platform',
      category: 'platforms',
      description: 'Compliance automation for medical cannabis',
      price: 'Custom',
      period: 'enterprise pricing',
      features: [
        'Section 21 compliance automation',
        'Patient consultation management',
        'Inventory and dispensing system',
        'Medical practitioner portal',
        'Regulatory compliance tools',
        'Custom enterprise features'
      ],
      popular: false,
      status: 'custom'
    },
    {
      id: 'custom-platform',
      name: 'Custom Platform Development',
      category: 'platforms',
      description: 'Bespoke platform solutions for your business',
      price: 'R150,000 - R500,000',
      period: 'per project',
      features: [
        'Custom software development',
        'Enterprise application design',
        'Legacy system modernization',
        'API development',
        'Scalable cloud infrastructure',
        'Ongoing maintenance'
      ],
      popular: false,
      status: 'custom'
    },

    // AI & ML Services
    {
      id: 'ai-integration',
      name: 'AI Integration Consulting',
      category: 'ai',
      description: 'Seamless AI integration into existing systems',
      price: 'R10,000 - R50,000',
      period: 'per project',
      features: [
        'AI strategy consulting',
        'System integration planning',
        'Custom AI solution deployment',
        'Workflow optimization',
        'Performance monitoring',
        'Training and documentation'
      ],
      popular: false,
      status: 'custom'
    },
    {
      id: 'llm-training',
      name: 'Custom LLM Training',
      category: 'ai',
      description: 'Specialized training for large language models',
      price: 'R25,000 - R100,000',
      period: 'per model',
      features: [
        'Custom data preparation',
        'Model selection and optimization',
        'Fine-tuning for specific domains',
        'Performance validation',
        'Continuous improvement',
        'Deployment support'
      ],
      popular: false,
      status: 'custom'
    },

    // Hosting & Infrastructure
    {
      id: 'secure-hosting',
      name: 'Secure Cloud Hosting',
      category: 'hosting',
      description: 'Enterprise-grade hosting with enhanced security',
      price: 'R2,000 - R10,000',
      period: 'month',
      features: [
        'Multi-cloud infrastructure',
        'Advanced security protocols',
        'Compliance-ready environments',
        '24/7 monitoring',
        'Disaster recovery',
        'Auto-scaling'
      ],
      popular: false,
      status: 'available'
    },
    {
      id: 'managed-database',
      name: 'Managed Database Services',
      category: 'hosting',
      description: 'Fully managed database solutions',
      price: 'R1,500 - R8,000',
      period: 'month',
      features: [
        'PostgreSQL, MongoDB, TimescaleDB',
        'Automated backups',
        'Performance optimization',
        'Security monitoring',
        'High availability',
        'Expert support'
      ],
      popular: false,
      status: 'available'
    },

    // Support & Maintenance
    {
      id: 'priority-support',
      name: 'Priority Support',
      category: 'support',
      description: 'Enhanced support for critical business needs',
      price: 'R2,000',
      period: 'month per organization',
      features: [
        'Priority ticket routing',
        'Dedicated support team',
        'Faster response times',
        'Extended support hours',
        'Proactive monitoring',
        'Regular health checks'
      ],
      popular: false,
      status: 'available'
    },
    {
      id: 'dedicated-support',
      name: 'Dedicated Support',
      category: 'support',
      description: 'Personal success manager and dedicated support',
      price: 'R10,000',
      period: 'month',
      features: [
        'Dedicated success manager',
        '24/7 phone support',
        'Custom SLA agreements',
        'Quarterly business reviews',
        'Strategic planning sessions',
        'Training and onboarding'
      ],
      popular: false,
      status: 'available'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HumbleMind Service Store
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and purchase all HumbleMind platforms and services. From business intelligence 
            to custom platform development, we have everything you need to transform your business.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative ${
                service.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {service.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{service.period}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                {service.status === 'available' ? (
                  <Button className="flex-1">
                    Get Started
                  </Button>
                ) : (
                  <Button className="flex-1" variant="outline">
                    Contact Sales
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our team of experts can create a tailored solution that perfectly fits your business needs. 
            Let's discuss your requirements and build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 