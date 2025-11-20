import { NextRequest, NextResponse } from 'next/server';
import { createProduct } from '@/lib/creem/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, currency, billing_type } = body;

    // 验证必需参数
    if (!name || !description || !price || !currency || !billing_type) {
      return NextResponse.json(
        { error: '缺少必需参数：name, description, price, currency, billing_type' },
        { status: 400 }
      );
    }

    // 确保价格是整数且大于等于100
    const productPrice = Math.round(price);
    if (productPrice < 100) {
      return NextResponse.json(
        { error: '价格必须大于等于100' },
        { status: 400 }
      );
    }

    // 创建产品
    const result = await createProduct({
      name,
      description,
      price: productPrice,
      currency,
      billing_type,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        productId: result.productId,
        product: result.product,
      });
    } else {
      return NextResponse.json(
        { error: result.error || '创建产品失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('创建产品API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}