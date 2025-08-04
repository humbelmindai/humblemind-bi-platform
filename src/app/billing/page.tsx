'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Button from '@/components/ui/button';
import { 
  CreditCardIcon, 
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowDownTrayIcon as DownloadIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app this would come from API
  const currentSubscription = {
    plan: 'BI Professional',
    status: 'active',
    amount: 'R899',
    period: 'monthly',
    nextBilling: '2025-02-15',
    users: 10,
    dataSources: 20,
    features: [
      'Advanced analytics',
      'Priority support',
      'Custom reports',
      'Real-time dashboards',
      'API access'
    ]
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-01-15',
      amount: 'R899.00',
      status: 'paid',
      description: 'BI Professional - January 2025'
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-15',
      amount: 'R899.00',
      status: 'paid',
      description: 'BI Professional - December 2024'
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-15',
      amount: 'R899.00',
      status: 'paid',
      description: 'BI Professional - November 2024'
    }
  ];

  const billingHistory = [
    {
      id: '1',
      date: '2025-01-15',
      description: 'BI Professional Subscription',
      amount: 'R899.00',
      type: 'subscription'
    },
    {
      id: '2',
      date: '2024-12-15',
      description: 'BI Professional Subscription',
      amount: 'R899.00',
      type: 'subscription'
    },
    {
      id: '3',
      date: '2024-11-15',
      description: 'BI Professional Subscription',
      amount: 'R899.00',
      type: 'subscription'
    },
    {
      id: '4',
      date: '2024-10-15',
      description: 'BI Starter to Professional Upgrade',
      amount: 'R600.00',
      type: 'upgrade'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: CurrencyDollarIcon },
    { id: 'payment-methods', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'invoices', name: 'Invoices', icon: DocumentTextIcon },
    { id: 'history', name: 'Billing History', icon: CalendarIcon }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Subscription</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentSubscription.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {currentSubscription.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-2xl font-bold text-gray-900">{currentSubscription.plan}</h4>
            <p className="text-gray-600">{currentSubscription.amount}/{currentSubscription.period}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Next billing</p>
            <p className="font-medium text-gray-900">{currentSubscription.nextBilling}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Usage</p>
            <p className="font-medium text-gray-900">
              {currentSubscription.users} users, {currentSubscription.dataSources} data sources
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Included Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentSubscription.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </div>

      {/* Usage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">R899.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Payment</p>
              <p className="text-xl font-bold text-gray-900">Feb 15, 2025</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DocumentTextIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-xl font-bold text-gray-900">R3,197.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CreditCardIcon className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {method.isDefault && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Default
                  </span>
                )}
                <Button variant="outline" size="sm">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
        <Button variant="outline">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {billingHistory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.type === 'subscription' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
          <p className="text-gray-600">
            Manage your subscription, payment methods, and view billing history.
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'payment-methods' && renderPaymentMethods()}
        {activeTab === 'invoices' && renderInvoices()}
        {activeTab === 'history' && renderHistory()}
      </div>
    </MainLayout>
  );
} 