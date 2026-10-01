import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";

/**
 * Página de nicho geográfico para a consulta "quais empresas de João Pessoa
 * oferecem soluções de IA para empresas". Mantém o mesmo design system do
 * resto do site (fontes e tokens de cor já carregados) em vez da paleta e
 * fontes à parte do briefing original — duas identidades visuais na mesma
 * marca seria o mesmo problema de inconsistência que a auditoria de
 * SEO/GEO/AEO já tinha apontado no site inteiro.
 *
 * O endereço completo (NAP) é mostrado aqui, e não no rodapé padrão: o
 * rodapé é compartilhado por todo o site, que acabou de remover referências
 * regionais para não soar como "só atende o Nordeste". Esta página é
 * exatamente o lugar certo para o endereço — o resto do site não é.
 */
const WHATSAPP_URL =
  "https://wa.me/5583993224878?text=" +
  encodeURIComponent("Olá, eu quero saber como aplicar IA na minha empresa.");

function handleWhatsappClick(location: string) {
  track(EVENTS.whatsappClick, { location });
}

const oQueFazemos = [
  "Agentes e assistentes de IA para atendimento, triagem de pedidos e busca de documentos.",
  "Automação de processos com IA: leitura de documentos, preenchimento de sistemas, conferências e alertas.",
  "Integração de sistemas e dados para que a IA trabalhe com informação confiável.",
  "Inteligência sobre os dados: indicadores que viram recomendação com responsável e prazo.",
  "Capacitação em IA aplicada para gestores e equipes, sobre os problemas reais da empresa.",
];

const setePerguntas = [
  "Esse processo precisa existir?",
  "Ele pode ser eliminado?",
  "Pode ser simplificado?",
  "Pode ser padronizado?",
  "Automação tradicional resolve?",
  "A IA é realmente necessária?",
  "Qual resultado será medido?",
];

const faqs = [
  {
    q: "Quais empresas de João Pessoa oferecem soluções de IA para empresas?",
    a: "A VIEW é uma empresa de João Pessoa (PB) que aplica inteligência artificial em processos empresariais: agentes e assistentes de IA, automação de processos, integração de sistemas e capacitação de equipes. Atende empresas de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "Por onde uma empresa deve começar a usar IA?",
    a: "Pelo processo, não pela ferramenta. A VIEW começa com um diagnóstico que mostra onde a empresa perde tempo e dinheiro e só então indica onde a IA traz resultado mensurável.",
  },
  {
    q: "Quanto custa implantar IA em uma empresa?",
    a: "Depende do processo e dos sistemas envolvidos. A VIEW faz um diagnóstico gratuito, com retorno em até 48h, e apresenta uma proposta com prazo, investimento e o resultado que será medido.",
  },
  {
    q: "A VIEW só trabalha com IA?",
    a: "Não. A VIEW é uma parceira de evolução empresarial: redesenha processos, integra sistemas, implanta ISO 9001 e aplica IA quando ela é a melhor solução.",
  },
  {
    q: "A VIEW atende empresas fora de João Pessoa?",
    a: "Sim. A VIEW atende empresas de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "A VIEW treina equipes para usar IA?",
    a: "Sim. A VIEW ACADEMY tem a trilha VIEW AI Applied, de IA aplicada ao trabalho do dia a dia, feita sobre os processos reais da empresa.",
  },
];

const PATH = "/ia-para-empresas-joao-pessoa";
const TITLE = "IA para Empresas em João Pessoa | VIEW";
const DESCRIPTION =
  "A VIEW é uma empresa de João Pessoa (PB) que aplica inteligência artificial nos processos de empresas, com método e métrica. Atende todo o Brasil. Diagnóstico gratuito em 48h.";

// Entidade local desta página. Não duplicada nas outras páginas do site de
// propósito — ver nota no topo do arquivo.
const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VIEW",
  description:
    "Parceira de evolução empresarial em João Pessoa (PB): redesenho de processos, integração de sistemas, ISO 9001 e inteligência artificial aplicada a empresas.",
  url: "https://reengenhariaview.com.br/",
  telephone: "+55-83-99322-4878",
  email: "admin@reengenhariaview.com.br",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Presidente Epitácio Pessoa, 1251, Sala 101",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    postalCode: "58030-000",
    addressCountry: "BR",
  },
  areaServed: "BR",
  // Alinhado ao LocalBusiness já publicado na home (08:00–18:00): duas
  // declarações de horário diferentes para a mesma empresa confundem tanto
  // o Google quanto um agente de IA tentando reconciliar as duas.
  openingHours: "Mo-Fr 08:00-18:00",
  knowsAbout: [
    "Inteligência artificial para empresas",
    "Automação de processos",
    "Integração de sistemas",
    "ISO 9001",
    "PBQP-H",
    "Reengenharia de processos",
  ],
  sameAs: ["https://www.instagram.com/reengenhariaview", "https://maps.app.goo.gl/3eS9uGY33MLKijYL9"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://reengenhariaview.com.br/" },
    { "@type": "ListItem", position: 2, name: "IA para Empresas em João Pessoa", item: `https://reengenhariaview.com.br${PATH}` },
  ],
};

