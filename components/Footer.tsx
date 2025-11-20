"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('footer.title')}
            </h3>
            <p className="text-slate-300 mb-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#portfolio" className="text-slate-300 hover:text-white transition-colors">{t('footer.portfolio')}</a>
              </li>
              <li>
                <a href="/membership" className="text-slate-300 hover:text-white transition-colors">{t('footer.membership')}</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">{t('footer.contact')}</a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">{t('footer.privacy')}</a>
              </li>
            </ul>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">{t('footer.tags')}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">{t('footer.aiAgent')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">{t('footer.aiProgramming')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">{t('footer.aiPrompt')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">{t('footer.sideBusiness')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">{t('footer.webOverseas')}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center fade-in">
          <p className="text-slate-400">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-slate-400 mt-2">
            {t('footer.slogan')}
          </p>
          <p className="text-slate-400 mt-2">
            {t('footer.serviceEmail')}: <a href="mailto:service@dabingai.top" className="text-blue-400 hover:text-blue-300 transition-colors">service@dabingai.top</a>
          </p>
        </div>
      </div>
    </footer>
  );
}