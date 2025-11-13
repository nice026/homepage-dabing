"use client";

import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* 语言切换按钮 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {language === 'zh' ? 'Switch to English' : '切换到中文'}
        </button>
      </div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <PortfolioSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
