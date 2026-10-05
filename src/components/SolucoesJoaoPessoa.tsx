import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Seção curta na home para as landings de nicho geográfico (busca por
 * "software em João Pessoa", "IA no WhatsApp em João Pessoa" etc.), que
 * senão não têm nenhum link de entrada a partir da página mais visitada do
 * site.
 */
const paginas = [
  { label: "IA para empresas", href: "/ia-para-empresas-joao-pessoa" },
  { label: "Fábrica de software sob medida", href: "/fabrica-de-software-sob-medida-joao-pessoa" },
  { label: "Agentes de IA e IA no WhatsApp", href: "/agentes-de-ia-whatsapp-joao-pessoa" },
  { label: "Automação de processos com IA", href: "/automacao-de-processos-joao-pessoa" },
  { label: "Consultoria ISO 9001 para construtoras", href: "/consultoria-iso-9001-construtoras" },
];

export function SolucoesJoaoPessoa() {
  return (
    <section className="py-10 md:py-14 px-[7%] border-t border-view-line">
      <div className="text-center mb-8">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">
          Atendimento presencial em João Pessoa
        </div>
        <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.15]">
          Soluções em João Pessoa
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[920px] mx-auto">
        {paginas.map((p) => (
          <Link
            key={p.href}
            to={p.href}
            className="group flex items-center justify-between gap-3 bg-foreground/[.02] border border-foreground/[.08] rounded-lg px-5 py-4 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
          >
            <span className="text-[.86rem] font-display font-semibold text-foreground">{p.label}</span>
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
