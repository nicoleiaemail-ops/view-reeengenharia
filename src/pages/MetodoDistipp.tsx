import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { FAQSection, NAPFooterBlock } from "@/components/LandingKit";

/**
 * Página de autoridade do método DISTIPP (Parte 4). O conteúdo dos 7 pilares
 * (letra, título, headline, descrição) é o mesmo já publicado em
 * src/components/DISTIP.tsx (home) — reescrito aqui em prosa mais longa, com
 * sintomas típicos por pilar, mas sem contradizer o que já está no ar.
 */

const PATH = "/metodo-distipp";
const TITLE = "Método DISTIPP: os 7 Pilares da Maturidade | VIEW";
const DESCRIPTION =
  "Conheça o DISTIPP, o método da VIEW para diagnosticar a maturidade operacional da sua empresa em 7 pilares, antes de qualquer tecnologia.";

const WHATSAPP_URL = whatsappUrl("Olá, eu quero entender melhor o método DISTIPP da VIEW.");

interface Pilar {
  letra: string;
  titulo: string;
  headline: string;
  desc: string;
  sinal: string;
  sintomas: string[];
}

const pilares: Pilar[] = [
  {
    letra: "D",
    titulo: "Dados",
    headline: "Decisões baseadas em evidências",
    desc: "Transformar dados brutos em indicadores que orientam a decisão com precisão, em vez de decidir por intuição ou por quem fala mais alto na reunião.",
    sinal: "Você para de decidir por intuição.",
    sintomas: [
      "Cada área tem seu próprio número para a mesma pergunta.",
      "Decisão importante é tomada \"no sentimento\", sem indicador para sustentar.",
      "Ninguém sabe dizer, com dado, se o mês foi bom ou ruim.",
    ],
  },
  {
    letra: "I",
    titulo: "Integração",
    headline: "Operação conectada e fluida",
    desc: "Eliminar silos entre departamentos e criar fluxos de trabalho integrados, para que a informação circule sem depender de alguém repassar manualmente.",
    sinal: "A informação chega antes da cobrança.",
    sintomas: [
      "Um setor só sabe o que outro fez quando algo dá errado.",
      "O mesmo dado é digitado de novo em cada sistema.",
      "Combinados importantes vivem só na cabeça de quem participou da reunião.",
    ],
  },
  {
    letra: "S",
    titulo: "Sistemas",
    headline: "Tecnologia alinhada ao negócio",
    desc: "Sistemas de gestão configurados para refletir a realidade da operação, em vez de forçar a operação a se adaptar a um sistema genérico.",
    sinal: "Acaba a planilha paralela ao ERP.",
    sintomas: [
      "Existe uma planilha \"por fora\" do sistema para o que ele não dá conta.",
      "Ninguém confia 100% no relatório que o sistema gera.",
      "Um módulo do sistema foi comprado e nunca chegou a ser usado de verdade.",
    ],
  },
  {
    letra: "T",
    titulo: "Tecnologia",
    headline: "Automação inteligente",
    desc: "Digitalizar e automatizar processos para escalar sem aumentar o custo fixo na mesma proporção que o volume de trabalho.",
    sinal: "Mais volume sem mais gente.",
    sintomas: [
      "Crescer em pedidos significa, automaticamente, contratar mais gente.",
      "Tarefa repetitiva de copiar e conferir dado consome horas por semana.",
      "A empresa já tentou automatizar algo e o projeto não foi adiante.",
    ],
  },
  {
    letra: "I",
    titulo: "Inovação",
    headline: "Evolução contínua",
    desc: "Cultura de melhoria constante, com espaço e orçamento reservado para testar — não apenas reagir quando o problema já aconteceu.",
    sinal: "Mudança deixa de acontecer só em crise.",
    sintomas: [
      "A última mudança de processo só veio depois de um problema grave.",
      "Ideia de melhoria da equipe não tem onde ser registrada nem avaliada.",
      "Ninguém revisita um processo que \"sempre funcionou assim\".",
    ],
  },
  {
    letra: "P",
    titulo: "Pessoas",
    headline: "Equipes de alta performance",
    desc: "Times alinhados, autônomos e orientados por resultados claros, com desempenho visível e corrigível com base em fato, não em impressão.",
    sinal: "Reconhecer e corrigir com base em fato.",
    sintomas: [
      "Avaliação de desempenho é subjetiva, sem indicador por trás.",
      "Dois gestores diferentes avaliam a mesma pessoa de formas opostas.",
      "Ninguém sabe dizer, com dado, quem está performando acima ou abaixo da média.",
    ],
  },
  {
    letra: "P",
    titulo: "Processos",
    headline: "Fluxos padronizados e escaláveis",
    desc: "Documentação clara e execução consistente, sem depender da memória ou da presença de uma pessoa específica para o trabalho acontecer.",
    sinal: "O processo não depende de quem está na sala.",
    sintomas: [
      "Quando uma pessoa-chave sai de férias, aquele processo trava.",
      "Cada pessoa executa a mesma tarefa de um jeito diferente.",
      "Não existe um documento único descrevendo como o processo funciona.",
    ],
  },
];

