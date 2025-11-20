# Creem支付系统开发文档

## 项目概述

本文档记录了Creem支付系统集成的完整开发过程，包括系统设计、实现细节、遇到的问题及解决方案。Creem是一个专为SaaS和独立开发者设计的支付平台，提供简单且透明的支付解决方案。

## 系统架构

### 核心组件

1. **支付配置模块** (`lib/creem/payment.ts`)
   - Creem API配置和认证
   - 支付会话创建
   - 支付状态验证
   - 产品管理

2. **API路由** (`app/api/payment/`)
   - `/api/payment/create` - 创建支付会话
   - `/api/payment/auto` - 自动创建产品和支付会话
   - `/api/payment/verify` - 验证支付状态

3. **会员管理** (`app/api/membership/`)
   - `/api/membership/update` - 更新会员状态
   - 会员状态查询和验证

4. **前端页面** (`app/payment/`)
   - `/payment/success` - 支付成功页面
   - `/payment/cancel` - 支付取消页面

## 开发过程

### 第一阶段：基础集成

#### 1. Creem API配置

首先，我们设置了Creem API的基本配置：

```typescript
export const CREEM_CONFIG = {
  baseURL: 'https://test-api.creem.io/v1',
  apiKey: process.env.CREEM_API_KEY || 'creem_test_4zxCwSzRJXE16NU0GAhBmo',
  successUrl: process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success` 
    : 'http://localhost:3000/payment/success',
  cancelUrl: process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel` 
    : 'http://localhost:3000/payment/cancel',
};
```

#### 2. 支付会话创建

实现了基本的支付会话创建功能，通过调用Creem的`/checkouts`端点：

```typescript
export async function createPaymentSession(paymentData: PaymentRequest): Promise<PaymentResponse> {
  const endpoint = `${CREEM_CONFIG.baseURL}/checkouts`;
  
  const requestBody = {
    product_id: paymentData.planId,
    success_url: createSuccessUrlWithParams(paymentData),
    metadata: {
      planName: paymentData.planName,
      price: paymentData.price,
      currency: paymentData.currency,
      language: paymentData.language,
      userId: paymentData.userId || 'anonymous',
    },
  };
  
  // API调用逻辑...
}
```

### 第二阶段：问题解决与优化

#### 问题1：支付成功后显示支付失败

**问题描述**：用户支付成功后，登录系统仍显示支付失败状态。

**根本原因**：
1. 支付成功页面获取错误参数名
2. 支付验证逻辑未正确处理Creem状态
3. 未更新用户会员状态到数据库

**解决方案**：

1. **多参数名获取支付ID**
   ```typescript
   // 从URL中获取支付ID，尝试多种可能的参数名
   const urlParams = new URLSearchParams(window.location.search);
   let paymentId = urlParams.get('session_id') || 
                  urlParams.get('payment_id') || 
                  urlParams.get('checkout_id');
   
   // 如果URL参数中没有找到，尝试从路径中获取
   if (!paymentId && window.location.pathname.includes('/payment/success/')) {
     const pathParts = window.location.pathname.split('/');
     paymentId = pathParts[pathParts.length - 1];
   }
   ```

2. **Creem状态映射**
   ```typescript
   // 根据Creem API文档，将状态映射为标准状态
   if (status === 'success' || status === 'completed' || status === 'paid') {
     status = 'paid';
   } else if (status === 'pending' || status === 'processing') {
     status = 'pending';
   } else if (status === 'failed' || status === 'cancelled' || status === 'canceled') {
     status = 'failed';
   }
   ```

3. **会员状态更新API**
   ```typescript
   // 创建会员状态更新API
   export async function POST(request: NextRequest) {
     // 获取请求体
     const { userId, paymentId, planId, planName, price, currency } = await request.json();
     
     // 根据计划类型设置有效期
     let expiryDate;
     if (planId === 'premium' || planId === 'premium-en') {
       expiryDate = new Date();
       expiryDate.setMonth(expiryDate.getMonth() + 1); // 1个月
     } else if (planId === 'super') {
       expiryDate = new Date();
       expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1年
     }
     
     // 更新数据库逻辑...
   }
   ```

4. **支付成功URL携带计划信息**
   ```typescript
   export function createSuccessUrlWithParams(paymentData: PaymentRequest): string {
     const baseUrl = CREEM_CONFIG.successUrl;
     const params = new URLSearchParams({
       plan_id: paymentData.planId,
       plan_name: paymentData.planName,
       price: paymentData.price.toString(),
       currency: paymentData.currency,
     });
     
     return `${baseUrl}?${params.toString()}`;
   }
   ```

