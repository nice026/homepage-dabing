import { NextRequest, NextResponse } from 'next/server';
import { createPaymentSession } from '@/lib/creem/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, planName, price, currency, language } = body;

    // 验证请求数据
    if (!planId || !planName || price === undefined || !currency) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    // 创建支付会话
    const paymentResult = await createPaymentSession({
      planId,
      planName,
      price,
      currency,
      language
    });

    if (paymentResult.success) {
      return NextResponse.json({
        success: true,
        paymentId: paymentResult.paymentId,
        paymentUrl: paymentResult.paymentUrl
      });
    } else {
      return NextResponse.json(
        { error: paymentResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}