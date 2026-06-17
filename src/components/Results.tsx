import { useCountUp } from "@/hooks/useCountUp";

function ResultCard({ icon, target, prefix, suffix, label, sublabel, colorClass, delay }: {
  icon: string; target: number; prefix?: string; suffix: string; label: string; sublabel?: string;
  colorClass: string; delay?: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div className={`scroll-reveal rounded-md flex items-center gap-5 p-7 relative overflow-hidden transition-all border ${colorClass}`} style={{ transitionDelay: delay }}>
      <div className="w-[46px] h-[46px] flex-shrink-0 rounded-full flex items-center justify-center text-[1.2rem]">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-display font-bold text-[1.7rem] leading-none text-foreground" ref={ref}>
          {prefix}<span>{value}</span><span className="text-[1rem] ml-px">{suffix}</span>
        </div>
        <div className="text-[.75rem] text-muted-foreground leading-relaxed">
          {label}
          {sublabel && <span className="block text-[.65rem] opacity-50 mt-0.5">{sublabel}</span>}
        </div>
      </div>
    </div>
  );
}

export function Results() {
  return (
    <section id="resultados" className="px-[7%] py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResultCard icon="⚙️" target={20} suffix="+" label="processos automatizados" sublabel="total acumulado nas empresas atendidas"
          colorClass="bg-accent/[.06] border-accent/25 hover:bg-accent/[.11]" />
        <ResultCard icon="📈" target={50} prefix="+" suffix="%" label="aumento de produtividade" sublabel="média por operação atendida em 2024–2025"
          colorClass="bg-primary/[.07] border-primary/25 hover:bg-primary/[.13]" delay=".08s" />
        <ResultCard icon="⏱️" target={100} suffix="h+" label="horas economizadas por mês" sublabel="média por equipe após automação de processos"
          colorClass="bg-primary/[.07] border-primary/25 hover:bg-primary/[.13]" delay=".16s" />
        <ResultCard icon="💰" target={100} prefix="R$" suffix="k+" label="economizados pelos clientes" sublabel="em custos operacionais no primeiro ano"
          colorClass="bg-view-green/[.06] border-view-green/25 hover:bg-view-green/[.11]" delay=".24s" />
      </div>
    </section>
  );
}