#### 问题2：测试环境支付页面显示固定金额

**问题描述**：Creem测试环境的支付页面默认显示1美元且无法修改。

**解决方案**：
1. 确认这是Creem测试环境的正常行为
2. 在代码中添加价格调整逻辑，确保满足API最低价格要求
3. 通过元数据传递实际价格信息，在支付成功后使用正确价格更新会员状态

```typescript
// 如果价格小于100，将其调整为100以满足API要求
const adjustedPrice = Math.max(productPrice, 100);
```

#### 问题3：产品创建和支付流程集成

**问题描述**：需要先创建产品，然后才能创建支付会话，流程复杂。

**解决方案**：实现自动产品创建和支付会话创建的集成流程：

```typescript
// 创建或获取产品
export async function getOrCreateProduct(productData: ProductRequest): Promise<ProductResponse> {
  // 首先尝试直接创建产品
  const result = await createProduct(productData);
  
  if (result.success) {
    return result;
  }
  
  // 如果创建失败，可能是因为产品名称已存在，尝试添加时间戳重试
  const timestamp = Date.now();
  const uniqueName = `${productData.name}_${timestamp}`;
  
  const retryResult = await createProduct({
    ...productData,
    name: uniqueName,
  });
  
  return retryResult;
}
```

### 第三阶段：测试与验证

#### 测试用例设计

我们设计了全面的测试用例，覆盖不同会员计划：

```javascript
const testCases = [
  {
    name: 'Premium Membership',
    planId: 'premium',
    planName: 'Premium Membership',
    price: 88,
    currency: 'USD',
    language: 'zh'
  },
  {
    name: 'Super Membership',
    planId: 'super',
    planName: 'Super Membership',
    price: 288,
    currency: 'USD',
    language: 'zh'
  },
  {
    name: 'English Premium Membership',
    planId: 'premium-en',
    planName: 'Premium Membership',
    price: 12,
    currency: 'USD',
    language: 'en'
  }
];
```

#### 测试流程

1. 创建支付会话
2. 验证支付状态
3. 测试会员状态更新API
4. 验证会员状态查询API

#### 测试结果

所有测试用例均通过，支付流程正常工作，会员状态能够正确更新和查询。

## 技术细节

### API认证

Creem API使用`x-api-key`头部进行认证：

```typescript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': CREEM_CONFIG.apiKey,
  },
  body: JSON.stringify(requestBody),
});
```

### 错误处理

实现了全面的错误处理机制：

```typescript
try {
  // API调用
} catch (error) {
  console.error('API调用失败:', error);
  return {
    success: false,
    error: `网络错误: ${error instanceof Error ? error.message : '未知错误'}`,
  };
}
```

### 状态管理

使用标准化的支付状态管理：

- `paid` - 支付成功
- `pending` - 支付处理中
- `failed` - 支付失败

## 部署注意事项

1. **环境变量配置**
   - `CREEM_API_KEY` - Creem API密钥
   - `NEXT_PUBLIC_SITE_URL` - 网站基础URL

2. **生产环境配置**
   - 使用生产环境的API端点
   - 配置正确的重定向URL
   - 设置Webhook端点（如需要）

3. **安全考虑**
   - API密钥安全存储
   - 支付验证在服务器端进行
   - 防止重复支付处理

## 未来优化方向

1. **Webhook集成**
   - 实现Creem Webhook接收
   - 自动处理支付状态更新
   - 提高系统可靠性

2. **订阅管理**
   - 支持定期订阅
   - 自动续费处理
   - 订阅取消和暂停

3. **数据分析**
   - 支付数据统计
   - 用户行为分析
   - 收入报告

## 总结

Creem支付系统的集成虽然遇到了一些挑战，但通过系统性的问题分析和解决方案实施，最终成功实现了完整的支付流程。关键成功因素包括：

1. **全面的问题分析**：深入理解问题的根本原因
2. **系统化的解决方案**：针对每个问题设计具体的解决方案
3. **全面的测试**：设计覆盖各种场景的测试用例
4. **详细的文档记录**：记录开发过程和解决方案，便于后续维护

通过这次开发，我们不仅成功集成了Creem支付系统，还积累了宝贵的支付系统集成经验，为未来的功能扩展奠定了坚实基础。