import { Link } from "react-router-dom";
import {
  BUSINESS_SHORT_NAME,
  BUSINESS_ADDRESS_DISPLAY,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_EMAIL,
} from "@/lib/business";

/**
 * Peças compartilhadas pelas landing pages de nicho (as 4 novas + a de IA em
 * João Pessoa). Em vez de repetir a mesma estrutura de seção 4 vezes à mão,
 * cada página monta seu conteúdo específico (hero, problema, entregas,
 * diferenciais) e importa daqui o que é literalmente igual em todas: o passo
 * a passo do método, o bloco de FAQ e o CTA final.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface CaseLink {
  id: string;
  tag: string;
  headline: string;
}

/**
 * Os 7 passos do método, na redação fixa pedida — igual em toda landing de
 * nicho. "Automatizar de forma tradicional" vem antes de "IA só onde for
 * necessário" de propósito: é a ordem que prova, a cada página, que a VIEW
 * não abre vendendo IA.
 */
const COMO_TRABALHAMOS: { titulo: string; desc: string }[] = [
  { titulo: "Mapear o processo atual", desc: "Como o trabalho de fato acontece hoje — não como o manual diz que deveria." },
  { titulo: "Eliminar o que não precisa existir", desc: "Etapa que só existe por costume sai antes de qualquer ferramenta entrar." },
  { titulo: "Simplificar e padronizar", desc: "O que fica vira fluxo escrito, com responsável e prazo — sem depender da memória de uma pessoa." },
  { titulo: "Automatizar de forma tradicional o que for possível", desc: "Planilha, integração simples, regra fixa: resolvido sem IA sempre que IA não for necessária." },
  { titulo: "Usar IA ou agentes só onde for realmente necessário", desc: "Depois do processo mapeado e do problema nomeado — nunca antes." },
  { titulo: "Integrar", desc: "Excel ou Google Sheets, ERP, CRM, e-mail, WhatsApp — os sistemas passam a conversar entre si." },
  { titulo: "Medir o resultado", desc: "Antes e depois. Sem indicador combinado, o projeto não começa." },
];

export function ComoAVIEWTrabalha() {
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Como a VIEW trabalha
      </h2>
      <ol className="flex flex-col gap-5">
        {COMO_TRABALHAMOS.map((p, i) => (
          <li key={p.titulo} className="flex gap-4">
            <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">
              {i + 1}
            </span>
            <div>
              <div className="font-display font-bold text-foreground text-[.92rem] mb-1">{p.titulo}</div>
              <div className="text-muted-foreground text-[.85rem] leading-relaxed">{p.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Links para os casos documentados em /casos. Nunca inventa dado: só referencia. */
export function CasesSection({ cases }: { cases: CaseLink[] }) {
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Casos
      </h2>
      <div className="flex flex-col gap-3">
        {cases.map((c) => (
          <Link
            key={c.id}
            to={`/casos#${c.id}`}
            className="block bg-foreground/[.03] border border-foreground/[.08] rounded-lg p-4 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
          >
            <div className="text-[.65rem] tracking-[.15em] uppercase text-primary font-bold mb-1.5">{c.tag}</div>
            <div className="text-[.9rem] text-foreground font-medium leading-snug">{c.headline} →</div>
          </Link>
        ))}
      </div>
      <Link
        to="/casos"
        className="inline-block mt-4 text-[.85rem] text-muted-foreground hover:text-foreground transition-colors"
      >
        Ver todos os casos →
      </Link>
    </section>
  );
}

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section className="py-10 border-t border-view-line" id="faq">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Perguntas frequentes
      </h2>
      <div className="flex flex-col divide-y divide-view-line">
        {faqs.map((f, i) => (
          <details key={i} className="scroll-reveal group py-5" style={{ transitionDelay: `${i * 0.05}s` }}>
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <h3 className="font-display font-bold text-[.93rem] text-foreground group-hover:text-primary transition-colors">
                {f.q}
              </h3>
              <span
                className="text-primary/60 text-[1.1rem] flex-shrink-0 group-open:rotate-45 transition-transform duration-200"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[.85rem] text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Links internos para as outras páginas de nicho + soluções/casos, no rodapé de cada landing. */
export function LinksRelacionados({ exceto }: { exceto: string }) {
  const todas = [
    { href: "/fabrica-de-software-sob-medida-joao-pessoa", label: "Fábrica de software sob medida em João Pessoa" },
    { href: "/agentes-de-ia-whatsapp-joao-pessoa", label: "Agentes de IA e IA no WhatsApp em João Pessoa" },
    { href: "/automacao-de-processos-joao-pessoa", label: "Automação de processos com IA em João Pessoa" },
    { href: "/consultoria-iso-9001-construtoras", label: "Consultoria ISO 9001 para construtoras" },
    { href: "/ia-para-empresas-joao-pessoa", label: "IA para empresas em João Pessoa" },
    { href: "/solucoes", label: "Todas as soluções da VIEW" },
    { href: "/casos", label: "Casos de sucesso" },
  ].filter((l) => l.href !== exceto);

  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[1rem] text-foreground mb-4">Veja também</h2>
      <ul className="flex flex-col gap-2">
        {todas.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="text-[.85rem] text-primary hover:underline">
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CTAFinal({
  whatsappUrl,
  whatsappLabel = "Falar no WhatsApp",
  location,
}: {
  whatsappUrl: string;
  whatsappLabel?: string;
  location: string;
}) {
  return (
    <section className="py-12 border-t border-view-line text-center">
      <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] mb-3">
        Quer saber se isso resolve na sua empresa?
      </h2>
      <p className="text-[.9rem] text-muted-foreground leading-relaxed max-w-[520px] mx-auto mb-7">
        O Mini-diagnóstico DISTIPP é gratuito, leva 30 minutos e mostra onde o processo trava antes de
        qualquer proposta.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location={location}
          className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
        >
          {whatsappLabel} →
        </a>
        <Link
          to="/avaliacao-maturidade"
          className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3.5 rounded-full font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
        >
          Mini-diagnóstico DISTIPP gratuito →
        </Link>
      </div>
    </section>
  );
}

/** NAP idêntico em toda landing — nome, endereço e telefone exatamente iguais. */
export function NAPFooterBlock() {
  return (
    <section className="py-10 border-t border-view-line text-center text-[.8rem] text-muted-foreground leading-relaxed">
      <div className="font-display font-bold text-foreground tracking-[.1em] mb-1">{BUSINESS_SHORT_NAME}</div>
      <div>{BUSINESS_ADDRESS_DISPLAY}</div>
      <div>
        WhatsApp {BUSINESS_PHONE_DISPLAY} · {BUSINESS_EMAIL}
      </div>
    </section>
  );
}
