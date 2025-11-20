import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/creem/payment';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing payment_id parameter' },
        { status: 400 }
      );
    }

    // 验证支付状态
    const verificationResult = await verifyPayment(paymentId);

    if (verificationResult.success) {
      return NextResponse.json({
        success: true,
        status: verificationResult.status
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: verificationResult.error || 'Payment verification failed'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}