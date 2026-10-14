import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { FAQSection, LinksRelacionados, NAPFooterBlock, NumerosSection } from "@/components/LandingKit";

/**
 * Única landing de engenharia de produção "física" (chão de fábrica), em vez
 * de processo administrativo/software — por isso não reaproveita
 * InvestimentoPrazoSection/ComoFuncionaDepoisDoDiagnostico/CompromissosSection
 * das outras landings: o diagnóstico aqui é presencial, de um dia na
 * unidade, não o Mini-diagnóstico DISTIPP de 30 minutos descrito naqueles
 * componentes, e a oferta comercial (preço, garantia de código/lock-in) não
 * se aplica a um serviço de engenharia de produção.
 */

const PATH = "/engenharia-de-producao-agroindustria-paraiba";
// Title e description pedidos tinham 62 e 166 caracteres -- acima do limite
// de 60/155 que o site usa em toda página (title ≤ 60, description ≤ 155).
// Encurtados preservando o sentido; nenhuma palavra-chave foi removida, só
// reorganizada.
const TITLE = "Engenharia de Produção para Agroindústria na Paraíba | VIEW";
const DESCRIPTION =
  "Engenharia de produção para agroindústrias e fábricas em João Pessoa, Campina Grande, na Paraíba e no Brasil: fluxo, layout, ergonomia e capacidade.";

const WHATSAPP_URL = whatsappUrl("Olá! Quero um diagnóstico de produtividade da minha fábrica.");

const ondeAtendemos = [
  {
    titulo: "João Pessoa e Região Metropolitana",
    desc: "Atendimento presencial contínuo, com visitas à unidade conforme o andamento do projeto.",
  },
  {
    titulo: "Campina Grande e o Agreste",
    desc: "Visitas presenciais programadas, de acordo com a etapa do diagnóstico ou da implantação.",
  },
  {
    titulo: "Brejo, Sertão e todo o interior da Paraíba",
    desc: "Visitas presenciais programadas, combinadas com acompanhamento remoto entre uma visita e outra.",
  },
  {
    titulo: "Demais estados do Brasil",
    desc: "Atendimento presencial por projeto (viagens combinadas nas etapas-chave) e acompanhamento remoto no restante do tempo.",
  },
];

const sinais = [
  {
    titulo: "Gargalo que todo mundo conhece, mas ninguém resolveu",
    desc: "Uma etapa específica da linha segura o ritmo das demais, e a produção se organiza em torno desse ponto em vez de corrigi-lo.",
  },
  {
    titulo: "Estoque parado entre etapas",
    desc: "Material processado se acumula esperando a próxima etapa, ocupando espaço e capital que poderiam estar circulando.",
  },
  {
    titulo: "Transporte interno excessivo",
    desc: "Produto, insumo ou operador percorrendo mais distância dentro da fábrica do que o processo exigiria, se o layout acompanhasse o fluxo real.",
  },
  {
    titulo: "Operador cansado ou com dor",
    desc: "Postura forçada, esforço repetitivo ou altura de bancada errada — sinais de que o posto de trabalho não foi desenhado para quem o ocupa.",
  },
  {
    titulo: "Máquina nova sem lugar certo",
    desc: "Equipamento comprado para aumentar capacidade, mas instalado onde havia espaço, não onde o fluxo produtivo pede.",
  },
  {
    titulo: "Produção que não acompanha os pedidos",
    desc: "A demanda cresceu e a fábrica não cresceu junto — e ninguém sabe ainda se o limite é de máquina, de layout ou de método.",
  },
];

