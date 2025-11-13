"use client";

import { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('privacyPolicy.title')}
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
              onClick={() => setActiveTab('privacy')}
            >
              {t('privacyPolicy.privacy.title')}
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'terms' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
              onClick={() => setActiveTab('terms')}
            >
              {t('privacyPolicy.terms.title')}
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'privacy' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">{t('privacyPolicy.privacy.title')}</h2>
                <p className="text-slate-600 leading-relaxed">
                  {t('privacyPolicy.lastUpdated', { date: new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US') })}
                </p>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.infoCollection.title')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{t('privacyPolicy.privacy.infoCollection.description')}</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>{t('privacyPolicy.privacy.infoCollection.items.0')}</li>
                    <li>{t('privacyPolicy.privacy.infoCollection.items.1')}</li>
                    <li>{t('privacyPolicy.privacy.infoCollection.items.2')}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.infoUsage.title')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{t('privacyPolicy.privacy.infoUsage.description')}</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>{t('privacyPolicy.privacy.infoUsage.items.0')}</li>
                    <li>{t('privacyPolicy.privacy.infoUsage.items.1')}</li>
                    <li>{t('privacyPolicy.privacy.infoUsage.items.2')}</li>
                    <li>{t('privacyPolicy.privacy.infoUsage.items.3')}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.infoSharing.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.privacy.infoSharing.description')}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>{t('privacyPolicy.privacy.infoSharing.items.0')}</li>
                    <li>{t('privacyPolicy.privacy.infoSharing.items.1')}</li>
                    <li>{t('privacyPolicy.privacy.infoSharing.items.2')}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.dataSecurity.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.privacy.dataSecurity.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.cookiePolicy.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.privacy.cookiePolicy.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.privacy.contactUs.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.privacy.contactUs.description')}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.privacy.contactUs.email')}: <a href="mailto:service@dabingai.top" className="text-blue-600 hover:underline">service@dabingai.top</a>
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">{t('privacyPolicy.terms.title')}</h2>
                <p className="text-slate-600 leading-relaxed">
                  {t('privacyPolicy.lastUpdated', { date: new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US') })}
                </p>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.serviceOverview.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">{t('privacyPolicy.terms.serviceOverview.description')}</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.useLicense.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">{t('privacyPolicy.terms.useLicense.description')}</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.userBehavior.title')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{t('privacyPolicy.terms.userBehavior.description')}</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>{t('privacyPolicy.terms.userBehavior.items.0')}</li>
                    <li>{t('privacyPolicy.terms.userBehavior.items.1')}</li>
                    <li>{t('privacyPolicy.terms.userBehavior.items.2')}</li>
                    <li>{t('privacyPolicy.terms.userBehavior.items.3')}</li>
                    <li>{t('privacyPolicy.terms.userBehavior.items.4')}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.intellectualProperty.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.intellectualProperty.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.disclaimer.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.disclaimer.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.limitationOfLiability.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.limitationOfLiability.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.serviceChanges.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.serviceChanges.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.termsChanges.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.termsChanges.description')}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">{t('privacyPolicy.terms.contactUs.title')}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.contactUs.description')}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t('privacyPolicy.terms.contactUs.email')}: <a href="mailto:service@dabingai.top" className="text-blue-600 hover:underline">service@dabingai.top</a>
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← {t('privacyPolicy.backToHome')}
          </a>
        </div>
      </div>
    </div>
  );
}