"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfileSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="profile" className="py-16 md:py-24 fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative card-hover">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-70"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              {mounted ? (
                <Image
                  src="/profile.jpg"
                  alt="大兵"
                  width={256}
                  height={256}
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700"></div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              大兵
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
              技术负责人 & AI技术专家
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              10年+软件开发经验，专注于大型互联网产品研发与技术。担任公司技术负责人，致力于推动AI与技术融合发展。同时致力于AI技术教学。
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium card-hover">
                技术专家
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium card-hover">
                团队管理
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium card-hover">
                AI技术
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}