const oQueFazemos = [
  "Mapeamento do fluxo produtivo, do recebimento da matéria-prima à expedição.",
  "Estudo e projeto de layout, posicionando etapas, máquinas e estoques intermediários conforme o fluxo real.",
  "Balanceamento de linha e de capacidade, identificando o gargalo real antes de qualquer investimento em equipamento.",
  "Ergonomia nos postos de trabalho, ajustando bancada, alcance e esforço à tarefa e a quem a executa.",
  "Padronização de operações (POPs), para a produção não depender da memória de quem está no posto naquele turno.",
  "Indicadores de produção, para acompanhar o resultado do projeto com número, não com impressão.",
  "Quando fizer sentido, automação e sistema de controle da produção — depois do processo e do layout resolvidos, nunca antes.",
];

const paraQuem = [
  "Polpas de frutas",
  "Laticínios",
  "Engenhos e destilarias",
  "Usinas",
  "Abatedouros",
  "Rações",
  "Beneficiamento de castanha",
  "Mel",
  "Outros alimentos",
];

const comoFunciona = [
  {
    titulo: "Diagnóstico de Produtividade da Fábrica",
    desc: "Um dia na unidade, observando o processo real, da matéria-prima à expedição.",
  },
  {
    titulo: "Relatório com as 5 melhorias prioritárias",
    desc: "Cada melhoria com o ganho estimado, para decidir por onde começar com clareza.",
  },
  {
    titulo: "Projeto de layout e implantação acompanhada",
    desc: "O layout é desenhado com a equipe da fábrica e implantado com acompanhamento da VIEW, não só entregue em um documento.",
  },
  {
    titulo: "Indicadores e melhoria contínua",
    desc: "O resultado é medido depois da implantação, e o ciclo de melhoria continua a partir do que o indicador mostrar.",
  },
];

