"use client";

import { useState } from "react";

export default function SkillsSection() {
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
      { name: "机器学习", level: 85 },
      { name: "深度学习", level: 80 },
      { name: "自然语言处理", level: 75 },
      { name: "计算机视觉", level: 70 },
    ],
    management: [
      { name: "团队管理", level: 90 },
      { name: "项目管理", level: 85 },
      { name: "技术规划", level: 88 },
      { name: "架构设计", level: 92 },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            我的技能
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            精通现代技术栈，深入研究AI与技术融合，有大型应用架构设计经验，丰富的技术团队管理经验。
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
              {category === "frontend" && "前端开发"}
              {category === "backend" && "后端开发"}
              {category === "ai" && "AI技术"}
              {category === "management" && "管理能力"}
            </button>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 card-hover">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {activeTab === "frontend" && "前端技术栈"}
                {activeTab === "backend" && "后端技术栈"}
                {activeTab === "ai" && "AI相关技能"}
                {activeTab === "management" && "管理能力"}
              </h3>
              {skills[activeTab as keyof typeof skills].slice(0, Math.ceil(skills[activeTab as keyof typeof skills].length / 2)).map((skill) => (
                <div key={skill.name} className="fade-in">
                  <SkillBar name={skill.name} level={skill.level} />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white opacity-0">
                占位
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
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">大型应用架构</h3>
            <p className="text-slate-600 dark:text-slate-300">有丰富的大型互联网产品架构设计经验</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">AI技术融合</h3>
            <p className="text-slate-600 dark:text-slate-300">深入研究D2C、Copilot等前沿技术</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">团队管理</h3>
            <p className="text-slate-600 dark:text-slate-300">善于规划技术方向和推动团队创新</p>
          </div>
        </div>
      </div>
    </section>
  );
}