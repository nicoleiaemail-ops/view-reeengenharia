import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BlogCTA } from "@/components/BlogCTA";
import { articles } from "@/content/blog";

const SITE_URL = "https://reengenhariaview.com.br";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog VIEW — Processos, Dados e Evolução Operacional",
    description:
      "Conteúdos sobre processos, maturidade operacional, automação, dados e gestão para empresas em crescimento.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "VIEW",
      url: SITE_URL,
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.datePublished,
      dateModified: a.dateModified ?? a.datePublished,
      author: { "@type": "Organization", name: a.author },
      url: `${SITE_URL}/blog/${a.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  },
];

export default function Blog() {
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
        title="Blog VIEW — Processos, Maturidade Operacional e Gestão"
        description="Artigos práticos sobre processos, maturidade operacional, automação e decisão com dados, para quem dirige uma operação em crescimento. Conteúdo da VIEW."
        path="/blog"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="min-h-[40vh] flex flex-col items-center justify-center px-[7%] pt-28 pb-14 text-center">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Blog</div>
        <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.1] mb-5 max-w-[760px]">
          Ideias para <em className="not-italic text-primary">enxergar e controlar</em> sua operação.
        </h1>
        <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[560px]">
          Processos, maturidade operacional e decisão com dados — na prática, para quem dirige a operação.
        </p>
      </section>

      <section className="px-[7%] pb-20">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-view-line border border-view-line">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              to={`/blog/${a.slug}`}
              className="scroll-reveal bg-background p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors no-underline"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 text-[.65rem] tracking-[.14em] uppercase text-muted-foreground">
                <span className="border border-view-line px-2.5 py-1">{a.tag}</span>
                <span>{a.readingMinutes} min de leitura</span>
              </div>
              <h2 className="font-display font-extrabold text-[1.25rem] leading-[1.2] text-foreground">{a.title}</h2>
              <p className="text-[.88rem] text-muted-foreground leading-relaxed flex-1">{a.description}</p>
              <span className="text-[.82rem] text-primary font-display font-semibold">Ler artigo →</span>
            </Link>
          ))}
        </div>

        <div className="max-w-[900px] mx-auto">
          <BlogCTA location="blog_index" />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