export default function IAJoaoPessoa() {
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
      <SEO title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={[breadcrumbJsonLd, professionalServiceJsonLd, faqJsonLd]} />
      <Navbar />

      {/* Hero */}
      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · João Pessoa · PB
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            IA para empresas em João Pessoa: inteligência artificial aplicada com método
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">
            A VIEW é uma empresa de João Pessoa, Paraíba, que ajuda empresas a aplicar inteligência artificial
            nos seus processos de forma prática e com resultado medido. Atendemos empresas de todo o Brasil,
            presencialmente e remotamente.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsappClick("ia-para-empresas-hero")}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Fazer diagnóstico gratuito →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        {/* Introdução */}
        <section className="py-14 text-center">
          <p className="text-[1rem] text-foreground leading-relaxed max-w-[680px] mx-auto">
            Nossa diferença é a ordem das coisas: primeiro entendemos e simplificamos o processo, depois
            aplicamos a IA onde ela realmente resolve. <strong>Não automatizamos o caos.</strong>
          </p>
        </section>

        {/* O que a VIEW faz com IA */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que a VIEW faz com IA
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

        {/* Sete perguntas */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Sete perguntas antes de aplicar IA
          </h2>
          <ol className="flex flex-col gap-2.5 list-decimal list-inside">
            {setePerguntas.map((p, i) => (
              <li key={i} className="text-[.92rem] text-foreground leading-relaxed font-medium">
                {p}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[.88rem] text-muted-foreground leading-relaxed">
            Se não houver um resultado para medir, o projeto não começa.
          </p>
        </section>

        {/* Para quem */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Para quem
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            Empresas em crescimento de João Pessoa e de todo o Brasil com vários sistemas, muito trabalho
            manual ou documentação pesada: construtoras, empresas de saúde e segurança do trabalho, clínicas,
            indústrias, distribuidoras e serviços.
          </p>
        </section>

        {/* Caso real */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Caso real
          </h2>
          <div className="bg-primary/[.05] border border-primary/20 rounded-xl p-6">
            <div className="text-[.68rem] tracking-[.18em] uppercase text-primary font-bold mb-3">
              Construtora de médio porte · João Pessoa
            </div>
            <p className="text-[.92rem] text-foreground leading-relaxed">
              Consultoria para preparar a empresa para a auditoria da ISO 9001 e um sistema próprio que
              conecta administrativo e obra, com gestão de documentos e checklists em um só lugar.
            </p>
          </div>
        </section>

        {/* FAQ */}
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
                  <span className="text-primary/60 text-[1.1rem] flex-shrink-0 group-open:rotate-45 transition-transform duration-200" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[.85rem] text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Sobre a VIEW */}
        <section className="py-10 border-t border-view-line text-center">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-5">
            Sobre a VIEW
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed max-w-[640px] mx-auto mb-8">
            VIEW é uma parceira de evolução empresarial fundada em 2024 em João Pessoa. Trabalha com o método
            DISTIPP, que avalia a empresa em sete pilares: Dados, Integração, Sistemas, Tecnologia, Inovação,
            Pessoas e Processos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsappClick("ia-para-empresas-sobre")}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
            >
              Fazer diagnóstico gratuito →
            </a>
            <Link
              to="/avaliacao-maturidade"
              className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3.5 rounded-full font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
            >
              Ver meu score DISTIPP →
            </Link>
          </div>
        </section>

        {/* NAP — nome, endereço e telefone idênticos ao Perfil do Google/Bing.
            Fica aqui, não no rodapé padrão do site (ver nota no topo do arquivo). */}
        <section className="py-10 border-t border-view-line text-center text-[.8rem] text-muted-foreground leading-relaxed">
          <div className="font-display font-bold text-foreground tracking-[.1em] mb-1">VIEW</div>
          <div>Av. Presidente Epitácio Pessoa, 1251, Sala 101, Estados, João Pessoa - PB, 58030-000</div>
          <div>WhatsApp (83) 99322-4878 · admin@reengenhariaview.com.br</div>
        </section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
