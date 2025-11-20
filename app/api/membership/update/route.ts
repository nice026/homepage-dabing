import { NextRequest, NextResponse } from 'next/server';

// 模拟数据库更新 - 在实际应用中，这里应该连接到真实的数据库
const userMemberships: Record<string, { plan: string; expiryDate: Date }> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, paymentId, planId, planName, price, currency } = body;

    // 验证请求数据
    if (!userId || !paymentId || !planId || !planName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 计算会员到期时间 - 根据计划类型设置不同的有效期
    let expiryDate = new Date();
    
    // 根据计划名称设置有效期
    if (planName.toLowerCase().includes('premium')) {
      // Premium会员 - 1个月
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (planName.toLowerCase().includes('super')) {
      // Super会员 - 1年
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      // 默认1个月
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    // 在实际应用中，这里应该更新数据库中的用户会员状态
    // 例如: await db.userMembership.update({ where: { userId }, data: { plan: planName, expiryDate } });
    
    // 模拟数据库更新
    userMemberships[userId] = {
      plan: planName,
      expiryDate
    };

    console.log(`Updated membership for user ${userId}:`, {
      plan: planName,
      expiryDate,
      paymentId
    });

    return NextResponse.json({
      success: true,
      plan: planName,
      expiryDate
    });
  } catch (error) {
    console.error('Error updating membership:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 获取用户会员状态的API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    // 在实际应用中，这里应该从数据库中获取用户会员状态
    // 例如: const membership = await db.userMembership.findUnique({ where: { userId } });
    
    // 模拟数据库查询
    const membership = userMemberships[userId];

    if (!membership) {
      return NextResponse.json({
        success: true,
        hasMembership: false
      });
    }

    // 检查会员是否已过期
    const now = new Date();
    const isExpired = membership.expiryDate < now;

    return NextResponse.json({
      success: true,
      hasMembership: true,
      plan: membership.plan,
      expiryDate: membership.expiryDate,
      isExpired
    });
  } catch (error) {
    console.error('Error getting membership status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}