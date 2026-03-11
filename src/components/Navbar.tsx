import { Link, useLocation } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";

export function Navbar() {
  const location = useLocation();
  const isAbout = location.pathname === "/sobre";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[7%] py-4 bg-background/92 backdrop-blur-md border-b border-view-line">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <ViewLogo />
        <div className="font-display">
          <span className="font-bold text-foreground tracking-[.18em] text-[1.1rem]">VIEW</span>
          <small className="block text-[.38rem] font-normal tracking-[.2em] text-muted-foreground uppercase mt-0.5">
            Reengenharia de Processos
          </small>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <Link
          to={isAbout ? "/" : "/sobre"}
          className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors tracking-[.05em] hidden md:inline"
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
          className="bg-foreground text-background px-5 py-2.5 rounded-sm font-display font-extrabold text-[.76rem] tracking-[.08em] no-underline hover:opacity-85 transition-opacity"
        >
          Diagnóstico Grátis
        </a>
      </div>
    </nav>
  );
}
