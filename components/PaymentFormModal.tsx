"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  price: number;
  currency: string;
}

export default function PaymentFormModal({
  isOpen,
  onClose,
  planId,
  planName,
  price,
  currency
}: PaymentFormModalProps) {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [isTestCard, setIsTestCard] = useState(false);

  // 自动填充测试卡信息
  useEffect(() => {
    if (isOpen && process.env.NODE_ENV === 'development') {
      setCardNumber('4242 4242 4242 4242');
      setCardName('Test User');
      setExpiryDate('12/25');
      setCvv('123');
      setIsTestCard(true);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 验证卡片信息
      if (!validateCardInfo()) {
        setLoading(false);
        return;
      }

      // 使用自动支付API创建产品和支付会话
      const response = await fetch('/api/payment/auto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          price,
          currency,
          language,
          userId: 'user_' + Date.now(), // 生成一个临时用户ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 重定向到支付页面
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || t('membership.payment.error'));
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(t('membership.payment.error'));
    } finally {
      setLoading(false);
    }
  };

  const validateCardInfo = (): boolean => {
    // 简单的卡片验证逻辑
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
    const sanitizedExpiry = expiryDate.replace(/\//g, '');
    
    if (!sanitizedCardNumber || sanitizedCardNumber.length !== 16) {
      setError(t('payment.form.cardNumberError'));
      return false;
    }
    
    if (!cardName.trim()) {
      setError(t('payment.form.cardNameError'));
      return false;
    }
    
    if (!sanitizedExpiry || sanitizedExpiry.length !== 4) {
      setError(t('payment.form.expiryError'));
      return false;
    }
    
    if (!cvv || cvv.length < 3) {
      setError(t('payment.form.cvvError'));
      return false;
    }
    
    return true;
  };

  // 格式化信用卡号（每4位添加空格）
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // 格式化有效期（自动添加/）
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    const month = v.slice(0, 2);
    const year = v.slice(2, 4);
    
    if (year) {
      return `${month}/${year}`;
    } else if (month) {
      return month;
    }
    
    return value;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {t('payment.form.title')}
            </h3>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 账单信息 */}
          <div className="mb-8 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">
              {t('payment.form.billingInfo')}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{t('payment.form.plan')}</span>
                <span className="font-medium text-slate-800 dark:text-white">{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{t('payment.form.price')}</span>
                <span className="font-medium text-slate-800 dark:text-white">
                  {currency === 'CNY' ? '¥' : '$'}{price.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-600 my-2 pt-2 flex justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{t('payment.form.total')}</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {currency === 'CNY' ? '¥' : '$'}{price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {isTestCard && (
            <div className="mb-4 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('payment.form.testMode')} {t('payment.form.testCardHint')}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* 卡片表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('payment.form.cardName')}
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder={t('payment.form.cardNamePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('payment.form.cardNumber')}
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19} // 16 digits + 3 spaces
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('payment.form.expiryDate')}
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('payment.form.cvv')}
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('payment.form.processing')}
                </>
              ) : (
                t('payment.form.submit')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}