"use client";

import { useState } from "react";

export default function ContactSection() {
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  
  const contactMethods = [
    {
      name: "微信",
      icon: <img src="/微信.png" alt="微信" className="w-12 h-12" />,
      value: "点我扫码",
      qrCode: "/微信二维码.png",
      title: "加好友进交流群"
    },
    {
      name: "公众号",
      icon: <img src="/公众号.png" alt="公众号" className="w-12 h-12" />,
      value: "点我扫码",
      qrCode: "/公众号二维码.jpg",
      title: "AI开发请关注我"
    },
    {
      name: "知识星球",
      icon: <img src="/知识星球.png" alt="知识星球" className="w-12 h-12" />,
      value: "点我扫码",
      qrCode: "/知识星球二维码.jpg",
      title: "更多干货扫码免费获取"
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full max-w-2xl"></div>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            欢迎与我交流技术、分享经验、探讨合作
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {method.icon}
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
                  alt="二维码" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}