import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { getCaso } from "@/content/casos";
import { setores, type Setor } from "@/content/setores";
import {
  FAQSection,
  LinksRelacionados,
  CTAFinal,
  NAPFooterBlock,
  NumerosSection,
  InvestimentoPrazoSection,
  ComoFuncionaDepoisDoDiagnostico,
  CompromissosSection,
  CaseDestaque,
  ComoAVIEWTrabalha,
} from "@/components/LandingKit";

/**
 * Template compartilhado pelas 5 páginas de /setores/:slug. Cada página é só
 * um wrapper fino (setor + children opcional para conteúdo extra específico
 * daquele setor — ex.: a linha do tempo de implantação ISO 9001, só em
 * Construtoras) — mesmo padrão de src/components/CaseKit.tsx para /casos/:slug.
 */
export function SetorPageTemplate({ setor, children }: { setor: Setor; children?: ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const path = `/setores/${setor.slug}`;
  const whatsapp = whatsappUrl(setor.whatsappMessage);
  const casos = setor.casoIds.map((id) => getCaso(id)).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: setor.serviceType,
    provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
    areaServed: BUSINESS_JSONLD_BASE.areaServed,
    description: setor.serviceDescription,
  };

  return (
    <>
      <SEO
        title={setor.title}
        description={setor.description}
        path={path}
        jsonLd={[breadcrumbJsonLd(setor.nome, path), serviceJsonLd, faqPageJsonLd(setor.faqs)]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            {setor.tagline}
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            {setor.h1}
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">{setor.intro}</p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: `setor-${setor.slug}-hero` })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Fazer diagnóstico gratuito →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <NumerosSection numero1={setor.numero1} numero2={setor.numero2} />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Dores típicas do setor
          </h2>
          <div className="flex flex-col gap-3">
            {setor.dores.map((d) => (
              <div key={d.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{d.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{d.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <ComoAVIEWTrabalha />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que a VIEW entrega
          </h2>
          <ul className="flex flex-col gap-3">
            {setor.entregas.map((item, i) => (
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

        {casos.map((c) => (
          <CaseDestaque key={c.id} caso={{ id: c.id, tag: c.tag, headline: c.headline }} path={`/casos/${c.id}`} />
        ))}

        {children}

        <InvestimentoPrazoSection whatsappUrl={whatsapp} />
        <ComoFuncionaDepoisDoDiagnostico />
        <CompromissosSection />
        <FAQSection faqs={setor.faqs} />
        <LinksRelacionados exceto={path} />
        <CTAFinal whatsappUrl={whatsapp} location={`setor-${setor.slug}-rodape`} />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

/**
 * Seção curta para a home listando os 5 setores — mesmo padrão de
 * SolucoesJoaoPessoa.tsx para as landings de nicho geográfico.
 */
export function SetoresSection() {
  return (
    <section className="py-10 md:py-14 px-[7%] border-t border-view-line">
      <div className="text-center mb-8">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">
          Soluções por segmento
        </div>
        <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.15]">Setores</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[920px] mx-auto">
        {setores.map((s) => (
          <Link
            key={s.slug}
            to={`/setores/${s.slug}`}
            className="group flex items-center justify-between gap-3 bg-foreground/[.02] border border-foreground/[.08] rounded-lg px-5 py-4 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
          >
            <span className="text-[.86rem] font-display font-semibold text-foreground">{s.nome}</span>
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
