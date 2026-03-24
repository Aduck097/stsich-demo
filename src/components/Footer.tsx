export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-surface-container-low w-full py-12 border-t border-surface-container-high"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="text-sm font-black text-on-surface uppercase tracking-tighter">
          程序员主页
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: "GitHub", href: "https://github.com/Aduck097" },
            { label: "邮箱", href: "mailto:822371090@qq.com" },
            { label: "项目", href: "#work" },
            { label: "文章", href: "#blog" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-xs font-medium uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
          © 2026 Aduck097. Build with code.
        </p>
      </div>
    </footer>
  );
}
