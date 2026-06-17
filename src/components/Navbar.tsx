import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";
import { Menu, X } from "lucide-react";

const anchors = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Casos", href: "/casos" },
  { label: "Metodologia", href: "#distip" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const location = useLocation();
  const isAbout = location.pathname === "/sobre";
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[7%] py-4 bg-background/92 backdrop-blur-md border-b border-view-line">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <ViewLogo />
        <div className="font-display">
          <span className="font-bold text-foreground tracking-[.18em] text-[1.1rem]">VIEW</span>
          <small className="block text-[.38rem] font-normal tracking-[.2em] text-muted-foreground uppercase mt-0.5">
            IA · Processos · Dados
          </small>
        </div>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {!isAbout && anchors.map((a) =>
          a.href.startsWith("/") ? (
            <Link key={a.href} to={a.href} className="text-[.78rem] text-muted-foreground hover:text-foreground transition-colors tracking-[.03em]">
              {a.label}
            </Link>
          ) : (
            <a key={a.href} href={a.href} className="text-[.78rem] text-muted-foreground hover:text-foreground transition-colors tracking-[.03em]">
              {a.label}
            </a>
          )
        )}
        <Link
          to={isAbout ? "/" : "/sobre"}
          className="text-[.78rem] text-muted-foreground hover:text-foreground transition-colors tracking-[.03em]"
        >
          {isAbout ? "Início" : "Sobre nós"}
        </Link>
        <a
          href={isAbout ? "/" : "#diagnostico"}
          onClick={(e) => {
            if (isAbout) {
              e.preventDefault();
              window.location.href = "/#diagnostico";
            }
          }}
          className="bg-foreground text-background px-5 py-2.5 rounded-md font-display font-extrabold text-[.76rem] tracking-[.08em] no-underline hover:opacity-85 transition-opacity"
        >
          Diagnóstico Grátis
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-view-line flex flex-col items-center gap-5 py-6 md:hidden">
          {!isAbout && anchors.map((a) =>
            a.href.startsWith("/") ? (
              <Link key={a.href} to={a.href} className="text-[.85rem] text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                {a.label}
              </Link>
            ) : (
              <a key={a.href} href={a.href} className="text-[.85rem] text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                {a.label}
              </a>
            )
          )}
          <Link
            to={isAbout ? "/" : "/sobre"}
            className="text-[.85rem] text-muted-foreground hover:text-foreground transition-colors tracking-[.05em]"
            onClick={() => setOpen(false)}
          >
            {isAbout ? "Início" : "Sobre nós"}
          </Link>
          <a
            href={isAbout ? "/" : "#diagnostico"}
            onClick={(e) => {
              setOpen(false);
              if (isAbout) {
                e.preventDefault();
                window.location.href = "/#diagnostico";
              }
            }}
            className="bg-foreground text-background px-6 py-3 rounded-md font-display font-extrabold text-[.8rem] tracking-[.08em] no-underline"
          >
            Diagnóstico Grátis
          </a>
        </div>
      )}
    </nav>
  );
}
