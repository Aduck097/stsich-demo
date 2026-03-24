import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const posts = [
  {
    title: "The Silent Authority of White Space in Modern UI",
    description: "How intentional emptiness creates hierarchy and guides the user's focus without explicit instruction.",
    date: "Oct 24, 2024",
    readTime: "8 min read",
    tag: "Design Theory",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdK2H8z7LvQuIL8Fkl5x1taHrjue18QcRfxH_gxBxJF_HOMZK_qTd7QCEWkOdmxovpzsXuYejz8o9U8DP1YwuFZmG9sxqUnpiIaLCH-YDnoRa4xeCwEX41Zh46ot5YsA5Ob9cr8NePkrSv_SaFTwsaNLYnbpnuw0N4wpW0jh9K8qMoJ6_L5-kg6HaxIpsHrhGuOKd7CReyv3Vkk_YBCMUdXUz6weMAiMNtzl_gqjJb-TPIFUyBddq8zf7TKTKehyQSU89asYV2hUEg",
  },
  {
    title: "Crafting High-Performance Glassmorphism",
    description: "A deep dive into CSS backdrop filters, opacity layering, and performance optimization for web apps.",
    date: "Oct 12, 2024",
    readTime: "12 min read",
    tag: "Technology",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTpxcVRhUe04x8-seQaP_FhikVBzEnk5q6rvtjCCxVvAY2V58niifrTBi8rc7NLDlh_G-gt5oAnA26qpiZSQLVyEVLTjFKMAQ3usd-oTEkGqeOVJox0_cQhOHc0I3yXT9rCiQyrBJc3VaTTgujJUq-FxHGv9WornPOr3wJKJvxseOwIw8E5_Kyf5g97xAubcSEdCphedfXvHxJQycdCovowpRACzoP6_oJs3oHIJcaV3_ik1cDGzwPqZs_nAE2v50-b5y229K4c2kv",
  },
];

export default function Writing() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            Writing
          </h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface">博客</p>
        </div>
        <a
          href="#"
          className="text-primary font-semibold text-sm flex items-center gap-1 group"
        >
          View all posts
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
            <div className="flex items-center gap-4 mb-4">
              <time className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                {post.date}
              </time>
              <span className="w-1 h-1 rounded-full bg-surface-container-high"></span>
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                {post.readTime}
              </span >
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
