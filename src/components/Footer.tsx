import { Link } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";

export function Footer() {
  return (
    <footer className="px-[7%] pt-12 pb-8 border-t border-view-line">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <ViewLogo size={36} />
            <div>
              <div className="font-display font-bold text-[.95rem] tracking-[.12em]">VIEW</div>
              <div className="text-[.38rem] tracking-[.2em] text-muted-foreground uppercase mt-0.5">Reengenharia de Processos</div>
            </div>
          </div>
          <p className="text-[.78rem] text-muted-foreground leading-relaxed max-w-[280px]">
            Visibilidade operacional, automação e controle de processos para empresas em crescimento.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-4 font-semibold">Navegação</div>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: "Soluções", href: "/solucoes" },
              { label: "Casos de Sucesso", href: "/casos" },
              { label: "Sobre nós", href: "/sobre" },
              { label: "Avaliação Gratuita", href: "/avaliacao-maturidade" },
              { label: "Diagnóstico Grátis", href: "/#diagnostico" },
            ].map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-4 font-semibold">Contato</div>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="https://wa.me/558399565051"
                className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: (83) 9 9565-0051
              </a>
            </li>
            <li>
              <a
                href="mailto:admin@reengenhariaview.com.br"
                className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors"
              >
                admin@reengenhariaview.com.br
              </a>
            </li>
            <li>
              <span className="text-[.78rem] text-muted-foreground">PB · PE · RN · Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-view-line pt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="text-[.7rem] text-foreground/[.30]">© 2026 VIEW Reengenharia de Processos. Todos os direitos reservados.</div>
        <Link to="/admin-login" className="text-[.65rem] text-foreground/[.20] hover:text-foreground/50 transition-colors">
          Área restrita
        </Link>
      </div>
    </footer>
  );
}
