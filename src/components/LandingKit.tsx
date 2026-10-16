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
  /**
   * Ações dentro da resposta — usado, por exemplo, na pergunta de preço: em
   * vez de citar valor, a resposta aponta para o diagnóstico ou para o
   * WhatsApp, com link de verdade, clicável, não só texto mencionando o
   * canal.
   */
  links?: { label: string; href: string; external?: boolean }[];
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
            {f.links && f.links.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {f.links.map((l) =>
                  l.external ? (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[.85rem] font-display font-semibold text-primary hover:underline"
                    >
                      {l.label} →
                    </a>
                  ) : (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="text-[.85rem] font-display font-semibold text-primary hover:underline"
                    >
                      {l.label} →
                    </Link>
                  )
                )}
              </div>
            )}
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
    { href: "/engenharia-de-producao-agroindustria-paraiba", label: "Engenharia de produção para agroindústria na Paraíba" },
    { href: "/aumentar-capacidade-produtiva", label: "Aumentar a produção sem comprar máquinas" },
    { href: "/ia-para-empresas-joao-pessoa", label: "IA para empresas em João Pessoa" },
    { href: "/solucoes", label: "Todas as soluções da VIEW" },
    { href: "/casos", label: "Casos de sucesso" },
    { href: "/metodo-distipp", label: "O método DISTIPP" },
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

/**
 * "VIEW em números" — pedido como bloco de prova logo após o parágrafo de
 * abertura. Os 2 números vêm de Results.tsx (já publicados na home, não
 * duplicados/alterados aqui). "Anos de mercado" e "total de projetos
 * entregues" eram pedidos como TODO explícito no texto -- mas um "TODO"
 * visível na página é exatamente o que a regra deste site proíbe (nenhuma
 * palavra de rascunho aparece para o visitante real). Em vez disso: só
 * entram itens com dado verificável. "Fundada em 2024" já é fato publicado
 * (BUSINESS_FOUNDING_DATE), não placeholder -- e junto com os 2 números e o
 * escritório fecha os 4 itens sem precisar inventar nem expor TODO.
 */
export function NumerosSection({
  numero1,
  numero2,
}: {
  numero1: { valor: string; label: string };
  numero2: { valor: string; label: string };
}) {
  const itens = [
    numero1,
    numero2,
    { valor: "Desde 2024", label: "Fundada e em operação" },
    { valor: "João Pessoa", label: "Escritório físico, atendimento também remoto" },
  ];
  return (
    <section className="py-8 border-t border-view-line">
      <div className="text-[.65rem] tracking-[.2em] uppercase text-muted-foreground mb-5 text-center">
        VIEW em números
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {itens.map((it) => (
          <div key={it.label} className="text-center bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
            <div className="font-display font-extrabold text-[1.15rem] text-primary leading-none mb-1.5">{it.valor}</div>
            <div className="text-[.72rem] text-muted-foreground leading-tight">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * "Investimento e prazo". O briefing pedia faixas "a partir de R$ TODO" —
 * decidido manter sem número algum visível (nem placeholder "[a definir]"):
 * o texto descreve a estrutura comercial real (diagnóstico gratuito →
 * projeto inicial → evolução contínua) sem cravar valor, e os dois CTAs
 * levam para onde o valor de fato é informado. Quando os números forem
 * definidos, trocar os parágrafos "O valor exato..." pelas faixas reais.
 */
export function InvestimentoPrazoSection({ whatsappUrl }: { whatsappUrl: string }) {
  const etapas = [
    {
      nome: "Diagnóstico DISTIPP",
      preco: "Gratuito",
      desc: "30 minutos. Mostra onde o processo trava antes de qualquer proposta.",
    },
    {
      nome: "Projeto inicial",
      preco: "Sob medida",
      desc: "Escopo e prazo definidos a partir do diagnóstico — o valor exato vem na proposta, não antes dela.",
    },
    {
      nome: "Evolução contínua",
      preco: "Mensal",
      desc: "Acompanhamento e ajustes depois da entrega, conforme o processo evolui.",
    },
  ];
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Investimento e prazo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {etapas.map((e) => (
          <div key={e.nome} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-5">
            <div className="font-display font-bold text-[.92rem] text-foreground mb-1">{e.nome}</div>
            <div className="font-display font-extrabold text-[.95rem] text-primary mb-2">{e.preco}</div>
            <div className="text-[.82rem] text-muted-foreground leading-relaxed">{e.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-[.85rem] text-muted-foreground leading-relaxed mb-4">
        Cada proposta é fechada antes do projeto começar — escopo, prazo e investimento, sem reajuste no meio
        do caminho.
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Link to="/avaliacao-maturidade" className="text-[.85rem] font-display font-semibold text-primary hover:underline">
          Mini-diagnóstico DISTIPP gratuito →
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[.85rem] font-display font-semibold text-primary hover:underline"
        >
          Falar no WhatsApp →
        </a>
      </div>
    </section>
  );
}

/** "Como funciona depois do diagnóstico" — os 4 passos pedidos, redação fixa. */
export function ComoFuncionaDepoisDoDiagnostico() {
  const passos = [
    { titulo: "Conversa de 30 minutos", desc: "Entendemos o processo e o problema antes de falar de solução." },
    { titulo: "Proposta com escopo fechado", desc: "Prazo e investimento definidos antes do projeto começar, sem letra miúda." },
    { titulo: "Entregas por etapa, com validação", desc: "Cada módulo é homologado com a sua equipe antes de seguir para o próximo." },
    { titulo: "Acompanhamento e evolução", desc: "O trabalho não termina na entrega — a VIEW acompanha o resultado medido." },
  ];
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Como funciona depois do diagnóstico
      </h2>
      <ol className="flex flex-col gap-5">
        {passos.map((p, i) => (
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

/** "Nossos compromissos" — lista fixa pedida no briefing. */
export function CompromissosSection() {
  const compromissos = [
    "O código e os dados são da sua empresa.",
    "Sem dependência de fornecedor — sem lock-in.",
    "Escopo e preço fechados antes de começar.",
    "Atendimento presencial em João Pessoa e remoto em todo o Brasil.",
  ];
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
        Nossos compromissos
      </h2>
      {/* TODO: "garantia de TODO dias após a entrega" -- item fora da lista
          até o prazo real da garantia ser definido. Sem garantia definida,
          melhor não prometer prazo nenhum do que inventar um número. */}
      <ul className="flex flex-col gap-3">
        {compromissos.map((c) => (
          <li key={c} className="flex items-start gap-3 text-[.9rem] text-foreground">
            <span className="text-view-green font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Um único case relevante, linkado para a página completa (não a listagem). */
export function CaseDestaque({ caso, path }: { caso: CaseLink; path: string }) {
  return (
    <section className="py-10 border-t border-view-line">
      <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">Case</h2>
      <Link
        to={path}
        className="block bg-foreground/[.03] border border-foreground/[.08] rounded-lg p-5 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
      >
        <div className="text-[.65rem] tracking-[.15em] uppercase text-primary font-bold mb-2">{caso.tag}</div>
        <div className="text-[.92rem] text-foreground font-medium leading-snug">{caso.headline} →</div>
      </Link>
    </section>
  );
}
