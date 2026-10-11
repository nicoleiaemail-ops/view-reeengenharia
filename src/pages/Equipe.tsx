import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BUSINESS_JSONLD_BASE, BUSINESS_FOUNDING_DATE, breadcrumbJsonLd } from "@/lib/business";

const PATH = "/equipe";
const TITLE = "Equipe VIEW — Reengenharia de Negócios";
const DESCRIPTION =
  "Conheça a equipe da VIEW: formada em engenharia de produção, com vivência em grandes indústrias como Baterias Moura e Alpargatas.";

/**
 * O briefing pediu "cards de equipe (placeholder) + Person JSON-LD". Sem
 * nome, cargo e foto reais de cada pessoa, um Person JSON-LD seria uma
 * entidade fictícia no dado estruturado — a mesma razão pela qual
 * BUSINESS_FOUNDER_NAME fica undefined em business.ts em vez de um placeholder.
 * Por isso esta página usa frentes de atuação (o que a equipe faz), não
 * pessoas inventadas, e não emite schema.org/Person. Quando houver nome,
 * cargo e foto reais, trocar `frentes` por uma lista de pessoas e acrescentar
 * um Person por card, com `worksFor` apontando para a Organization da VIEW.
 */
const frentes = [
  {
    icon: "🎯",
    titulo: "Liderança e estratégia",
    desc: "Direção do diagnóstico, da proposta e da relação com cada empresa parceira ao longo do projeto.",
  },
  {
    icon: "🔎",
    titulo: "Engenharia de processos",
    desc: "Mapeamento do processo real, identificação de gargalos e desenho do fluxo que sustenta o sistema.",
  },
  {
    icon: "💻",
    titulo: "Desenvolvimento de sistemas e automação",
    desc: "Construção dos sistemas sob medida, integrações e automações definidas no projeto.",
  },
  {
    icon: "📊",
    titulo: "Dados e indicadores",
    desc: "Estruturação dos dashboards e indicadores que acompanham o resultado antes e depois do projeto.",
  },
];

export default function Equipe() {
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
          breadcrumbJsonLd("Equipe", PATH),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            ...BUSINESS_JSONLD_BASE,
            foundingDate: BUSINESS_FOUNDING_DATE,
            description:
              "Equipe formada em engenharia de produção, com vivência em grandes indústrias, dedicada a levar excelência operacional a empresas em crescimento.",
          },
        ]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[700px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · Equipe
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            Quem está por trás da VIEW
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto">
            Uma equipe formada em engenharia de produção, com mais de cinco anos de vivência em grandes
            indústrias como Baterias Moura e Alpargatas, hoje dedicada a levar a mesma excelência operacional
            para empresas em crescimento em todo o Brasil.
          </p>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6 text-center">
            Frentes de atuação
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {frentes.map((f) => (
              <div key={f.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-5">
                <div className="text-[1.3rem] mb-2" aria-hidden="true">{f.icon}</div>
                <div className="font-display font-bold text-[.92rem] text-foreground mb-1">{f.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line text-center">
          <p className="text-[.9rem] text-muted-foreground leading-relaxed max-w-[600px] mx-auto mb-6">
            Saiba mais sobre a origem da VIEW e a metodologia que a equipe aplica em cada projeto.
          </p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3 rounded-full font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
          >
            Conhecer a história da VIEW →
          </Link>
        </section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