const faqs = [
  {
    q: "O que é a metodologia DISTIPP?",
    a: "DISTIPP é o framework de diagnóstico da VIEW. O nome vem das iniciais das sete dimensões avaliadas — Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas, Processos — e mede a maturidade operacional da empresa em cada uma delas.",
  },
  {
    q: "Como funciona o diagnóstico DISTIPP?",
    a: "Existem duas versões: a Avaliação de Maturidade, um questionário online gratuito com resultado imediato na tela, e o Mini-diagnóstico DISTIPP, uma conversa de 30 minutos com a equipe da VIEW, que aprofunda o resultado antes de qualquer proposta.",
    links: [{ label: "Fazer a avaliação online", href: "/avaliacao-maturidade" }],
  },
  {
    q: "Por que sete dimensões e não só tecnologia?",
    a: "Porque o gargalo raramente está só na tecnologia. Uma empresa pode ter o melhor sistema do mercado e continuar travada em Pessoas ou Processos. O DISTIPP mede as sete para revelar qual dimensão está travando as outras.",
  },
  {
    q: "O DISTIPP serve para qualquer tamanho de empresa?",
    a: "É mais útil para empresas que já saíram do operacional 100% manual e sentem que a estrutura não acompanhou o crescimento — tipicamente a partir de algumas dezenas de pessoas, quando o controle informal deixa de funcionar.",
  },
  {
    q: "O diagnóstico DISTIPP já é uma proposta de venda?",
    a: "Não. O resultado é um mapa de onde a empresa está, com a dimensão mais fraca e uma recomendação de por onde começar. Virar projeto é uma decisão separada, que o cliente toma depois de ver o diagnóstico.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Metodologia DISTIPP",
  description:
    "Framework de diagnóstico de maturidade operacional empresarial em sete dimensões: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos.",
  url: `https://reengenhariaview.com.br${PATH}`,
  hasDefinedTerm: pilares.map((p) => ({
    "@type": "DefinedTerm",
    name: p.titulo,
    description: p.desc,
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como funciona o diagnóstico DISTIPP",
  description: "As etapas do diagnóstico de maturidade operacional DISTIPP da VIEW.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Responder", text: "Questionário online gratuito ou conversa de 30 minutos com a equipe." },
    { "@type": "HowToStep", position: 2, name: "Receber o score", text: "Resultado nas sete dimensões, com a mais fraca destacada." },
    { "@type": "HowToStep", position: 3, name: "Entender a recomendação", text: "Por onde começar, antes de qualquer proposta de sistema ou automação." },
  ],
};

export default function MetodoDistipp() {
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
          breadcrumbJsonLd("Método DISTIPP", PATH),
          { "@context": "https://schema.org", "@type": "Organization", ...BUSINESS_JSONLD_BASE },
          professionalServiceJsonLd,
          howToJsonLd,
          faqPageJsonLd(faqs),
        ]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            Metodologia exclusiva VIEW
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            O método DISTIPP: os 7 pilares da maturidade operacional
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[620px] mx-auto">
            Antes de propor sistema, automação ou IA, a VIEW mede onde a operação trava. O DISTIPP é o
            framework que torna essa medição objetiva, em sete dimensões.
          </p>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que é o DISTIPP
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed mb-4">
            DISTIPP é o framework de diagnóstico da VIEW. O nome vem das iniciais das sete dimensões
            avaliadas: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos. Em vez de
            tratar sintomas isolados, ele revela qual dimensão está travando as outras — e em que ordem
            resolver.
          </p>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            Nenhum projeto da VIEW começa sem esse diagnóstico. É o que evita vender sistema, automação ou
            IA para um problema que, na raiz, é de processo ou de dado.
          </p>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-8">
            Os 7 pilares
          </h2>
          <div className="flex flex-col gap-8">
            {pilares.map((p) => (
              <div key={p.titulo + p.headline} className="border-l-2 border-primary/30 pl-5">
                <h3 className="font-display font-extrabold text-[1.15rem] leading-[1.2] mb-1">
                  <span className="text-primary">{p.letra}</span> · {p.titulo}
                </h3>
                <p className="text-[.8rem] font-display font-semibold text-foreground/80 mb-2">{p.headline}</p>
                <p className="text-[.88rem] text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-[.76rem] text-view-green font-medium bg-view-green/10 rounded-full px-3 py-1 mb-3">
                  ✓ {p.sinal}
                </div>
                <div className="text-[.68rem] tracking-[.1em] uppercase text-muted-foreground mb-2">
                  Sintomas comuns quando este pilar está fraco
                </div>
                <ul className="flex flex-col gap-1.5">
                  {p.sintomas.map((s) => (
                    <li key={s} className="text-[.84rem] text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="text-primary/60 flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Como funciona o diagnóstico
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed mb-4">
            Existem duas portas de entrada, com a mesma base: a <strong className="text-foreground">Avaliação
            de Maturidade</strong>, um questionário online gratuito com score imediato na tela, e o{" "}
            <strong className="text-foreground">Mini-diagnóstico DISTIPP</strong>, uma conversa de 30 minutos
            que aprofunda o resultado antes de qualquer proposta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/avaliacao-maturidade"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
            >
              Fazer a avaliação online →
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(EVENTS.whatsappClick, { location: "metodo-distipp" })}
              className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3.5 rounded-full font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
            >
              Agendar o diagnóstico completo →
            </a>
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Para quem é
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            Empresas em crescimento de João Pessoa e de todo o Brasil que sentem que a estrutura não
            acompanhou o tamanho da operação — quando o controle informal (planilha, WhatsApp, memória de
            alguém específico) deixa de dar conta do volume de trabalho.
          </p>
        </section>

        <FAQSection faqs={faqs} />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
