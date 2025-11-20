"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { verifyPaymentClient } from "@/lib/creem/payment";

export default function PaymentSuccessPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      try {
        // 从URL获取支付会话ID - 尝试多种可能的参数名
        const urlParams = new URLSearchParams(window.location.search);
        let sessionId = urlParams.get('session_id') || urlParams.get('payment_id') || urlParams.get('checkout_id');
        
        // 如果仍然没有找到ID，尝试从URL路径中获取
        if (!sessionId && window.location.pathname.includes('/payment/success/')) {
          const pathParts = window.location.pathname.split('/');
          sessionId = pathParts[pathParts.length - 1];
        }
        
        if (!sessionId) {
          console.error('No payment ID found in URL parameters:', window.location.search);
          console.error('Full URL:', window.location.href);
          setError(t('payment.success.noSessionId'));
          setLoading(false);
          return;
        }

        console.log('Found payment ID:', sessionId);

        // 验证支付状态
        const result = await verifyPaymentClient(sessionId);
        
        if (result.success) {
          setPaymentStatus(result.status);
          
          // 如果支付成功，更新用户的会员状态
          if (result.status === 'paid' || result.status === 'completed') {
            try {
              // 从localStorage获取用户信息（在实际应用中，可能从认证系统获取）
              const userInfo = localStorage.getItem('userInfo');
              const userId = userInfo ? JSON.parse(userInfo).id : 'anonymous';
              
              // 获取支付信息（可以从URL参数或localStorage获取）
              const planId = urlParams.get('plan_id') || 'premium';
              const planName = urlParams.get('plan_name') || 'Premium Membership';
              const price = urlParams.get('price') || '88';
              const currency = urlParams.get('currency') || 'USD';
              
              // 调用API更新用户会员状态
              const updateResponse = await fetch('/api/membership/update', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId,
                  paymentId: sessionId,
                  planId,
                  planName,
                  price,
                  currency
                }),
              });
              
              if (updateResponse.ok) {
                const updateResult = await updateResponse.json();
                console.log('Membership updated successfully:', updateResult);
                
                // 更新本地存储中的会员信息
                localStorage.setItem('userMembership', JSON.stringify({
                  hasMembership: true,
                  plan: planName,
                  expiryDate: updateResult.expiryDate
                }));
              } else {
                console.error('Failed to update membership:', await updateResponse.text());
              }
            } catch (updateError) {
              console.error('Error updating membership:', updateError);
            }
          }
        } else {
          setError(t('payment.success.verificationFailed'));
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(t('payment.success.error'));
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentStatus();
  }, [t]);

  const handleGoToMembership = () => {
    router.push('/membership');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl mt-20">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          {loading ? (
            <div className="py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {mounted ? t('payment.success.verifying') : 'Verifying payment status...'}
              </p>
            </div>
          ) : error ? (
            <div className="py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {mounted ? t('payment.success.errorTitle') : 'Payment Failed'}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoToMembership}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                >
                  {mounted ? t('payment.success.backToMembership') : 'Back to Membership'}
                </button>
                <button
                  onClick={handleGoHome}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white font-semibold rounded-lg transition-colors"
                >
                  {mounted ? t('payment.success.backToHome') : 'Back to Home'}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {mounted ? t('payment.success.title') : 'Payment Successful'}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                {mounted ? t('payment.success.message') : 'Your membership has been successfully activated!'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoToMembership}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                >
                  {mounted ? t('payment.success.viewMembership') : 'View Membership'}
                </button>
                <button
                  onClick={handleGoHome}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white font-semibold rounded-lg transition-colors"
                >
                  {mounted ? t('payment.success.backToHome') : 'Back to Home'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}