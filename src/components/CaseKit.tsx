import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BUSINESS_JSONLD_BASE, SITE_URL, breadcrumbJsonLd } from "@/lib/business";
import type { Caso } from "@/content/casos";

/**
 * Template compartilhado pelas 3 páginas de caso (/casos/:slug). Cada página
 * fina importa isto e passa o H1 e a introdução específicos (que o briefing
 * pede com redação própria, não derivada mecanicamente do headline que já
 * existe em /casos) junto com o `Caso` da fonte única em src/content/casos.ts.
 */

export interface CasePageProps {
  caso: Caso;
  path: string;
  title: string;
  description: string;
  h1: string;
  setor: string;
  intro: string;
}

export function CasePageTemplate({ caso: c, path, title, description, h1, setor, intro }: CasePageProps) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description,
    about: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
    author: { "@type": "Organization", name: BUSINESS_JSONLD_BASE.name },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_JSONLD_BASE.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    image: `${SITE_URL}/og-image.png`,
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={path}
        jsonLd={[breadcrumbJsonLd(h1, path), articleJsonLd]}
      />
      <Navbar />

      <section className="px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[820px] mx-auto">
          <div className={`inline-flex items-center gap-2 text-[.6rem] tracking-[.2em] uppercase font-bold ${c.accentColor} ${c.tagBg} border border-current/20 rounded-full px-4 py-1.5 mb-6`}>
            <span>{c.icon}</span> {c.tag}
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.5vw,2.8rem)] leading-[1.15] mb-5">{h1}</h1>
          <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[620px] mx-auto">{intro}</p>
        </div>
      </section>

      <div className="max-w-[820px] mx-auto px-[6%] pb-16">
        <section className="py-8 border-t border-view-line grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-[.6rem] tracking-[.18em] uppercase text-muted-foreground mb-1.5">Cliente</div>
            <div className="font-display font-bold text-[.95rem]">{c.client}</div>
            <div className="text-[.78rem] text-muted-foreground">{c.role}</div>
          </div>
          <div>
            <div className="text-[.6rem] tracking-[.18em] uppercase text-muted-foreground mb-1.5">Setor</div>
            <div className="font-display font-bold text-[.95rem]">{setor}</div>
          </div>
        </section>

        <section className="py-8 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-4">O problema</h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed">{c.challenge}</p>
        </section>

        <section className="py-8 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-6">O que a VIEW fez</h2>
          <ol className="flex flex-col gap-5">
            <li className="flex gap-4">
              <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">1</span>
              <div>
                <div className="font-display font-bold text-foreground text-[.92rem] mb-1">Diagnóstico</div>
                <div className="text-muted-foreground text-[.85rem] leading-relaxed">
                  Mapeamento do processo real da operação, para entender onde ele travava antes de propor
                  qualquer ferramenta.
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">2</span>
              <div>
                <div className="font-display font-bold text-foreground text-[.92rem] mb-1">Redesenho do processo</div>
                <div className="text-muted-foreground text-[.85rem] leading-relaxed">
                  As etapas que não agregavam saíram; o que ficou virou fluxo escrito, padronizado e
                  replicável.
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">3</span>
              <div>
                <div className="font-display font-bold text-foreground text-[.92rem] mb-1">Tecnologia</div>
                <div className="text-muted-foreground text-[.85rem] leading-relaxed">{c.solution}</div>
              </div>
            </li>
          </ol>
        </section>

        <section className="py-8 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-6">Resultados</h2>
          {/* TODO: números específicos deste caso (ex.: % de redução de retrabalho,
              tempo exato economizado por ciclo de auditoria) -- só o que já está
              documentado publicamente em /casos entra aqui; nada foi inventado. */}
          <ul className="flex flex-col gap-3">
            {c.results.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[.9rem] text-foreground">
                <span className={`w-5 h-5 rounded-sm border ${c.borderColor} flex items-center justify-center text-[.6rem] ${c.accentColor} flex-shrink-0 mt-0.5`}>
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="py-8 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-6">Depoimento</h2>
          <blockquote className="border-l-2 border-foreground/15 pl-5">
            <p className="text-[.92rem] text-foreground leading-relaxed italic mb-4">"{c.quote}"</p>
            <footer className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-secondary border border-view-line flex items-center justify-center font-display font-extrabold text-[.8rem] ${c.accentColor}`}>
                {c.client.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-display font-bold text-[.85rem]">{c.client}</div>
                <div className="text-[.72rem] text-muted-foreground">{c.role}</div>
              </div>
            </footer>
          </blockquote>
        </section>

        <section className="py-8 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-5">Tecnologias e soluções usadas</h2>
          <div className="flex flex-wrap gap-2">
            {c.solutions_used.map((s) => (
              <span key={s} className={`text-[.72rem] tracking-[.06em] ${c.accentColor} ${c.tagBg} border border-current/20 rounded-full px-3.5 py-1.5`}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line text-center">
          <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-3">
            Sua operação pode ser o próximo caso.
          </h2>
          <p className="text-[.88rem] text-muted-foreground leading-relaxed max-w-[460px] mx-auto mb-7">
            Diagnóstico gratuito em 48h. Entendemos sua operação antes de propor qualquer solução.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/#diagnostico"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
            >
              Diagnóstico gratuito →
            </a>
            <Link
              to="/casos"
              className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3.5 rounded-full font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
            >
              Ver todos os casos →
            </Link>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
