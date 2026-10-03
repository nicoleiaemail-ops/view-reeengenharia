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
              {/* A assinatura da marca, no lugar do descritor aposentado. */}
              <div className="text-[.56rem] tracking-[.18em] text-accent uppercase mt-0.5">Enxergue · Simplifique · Evolua</div>
            </div>
          </div>
          <p className="text-[.78rem] text-muted-foreground leading-relaxed max-w-[280px]">
            A VIEW devolve o controle da operação para quem toma decisão. Primeiro o processo desenhado,
            depois o sistema, a automação e o dado. Nessa ordem, com a medição feita antes e depois.
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
              { label: "IA para empresas", href: "/ia-para-empresas-joao-pessoa" },
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
                href="https://wa.me/5583993224878"
                className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: (83) 9 9322-4878
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
              <span className="text-[.78rem] text-muted-foreground">Todo o Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-view-line pt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="text-[.72rem] text-muted-foreground/80">© 2026 VIEW. Todos os direitos reservados.</div>
        <div className="flex items-center gap-4">
          <Link to="/privacidade" className="text-[.72rem] text-muted-foreground/80 hover:text-foreground transition-colors">
            Política de Privacidade
          </Link>
          <Link to="/admin-login" className="text-[.68rem] text-muted-foreground/50 hover:text-foreground transition-colors">
            Área restrita
          </Link>
        </div>
      </div>
    </footer>
  );
}
