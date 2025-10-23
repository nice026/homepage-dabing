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
            <p className="text-slate-300 mb-4">
              AI创富，与你同行！AI让工作与生活更美好！
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.483 2.001c-.819 0-1.632.068-2.416.2-3.729.641-6.535 3.335-7.283 6.937-.343 1.634-.251 3.26.23 4.746l-.24 1.604a1.001 1.001 0 0 0 1.138 1.138l1.604-.24c1.486.481 3.112.573 4.746.23 3.602-.748 6.296-3.554 6.937-7.283.132-.784.2-1.597.2-2.416 0-2.336-.841-4.48-2.238-6.144A9.938 9.938 0 0 0 12.483 2.001zm0 2c1.9 0 3.632.687 4.977 1.825A7.938 7.938 0 0 1 19.345 8c0 .658-.056 1.306-.167 1.926-.493 2.862-2.511 4.938-5.236 5.493-1.316.273-2.617.207-3.826-.184a1 1 0 0 0-.704.025l-1.04.156.156-1.04a1 1 0 0 0 .025-.704c-.391-1.209-.457-2.51-.184-3.826.555-2.725 2.631-4.743 5.493-5.236.62-.111 1.268-.167 1.926-.167z"/>
                  <circle cx="8.5" cy="10.5" r="1"/>
                  <circle cx="12" cy="10.5" r="1"/>
                  <circle cx="15.5" cy="10.5" r="1"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="#profile" className="text-slate-300 hover:text-white transition-colors">关于我</a>
              </li>
              <li>
                <a href="#portfolio" className="text-slate-300 hover:text-white transition-colors">我的作品</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">联系方式</a>
              </li>
            </ul>
          </div>
          
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI智能体</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI编程</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">商业化探索</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Node.js</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center fade-in">
          <p className="text-slate-400">
            © {currentYear} 大兵的个人主页. 保留所有权利.
          </p>
          <p className="text-slate-400 mt-2">
            AI创富，与你同行！AI让工作与生活更美好！
          </p>
        </div>
      </div>
    </footer>
  );
}