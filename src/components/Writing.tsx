import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const posts = [
  {
    title: "从需求到上线：我如何拆解一个中小型 Web 项目",
    description: "记录从需求梳理、技术选型、接口联调到上线部署的完整思路，尽量减少返工成本。",
    date: "2026-03-24",
    readTime: "6 分钟阅读",
    tag: "工程实践",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdK2H8z7LvQuIL8Fkl5x1taHrjue18QcRfxH_gxBxJF_HOMZK_qTd7QCEWkOdmxovpzsXuYejz8o9U8DP1YwuFZmG9sxqUnpiIaLCH-YDnoRa4xeCwEX41Zh46ot5YsA5Ob9cr8NePkrSv_SaFTwsaNLYnbpnuw0N4wpW0jh9K8qMoJ6_L5-kg6HaxIpsHrhGuOKd7CReyv3Vkk_YBCMUdXUz6weMAiMNtzl_gqjJb-TPIFUyBddq8zf7TKTKehyQSU89asYV2hUEg",
  },
  {
    title: "做一个能交付的前端，而不是只会写页面",
    description: "聊一聊接口错误处理、构建发布、性能优化和代码组织，这些才是业务项目真正拉开差距的地方。",
    date: "2026-03-18",
    readTime: "8 分钟阅读",
    tag: "前端开发",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTpxcVRhUe04x8-seQaP_FhikVBzEnk5q6rvtjCCxVvAY2V58niifrTBi8rc7NLDlh_G-gt5oAnA26qpiZSQLVyEVLTjFKMAQ3usd-oTEkGqeOVJox0_cQhOHc0I3yXT9rCiQyrBJc3VaTTgujJUq-FxHGv9WornPOr3wJKJvxseOwIw8E5_Kyf5g97xAubcSEdCphedfXvHxJQycdCovowpRACzoP6_oJs3oHIJcaV3_ik1cDGzwPqZs_nAE2v50-b5y229K4c2kv",
  },
];

export default function Writing() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex justify-between items-end mb-16 gap-6 flex-wrap">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            技术文章
          </h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface">文章</p>
        </div>
        <a
          href="#"
          className="text-primary font-semibold text-sm flex items-center gap-1 group"
        >
          查看全部
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-8 bg-surface-container relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-surface">
                  {post.tag}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <time className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                {post.date}
              </time>
              <span className="w-1 h-1 rounded-full bg-surface-container-high"></span>
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                {post.readTime}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors mb-4 leading-tight">
              {post.title}
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {post.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
