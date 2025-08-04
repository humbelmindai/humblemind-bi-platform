import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase';
import { payfastUtils } from '@/lib/payfast';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { 
      amount, 
      productName, 
      customerEmail, 
      customerName, 
      paymentType = 'subscription',
      organizationId,
      userId 
    } = await request.json();

    // Validate required fields
    if (!amount || !productName || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createServerComponentClient();

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate unique payment ID
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const returnUrl = `${baseUrl}/billing?payment=success`;
    const cancelUrl = `${baseUrl}/billing?payment=cancelled`;
    const notifyUrl = `${baseUrl}/api/payfast/webhook`;

    // Create payment based on type
    let paymentResult;
    
    if (paymentType === 'subscription') {
      paymentResult = payfastUtils.createSubscriptionPayment({
        amount: parseFloat(amount),
        productName,
        customerEmail,
        customerName,
        paymentId,
        returnUrl,
        cancelUrl,
        notifyUrl,
        organizationId,
        userId,
      });

      // Create subscription record
      if (organizationId) {
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            organization_id: organizationId,
            product_id: 'bi_professional', // Default product ID
            status: 'incomplete',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (subscriptionError) {
          console.error('Error creating subscription:', subscriptionError);
        }
      }
    } else {
      paymentResult = payfastUtils.createOneTimePayment({
        amount: parseFloat(amount),
        productName,
        customerEmail,
        customerName,
        paymentId,
        returnUrl,
        cancelUrl,
        notifyUrl,
        organizationId,
        userId,
      });
    }

    // Log payment initiation
    if (organizationId && userId) {
      const { error: activityError } = await supabase
        .from('activity_log')
        .insert({
          organization_id: organizationId,
          user_id: userId,
          action: 'payment_initiated',
          resource_type: paymentType,
          resource_id: paymentId,
          metadata: {
            amount: parseFloat(amount),
            product_name: productName,
            payment_type: paymentType,
          },
          created_at: new Date().toISOString(),
        });

      if (activityError) {
        console.error('Error logging activity:', activityError);
      }
    }

    console.log('Payment created successfully:', {
      paymentId,
      amount,
      productName,
      paymentType,
    });

    // Return payment information
    return NextResponse.json({
      success: true,
      paymentId,
      paymentUrl: paymentResult.paymentUrl,
      paymentData: paymentResult.paymentData,
    });

  } catch (error) {
    console.error('Error creating PayFast payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'PayFast payment creation endpoint',
    methods: ['POST']
  });
}