import { NextRequest, NextResponse } from 'next/server';
import { processPayFastWebhook, verifyPayFastWebhook } from '@/lib/payfast';

// Dynamic import for Supabase to avoid build-time issues
async function getSupabaseClient() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createServerComponentClient } = await import('@/lib/supabase');
      return createServerComponentClient();
    }
    return null;
  } catch (error) {
    console.warn('Supabase client creation failed:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the webhook data
    const webhookData = await request.json();
    
    console.log('PayFast webhook received:', webhookData);

    // Verify webhook signature
    if (!verifyPayFastWebhook(webhookData)) {
      console.error('Invalid PayFast webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Process the webhook
    const paymentInfo = processPayFastWebhook(webhookData);
    
    // Initialize Supabase client (only if environment variables are available)
    const supabase = await getSupabaseClient();
    
    if (!supabase) {
      console.warn('Supabase not available - webhook processing will be limited');
      return NextResponse.json({ success: true, message: 'Webhook received but database not configured' });
    }

    // Update subscription status based on payment status
    if (paymentInfo.status === 'COMPLETE') {
      // Payment successful - update subscription
      if (paymentInfo.organizationId) {
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            payfast_token: paymentInfo.payfastPaymentId,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            updated_at: new Date().toISOString(),
          })
          .eq('organization_id', paymentInfo.organizationId);

        if (subscriptionError) {
          console.error('Error updating subscription:', subscriptionError);
        }
      }

      // Create invoice record
      const { error: invoiceError } = await supabase
        .from('subscription_invoices')
        .insert({
          subscription_id: paymentInfo.paymentId,
          payfast_payment_id: paymentInfo.payfastPaymentId,
          amount: paymentInfo.amount,
          currency: 'ZAR',
          status: 'paid',
          invoice_date: new Date().toISOString(),
          due_date: new Date().toISOString(),
          paid_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });

      if (invoiceError) {
        console.error('Error creating invoice:', invoiceError);
      }

      // Log successful payment activity
      if (paymentInfo.organizationId && paymentInfo.userId) {
        const { error: activityError } = await supabase
          .from('activity_log')
          .insert({
            organization_id: paymentInfo.organizationId,
            user_id: paymentInfo.userId,
            action: 'payment_completed',
            resource_type: 'subscription',
            resource_id: paymentInfo.paymentId,
            metadata: {
              amount: paymentInfo.amount,
              payfast_payment_id: paymentInfo.payfastPaymentId,
              item_name: paymentInfo.itemName,
            },
            created_at: new Date().toISOString(),
          });

        if (activityError) {
          console.error('Error logging activity:', activityError);
        }
      }
    } else if (paymentInfo.status === 'FAILED' || paymentInfo.status === 'CANCELLED') {
      // Payment failed - update subscription status
      if (paymentInfo.organizationId) {
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .update({
            status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('organization_id', paymentInfo.organizationId);

        if (subscriptionError) {
          console.error('Error updating subscription:', subscriptionError);
        }
      }

      // Log failed payment activity
      if (paymentInfo.organizationId && paymentInfo.userId) {
        const { error: activityError } = await supabase
          .from('activity_log')
          .insert({
            organization_id: paymentInfo.organizationId,
            user_id: paymentInfo.userId,
            action: 'payment_failed',
            resource_type: 'subscription',
            resource_id: paymentInfo.paymentId,
            metadata: {
              amount: paymentInfo.amount,
              status: paymentInfo.status,
              item_name: paymentInfo.itemName,
            },
            created_at: new Date().toISOString(),
          });

        if (activityError) {
          console.error('Error logging activity:', activityError);
        }
      }
    }

    console.log('PayFast webhook processed successfully:', paymentInfo);

    // Return success response
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error processing PayFast webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (PayFast verification)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'PayFast webhook endpoint' });
}