"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ToolsLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("media");

  const tools = {
    media: [
      { id: 1, name: "内容创作助手", description: "AI驱动的内容创作工具，帮助快速生成高质量文案", tags: ["AI", "文案", "创作"] },
      { id: 2, name: "数据分析平台", description: "全面的自媒体数据分析，洞察用户行为与内容表现", tags: ["数据", "分析", "洞察"] },
      { id: 3, name: "社交媒体管理", description: "一站式管理多个社交平台，提高运营效率", tags: ["社交", "管理", "效率"] },
      { id: 4, name: "视频编辑工具", description: "简单易用的视频编辑软件，快速制作专业视频", tags: ["视频", "编辑", "制作"] },
    ],
    office: [
      { id: 5, name: "文档协作平台", description: "实时协作的文档编辑工具，提高团队工作效率", tags: ["文档", "协作", "团队"] },
      { id: 6, name: "时间管理助手", description: "智能时间规划与任务管理，提升个人生产力", tags: ["时间", "任务", "效率"] },
      { id: 7, name: "会议记录工具", description: "AI驱动的会议记录与总结，不错过重要信息", tags: ["会议", "记录", "AI"] },
      { id: 8, name: "项目管理软件", description: "全流程项目管理，从规划到交付一站式解决方案", tags: ["项目", "管理", "流程"] },
    ],
    sites: [
      { id: 9, name: "技术学习平台", description: "优质的技术学习资源，提升编程技能", tags: ["学习", "技术", "编程"] },
      { id: 10, name: "设计灵感网站", description: "汇集全球优秀设计案例，激发创意灵感", tags: ["设计", "灵感", "创意"] },
      { id: 11, name: "开源社区", description: "活跃的开源项目社区，参与贡献与学习", tags: ["开源", "社区", "贡献"] },
      { id: 12, name: "行业资讯站点", description: "最新行业动态与趋势分析，把握发展方向", tags: ["资讯", "趋势", "分析"] },
    ]
  };

  const categories = [
    { id: "media", name: "自媒体运营", color: "blue", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
    { id: "office", name: "日常办公", color: "purple", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "sites", name: "好站分享", color: "green", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            大兵的工具库
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            精选实用工具，提升工作效率与生活品质
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧分类导航 */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">工具分类</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? `bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-800 dark:text-${category.color}-300`
                        : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                      </svg>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 右侧工具列表 */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools[activeCategory as keyof typeof tools].map((tool) => (
                <div key={tool.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 card-hover">
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{tool.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    查看详情
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}