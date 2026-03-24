import { motion } from "motion/react";
import { Terminal, Wrench, ScanSearch, Sparkles } from "lucide-react";

const tools = [
  {
    title: "代码片段",
    description: "放常用脚本、命令模板和开发过程中经常重复使用的代码片段。",
    icon: Terminal,
  },
  {
    title: "效率工具",
    description: "后续会放一些顺手的小功能，比如文本处理、格式转换和批量操作。",
    icon: Wrench,
  },
  {
    title: "调试辅助",
    description: "预留给接口调试、参数检查、日志分析这类开发时真正有用的工具。",
    icon: ScanSearch,
  },
  {
    title: "AI 小工具",
    description: "以后会接入一些 AI 能力，用来做生成、改写、总结和开发辅助。",
    icon: Sparkles,
  },
];

export default function Toolbox() {
  return (
    <section id="toolbox" className="bg-surface-container-low py-32 rounded-[3rem] mx-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            工具集合
          </h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface mb-4">工具箱</p>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            这里会逐步放上我自己常用、也确实好用的功能。不是为了展示概念，而是为了把开发和日常使用中高频的操作做得更省事。
          </p>
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
