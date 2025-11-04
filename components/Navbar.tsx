"use client";

import { useState, useEffect } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import GitHubSignInButton from "./GitHubSignInButton";
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
          <div className="flex flex-col">
            <div className="text-xl font-bold text-slate-800 dark:text-white">
              大兵
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              AI创富，与你同行！AI让工作与生活更美好！
            </div>
          </div>
          
          {mounted && (
            <nav className="hidden md:flex space-x-8 mt-4 md:mt-0">
              <button
                onClick={() => scrollToSection("profile")}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                关于我
              </button>
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
                <GoogleSignInButton />
                <GitHubSignInButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}