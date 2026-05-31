import { Link } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";

export function Footer() {
  return (
    <footer className="px-[7%] py-10 border-t border-view-line flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-2.5">
        <ViewLogo size={36} />
        <div>
          <div className="font-display font-bold text-[.95rem] tracking-[.12em]">VIEW</div>
          <div className="text-[.38rem] tracking-[.2em] text-muted-foreground uppercase mt-0.5">Reengenharia de Processos</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/admin-login" className="text-[.65rem] text-foreground/[.28] hover:text-foreground transition-colors">
          Área restrita
        </Link>
        <div className="text-[.72rem] text-foreground/[.28]">© 2026 VIEW. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
