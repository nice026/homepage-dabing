"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfileSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="profile" className="py-16 md:py-24 fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {t('profile.name')}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6 leading-tight">
            {t('profile.title')}
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {t('profile.description')}
          </p>
          <div className="flex flex-col gap-3 mb-6 max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">{t('profile.pmp')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">{t('profile.promptEngineer')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">{t('profile.aiAgentEngineer')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">{t('profile.aiBreakthroughClub')}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium card-hover">
              {t('profile.tag1')}
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium card-hover">
              {t('profile.tag2')}
            </span>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium card-hover">
              {t('profile.tag3')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}