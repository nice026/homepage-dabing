'use client';

import { useState } from 'react';

export default function TestAutoPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // 自动创建产品和支付会话
  const createAutoPayment = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/payment/auto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: 'Premium Membership',
          price: 100, // 整数，大于等于100
          currency: 'USD',
          language: 'en',
          userId: 'test_user_123',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        console.log('自动支付创建成功:', data);
        
        // 如果有支付URL，可以在新窗口中打开
        if (data.paymentUrl) {
          window.open(data.paymentUrl, '_blank');
        }
      } else {
        setError(data.error || '创建自动支付失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Creem自动支付测试</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">自动创建产品和支付会话</h2>
          <p className="text-sm text-gray-600 mb-4">
            点击下面的按钮自动创建产品并生成支付会话。价格为100美元，计费类型为一次性付款。
          </p>
          <button
            onClick={createAutoPayment}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '创建中...' : '创建自动支付'}
          </button>
        </div>

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