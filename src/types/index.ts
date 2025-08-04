// Core User and Authentication Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  company_name?: string;
  role: 'user' | 'admin' | 'owner';
  subscription_status: 'free' | 'active' | 'inactive' | 'cancelled';
  onboarding_completed: boolean;
  timezone: string;
  created_at: string;
  updated_at: string;
}

// Organization and Multi-tenancy
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  settings: Record<string, any>;
  subscription_tier: 'starter' | 'professional' | 'enterprise' | 'custom';
  max_users: number;
  max_data_sources: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  invited_by?: string;
  joined_at: string;
}

// Subscription and Billing
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  frequency: number; // in months
  max_users: number;
  max_data_sources: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  organization_id: string;
  product_id: string;
  payfast_token?: string;
  status: 'active' | 'cancelled' | 'past_due' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInvoice {
  id: string;
  subscription_id: string;
  payfast_payment_id?: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  invoice_date: string;
  due_date: string;
  paid_at?: string;
  created_at: string;
}

// E-commerce and Store
export interface StoreCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_url?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  category_id: string;
  type: 'subscription' | 'one_time' | 'custom_quote';
  pricing_model: 'fixed' | 'tiered' | 'usage_based' | 'custom';
  base_price?: number;
  setup_fee: number;
  billing_cycle?: 'monthly' | 'yearly' | 'one_time' | 'custom';
  features: string[];
  specifications: Record<string, any>;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  stock_status: 'in_stock' | 'out_of_stock' | 'unlimited';
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductPricingTier {
  id: string;
  product_id: string;
  name: string;
  description?: string;
  price: number;
  billing_cycle: string;
  features: string[];
  limits: Record<string, any>;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  organization_id?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
  currency: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  billing_address?: Record<string, any>;
  payment_method?: string;
  payfast_payment_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  pricing_tier_id?: string;
  product_name: string;
  product_description?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  configuration: Record<string, any>;
  provision_status: 'pending' | 'provisioning' | 'active' | 'suspended' | 'cancelled';
  provisioned_at?: string;
  created_at: string;
}

// Support and Ticketing
export interface SupportTicket {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_for_customer' | 'resolved' | 'closed';
  customer_id: string;
  organization_id?: string;
  assigned_to?: string;
  related_order_id?: string;
  tags: string[];
  satisfaction_rating?: number;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  closed_at?: string;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  author_id: string;
  message_type: 'message' | 'internal_note' | 'status_change' | 'assignment_change';
  content: string;
  attachments: Record<string, any>[];
  is_internal: boolean;
  created_at: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: string;
  tags: string[];
  view_count: number;
  helpful_count: number;
  not_helpful_count: number;
  is_published: boolean;
  featured: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

// Data Sources and Analytics
export interface DataSource {
  id: string;
  organization_id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'google_sheets' | 'csv';
  connection_config: Record<string, any>;
  is_active: boolean;
  last_sync?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Dataset {
  id: string;
  organization_id: string;
  data_source_id: string;
  name: string;
  schema_config: Record<string, any>;
  row_count: number;
  last_updated?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Dashboards and Visualizations
export interface Dashboard {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  layout: Record<string, any>;
  is_public: boolean;
  is_template: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Widget {
  id: string;
  dashboard_id: string;
  name: string;
  type: 'chart' | 'table' | 'metric' | 'text' | 'image';
  config: Record<string, any>;
  data_query: Record<string, any>;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  created_by: string;
  created_at: string;
  updated_at: string;
}

// AI and Analytics
export interface AnalyticsQuery {
  id: string;
  organization_id: string;
  name: string;
  sql_query: string;
  parameters: Record<string, any>;
  cache_duration: number;
  is_ai_generated: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AIInsight {
  id: string;
  organization_id: string;
  type: 'trend' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  confidence_score?: number;
  metadata: Record<string, any>;
  is_acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
}

// Service Management
export interface ServiceInstance {
  id: string;
  organization_id: string;
  product_id: string;
  order_item_id?: string;
  subscription_id?: string;
  instance_name: string;
  service_type: 'doctorAid' | 'cannabis_platform' | 'bi_platform' | 'custom_platform' | 'ai_service' | 'hosting';
  configuration: Record<string, any>;
  connection_details: Record<string, any>;
  status: 'provisioning' | 'active' | 'suspended' | 'terminated' | 'failed';
  health_status: 'healthy' | 'warning' | 'critical' | 'unknown';
  last_health_check?: string;
  provisioned_at?: string;
  suspended_at?: string;
  terminated_at?: string;
  created_at: string;
  updated_at: string;
}

// Activity and Notifications
export interface ActivityLog {
  id: string;
  organization_id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface UserNotification {
  id: string;
  user_id: string;
  organization_id?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  action_url?: string;
  is_read: boolean;
  read_at?: string;
  expires_at?: string;
  metadata: Record<string, any>;
  created_at: string;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// PayFast Integration Types
export interface PayFastData {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  m_payment_id: string;
  amount: number;
  item_name: string;
  subscription_type?: string;
  frequency?: string;
  cycles?: string;
  custom_str1?: string; // organization_id
  custom_str2?: string; // user_id
}

export interface PayFastWebhookData {
  m_payment_id: string;
  pf_payment_id: string;
  payment_status: string;
  item_name: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  custom_str1?: string;
  custom_str2?: string;
  signature: string;
  [key: string]: any;
}

// Form and UI Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: any;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  type?: 'text' | 'number' | 'date' | 'status' | 'action';
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

// Chart and Visualization Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable' | 'warning';
  icon?: React.ComponentType<any>;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface ErrorProps extends BaseComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

// Hook Return Types
export interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseMutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  loading: boolean;
  error: string | null;
  reset: () => void;
} 