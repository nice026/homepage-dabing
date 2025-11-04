"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// 暂时屏蔽OAuth登录组件导入
// import GoogleSignInButton from "./GoogleSignInButton";
// import GitHubSignInButton from "./GitHubSignInButton";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-lg">
              {mounted ? (
                <Image
                  src="/profile.jpg"
                  alt="大兵"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700"></div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold text-slate-800 dark:text-white">
                大兵  <span className="text-sm font-normal text-slate-600 dark:text-slate-300">AI 智效开发专家</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap gap-x-2 gap-y-1 mt-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  PMP项目管理工程师
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  工信部AI提示词工程师
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  工信部AI智能体工程师
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  AI破局俱乐部行动家
                </span>
              </div>
            </div>
          </div>
          
          {mounted && (
            <nav className="hidden md:flex space-x-8 mt-4 md:mt-0">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                作品
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                联系方式
              </button>
            </nav>
          )}
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {mounted && (
              <>
                <UserProfile />
                {/* 暂时屏蔽OAuth登录按钮
                <GoogleSignInButton />
                <GitHubSignInButton />
                */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}