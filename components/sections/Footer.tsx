export default function Footer({ personal }: { personal: Record<string,unknown> }) {
  const LINKS = [
    { label: 'GitHub',   href: String(personal.github   ?? '#') },
    { label: 'LinkedIn', href: String(personal.linkedin ?? '#') },
    { label: 'Email',    href: `mailto:${String(personal.email ?? '')}` },
  ]
  return (
    <footer className="bg-storm border-t border-gold/10 px-12 py-9 flex flex-wrap justify-between items-center gap-4">
      <p className="text-[9px] tracking-[.28em] uppercase text-paper/55">
        Crafted with <span className="text-gold font-kanji">忍耐</span> by <b className="text-gold font-normal">Nileet Savale</b> · &copy; 2025
      </p>
      <div className="flex gap-[22px]">
        {LINKS.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener" className="text-[9px] tracking-[.22em] uppercase text-paper/55 no-underline hover:text-gold transition-colors duration-200">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
