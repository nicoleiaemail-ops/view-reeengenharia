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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="scroll-reveal rounded-2xl p-8 flex flex-col gap-4 border border-primary/25 bg-gradient-to-br from-[#0d1f4e] to-background hover:-translate-y-1 transition-transform">
            <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-[1.5rem] bg-primary/20">🎯</div>
            <div className="text-[.6rem] tracking-[.2em] uppercase text-primary/80">Missão</div>
            <div className="text-[.82rem] text-muted-foreground leading-relaxed">
              Desenvolver empresas parceiras por meio de uma cultura organizacional de excelência operacional enxuta e tecnológica, contribuindo para um crescimento orientado por dados, próspero e sustentável.
            </div>
          </div>
          <div className="scroll-reveal rounded-2xl p-8 flex flex-col gap-4 border border-accent/20 bg-gradient-to-br from-[#1a120a] to-background hover:-translate-y-1 transition-transform" style={{ transitionDelay: ".1s" }}>
            <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-[1.5rem] bg-accent/20">👁️</div>
            <div className="text-[.6rem] tracking-[.2em] uppercase text-accent/80">Visão</div>
            <div className="text-[.82rem] text-muted-foreground leading-relaxed">
              Influenciar e construir uma nova geração de empresas brasileiras organizadas, eficientes e guiadas por dados a partir da reengenharia operacional e transformação digital.
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="scroll-reveal mb-16">
          <div className="text-center mb-10">
            <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">Valores da VIEW</div>
            <p className="text-[.85rem] text-muted-foreground max-w-[500px] mx-auto">Valores definem como a empresa toma decisões.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Clareza antes da tecnologia", desc: "Não automatizamos caos. Primeiro entendemos e organizamos o processo." },
              { num: "02", title: "Dados antes de opinião", desc: "Decisões devem ser tomadas com base em informação real, não em intuição." },
              { num: "03", title: "Simplicidade operacional", desc: "Processos eficientes são simples, claros e replicáveis." },
              { num: "04", title: "Melhoria contínua", desc: "Acreditamos no princípio Kaizen: pequenas melhorias constantes criam grandes transformações." },
              { num: "05", title: "Eficiência acima de complexidade", desc: "A melhor solução é aquela que resolve o problema com o menor desperdício possível." },
              { num: "06", title: "Crescimento sustentável", desc: "Empresas devem crescer com estrutura, não com improviso." },
            ].map((v, i) => (
              <div key={i} className="bg-foreground/[.03] border border-view-line rounded-xl p-6 hover:bg-primary/[.04] hover:border-primary/15 transition-all">
                <div className="font-display font-bold text-[.65rem] tracking-[.1em] text-primary/60 mb-3">VALOR {v.num}</div>
                <h3 className="font-display font-bold text-[.95rem] text-foreground mb-2">{v.title}</h3>
                <p className="text-[.8rem] text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Princípios */}
        <div className="scroll-reveal" style={{ transitionDelay: ".15s" }}>
          <div className="text-center mb-10">
            <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">Princípios da VIEW</div>
            <p className="text-[.85rem] text-muted-foreground max-w-[500px] mx-auto">Esses princípios mostram como trabalhamos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Fazer o básico extremamente bem", desc: "Documentação, padronização, processos claros e rastreáveis são a base de qualquer operação eficiente." },
              { num: "02", title: "Estrutura antes de escala", desc: "Empresas que crescem sem processo criam caos operacional. Primeiro organizamos, depois escalamos." },
              { num: "03", title: "Processos antes de ferramentas", desc: "Tecnologia não resolve desorganização. Processos bem definidos vêm antes da digitalização." },
              { num: "04", title: "Visibilidade gera controle", desc: "Você não pode melhorar aquilo que não consegue medir. Por isso priorizamos dados, indicadores e rastreabilidade." },
              { num: "05", title: "Automação para liberar inteligência humana", desc: "Automatizamos tarefas operacionais para que pessoas foquem em decisões estratégicas." },
              { num: "06", title: "Empresas inteligentes operam com dados", desc: "Organizações modernas tomam decisões com base em indicadores claros e acessíveis em tempo real." },
            ].map((p, i) => (
              <div key={i} className="bg-view-green/[.06] border border-view-green/20 rounded-xl p-6 hover:bg-view-green/[.10] hover:border-view-green/30 transition-all">
                <div className="font-display font-bold text-[.65rem] tracking-[.1em] text-view-green/70 mb-3">PRINCÍPIO {p.num}</div>
                <h3 className="font-display font-bold text-[.95rem] text-foreground mb-2">{p.title}</h3>
                <p className="text-[.8rem] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat highlight */}
      <section className="py-12 px-[7%]">
        <div className="scroll-reveal max-w-[500px] mx-auto text-center bg-primary/[.06] border border-primary/20 rounded-2xl py-8 px-10">
          <span className="font-display font-extrabold text-[clamp(2.5rem,5vw,3.5rem)] text-primary leading-none">+50%</span>
          <div className="text-[.85rem] text-foreground font-display font-bold mt-2">aumento de produtividade</div>
          <div className="text-[.75rem] text-muted-foreground mt-1">média nas operações atendidas pela VIEW</div>
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
