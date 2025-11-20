"use client";

import { useState, useEffect } from 'react';
import { processPayment } from '@/lib/creem/payment';

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [autoTest, setAutoTest] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');

  // 页面加载后自动执行测试
  useEffect(() => {
    if (autoTest) {
      testPayment();
    }
  }, [autoTest]);

  const testPayment = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('开始测试支付功能...');
      
      let paymentData;
      
      switch (selectedPlan) {
        case 'premium':
          paymentData = {
            planId: 'premium',
            planName: 'Premium Plan',
            price: 88,
            currency: 'USD', // 使用USD货币
            language: 'zh'
          };
          break;
        case 'super':
          paymentData = {
            planId: 'super',
            planName: 'Super Plan',
            price: 288,
            currency: 'USD', // 使用USD货币
            language: 'zh'
          };
          break;
        case 'english-premium':
          paymentData = {
            planId: 'premium',
            planName: 'Premium Membership',
            price: 12,
            currency: 'USD',
            language: 'en'
          };
          break;
        default:
          paymentData = {
            planId: 'premium',
            planName: 'Premium Plan',
            price: 88,
            currency: 'USD',
            language: 'zh'
          };
      }

      console.log('支付数据:', paymentData);
      const paymentResult = await processPayment(paymentData);
      console.log('支付结果:', paymentResult);
      
      setResult(paymentResult);
      
      if (paymentResult.success) {
        console.log('支付成功:', paymentResult);
        // 在实际应用中，这里会重定向到支付页面
        // window.location.href = paymentResult.paymentUrl;
      }
    } catch (err) {
      console.error('支付测试错误:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">测试支付功能</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择测试计划:
          </label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={loading}
          >
            <option value="premium">Premium会员 (88 USD)</option>
            <option value="super">Super会员 (288 USD)</option>
            <option value="english-premium">英文Premium会员 (12 USD)</option>
          </select>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={testPayment}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? '处理中...' : '手动测试支付'}
          </button>
          
          <button
            onClick={() => setAutoTest(true)}
            disabled={loading || autoTest}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            {autoTest ? '自动测试已启动' : '自动测试支付'}
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center text-blue-600">
            正在创建支付会话...
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            错误: {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
            <h3 className="font-semibold">支付结果:</h3>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6 p-3 bg-gray-100 rounded text-sm text-gray-600">
          <p>测试说明:</p>
          <ul className="list-disc list-inside mt-2">
            <li>点击"手动测试支付"按钮进行测试</li>
            <li>点击"自动测试支付"按钮自动执行测试</li>
            <li>测试结果将显示在下方</li>
            <li>请打开浏览器控制台查看详细日志</li>
          </ul>
        </div>
      </div>
    </div>
  );
}