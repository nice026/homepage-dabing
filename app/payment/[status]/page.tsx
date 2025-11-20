'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PaymentResultPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'unknown'>('loading');
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    // 从URL参数中获取支付状态
    const paymentStatus = searchParams.get('status');
    const sessionId = searchParams.get('session_id') || searchParams.get('payment_id');
    
    setPaymentId(sessionId);
    
    if (paymentStatus === 'success') {
      setStatus('success');
    } else if (paymentStatus === 'failed' || paymentStatus === 'cancel') {
      setStatus('failed');
    } else {
      setStatus('unknown');
    }
  }, [searchParams]);

  const handleReturnToMembership = () => {
    router.push('/membership');
  };

  const handleReturnToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {status === 'loading' && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <h1 className="text-2xl font-bold mb-4">{t('payment.processing')}</h1>
              <p className="text-gray-600">{t('payment.pleaseWait')}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center bg-green-50 p-8 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-4">{t('payment.success')}</h1>
              <p className="text-green-700 mb-6">{t('payment.successMessage')}</p>
              {paymentId && (
                <p className="text-sm text-gray-600 mb-6">
                  {t('payment.transactionId')}: {paymentId}
                </p>
              )}
              <div className="space-x-4">
                <button
                  onClick={handleReturnToMembership}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('payment.viewMembership')}
                </button>
                <button
                  onClick={handleReturnToHome}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  {t('payment.returnHome')}
                </button>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="text-center bg-red-50 p-8 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-red-800 mb-4">{t('payment.failed')}</h1>
              <p className="text-red-700 mb-6">{t('payment.failedMessage')}</p>
              <div className="space-x-4">
                <button
                  onClick={handleReturnToMembership}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('payment.tryAgain')}
                </button>
                <button
                  onClick={handleReturnToHome}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  {t('payment.returnHome')}
                </button>
              </div>
            </div>
          )}

          {status === 'unknown' && (
            <div className="text-center bg-yellow-50 p-8 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-yellow-800 mb-4">{t('payment.unknown')}</h1>
              <p className="text-yellow-700 mb-6">{t('payment.unknownMessage')}</p>
              <div className="space-x-4">
                <button
                  onClick={handleReturnToMembership}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('payment.viewMembership')}
                </button>
                <button
                  onClick={handleReturnToHome}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  {t('payment.returnHome')}
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