const faqs = [
  {
    q: "Precisa parar a produção para fazer o diagnóstico ou a implantação?",
    a: "Não. O diagnóstico é feito observando a produção em andamento. A implantação do layout é planejada por etapas, combinada com a equipe da fábrica, para não parar a produção de uma vez.",
  },
  {
    q: "Quanto tempo leva?",
    a: "O diagnóstico é concluído em um dia na unidade. O prazo do projeto de layout e da implantação depende do tamanho da fábrica e do escopo definido no relatório — isso entra na proposta, depois do diagnóstico.",
  },
  {
    q: "Vocês atendem em Campina Grande e no interior da Paraíba?",
    a: "Sim. Além de João Pessoa e Região Metropolitana, atendemos Campina Grande, o Agreste e também o Brejo, o Sertão e o restante do interior da Paraíba, com visitas presenciais programadas.",
  },
  {
    q: "Atendem fora da Paraíba?",
    a: "Sim. Atendemos projetos em todo o Brasil, com atendimento presencial nas etapas-chave do projeto e acompanhamento remoto no restante do tempo.",
  },
  {
    q: "Fazem a análise ergonômica (NR-17)?",
    a: "Sim, a análise ergonômica dos postos de trabalho faz parte do diagnóstico e do projeto de layout, alinhada aos requisitos da NR-17.",
  },
  {
    q: "Quanto custa o diagnóstico?",
    a: "Depende do porte da fábrica e da distância até a unidade, então não dá para cravar um valor aqui. Fale com a gente no WhatsApp para receber uma proposta.",
    links: [{ label: "Falar no WhatsApp", href: WHATSAPP_URL, external: true }],
  },
  {
    q: "Ajudam a escolher e posicionar máquinas novas?",
    a: "Sim. A escolha e o posicionamento de uma máquina nova fazem parte do projeto de layout — a decisão considera o fluxo produtivo real, não só o espaço disponível no galpão.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Engenharia de produção",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Engenharia de produção para agroindústrias e fábricas: mapeamento de fluxo, projeto de layout, balanceamento de linha, ergonomia e padronização de operações, em João Pessoa, Campina Grande, na Paraíba e no Brasil.",
};

export default function EngenhariaProducaoAgroindustriaParaiba() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        jsonLd={[
          breadcrumbJsonLd("Engenharia de Produção para Agroindústria", PATH),
          serviceJsonLd,
          faqPageJsonLd(faqs),
        ]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[780px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · Engenharia de Produção · Paraíba e Brasil
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.8rem,3.4vw,2.7rem)] leading-[1.15] mb-5">
            Engenharia de produção para agroindústrias em João Pessoa, Campina Grande e em toda a Paraíba
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[620px] mx-auto mb-8">
            A VIEW ajuda agroindústrias e fábricas a produzir mais com a mesma estrutura, organizando fluxo,
            layout e ergonomia antes de qualquer investimento em máquina nova. Atendimento presencial em João
            Pessoa, Campina Grande e em toda a Paraíba, com projetos em todo o Brasil.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "agroindustria-pb-hero" })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Agendar visita de diagnóstico →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <NumerosSection
          numero1={{ valor: "20+", label: "Processos automatizados desde 2024" }}
          numero2={{ valor: "+50%", label: "Ganho de produtividade no processo automatizado" }}
        />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Onde atendemos
          </h2>
          <div className="flex flex-col gap-3">
            {ondeAtendemos.map((o) => (
              <div key={o.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{o.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Sinais de que a produção chegou no limite
          </h2>
          <div className="flex flex-col gap-3">
            {sinais.map((s) => (
              <div key={s.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{s.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que fazemos
          </h2>
          <ul className="flex flex-col gap-3">
            {oQueFazemos.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4 text-[.9rem] text-muted-foreground leading-relaxed"
              >
                <span className="text-primary font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Para quem
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-4">
            Agroindústrias e fábricas de alimentos de todos os portes, entre elas:
          </p>
          <div className="flex flex-wrap gap-2">
            {paraQuem.map((p) => (
              <span
                key={p}
                className="text-[.78rem] font-display font-semibold text-foreground bg-foreground/[.04] border border-foreground/[.08] rounded-full px-4 py-1.5"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Como funciona
          </h2>
          <ol className="flex flex-col gap-5">
            {comoFunciona.map((p, i) => (
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

        {/*
          TODO: faixas de investimento e prazo -- preencher quando o usuário
          definir os valores. Sem placeholder "[a definir]" visível: o texto
          descreve a estrutura comercial sem cravar número, e o CTA leva para
          o WhatsApp, onde o valor de fato é informado.
        */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Investimento e prazo
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-4">
            O investimento varia conforme o porte da fábrica, a distância até a unidade e o escopo do projeto
            de layout — por isso o valor exato vem na proposta, depois do diagnóstico, nunca antes dele. O
            prazo segue a mesma lógica: definido no relatório, a partir do que o diagnóstico encontrar.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[.85rem] font-display font-semibold text-primary hover:underline"
          >
            Falar no WhatsApp →
          </a>
        </section>

        {/*
          TODO: primeiro case de agroindústria. Nenhum dado foi inventado --
          quando o primeiro projeto for concluído e autorizado pelo cliente,
          substituir esta seção pelo card real (challenge/solution/results),
          no mesmo padrão de src/content/casos.ts.
        */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Case
          </h2>
          <div className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-5 text-[.9rem] text-muted-foreground leading-relaxed">
            Este é um serviço novo da VIEW. Assim que o primeiro projeto de engenharia de produção para
            agroindústria for concluído e autorizado pelo cliente, o case completo — desafio, solução e
            resultado — aparece aqui.
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <LinksRelacionados exceto={PATH} />

        <section className="py-12 border-t border-view-line text-center">
          <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] mb-3">
            Quer saber onde a sua fábrica está perdendo capacidade?
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed max-w-[520px] mx-auto mb-7">
            O Diagnóstico de Produtividade da Fábrica é feito em um dia, na própria unidade, e termina com um
            relatório das 5 melhorias prioritárias.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="agroindustria-pb-rodape"
            onClick={() => track(EVENTS.whatsappClick, { location: "agroindustria-pb-rodape" })}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
          >
            Agendar visita de diagnóstico →
          </a>
        </section>

        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
