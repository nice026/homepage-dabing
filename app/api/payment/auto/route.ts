import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateProduct, createPaymentSession } from '@/lib/creem/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, price, currency, language, userId, allowPriceAdjustment = true } = body;

    // 验证必需参数
    if (!planName || !price || !currency || !language) {
      return NextResponse.json(
        { error: '缺少必需参数：planName, price, currency, language' },
        { status: 400 }
      );
    }

    // 确保价格是整数
    const productPrice = Math.round(price);
    
    // 如果价格小于100且不允许调整，返回错误
    if (productPrice < 100 && !allowPriceAdjustment) {
      return NextResponse.json(
        { error: '价格必须大于或等于100' },
        { status: 400 }
      );
    }
    
    // 如果价格小于100，将其调整为100以满足API要求
    const adjustedPrice = Math.max(productPrice, 100);

    // 创建或获取产品
    const productResult = await getOrCreateProduct({
      name: planName,
      description: `${planName} - ${language === 'zh' ? '会员订阅' : 'Membership Subscription'}`,
      price: adjustedPrice,
      currency,
      billing_type: 'onetime',
    });

    if (!productResult.success) {
      return NextResponse.json(
        { error: productResult.error || '创建产品失败' },
        { status: 500 }
      );
    }

    // 创建支付会话
    const paymentResult = await createPaymentSession({
      planId: productResult.productId!,
      planName,
      price: adjustedPrice,
      currency,
      language,
      userId,
    });

    if (paymentResult.success) {
      return NextResponse.json({
        success: true,
        paymentId: paymentResult.paymentId,
        paymentUrl: paymentResult.paymentUrl,
        productId: productResult.productId,
      });
    } else {
      return NextResponse.json(
        { error: paymentResult.error || '创建支付会话失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('自动支付API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}