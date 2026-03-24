import { motion } from "motion/react";

const navItems = [
  { label: "项目", href: "#work" },
  { label: "工具箱", href: "#toolbox" },
  { label: "文章", href: "#blog" },
  { label: "关于我", href: "#about" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <a
          href="#work"
          className="text-lg font-bold tracking-tighter text-on-surface"
        >
          程序员主页
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-on-surface-variant font-medium tracking-tight text-sm hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
        <motion.a
          href="mailto:822371090@qq.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold"
        >
          联系我
        </motion.a>
      </div>
    </nav>
  );
}
