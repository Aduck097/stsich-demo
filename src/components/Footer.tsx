export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 border-t border-surface-container-high">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="text-sm font-black text-on-surface uppercase tracking-tighter">
          Personal Portfolio
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Twitter", "GitHub", "LinkedIn", "RSS"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs font-medium uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
            >
              {social}
            </a>
          ))}
        </div>
        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
          © 2024 Portfolio. Designed with Intent.
        </p>
      </div>
    </footer>
  );
}
