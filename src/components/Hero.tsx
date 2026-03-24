import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="work"
      className="max-w-7xl mx-auto px-8 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-2 lg:order-1"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          全栈开发者 / Web 程序员
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-surface leading-[1.05] mb-8">
          用代码搭建产品，<br />
          用工程能力解决<br />
          <span className="text-on-surface-variant">真实业务问题。</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-lg mb-12">
          我是一名程序员，关注前端体验、后端稳定性和 AI 能力接入。
          比起堆砌概念，我更在意把想法快速落地成可维护、可上线、可持续迭代的系统。
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-8 py-4 rounded-xl font-medium text-base editorial-shadow"
          >
            查看项目
          </motion.a>
          <a
            href="#about"
            className="text-on-surface font-medium text-base px-6 py-4 flex items-center gap-2 group transition-all"
          >
            了解更多
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="order-1 lg:order-2 relative"
      >
        <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full"></div>
        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface-container-low editorial-shadow relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKEVBY0dKv8hV1hrqKApzX0bzjnELZmTjG9Vc3166WyicIQMGBJtOfiqRfRQIfFeC1vQihgZfGrNvIfIfhVuAL4Zp5FgKBM-gu2yGMwQCxFjqzC_uzChF95oInfpTau8dLnhcA1Df7meBWEyb5L8DXAimfQB7haz7cjnOACDUWC3kT63hjvNM-MwN0TmBFOdezmP3-iwypJEI1f1qciRHFC8cPlgIHMcsUdp3WZnBitE-qjb8Jw-SSDqOS2sF0o9y9BZ-hgH1m5yu8"
            alt="程序员个人主页封面"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-xl border border-white/20">
            <div className="flex justify-between items-end gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  当前方向
                </p>
                <p className="text-on-surface font-semibold text-lg">
                  AI 应用、工程化前端与高质量交付
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-on-surface-variant shrink-0" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
