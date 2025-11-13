"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 直接导入翻译文件
import zhTranslations from '../locales/zh.json';
import zhComponentsTranslations from '../locales/zh-components.json';
import zhAdditionalTranslations from '../locales/zh-components-additional.json';
import enTranslations from '../locales/en.json';
import enComponentsTranslations from '../locales/en-components.json';
import enAdditionalTranslations from '../locales/en-components-additional.json';

// 定义支持的语言类型
export type Language = 'zh' | 'en';

// 定义翻译数据类型
export type TranslationData = {
  [key: string]: string | TranslationData;
};

// 定义上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
  toggleLanguage: () => void;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 合并翻译文件
const mergedZh = { ...zhComponentsTranslations, ...zhAdditionalTranslations, ...zhTranslations };
const mergedEn = { ...enComponentsTranslations, ...enAdditionalTranslations, ...enTranslations };

// 提供者组件
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('zh');
  
  // 从localStorage和URL获取语言设置
  useEffect(() => {
    // 首先尝试从URL参数获取语言设置
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLanguage = urlParams.get('lang') as Language;
      
      // 也检查URL路径，如 /en 或 /zh
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const pathLanguage = pathSegments[0] as Language;
      
      if (urlLanguage && (urlLanguage === 'zh' || urlLanguage === 'en')) {
        setLanguageState(urlLanguage);
        localStorage.setItem('language', urlLanguage);
        return;
      } else if (pathLanguage && (pathLanguage === 'zh' || pathLanguage === 'en')) {
        setLanguageState(pathLanguage);
        localStorage.setItem('language', pathLanguage);
        return;
      }
    }
    
    // 如果URL中没有语言参数，则从localStorage获取
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // 添加全局函数，方便从控制台调用
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).setLanguage = (lang: Language) => {
        setLanguageState(lang);
      };
    }
  }, []);

  // 设置语言并保存到localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // 切换语言
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // 翻译函数
  const t = (key: string, params?: { [key: string]: string | number }): string => {
    const translations = language === 'zh' ? mergedZh : mergedEn;

    // 分割键路径
    const keys = key.split('.');
    let value: any = translations;

    // 遍历键路径获取翻译值
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // 如果找到的值不是字符串，返回键
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // 替换参数
    if (params) {
      return value.replace(/{(\w+)}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}