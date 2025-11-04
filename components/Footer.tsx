"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              大兵AI开发
            </h3>
            <p className="text-slate-300 mb-4">
              15年+软件开发经验，专注于AI智能体与AI编程开发与商业化探索。
            </p>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="#portfolio" className="text-slate-300 hover:text-white transition-colors">我的作品</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">联系方式</a>
              </li>
            </ul>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">专业标签</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI智能体</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI编程</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI提示词</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">副业探索</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Web出海</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center fade-in">
          <p className="text-slate-400">
            © {currentYear} 大兵的个人主页. 保留所有权利.
          </p>
          <p className="text-slate-400 mt-2">
            AI智富，你我同行！AI让工作与生活更美好！
          </p>
        </div>
      </div>
    </footer>
  );
}