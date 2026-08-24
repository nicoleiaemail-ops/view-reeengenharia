import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";
import { Menu, X } from "lucide-react";
import { PRIMARY_LABEL } from "./CTA";
import { EVENTS, track } from "@/lib/analytics";

/**
 * A navegação tinha sete itens, três deles âncoras (#distip, #resultados,
 * #faq) que só existem na home — em /solucoes, /casos e /blog eles não levavam
 * a lugar nenhum. Agora são quatro destinos reais e um CTA, e a âncora do
 * diagnóstico é resolvida para "/#diagnostico" quando o visitante não está na
 * home.
 */
const links = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Casos", href: "/casos" },
  { label: "Avaliação", href: "/avaliacao-maturidade" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre nós", href: "/sobre" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  const ctaHref = isHome ? "#diagnostico" : "/#diagnostico";
  const onCtaClick = () => {
    setOpen(false);
    track(EVENTS.ctaClick, { cta: "primary", location: "navbar" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[7%] py-4 bg-background/92 backdrop-blur-md border-b border-view-line">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <ViewLogo />
        <div className="font-display">
          <span className="font-bold text-foreground tracking-[.18em] text-[1.1rem]">VIEW</span>
          <small className="block text-[.56rem] font-normal tracking-[.18em] text-muted-foreground uppercase mt-0.5">
            IA · Processos · Dados
          </small>
        </div>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            aria-current={pathname === l.href ? "page" : undefined}
            className={`text-[.82rem] transition-colors tracking-[.03em] ${
              pathname === l.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={ctaHref}
          onClick={onCtaClick}
          className="bg-foreground text-background px-5 py-2.5 rounded-md font-display font-extrabold text-[.78rem] tracking-[.06em] no-underline hover:opacity-85 transition-opacity"
        >
          {PRIMARY_LABEL}
        </a>
      </div>

      {/* Mobile */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-view-line flex flex-col items-center gap-5 py-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-[.9rem] text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="bg-foreground text-background px-6 py-3 rounded-md font-display font-extrabold text-[.84rem] tracking-[.06em] no-underline"
          >
            {PRIMARY_LABEL}
          </a>
        </div>
      )}
    </nav>
  );
}
