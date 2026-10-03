import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BlogCTA } from "@/components/BlogCTA";
import NotFound from "./NotFound";
import { getArticle } from "@/content/blog";

const SITE_URL = "https://reengenhariaview.com.br";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  if (!article) return <NotFound />;

  const url = `${SITE_URL}/blog/${article.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified ?? article.datePublished,
      author: { "@type": "Organization", name: article.author, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "VIEW",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
      },
      image: `${SITE_URL}/og-image.png`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEO title={article.seoTitle} description={article.description} path={`/blog/${article.slug}`} jsonLd={jsonLd} />
      <Navbar />

      <article className="px-[7%] pt-28 pb-16">
        <div className="max-w-[720px] mx-auto">
          <div className="text-[.72rem] text-muted-foreground mb-6">
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span>{article.tag}</span>
          </div>

          <div className="flex items-center gap-3 text-[.65rem] tracking-[.14em] uppercase text-muted-foreground mb-5">
            <span className="border border-view-line px-2.5 py-1">{article.tag}</span>
            <span>{article.readingMinutes} min de leitura</span>
          </div>

          <h1 className="font-display font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15] mb-6">
            {article.title}
          </h1>

          <p className="text-[1.02rem] text-foreground/90 leading-relaxed border-l-2 border-primary pl-5 mb-10 italic">
            {article.lead}
          </p>

          <div className="flex flex-col gap-5">
            {article.body.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2 key={i} className="font-display font-extrabold text-[1.35rem] leading-[1.2] mt-6 mb-1">
                    {block.text}
                  </h2>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="flex flex-col gap-3 pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-[.92rem] text-muted-foreground leading-relaxed pl-5 relative">
                        <span className="absolute left-0 top-[.55em] w-2 h-2 bg-primary/60 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="text-[.95rem] text-muted-foreground leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          <section className="mt-14 pt-10 border-t border-view-line">
            <h2 className="font-display font-extrabold text-[1.35rem] mb-6">Perguntas frequentes</h2>
            <div className="flex flex-col gap-6">
              {article.faqs.map((f, i) => (
                <div key={i}>
                  <div className="font-display font-bold text-[.95rem] mb-1.5">{f.q}</div>
                  <div className="text-[.9rem] text-muted-foreground leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14 pt-10 border-t border-view-line">
            <BlogCTA location={`artigo:${article.slug}`} />
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
