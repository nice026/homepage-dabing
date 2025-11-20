'use client';

import { useState } from 'react';

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [productId, setProductId] = useState<string | null>(null);

  // 创建产品
  const createProduct = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Product',
          description: 'A test product for testing purposes',
          price: 100, // 整数，大于等于100
          currency: 'USD',
          billing_type: 'onetime',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setProductId(data.productId);
        console.log('产品创建成功:', data);
      } else {
        setError(data.error || '创建产品失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 创建支付会话
  const createPayment = async () => {
    if (!productId) {
      setError('请先创建产品');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: productId,
          planName: 'Test Plan',
          price: 100,
          currency: 'USD',
          language: 'en',
          userId: 'test_user_123',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        console.log('支付会话创建成功:', data);
        
        // 如果有支付URL，可以在新窗口中打开
        if (data.paymentUrl) {
          window.open(data.paymentUrl, '_blank');
        }
      } else {
        setError(data.error || '创建支付会话失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Creem支付测试</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">步骤1: 创建产品</h2>
          <p className="text-sm text-gray-600 mb-4">
            创建一个测试产品，价格为100美元，计费类型为一次性付款。
          </p>
          <button
            onClick={createProduct}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '创建中...' : '创建产品'}
          </button>
        </div>

        {productId && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">步骤2: 创建支付会话</h2>
            <p className="text-sm text-gray-600 mb-4">
              使用创建的产品创建一个支付会话。
            </p>
            <button
              onClick={createPayment}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? '创建中...' : '创建支付会话'}
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>错误:</strong> {error}
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>结果:</strong>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}