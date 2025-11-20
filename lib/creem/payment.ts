// Creem支付系统配置
export const CREEM_CONFIG = {
  // API基础URL - 使用测试环境
  baseURL: 'https://test-api.creem.io/v1', // 基于nuxt-creem源代码的正确URL
  // 从环境变量中获取API密钥
  apiKey: process.env.CREEM_API_KEY || 'creem_test_4zxCwSzRJXE16NU0GAhBmo', // 使用无前缀的测试API密钥
  // 支付成功后的重定向URL
  successUrl: process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success` 
    : 'http://localhost:3000/payment/success',
  // 支付取消后的重定向URL
  cancelUrl: process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel` 
    : 'http://localhost:3000/payment/cancel',
};

// 创建带有计划信息的成功URL
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

// 支付请求参数接口
export interface PaymentRequest {
  planId: string;
  planName: string;
  price: number;
  currency: string;
  language: string;
  customerEmail?: string;
  userId?: string;
}

// 产品请求参数接口
export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_type: 'onetime' | 'recurring' | 'subscription' | 'monthly' | 'yearly';
}

// 产品响应接口
export interface ProductResponse {
  success: boolean;
  productId?: string;
  product?: any;
  error?: string;
}

// 支付响应接口
export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  error?: string;
}

// 创建产品
export async function createProduct(productData: ProductRequest): Promise<ProductResponse> {
  try {
    console.log('Creating product with data:', productData);
    
    const endpoint = `${CREEM_CONFIG.baseURL}/products`;
    
    const requestBody = {
      name: productData.name,
      description: productData.description,
      price: productData.price, // 价格必须是整数，且大于等于100
      currency: productData.currency,
      billing_type: productData.billing_type,
    };
    
    try {
      console.log(`Trying endpoint: ${endpoint} with request body:`, requestBody);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CREEM_CONFIG.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`Response status for ${endpoint}:`, response.status);
      
      if (response.ok) {
        const productResult = await response.json();
        console.log('Product created successfully:', productResult);
        
        const productId = productResult.id || productResult.product_id;
        
        return {
          success: true,
          productId,
          product: productResult,
        };
      } else {
        const errorText = await response.text();
        console.error(`Error response from ${endpoint}:`, errorText);
        
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${errorText}`,
        };
      }
    } catch (error) {
      console.error(`Error with ${endpoint}:`, error);
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  } catch (error) {
    console.error('Unexpected error creating product:', error);
    return {
      success: false,
      error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// 创建或获取产品
export async function getOrCreateProduct(productData: ProductRequest): Promise<ProductResponse> {
  try {
    // 首先尝试直接创建产品
    const result = await createProduct(productData);
    
    if (result.success) {
      return result;
    }
    
    // 如果创建失败，可能是因为产品名称已存在，尝试添加时间戳重试
    console.log('产品创建可能失败，尝试添加时间戳重试');
    
    // 添加时间戳创建唯一的产品名称
    const timestamp = Date.now();
    const uniqueName = `${productData.name}_${timestamp}`;
    
    const retryResult = await createProduct({
      ...productData,
      name: uniqueName,
    });
    
    if (retryResult.success) {
      return retryResult;
    }
    
    // 如果仍然失败，返回错误
    console.error('产品创建失败，尝试了多种方法');
    return {
      success: false,
      error: 'Failed to create product after multiple attempts',
    };
  } catch (error) {
    console.error('获取或创建产品失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// 创建支付会话（自动创建产品）
export async function createPaymentSession(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    console.log('Creating payment session with data:', paymentData);
    console.log('Using API key:', CREEM_CONFIG.apiKey ? 'Configured' : 'Not configured');
    console.log('API key starts with:', CREEM_CONFIG.apiKey?.substring(0, 10));
    
    // 使用基于nuxt-creem源代码的正确端点
    const endpoint = `${CREEM_CONFIG.baseURL}/checkouts`;
    
    // 使用基于nuxt-creem源代码的请求格式
    const requestBody = {
      // 根据nuxt-creem源代码，使用product_id而不是planId
      product_id: paymentData.planId,
      // 添加带有计划信息的成功URL
      success_url: createSuccessUrlWithParams(paymentData),
      // 添加元数据
      metadata: {
        planName: paymentData.planName,
        price: paymentData.price,
        currency: paymentData.currency,
        language: paymentData.language,
        userId: paymentData.userId || 'anonymous',
      },
    };
    
    try {
      console.log(`Trying endpoint: ${endpoint} with request body:`, requestBody);
      
      // 使用基于nuxt-creem源代码的正确认证方式
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // nuxt-creem使用x-api-key头而不是Authorization
          'x-api-key': CREEM_CONFIG.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`Response status for ${endpoint}:`, response.status);
      
      if (response.ok) {
        const sessionData = await response.json();
        console.log('Payment session created successfully:', sessionData);
        
        // 尝试从不同的可能字段名中获取支付ID和URL
        const paymentId = sessionData.id || sessionData.checkout_id || sessionData.session_id;
        const paymentUrl = sessionData.url || sessionData.checkout_url || sessionData.session_url;
        
        return {
          success: true,
          paymentId,
          paymentUrl,
        };
      } else {
        const errorText = await response.text();
        console.error(`Error response from ${endpoint}:`, errorText);
        
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${errorText}`,
        };
      }
    } catch (error) {
      console.error(`Error with ${endpoint}:`, error);
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  } catch (error) {
    console.error('Unexpected error creating payment session:', error);
    return {
      success: false,
      error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// 验证支付状态
export async function verifyPayment(paymentId: string): Promise<{ success: boolean; status: string; error?: string }> {
  try {
    console.log('Verifying payment with ID:', paymentId);
    
    // 使用基于nuxt-creem源代码的正确端点
    const endpoint = `${CREEM_CONFIG.baseURL}/transactions/search?checkoutId=${paymentId}`;
    
    try {
      console.log(`Trying verification endpoint: ${endpoint}`);
      
      // 使用基于nuxt-creem源代码的正确认证方式
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // nuxt-creem使用x-api-key头而不是Authorization
          'x-api-key': CREEM_CONFIG.apiKey,
        },
      });

      console.log(`Verification response status for ${endpoint}:`, response.status);
      
      if (response.ok) {
        const sessionData = await response.json();
        console.log('Payment verification successful:', sessionData);
        
        // 尝试从不同的可能字段名中获取支付状态
        let status = 'unknown';
        
        if (sessionData.transactions && sessionData.transactions.length > 0) {
          const transaction = sessionData.transactions[0];
          status = transaction.status || transaction.state || 'unknown';
          
          // 根据Creem API文档，将状态映射为标准状态
          if (status === 'success' || status === 'completed' || status === 'paid') {
            status = 'paid';
          } else if (status === 'pending' || status === 'processing') {
            status = 'pending';
          } else if (status === 'failed' || status === 'cancelled' || status === 'canceled') {
            status = 'failed';
          }
        } else if (sessionData.status) {
          status = sessionData.status;
          
          // 同样进行状态映射
          if (status === 'success' || status === 'completed' || status === 'paid') {
            status = 'paid';
          } else if (status === 'pending' || status === 'processing') {
            status = 'pending';
          } else if (status === 'failed' || status === 'cancelled' || status === 'canceled') {
            status = 'failed';
          }
        }
        
        console.log('Final payment status:', status);
        
        return {
          success: true,
          status: status.toLowerCase(),
        };
      } else {
        const errorText = await response.text();
        console.error(`Error response from ${endpoint}:`, errorText);
        
        return { 
          success: false, 
          status: 'failed',
          error: `API request failed with status ${response.status}: ${errorText}`
        };
      }
    } catch (error) {
      console.error(`Error with ${endpoint}:`, error);
      return { 
        success: false, 
        status: 'failed',
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return { 
      success: false, 
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// 客户端使用的验证支付函数，通过API路由验证
export async function verifyPaymentClient(paymentId: string): Promise<{ success: boolean; status: string; error?: string }> {
  try {
    console.log('Client verifying payment with ID:', paymentId);
    
    // 通过API路由验证支付，避免在客户端直接调用外部API
    const response = await fetch(`/api/payment/verify?payment_id=${paymentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        status: 'failed',
        error: errorData.error || `Payment verification failed: ${response.status}`,
      };
    }

    const result = await response.json();
    return {
      success: result.success,
      status: result.status,
    };
  } catch (error) {
    console.error('Client payment verification error:', error);
    return {
      success: false,
      status: 'failed',
      error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// 处理支付流程的主函数
export async function processPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    console.log('Processing payment with data:', paymentData);
    
    // 通过我们自己的API路由处理支付，避免在客户端直接调用外部API
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `Payment processing failed: ${response.status}`,
      };
    }

    const result = await response.json();
    return {
      success: true,
      paymentId: result.paymentId,
      paymentUrl: result.paymentUrl,
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}