import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import type { Cidade } from "@/content/atendimento";
import {
  FAQSection,
  LinksRelacionados,
  CTAFinal,
  NAPFooterBlock,
  NumerosSection,
  InvestimentoPrazoSection,
  ComoFuncionaDepoisDoDiagnostico,
  CompromissosSection,
  ComoAVIEWTrabalha,
} from "@/components/LandingKit";

/**
 * Template compartilhado pelas 3 páginas de /atendimento/:slug. Diferente de
 * SetorKit, aqui não existe um "children" para conteúdo extra — o pedido do
 * briefing era especificamente que o texto de cada cidade fosse distinto no
 * que é específico da praça (perfil econômico, distância), não numa seção a
 * mais. O que entra por cidade (intro, perfilEconomico, entregas, FAQ) já
 * garante isso.
 */
export function AtendimentoPageTemplate({ cidade }: { cidade: Cidade }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const path = `/atendimento/${cidade.slug}`;
  const whatsapp = whatsappUrl(cidade.whatsappMessage);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: cidade.serviceType,
    provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
    areaServed: { "@type": "City", name: cidade.nome },
    description: cidade.serviceDescription,
  };

  return (
    <>
      <SEO
        title={cidade.title}
        description={cidade.description}
        path={path}
        jsonLd={[breadcrumbJsonLd(cidade.nome, path), serviceJsonLd, faqPageJsonLd(cidade.faqs)]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            {cidade.tagline}
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            {cidade.h1}
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">{cidade.intro}</p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: `atendimento-${cidade.slug}-hero` })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Fazer diagnóstico gratuito →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <NumerosSection numero1={cidade.numero1} numero2={cidade.numero2} />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Perfil econômico local
          </h2>
          <div className="flex flex-col gap-3">
            {cidade.perfilEconomico.map((p) => (
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
            O que a VIEW entrega
          </h2>
          <ul className="flex flex-col gap-3">
            {cidade.entregas.map((item, i) => (
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
            Atendimento presencial e remoto
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            A sede da VIEW fica em João Pessoa (PB), {cidade.distancia}. A equipe se desloca para reuniões
            presenciais nos momentos-chave do projeto — diagnóstico, homologação, entrega — e acompanha o
            restante remotamente, sem perder a proximidade de quem está na mesma região.
          </p>
        </section>

        <InvestimentoPrazoSection whatsappUrl={whatsapp} />
        <ComoFuncionaDepoisDoDiagnostico />
        <CompromissosSection />
        <FAQSection faqs={cidade.faqs} />
        <LinksRelacionados exceto={path} />
        <CTAFinal whatsappUrl={whatsapp} location={`atendimento-${cidade.slug}-rodape`} />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
