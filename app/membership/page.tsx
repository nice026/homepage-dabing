"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import MembershipCards from "@/components/MembershipCards";

export default function MembershipPage() {
  const { language, t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            {t('membership.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('membership.description')}
          </p>
        </div>
        
        <MembershipCards />
        
        <div className="mt-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            {t('membership.faq.title')}
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {t('membership.faq.q1')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('membership.faq.a1')}
              </p>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {t('membership.faq.q2')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('membership.faq.a2')}
              </p>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {t('membership.faq.q3')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('membership.faq.a3')}
              </p>
            </div>
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {t('membership.faq.q4')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('membership.faq.a4')}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}