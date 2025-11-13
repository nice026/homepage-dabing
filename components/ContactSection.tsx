"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t, language, setLanguage } = useLanguage();
  
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  
  const contactMethods = [
    {
      name: t('contact.wechat.name'),
      icon: "/wechat.png",
      value: language === 'en' ? 'Click to Scan' : '点我扫码',
      qrCode: "/wechat-qr.png",
      title: t('contact.wechat.title')
    },
    {
      name: t('contact.officialAccount.name'),
      icon: "/official-account.png",
      value: language === 'en' ? 'Click to Scan' : '点我扫码',
      qrCode: "/official-account-qr.jpg",
      title: t('contact.officialAccount.title')
    },
    {
      name: t('contact.zsxq.name'),
      icon: "/zsxq.png",
      value: language === 'en' ? 'Click to Scan' : '点我扫码',
      qrCode: "/zsxq-qr.jpg",
      title: t('contact.zsxq.title')
    },
  ];

  console.log('Contact methods:', contactMethods, 'language:', language);

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full max-w-2xl"></div>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          {contactMethods.map((method) => (
            <div
              key={method.name}
              onClick={() => {
                setSelectedQRCode(method.qrCode);
                setSelectedTitle(method.title);
              }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg card-hover fade-in cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                        src={method.icon} 
                        alt={method.name} 
                        width="48"
                        height="48"
                        className="w-12 h-12"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => console.error('Image load error:', e)}
                        onLoad={() => console.log('Image loaded:', method.icon)}
                    />
                  </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{method.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{method.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 二维码显示模态框 */}
        {selectedQRCode && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedQRCode(null);
              setSelectedTitle("");
            }}
          >
            <div 
              className="bg-white dark:bg-slate-800 rounded-lg p-4 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{selectedTitle}</h3>
                <button 
                  onClick={() => {
                    setSelectedQRCode(null);
                    setSelectedTitle("");
                  }}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center">
                  <img 
                    src={selectedQRCode} 
                    alt={t('contact.qrCodeAlt')} 
                    width="300"
                    height="300"
                    className="max-w-full h-auto"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}