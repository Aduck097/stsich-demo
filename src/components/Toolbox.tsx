import { motion } from "motion/react";
import { Terminal, PenTool, BarChart3, Sparkles } from "lucide-react";

const tools = [
  {
    title: "工程化开发",
    description: "熟悉 TypeScript、React、Vite 与组件化开发，重视结构清晰和可维护性。",
    icon: Terminal,
  },
  {
    title: "界面实现",
    description: "把设计稿快速转成高还原、高性能的 Web 界面，并兼顾移动端体验。",
    icon: PenTool,
  },
  {
    title: "数据与业务逻辑",
    description: "处理接口联调、状态管理、数据展示和复杂业务流，让功能真正可用。",
    icon: BarChart3,
  },
  {
    title: "AI 能力接入",
    description: "尝试把大模型能力接入产品流程，提升效率、内容生成和交互体验。",
    icon: Sparkles,
  },
];

export default function Toolbox() {
  return (
    <section id="toolbox" className="bg-surface-container-low py-32 rounded-[3rem] mx-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            技术能力
          </h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface">技术栈</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow group hover:bg-primary transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                <tool.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-on-surface group-hover:text-white mb-2 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-on-surface-variant group-hover:text-white/80 leading-relaxed transition-colors">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
