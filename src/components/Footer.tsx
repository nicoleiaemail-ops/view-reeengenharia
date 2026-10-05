import { Link } from "react-router-dom";
import { ViewLogo } from "./ViewLogo";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_WHATSAPP_URL,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS_DISPLAY,
} from "@/lib/business";

export function Footer() {
  return (
    <footer className="px-[7%] pt-12 pb-8 border-t border-view-line">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <ViewLogo size={36} />
            <div>
              <div className="font-display font-bold text-[.95rem] tracking-[.12em]">VIEW</div>
              {/* A assinatura da marca, no lugar do descritor aposentado. */}
              <div className="text-[.56rem] tracking-[.18em] text-accent uppercase mt-0.5">Enxergue · Simplifique · Evolua</div>
              <div className="text-[.58rem] tracking-[.1em] text-muted-foreground/70 mt-1">{BUSINESS_NAME}</div>
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
              { label: "Blog", href: "/blog" },
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

        {/* João Pessoa — landings de nicho geografico, sem entrada propria no
            menu principal; aqui garante que estao linkadas de toda pagina. */}
        <div>
          <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-4 font-semibold">Em João Pessoa</div>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: "IA para empresas", href: "/ia-para-empresas-joao-pessoa" },
              { label: "Fábrica de software sob medida", href: "/fabrica-de-software-sob-medida-joao-pessoa" },
              { label: "Agentes de IA no WhatsApp", href: "/agentes-de-ia-whatsapp-joao-pessoa" },
              { label: "Automação de processos", href: "/automacao-de-processos-joao-pessoa" },
              { label: "Consultoria ISO 9001", href: "/consultoria-iso-9001-construtoras" },
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
                href={BUSINESS_WHATSAPP_URL}
                className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {BUSINESS_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="text-[.8rem] text-muted-foreground hover:text-foreground transition-colors"
              >
                {BUSINESS_EMAIL}
              </a>
            </li>
            <li>
              <span className="text-[.78rem] text-muted-foreground leading-relaxed">{BUSINESS_ADDRESS_DISPLAY}</span>
            </li>
            <li>
              <span className="text-[.78rem] text-muted-foreground">João Pessoa e todo o Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-view-line pt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="text-[.72rem] text-muted-foreground/80">© 2026 {BUSINESS_NAME}. Todos os direitos reservados.</div>
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
