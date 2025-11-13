"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      title={language === 'zh' ? t('languageToggle.switchToEn') : t('languageToggle.switchToZh')}
      aria-label={language === 'zh' ? t('languageToggle.switchToEn') : t('languageToggle.switchToZh')}
    >
      <span className="text-sm font-medium">
        {language === 'zh' ? 'EN' : '中'}
      </span>
    </button>
  );
}