import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { ComoAVIEWTrabalha, CasesSection, FAQSection, LinksRelacionados, CTAFinal, NAPFooterBlock } from "@/components/LandingKit";

const PATH = "/agentes-de-ia-whatsapp-joao-pessoa";
const TITLE = "Agentes de IA e IA no WhatsApp em João Pessoa | VIEW";
const DESCRIPTION =
  "Agentes de IA no WhatsApp para empresas em João Pessoa: atendimento, qualificação de leads e agendamento, aplicados sobre o processo certo.";

const WHATSAPP_URL = whatsappUrl("Olá, eu quero saber como aplicar um agente de IA no WhatsApp da minha empresa.");

const problemas = [
  {
    titulo: "Atendimento lento fora do horário comercial",
    desc: "O lead manda mensagem às 22h, ninguém responde, e no dia seguinte ele já falou com o concorrente.",
  },
  {
    titulo: "Equipe repetindo a mesma resposta o dia inteiro",
    desc: "Preço, prazo, forma de pagamento: as mesmas cinco perguntas, dezenas de vezes por dia, tomando o tempo de quem poderia estar resolvendo o que só um humano resolve.",
  },
  {
    titulo: "Agente de IA solto que não resolve nada",
    desc: "A empresa contratou um chatbot genérico, ele responde errado ou trava, e o cliente desiste de falar com a empresa pelo WhatsApp.",
  },
  {
    titulo: "Lead qualificado se perdendo na triagem",
    desc: "Sem critério claro de qualificação, o vendedor gasta tempo com quem não vai fechar e demora para chegar em quem vai.",
  },
];

const entregas = [
  "Agentes de IA no WhatsApp que atendem, respondem dúvidas frequentes e tiram o cliente da fila de espera.",
  "Qualificação automática de leads: o agente pergunta o que o seu time precisa saber antes de passar para um vendedor.",
  "Agendamento direto pelo WhatsApp, sincronizado com a agenda real da equipe — sem ida e volta de mensagem para marcar horário.",
  "Transferência para um humano no momento certo: o agente resolve o repetitivo e entrega para a pessoa o que exige julgamento.",
  "Integração com CRM, planilha ou sistema de agendamento já usado pela empresa.",
  "Medição do resultado: quantos atendimentos o agente resolveu sozinho, quantos leads qualificou, qual o tempo médio de resposta.",
];

const diferenciais = [
  "O agente só entra depois do processo de atendimento estar mapeado — nunca antes. Isso evita o erro mais comum: automatizar uma conversa confusa e deixá-la ainda mais confusa.",
  "Consultoria de processos e implementação de IA no mesmo time, sem intermediário.",
  "Implantação por etapas: o agente começa com um escopo pequeno e comprovado, depois cresce.",
  "Atendimento presencial em João Pessoa (PB) e remoto para todo o Brasil.",
];

const faqs = [
  {
    q: "Preciso de um agente de IA ou uma automação simples resolve?",
    a: "Nem sempre IA é a resposta certa. Se o atendimento segue um roteiro fixo e previsível, uma automação tradicional resolve com menos custo e menos risco. A IA entra quando a conversa varia e exige entender o que o cliente está pedindo.",
  },
  {
    q: "Quanto custa um agente de IA no WhatsApp?",
    a: "Depende do volume de atendimento e da complexidade das conversas que o agente precisa cobrir. A VIEW apresenta o investimento exato na proposta, depois do diagnóstico gratuito — sem orçamento fechado sem entender o processo primeiro.",
  },
  {
    q: "Quanto tempo leva para o agente entrar no ar?",
    a: "A implantação é por etapas: o primeiro escopo, pequeno e testado, costuma entrar no ar antes do projeto completo terminar. O prazo exato depende do que for mapeado no diagnóstico.",
  },
  {
    q: "Vocês atendem empresas fora de João Pessoa?",
    a: "Sim. A VIEW é de João Pessoa (PB) e atende empresas de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "O agente substitui a minha equipe de atendimento?",
    a: "Não. O agente assume o repetitivo e a triagem; quem decide, negocia ou resolve uma exceção continua sendo uma pessoa da sua equipe.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "É o Mini-diagnóstico DISTIPP: uma conversa de 30 minutos que mapeia como o atendimento acontece hoje, antes de qualquer proposta de agente ou automação. Sem custo e sem compromisso.",
  },
  {
    q: "O agente funciona só no WhatsApp ou em outros canais também?",
    a: "O WhatsApp costuma ser o canal prioritário por volume, mas o mesmo agente pode ser estendido para outros canais de atendimento conforme o processo pedir.",
  },
  {
    q: "E se o agente não souber responder alguma coisa?",
    a: "Ele é desenhado para reconhecer o limite do que pode responder sozinho e transferir para um humano nesses casos, em vez de inventar uma resposta.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Agentes de inteligência artificial e automação de atendimento no WhatsApp",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Agentes de IA no WhatsApp para atendimento, qualificação de leads e agendamento, implantados depois do processo de atendimento mapeado.",
};

export default function AgentesIAWhatsappJoaoPessoa() {
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
        jsonLd={[breadcrumbJsonLd("Agentes de IA e IA no WhatsApp em João Pessoa", PATH), professionalServiceJsonLd, faqPageJsonLd(faqs)]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · João Pessoa · PB
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            Agentes de IA e IA no WhatsApp para empresas em João Pessoa
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">
            A VIEW é uma empresa de João Pessoa que implanta agentes de IA no WhatsApp para empresas de todo
            o Brasil. Atendemos negócios que perdem lead por demora na resposta ou que já tentaram um chatbot
            pronto e não funcionou — sempre desenhando o processo de atendimento antes de ligar qualquer IA.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "agentes-ia-whatsapp-hero" })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Fazer diagnóstico gratuito →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O problema
          </h2>
          <div className="flex flex-col gap-3">
            {problemas.map((p) => (
              <div key={p.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{p.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <ComoAVIEWTrabalha />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que entregamos
          </h2>
          <ul className="flex flex-col gap-3">
            {entregas.map((item, i) => (
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
            Para quem é
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            Empresas em crescimento de João Pessoa e de todo o Brasil com volume de atendimento alto o
            suficiente para que a demora custe vendas: serviços, clínicas, indústrias, distribuidoras e
            comércio que recebem pedidos e dúvidas pelo WhatsApp fora do horário da equipe.
          </p>
        </section>

        <CasesSection
          cases={[
            { id: "construtora-gestao-obra", tag: "Construção Civil", headline: "Gestão completa de obra pelo celular — visibilidade total sem uma única ligação" },
            { id: "restaurante-operacao-cozinha", tag: "Alimentação", headline: "Caos na cozinha eliminado — atendimento mais rápido e custos reduzidos" },
          ]}
        />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Diferenciais
          </h2>
          <ul className="flex flex-col gap-3">
            {diferenciais.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[.9rem] text-muted-foreground leading-relaxed">
                <span className="text-view-green font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <FAQSection faqs={faqs} />
        <LinksRelacionados exceto={PATH} />
        <CTAFinal whatsappUrl={WHATSAPP_URL} location="agentes-ia-whatsapp-rodape" />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
