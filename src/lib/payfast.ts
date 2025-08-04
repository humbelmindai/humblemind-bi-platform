import crypto from 'crypto';
import type { PayFastData, PayFastWebhookData } from '@/types';

// PayFast configuration
const PAYFAST_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '17365187',
  merchantKey: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || 's0am9bnarksn8',
  securityKey: process.env.PAYFAST_SECURITY_KEY || 'k0XGylo1g88Bd39BpT9LM',
  testMode: process.env.NODE_ENV === 'development',
  baseUrl: process.env.NODE_ENV === 'development'
    ? 'https://sandbox.payfast.co.za'
    : 'https://www.payfast.co.za',
};

// Generate PayFast signature
export function generatePayFastSignature(data: PayFastData): string {
  // Create data string excluding signature
  const dataString = Object.entries(data)
    .filter(([key, value]) => value !== '' && key !== 'signature')
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
    .join('&');

  // Generate signature with security key
  const signature = crypto
    .createHash('md5')
    .update(`${dataString}&passphrase=${PAYFAST_CONFIG.securityKey}`)
    .digest('hex');

  return signature;
}

// Verify PayFast webhook signature
export function verifyPayFastWebhook(data: PayFastWebhookData): boolean {
  const receivedSignature = data.signature;
  
  // Create data string excluding signature
  const dataString = Object.entries(data)
    .filter(([key, value]) => value !== '' && key !== 'signature')
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
    .join('&');

  // Calculate expected signature
  const calculatedSignature = crypto
    .createHash('md5')
    .update(`${dataString}&passphrase=${PAYFAST_CONFIG.securityKey}`)
    .digest('hex');

  return calculatedSignature === receivedSignature;
}

// Create PayFast payment data
export function createPayFastPaymentData(params: {
  amount: number;
  itemName: string;
  customerEmail: string;
  customerName: string;
  paymentId: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  subscriptionType?: string;
  frequency?: string;
  cycles?: string;
  customStr1?: string;
  customStr2?: string;
}): PayFastData {
  const [firstName, ...lastNameParts] = params.customerName.split(' ');
  const lastName = lastNameParts.join(' ') || '';

  const paymentData: PayFastData = {
    merchant_id: PAYFAST_CONFIG.merchantId,
    merchant_key: PAYFAST_CONFIG.merchantKey,
    return_url: params.returnUrl,
    cancel_url: params.cancelUrl,
    notify_url: params.notifyUrl,
    name_first: firstName,
    name_last: lastName,
    email_address: params.customerEmail,
    m_payment_id: params.paymentId,
    amount: params.amount,
    item_name: params.itemName,
  };

  // Add subscription parameters if provided
  if (params.subscriptionType) {
    paymentData.subscription_type = params.subscriptionType;
  }
  if (params.frequency) {
    paymentData.frequency = params.frequency;
  }
  if (params.cycles) {
    paymentData.cycles = params.cycles;
  }

  // Add custom parameters
  if (params.customStr1) {
    paymentData.custom_str1 = params.customStr1;
  }
  if (params.customStr2) {
    paymentData.custom_str2 = params.customStr2;
  }

  return paymentData;
}

// Generate PayFast payment URL
export function generatePayFastPaymentUrl(paymentData: PayFastData): string {
  const signature = generatePayFastSignature(paymentData);
  
  // Add signature to payment data
  const dataWithSignature = {
    ...paymentData,
    signature,
  };

  // Create form data string
  const formData = Object.entries(dataWithSignature)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${PAYFAST_CONFIG.baseUrl}/eng/process?${formData}`;
}

// Process PayFast webhook
export function processPayFastWebhook(webhookData: PayFastWebhookData) {
  // Verify signature
  if (!verifyPayFastWebhook(webhookData)) {
    throw new Error('Invalid PayFast webhook signature');
  }

  // Extract payment information
  const paymentInfo = {
    paymentId: webhookData.m_payment_id,
    payfastPaymentId: webhookData.pf_payment_id,
    status: webhookData.payment_status,
    amount: parseFloat(webhookData.amount_gross),
    fee: parseFloat(webhookData.amount_fee),
    netAmount: parseFloat(webhookData.amount_net),
    itemName: webhookData.item_name,
    organizationId: webhookData.custom_str1,
    userId: webhookData.custom_str2,
  };

  return paymentInfo;
}

// PayFast utility functions
export const payfastUtils = {
  // Create subscription payment
  createSubscriptionPayment(params: {
    amount: number;
    productName: string;
    customerEmail: string;
    customerName: string;
    paymentId: string;
    returnUrl: string;
    cancelUrl: string;
    notifyUrl: string;
    organizationId?: string;
    userId?: string;
  }) {
    const paymentData = createPayFastPaymentData({
      ...params,
      itemName: params.productName,
      subscriptionType: '1', // 1 for subscription
      frequency: '3', // 3 for monthly
      cycles: '0', // 0 for indefinite
      customStr1: params.organizationId,
      customStr2: params.userId,
    });

    return {
      paymentData,
      signature: generatePayFastSignature(paymentData),
      paymentUrl: generatePayFastPaymentUrl(paymentData),
    };
  },

  // Create one-time payment
  createOneTimePayment(params: {
    amount: number;
    productName: string;
    customerEmail: string;
    customerName: string;
    paymentId: string;
    returnUrl: string;
    cancelUrl: string;
    notifyUrl: string;
    organizationId?: string;
    userId?: string;
  }) {
    const paymentData = createPayFastPaymentData({
      ...params,
      itemName: params.productName,
      customStr1: params.organizationId,
      customStr2: params.userId,
    });

    return {
      paymentData,
      signature: generatePayFastSignature(paymentData),
      paymentUrl: generatePayFastPaymentUrl(paymentData),
    };
  },

  // Handle payment status
  handlePaymentStatus(status: string) {
    switch (status) {
      case 'COMPLETE':
        return { success: true, status: 'completed' };
      case 'PENDING':
        return { success: false, status: 'pending' };
      case 'FAILED':
        return { success: false, status: 'failed' };
      case 'CANCELLED':
        return { success: false, status: 'cancelled' };
      default:
        return { success: false, status: 'unknown' };
    }
  },

  // Format currency for PayFast
  formatCurrency(amount: number): string {
    return amount.toFixed(2);
  },

  // Validate PayFast configuration
  validateConfig() {
    const requiredFields = ['merchantId', 'merchantKey', 'passphrase'];
    const missingFields = requiredFields.filter(field => !PAYFAST_CONFIG[field as keyof typeof PAYFAST_CONFIG]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required PayFast configuration: ${missingFields.join(', ')}`);
    }

    return true;
  },
};

// Export configuration for use in components
export { PAYFAST_CONFIG }; 