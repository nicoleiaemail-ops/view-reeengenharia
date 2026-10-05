import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { ComoAVIEWTrabalha, CasesSection, FAQSection, LinksRelacionados, CTAFinal, NAPFooterBlock } from "@/components/LandingKit";

/**
 * Landing de nicho geográfico para "fábrica de software sob medida em João
 * Pessoa" / "empresa de software em João Pessoa". Mesmo design system do
 * resto do site (ver nota em IAJoaoPessoa.tsx) — a VIEW entra pela busca de
 * software, mas a resposta continua sendo a mesma tese: processo primeiro,
 * sistema depois.
 */

const PATH = "/fabrica-de-software-sob-medida-joao-pessoa";
const TITLE = "Fábrica de Software Sob Medida em João Pessoa | VIEW";
const DESCRIPTION =
  "Software sob medida em João Pessoa: a VIEW desenha o processo primeiro, depois constrói o sistema. Diagnóstico gratuito em 48h.";

const WHATSAPP_URL = whatsappUrl("Olá, eu quero um sistema sob medida para a minha empresa.");

const problemas = [
  {
    titulo: "O sistema pronto não encaixa no seu processo",
    desc: "Você adapta a forma de trabalhar ao software, não o contrário. O que sobra é campo que ninguém preenche e etapa que todo mundo contorna.",
  },
  {
    titulo: "Planilha fazendo o papel de sistema",
    desc: "Nasceu como solução temporária e virou parte crítica da operação, sem controle de versão, sem backup e sem ninguém mais entendendo as fórmulas.",
  },
  {
    titulo: "Sistemas que não conversam entre si",
    desc: "O mesmo dado é digitado duas ou três vezes, em telas diferentes, e cada relatório mostra um número.",
  },
  {
    titulo: "Atendimento lento por falta de informação",
    desc: "A resposta ao cliente depende de alguém abrir três sistemas e uma planilha para confirmar algo que deveria estar numa tela só.",
  },
];

const entregas = [
  "Sistema web ou mobile desenvolvido sob medida para o processo real da sua empresa, não para um fluxo genérico.",
  "Modelagem de dados a partir do que a operação precisa decidir, não do que é fácil de programar.",
  "Integração com os sistemas que você já usa — ERP, CRM, planilhas, WhatsApp — para acabar com a digitação repetida.",
  "Painéis e relatórios que respondem à pergunta de quem decide, não só listam dados.",
  "Implantação por etapas, homologada com a sua equipe a cada entrega — não um projeto de big bang que só aparece pronto meses depois.",
  "Suporte e evolução contínua depois da entrega: o sistema muda conforme o processo muda.",
];

const diferenciais = [
  "Consultoria de processos e desenvolvimento de software no mesmo time — quem desenha o fluxo é quem constrói o sistema, sem telefone sem fio entre consultoria e fábrica de software.",
  "O código e os dados são seus. Sem lock-in: o que é construído para você fica com você.",
  "Implantação por etapas, com homologação da sua equipe a cada módulo entregue.",
  "Atendimento presencial em João Pessoa (PB) e remoto para todo o Brasil.",
];

// TODO: as duas respostas abaixo (preço e prazo) estao em faixa generica --
// substituir por numero real quando definido, sem expor "TODO" no texto
// visivel (o valor so pode ser editado aqui, na string).
const faqs = [
  {
    q: "Quanto custa um software sob medida?",
    a: "Isso depende do tamanho do processo e dos sistemas envolvidos, então não dá para responder com um número fixo aqui. O caminho é fazer o diagnóstico gratuito ou falar direto com a gente no WhatsApp — a partir do seu processo real, você recebe uma resposta sob medida também.",
    links: [
      { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
      { label: "Falar no WhatsApp", href: WHATSAPP_URL, external: true },
    ],
  },
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Varia com a complexidade do processo e com quantos sistemas precisam ser integrados. A implantação é feita por etapas, então os primeiros módulos costumam ficar prontos antes do projeto inteiro terminar. O prazo exato entra na proposta, depois do diagnóstico.",
  },
  {
    q: "Vocês atendem empresas fora de João Pessoa?",
    a: "Sim. A VIEW é de João Pessoa (PB), mas atende empresas de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "Preciso de um sistema sob medida ou um sistema pronto resolve?",
    a: "Se o seu processo é parecido com o de qualquer empresa do seu setor, um sistema pronto pode resolver. Se você já tentou adaptar um sistema genérico e continua contornando ele com planilha, o sob medida costuma sair mais barato no longo prazo. O diagnóstico gratuito ajuda a responder isso antes de você decidir.",
  },
  {
    q: "O código e os dados ficam com a minha empresa?",
    a: "Sim. O sistema é construído para você, e o código e os dados são seus — sem dependência da VIEW para continuar operando.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "É o Mini-diagnóstico DISTIPP: uma conversa de 30 minutos que mapeia onde o processo trava antes de qualquer proposta de sistema. Sem custo e sem compromisso.",
  },
  {
    q: "Vocês desenvolvem para celular e para computador?",
    a: "Sim, conforme o que o processo exigir: aplicativo mobile, sistema web acessado pelo navegador, ou os dois.",
  },
  {
    q: "E se o meu processo mudar depois que o sistema estiver pronto?",
    a: "O sistema é construído para acompanhar a operação, não para travá-la num formato fixo. Ajustes e evolução contínua fazem parte do suporte depois da entrega.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Desenvolvimento de software sob medida",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Desenvolvimento de sistema sob medida em João Pessoa: processo mapeado primeiro, sistema construído depois, com implantação por etapas e código do cliente.",
};

export default function FabricaSoftwareJoaoPessoa() {
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
          breadcrumbJsonLd("Fábrica de Software Sob Medida em João Pessoa", PATH),
          professionalServiceJsonLd,
          faqPageJsonLd(faqs),
        ]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · João Pessoa · PB
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            Fábrica de software sob medida em João Pessoa
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">
            A VIEW é uma empresa de João Pessoa que desenvolve sistemas sob medida para empresas em
            crescimento, de João Pessoa e de todo o Brasil. O diferencial é a ordem: primeiro mapeamos e
            simplificamos o processo real da sua operação, só depois construímos o sistema — nunca o
            contrário.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "fabrica-software-hero" })}
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
            Empresas em crescimento de João Pessoa e de todo o Brasil cujo processo não encaixa mais em
            planilha nem em sistema genérico: construtoras, indústrias, distribuidoras, clínicas e empresas
            de serviços que já tentaram adaptar um software pronto e continuam contornando ele.
          </p>
        </section>

        <CasesSection
          cases={[
            { id: "construtora-iso-9001", tag: "Construção Civil", headline: "ISO 9001 mantido sem retrabalho — registros automáticos em cada etapa da obra" },
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
        <CTAFinal whatsappUrl={WHATSAPP_URL} location="fabrica-software-rodape" />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
