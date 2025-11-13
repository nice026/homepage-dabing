"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SkillsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("frontend");
  
  const skills = {
    frontend: [
      { name: "React", level: 95 },
      { name: "Vue", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "Java", level: 75 },
      { name: "Go", level: 70 },
    ],
    ai: [
      { name: t('skills.ai.machineLearning'), level: 85 },
      { name: t('skills.ai.deepLearning'), level: 80 },
      { name: t('skills.ai.nlp'), level: 75 },
      { name: t('skills.ai.computerVision'), level: 70 },
    ],
    management: [
      { name: t('skills.management.teamManagement'), level: 90 },
      { name: t('skills.management.projectManagement'), level: 85 },
      { name: t('skills.management.techPlanning'), level: 88 },
      { name: t('skills.management.architectureDesign'), level: 92 },
    ],
  };

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-slate-600 dark:text-slate-400">{level}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {t('skills.title')}
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('skills.description')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeTab === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {category === "frontend" && t('skills.tabs.frontend')}
              {category === "backend" && t('skills.tabs.backend')}
              {category === "ai" && t('skills.tabs.ai')}
              {category === "management" && t('skills.tabs.management')}
            </button>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 card-hover">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {activeTab === "frontend" && t('skills.headings.frontend')}
                {activeTab === "backend" && t('skills.headings.backend')}
                {activeTab === "ai" && t('skills.headings.ai')}
                {activeTab === "management" && t('skills.headings.management')}
              </h3>
              {skills[activeTab as keyof typeof skills].slice(0, Math.ceil(skills[activeTab as keyof typeof skills].length / 2)).map((skill) => (
                <div key={skill.name} className="fade-in">
                  <SkillBar name={skill.name} level={skill.level} />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white opacity-0">
                {t('skills.placeholder')}
              </h3>
              {skills[activeTab as keyof typeof skills].slice(Math.ceil(skills[activeTab as keyof typeof skills].length / 2)).map((skill) => (
                <div key={skill.name} className="fade-in">
                  <SkillBar name={skill.name} level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{t('skills.highlights.architecture.title')}</h3>
            <p className="text-slate-600 dark:text-slate-300">{t('skills.highlights.architecture.description')}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{t('skills.highlights.ai.title')}</h3>
            <p className="text-slate-600 dark:text-slate-300">{t('skills.highlights.ai.description')}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{t('skills.highlights.team.title')}</h3>
            <p className="text-slate-600 dark:text-slate-300">{t('skills.highlights.team.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}