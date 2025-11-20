import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Creem Webhook密钥
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOKS_SECRET;

// Webhook事件类型
interface WebhookEvent {
  id: string;
  type: string;
  data: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    metadata?: {
      planId: string;
      userId: string;
      language: string;
    };
    created_at: number;
  };
}

// 验证Webhook签名
function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!CREEM_WEBHOOK_SECRET) {
    console.error('CREEM_WEBHOOK_SECRET is not configured');
    return false;
  }

  try {
    // Creem可能使用不同的签名方式，这里假设是HMAC-SHA256
    const expectedSignature = crypto
      .createHmac('sha256', CREEM_WEBHOOK_SECRET)
      .update(payload, 'utf8')
      .digest('hex');

    // 安全比较签名
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

// 处理支付成功事件
async function handlePaymentSucceeded(event: WebhookEvent) {
  const { data } = event;
  const { planId, userId, language } = data.metadata || {};

  console.log(`Payment succeeded for plan ${planId}, user ${userId}`);

  // 在这里添加业务逻辑：
  // 1. 更新数据库中的用户会员状态
  // 2. 发送确认邮件
  // 3. 记录支付日志
  // 4. 其他必要的业务处理

  // 示例：更新用户会员状态（需要根据实际数据库实现）
  // await updateUserMembership(userId, planId, new Date(data.created_at * 1000));

  return { success: true };
}

// 处理支付失败事件
async function handlePaymentFailed(event: WebhookEvent) {
  const { data } = event;
  const { planId, userId } = data.metadata || {};

  console.log(`Payment failed for plan ${planId}, user ${userId}`);

  // 在这里添加业务逻辑：
  // 1. 记录支付失败日志
  // 2. 可能需要通知用户支付失败

  return { success: true };
}

// 主Webhook处理函数
export async function POST(request: NextRequest) {
  try {
    // 获取请求体
    const payload = await request.text();
    
    // 获取Creem签名头（具体名称可能需要根据Creem文档调整）
    const signature = request.headers.get('creem-signature') || 
                     request.headers.get('x-creem-signature') || '';

    // 验证Webhook签名
    if (!verifyWebhookSignature(payload, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 解析Webhook事件
    const event: WebhookEvent = JSON.parse(payload);
    console.log(`Received webhook event: ${event.type}`);

    // 根据事件类型处理
    let result;
    switch (event.type) {
      case 'payment.succeeded':
        result = await handlePaymentSucceeded(event);
        break;
      case 'payment.failed':
        result = await handlePaymentFailed(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        result = { success: true };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 用于测试Webhook配置的GET端点
export async function GET() {
  return NextResponse.json({
    message: 'Creem webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}