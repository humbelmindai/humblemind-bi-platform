'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Button from '@/components/ui/button';
import { 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'tickets', name: 'Support Tickets', icon: DocumentTextIcon },
    { id: 'knowledge-base', name: 'Knowledge Base', icon: QuestionMarkCircleIcon },
    { id: 'contact', name: 'Contact Us', icon: ChatBubbleLeftRightIcon }
  ];

  const supportTickets = [
    {
      id: 'TICKET-001',
      title: 'Dashboard not loading properly',
      status: 'open',
      priority: 'high',
      category: 'Technical Issue',
      createdAt: '2025-01-20',
      lastUpdated: '2025-01-20',
      assignedTo: 'Support Team'
    },
    {
      id: 'TICKET-002',
      title: 'Payment method update request',
      status: 'in-progress',
      priority: 'medium',
      category: 'Billing',
      createdAt: '2025-01-19',
      lastUpdated: '2025-01-20',
      assignedTo: 'Billing Team'
    },
    {
      id: 'TICKET-003',
      title: 'Feature request: Additional data sources',
      status: 'closed',
      priority: 'low',
      category: 'Feature Request',
      createdAt: '2025-01-15',
      lastUpdated: '2025-01-18',
      assignedTo: 'Product Team'
    }
  ];

  const knowledgeBaseArticles = [
    {
      id: '1',
      title: 'Getting Started with HumbleMind BI',
      category: 'Getting Started',
      readTime: '5 min read',
      tags: ['beginner', 'setup', 'onboarding']
    },
    {
      id: '2',
      title: 'Connecting Your First Data Source',
      category: 'Data Integration',
      readTime: '8 min read',
      tags: ['data', 'integration', 'setup']
    },
    {
      id: '3',
      title: 'Creating Your First Dashboard',
      category: 'Dashboards',
      readTime: '10 min read',
      tags: ['dashboard', 'visualization', 'tutorial']
    },
    {
      id: '4',
      title: 'Understanding Analytics and Reports',
      category: 'Analytics',
      readTime: '12 min read',
      tags: ['analytics', 'reports', 'insights']
    },
    {
      id: '5',
      title: 'Managing User Permissions',
      category: 'User Management',
      readTime: '6 min read',
      tags: ['users', 'permissions', 'security']
    },
    {
      id: '6',
      title: 'Troubleshooting Common Issues',
      category: 'Troubleshooting',
      readTime: '15 min read',
      tags: ['troubleshooting', 'support', 'issues']
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatBubbleLeftRightIcon,
      availability: '24/7',
      responseTime: 'Instant',
      color: 'bg-green-500',
      action: 'Start Chat'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our support specialists',
      icon: PhoneIcon,
      availability: 'Mon-Fri 8AM-6PM SAST',
      responseTime: 'Immediate',
      color: 'bg-blue-500',
      action: 'Call Now'
    },
    {
      title: 'Video Call',
      description: 'Screen share and get visual assistance',
      icon: VideoCameraIcon,
      availability: 'By Appointment',
      responseTime: 'Scheduled',
      color: 'bg-purple-500',
      action: 'Schedule Call'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: EnvelopeIcon,
      availability: '24/7',
      responseTime: 'Within 4 hours',
      color: 'bg-orange-500',
      action: 'Send Email'
    }
  ];

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Ticket
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supportTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-sm text-gray-500">{ticket.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'open' 
                      ? 'bg-red-100 text-red-800'
                      : ticket.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : ticket.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ticket.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeBaseArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                {article.readTime}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {article.title}
            </h4>
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Read Article
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${option.color}`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {option.description}
                  </p>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>Available: {option.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      <span>Response: {option.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">
                  {option.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Support Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-blue-900 mb-2">Response Times</h5>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Critical Issues: Within 1 hour</li>
              <li>• High Priority: Within 4 hours</li>
              <li>• Medium Priority: Within 24 hours</li>
              <li>• Low Priority: Within 48 hours</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-900 mb-2">Support Hours</h5>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Live Chat: 24/7</li>
              <li>• Phone Support: Mon-Fri 8AM-6PM SAST</li>
              <li>• Email Support: 24/7</li>
              <li>• Video Calls: By appointment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
          <p className="text-gray-600">
            Get help with your HumbleMind platform. We're here to support you 24/7.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 inline mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'knowledge-base' && renderKnowledgeBase()}
        {activeTab === 'contact' && renderContact()}
      </div>
    </MainLayout>
  );
} 