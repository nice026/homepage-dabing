"use client";

import { useState, useEffect } from "react";

export default function ProfileSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="profile" className="py-16 md:py-24 fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            大兵
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6 leading-tight">
            AI智能体与AI编程专家
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            大兵，15年+软件开发经验，现专注于AI智能体与AI编程开发与商业化探索。
          </p>
          <div className="flex flex-col gap-3 mb-6 max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">PMP项目管理师</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">工信部AI提示词工程师</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">工信部AI智能体工程师</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">AI破局俱乐部行动家</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium card-hover">
              AI智能体
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium card-hover">
              AI编程
            </span>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium card-hover">
              商业化探索
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}