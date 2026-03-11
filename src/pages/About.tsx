import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ViewLogo } from "@/components/ViewLogo";

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-[7%] pt-28 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsla(225,33%,95%,.025) 1px, transparent 1px), linear-gradient(90deg, hsla(225,33%,95%,.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] rounded-full bg-primary/[.06] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[800px]">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Sobre a VIEW</div>
          <h1 className="font-display font-extrabold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] mb-6">
            Nascemos dentro de<br />grandes operações.<br />
            <em className="not-italic text-accent">Entregamos isso para você.</em>
          </h1>
          <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
            Três engenheiros de produção que passaram anos transformando operações industriais de alta performance — e decidiram levar esses mesmos princípios para empresas em crescimento.
          </p>
        </div>
      </section>

      {/* Origem */}
      <section className="px-[7%] py-28 border-t border-view-line grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="scroll-reveal">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Nossa origem</div>
          <h2 className="font-display font-extrabold text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.1] mb-6">
            De dentro das maiores<br />indústrias do Brasil<br /><em className="not-italic text-accent">para o seu negócio.</em>
          </h2>
          <div className="text-[.92rem] text-muted-foreground leading-relaxed space-y-4 [&_strong]:text-foreground">
            <p>A VIEW nasceu da experiência direta de três engenheiros de produção que atuaram por mais de cinco anos em empresas como <strong>Baterias Moura</strong> e <strong>Alpargatas</strong>.</p>
            <p>Nesse tempo, vivenciaram como <strong>operações bem estruturadas, processos claros e uso inteligente de dados</strong> transformam o desempenho de uma empresa.</p>
            <p>Foi daí que surgiu a VIEW: com o propósito de levar os mesmos princípios de excelência operacional para empresas que estão construindo sua estrutura agora.</p>
          </div>
        </div>
        <div className="scroll-reveal flex flex-col gap-4" style={{ transitionDelay: ".15s" }}>
          {[
            { icon: "🏭", title: "Formação industrial de alto nível", desc: "Engenharia de produção com vivência em ambientes industriais de alta performance." },
            { icon: "🌍", title: "Experiência em empresas de referência", desc: "Baterias Moura, Alpargatas e projetos internacionais." },
            { icon: "🎯", title: "Propósito claro desde o início", desc: "Fazer empresas em crescimento operarem com a mesma inteligência das grandes." },
            { icon: "📍", title: "Presença regional, visão global", desc: "Atuamos em PB, PE e RN — com metodologia testada em operações nacionais e internacionais." },
          ].map((c, i) => (
            <div key={i} className="bg-foreground/[.03] border border-view-line rounded-[10px] p-5 flex gap-4 items-start hover:bg-primary/[.06] hover:border-primary/20 hover:translate-x-1 transition-all">
              <div className="text-[1.3rem] flex-shrink-0 mt-0.5">{c.icon}</div>
              <div>
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{c.title}</div>
                <div className="text-[.79rem] text-muted-foreground leading-relaxed">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="scroll-reveal text-center mb-14">
            <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Como trabalhamos</div>
            <h2 className="font-display font-extrabold text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.1] mb-4">
              Nossa metodologia:<br /><em className="not-italic text-primary">estrutura antes de tecnologia</em>
            </h2>
            <p className="text-[.9rem] text-muted-foreground max-w-[580px] mx-auto leading-relaxed">
              Não chegamos com solução pronta. Chegamos para entender — e só depois estruturar, automatizar e escalar.
            </p>
          </div>

          <div className="flex flex-col relative">
            <div className="absolute left-[27px] top-5 bottom-5 w-px bg-gradient-to-b from-primary/50 to-primary/10 pointer-events-none" />
            {[
              { num: "01", title: "Diagnóstico gratuito", desc: "Mapeamos sua operação atual. Resultado em 48h.", tag: "Gratuito · 48h" },
              { num: "02", title: "Mapeamento e redesign", desc: "Documentamos cada fluxo. Eliminamos o que não agrega. Padronizamos o replicável.", tag: "Clareza antes de automação" },
              { num: "03", title: "Automação e sistema sob medida", desc: "Automatizamos o repetitivo e desenvolvemos o sistema que sua operação precisa.", tag: "iOS · Android · Desktop" },
              { num: "04", title: "Dashboards em tempo real", desc: "Indicadores acessíveis de qualquer lugar, em tempo real.", tag: "KPIs reais · Tempo real" },
              { num: "05", title: "Acompanhamento contínuo", desc: "Não entregamos e saímos. Acompanhamos e garantimos resultados.", tag: "Parceria de longo prazo" },
            ].map((s, i) => (
              <div key={i} className="scroll-reveal flex items-start gap-6 py-7 border-b border-foreground/[.06] last:border-b-0" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-full bg-primary/12 border border-primary/35 flex items-center justify-center font-display font-extrabold text-[.75rem] tracking-[.08em] text-primary/70 flex-shrink-0">
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-foreground mb-2 leading-tight">{s.title}</h3>
                  <p className="text-[.87rem] text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                  <span className="inline-block text-[.6rem] tracking-[.12em] uppercase text-primary/80 bg-primary/[.08] border border-primary/20 rounded-full py-1 px-3">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVV */}
      <section className="py-28 px-[7%]">
        <div className="scroll-reveal text-center mb-14">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">O que nos move</div>
          <h2 className="font-display font-extrabold text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.1]">Missão, Visão e Valores</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🎯", tag: "Missão", title: "Desenvolver empresas por meio da excelência operacional", desc: "Construir uma cultura organizacional enxuta e orientada por dados.", border: "border-primary/25", bg: "bg-gradient-to-br from-[#0d1f4e] to-background", tagColor: "text-primary/80" },
            { icon: "👁️", tag: "Visão", title: "Influenciar uma nova geração de empresas brasileiras", desc: "Ser a referência em reengenharia operacional e transformação digital.", border: "border-accent/20", bg: "bg-gradient-to-br from-[#1a120a] to-background", tagColor: "text-accent/80" },
            { icon: "⚡", tag: "Valores", title: "Como tomamos cada decisão", desc: "", border: "border-view-green/20", bg: "bg-gradient-to-br from-[#0a1e14] to-background", tagColor: "text-view-green/70", values: ["Clareza antes da tecnologia", "Dados antes de opinião", "Simplicidade operacional", "Melhoria contínua (Kaizen)", "Crescimento sustentável"] },
          ].map((c, i) => (
            <div key={i} className={`scroll-reveal rounded-2xl p-8 flex flex-col gap-4 border ${c.border} ${c.bg} hover:-translate-y-1 transition-transform`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-[1.5rem] bg-primary/20">{c.icon}</div>
              <div className={`text-[.6rem] tracking-[.2em] uppercase ${c.tagColor}`}>{c.tag}</div>
              <div className="font-display font-extrabold text-[1.05rem] text-foreground leading-tight">{c.title}</div>
              {c.desc && <div className="text-[.82rem] text-muted-foreground leading-relaxed">{c.desc}</div>}
              {c.values && (
                <div className="flex flex-col gap-2.5 mt-1">
                  {c.values.map((v, vi) => (
                    <div key={vi} className="flex items-center gap-3 text-[.82rem] text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-view-green flex-shrink-0" />{v}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-[7%] text-center border-t border-view-line bg-secondary">
        <h2 className="scroll-reveal font-display font-extrabold text-[clamp(1.7rem,3vw,2.4rem)] mb-4">
          Pronto para enxergar sua empresa?
        </h2>
        <p className="scroll-reveal text-[.95rem] text-muted-foreground max-w-[480px] mx-auto mb-10 leading-relaxed" style={{ transitionDelay: ".1s" }}>
          Diagnóstico gratuito, sem compromisso.<br />Entendemos sua operação antes de propor qualquer solução.
        </p>
        <div className="scroll-reveal flex gap-4 justify-center flex-wrap" style={{ transitionDelay: ".2s" }}>
          <Link to="/#diagnostico" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-85 transition-opacity">
            👁️ Solicitar diagnóstico grátis
          </Link>
          <Link to="/" className="text-foreground border border-view-line px-8 py-4 rounded-sm font-display font-bold text-[.86rem] tracking-[.07em] no-underline hover:border-foreground/35 transition-colors">
            ← Voltar ao início
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default About;
