import { Link } from "react-router-dom";
import { Database, Link2, Monitor, Cpu, Lightbulb, Users, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    letter: "D",
    title: "Dados",
    headline: "Decisões baseadas em evidências",
    desc: "Transforme dados brutos em insights estratégicos que orientam suas decisões com precisão.",
    benefit: "Reduza incertezas e tome decisões 3x mais rápido",
    icon: Database,
    color: "from-primary/25 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
  },
  {
    letter: "I",
    title: "Integração",
    headline: "Operação conectada e fluida",
    desc: "Elimine silos entre departamentos e crie fluxos de trabalho integrados.",
    benefit: "Aumente a velocidade de resposta em até 40%",
    icon: Link2,
    color: "from-view-green/25 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
    bgAccent: "bg-view-green/10",
  },
  {
    letter: "S",
    title: "Sistemas",
    headline: "Tecnologia alinhada ao negócio",
    desc: "Sistemas de gestão configurados para refletir a realidade da sua operação.",
    benefit: "Elimine retrabalho e retrabalhos manuais",
    icon: Monitor,
    color: "from-view-gold/25 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
    bgAccent: "bg-view-gold/10",
  },
  {
    letter: "T",
    title: "Tecnologia",
    headline: "Automação inteligente",
    desc: "Digitalize e automatize processos para escalar sem aumentar custos.",
    benefit: "Reduza custos operacionais em até 30%",
    icon: Cpu,
    color: "from-primary/25 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
  },
  {
    letter: "I",
    title: "Inovação",
    headline: "Evolução contínua",
    desc: "Cultura de melhoria constante que mantém sua empresa à frente da concorrência.",
    benefit: "Mantenha vantagem competitiva sustentável",
    icon: Lightbulb,
    color: "from-view-gold/25 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
    bgAccent: "bg-view-gold/10",
  },
  {
    letter: "P",
    title: "Pessoas",
    headline: "Equipes de alta performance",
    desc: "Times alinhados, autônomos e orientados por resultados claros.",
    benefit: "Aumente produtividade e retenção de talentos",
    icon: Users,
    color: "from-view-green/25 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
    bgAccent: "bg-view-green/10",
  },
];

const benefits = [
  "Reduza desperdícios operacionais",
  "Integre áreas do negócio",
  "Aumente produtividade em até 50%",
  "Tome decisões com mais velocidade",
];

export function DISTIP() {
  return (
    <section id="distip" className="py-20 md:py-32 px-[5%] relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[.03] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-view-green/[.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* SEO-Optimized Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-display text-[.7rem] tracking-[.2em] uppercase text-primary/80 mb-5 border border-primary/20 rounded-full px-5 py-2 bg-primary/[.03]"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Metodologia Exclusiva VIEW
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-foreground mb-5"
          >
            O Modelo <span className="text-primary">DISTIP</span>: Maturidade Empresarial em 6 Pilares
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-[.95rem] md:text-[1.05rem] leading-relaxed max-w-3xl mx-auto"
          >
            Framework estratégico para avaliar e elevar o nível de maturidade da sua empresa, 
            identificando gargalos e oportunidades de crescimento sustentável.
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left - Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-foreground/[.02] border border-view-line rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-bold text-[1.1rem] text-foreground mb-4">
                Por que avaliar a maturidade da sua empresa?
              </h3>
              
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-[.88rem] text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-foreground/80 text-[.9rem] leading-[1.8]">
                A metodologia <strong className="text-foreground">DISTIP</strong> analisa seis dimensões críticas para empresas que querem escalar com eficiência e controle.
              </p>
              
              <p className="text-muted-foreground text-[.85rem] leading-[1.8]">
                Empresas que evoluem nesses pilares conseguem enxergar sua operação de forma clara, 
                tomar decisões baseadas em dados e crescer sem perder o controle.
              </p>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/[.08] to-primary/[.02] border border-primary/20 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground text-[.95rem] mb-1">
                    Descubra o nível de maturidade da sua empresa
                  </h4>
                  <p className="text-muted-foreground text-[.8rem]">
                    Avaliação gratuita em menos de 5 minutos
                  </p>
                </div>
              </div>
              
              <Link
                to="/avaliacao-maturidade"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-display font-bold text-[.85rem] tracking-[.05em] px-6 py-3.5 rounded-lg hover:opacity-90 transition-all no-underline group"
              >
                Iniciar avaliação agora
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right - Pillar Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative bg-gradient-to-br ${pillar.color} border ${pillar.border} rounded-xl p-5 hover:shadow-lg hover:shadow-${pillar.accent.replace('text-', '')}/5 hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden`}
                  >
                    {/* Letter Badge */}
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-lg ${pillar.bgAccent} flex items-center justify-center`}>
                      <span className={`${pillar.accent} font-display font-black text-lg`}>{pillar.letter}</span>
                    </div>

                    <div className="relative z-10">
                      <div className={`${pillar.accent} mb-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className={`font-display font-bold text-foreground text-[.95rem] mb-1 ${pillar.accent}`}>
                        {pillar.title}
                      </h3>
                      
                      <p className="font-medium text-foreground/90 text-[.8rem] mb-2 leading-tight">
                        {pillar.headline}
                      </p>
                      
                      <p className="text-muted-foreground text-[.75rem] leading-relaxed mb-3">
                        {pillar.desc}
                      </p>
                      
                      <div className={`inline-flex items-center gap-1.5 text-[.7rem] ${pillar.accent} font-medium bg-background/50 rounded-full px-3 py-1 border border-${pillar.border.replace('border-', '')}`}>
                        <CheckCircle className="w-3 h-3" />
                        {pillar.benefit}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[.75rem] text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" />
            Baseada em práticas de grandes indústrias
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" />
            +50% produtividade média nos clientes
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" />
            Avaliação gratuita em 5 minutos
          </span>
        </motion.div>
      </div>
    </section>
  );
}
