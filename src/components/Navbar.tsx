import { motion } from "motion/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-lg font-bold tracking-tighter text-on-surface">
          Personal Portfolio
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Work", "Toolbox", "Blog", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-on-surface-variant font-medium tracking-tight text-sm hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold"
          >
            Contact
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
