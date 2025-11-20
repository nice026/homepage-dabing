"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { processPayment } from "@/lib/creem/payment";
import PaymentFormModal from "./PaymentFormModal";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  requiresPayment?: boolean;
}

export default function MembershipCards() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    planId: string;
    planName: string;
    price: number;
    currency: string;
  } | null>(null);

  const plans: MembershipPlan[] = [
    {
      id: "registered",
      name: t('membership.plans.registered.name'),
      price: 0,
      period: t('membership.plans.registered.period'),
      description: t('membership.plans.registered.description'),
      features: [
        t('membership.plans.registered.features.freeTools'),
        t('membership.plans.registered.features.paidToolsTrial'),
        t('membership.plans.registered.features.freeGroup')
      ],
      buttonText: t('membership.plans.registered.buttonText'),
      requiresPayment: false
    },
    {
      id: "premium",
      name: t('membership.plans.premium.name'),
      price: 88,
      period: t('membership.plans.premium.period'),
      description: t('membership.plans.premium.description'),
      features: [
        t('membership.plans.premium.features.freeTools'),
        t('membership.plans.premium.features.paidToolsDaily'),
        t('membership.plans.premium.features.freeGroup'),
        t('membership.plans.premium.features.paidGroup')
      ],
      buttonText: t('membership.plans.premium.buttonText'),
      popular: true,
      requiresPayment: true
    },
    {
      id: "super",
      name: t('membership.plans.super.name'),
      price: 288,
      period: t('membership.plans.super.period'),
      description: t('membership.plans.super.description'),
      features: [
        t('membership.plans.super.features.freeTools'),
        t('membership.plans.super.features.paidToolsUnlimited'),
        t('membership.plans.super.features.freeGroup'),
        t('membership.plans.super.features.paidGroup'),
        t('membership.plans.super.features.guidance')
      ],
      buttonText: t('membership.plans.super.buttonText'),
      requiresPayment: true
    }
  ];

  const handleSubscribe = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setLoading(planId);

    try {
      if (plan.requiresPayment) {
        // 打开支付模态框，而不是直接处理支付
        setSelectedPlan({
          planId,
          planName: plan.name,
          price: plan.price,
          currency: 'USD', // 统一使用USD货币
        });
        setShowPaymentModal(true);
      } else {
        // 处理免费注册
        // 这里可以添加注册逻辑或重定向到注册页面
        alert(t('membership.register.success'));
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(t('membership.payment.error'));
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                {t('membership.popular')}
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                {plan.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-800 dark:text-white">
                  {plan.price === 0 ? t('membership.free') : `$${plan.price}`}
                </span>
                <span className="text-slate-600 dark:text-slate-300 ml-2">
                  {plan.period}
                </span>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 px-4 rounded-md font-semibold transition-colors duration-300 ${plan.popular ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'} ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? t('membership.loading') : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <PaymentFormModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
            setLoading(null);
          }}
          planId={selectedPlan.planId}
          planName={selectedPlan.planName}
          price={selectedPlan.price}
          currency={selectedPlan.currency}
        />
      )}
    </>
  );
}