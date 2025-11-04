"use client";

export default function PortfolioSection() {
  const openToolsLibrary = () => {
    window.open('/tools-library', '_blank');
  };

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            我的工具库
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            精选实用工具，提升工作效率与生活品质
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl card-hover fade-in cursor-pointer"
            onClick={openToolsLibrary}
          >
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">自媒体运营</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              分享自媒体运营相关的工具，助力内容创作与传播
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">内容创作</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">数据分析</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">社交媒体</span>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl card-hover fade-in cursor-pointer"
            onClick={openToolsLibrary}
          >
            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">日常办公</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              分享日常办公所用的工具，提高工作效率
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">文档处理</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">时间管理</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">团队协作</span>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl card-hover fade-in cursor-pointer"
            onClick={openToolsLibrary}
          >
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">好站分享</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              分享其它外部优秀站点，发现更多优质资源
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">学习资源</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">设计灵感</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">技术社区</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center fade-in">
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            更多实用工具持续更新中...
          </p>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium btn-hover"
            onClick={openToolsLibrary}
          >
            查看更多
          </button>
        </div>
      </div>
    </section>
  );
}