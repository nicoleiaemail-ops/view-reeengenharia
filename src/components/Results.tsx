import { Cog, TrendingUp, Clock, PiggyBank, type LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Os números aqui são pequenos porque a VIEW é nova. Apresentá-los sem
 * contexto, como fazia a versão anterior, funcionava contra a empresa: "20+
 * processos automatizados" solto parece pouco.
 *
 * A correção não é inflar o número — é enquadrá-lo. Uma consultoria que diz
 * exatamente de onde vem cada métrica e admite o tamanho da própria base é
 * mais confiável, para este comprador, do que uma que exibe agregados
 * redondos e não explicados.
 */
function ResultCard({
  Icon,
  target,
  prefix,
  suffix,
  label,
  sublabel,
  colorClass,
  delay,
}: {
  Icon: LucideIcon;
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel?: string;
  colorClass: string;
  delay?: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div
      className={`scroll-reveal rounded-md flex items-center gap-5 p-7 relative overflow-hidden transition-all border ${colorClass}`}
      style={{ transitionDelay: delay }}
    >
      <div className="w-[46px] h-[46px] flex-shrink-0 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-foreground/70" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-display font-bold text-[1.7rem] leading-none text-foreground tabular-nums" ref={ref}>
          {prefix}
          <span>{value}</span>
          <span className="text-[1rem] ml-px">{suffix}</span>
        </div>
        <div className="text-[.8rem] text-muted-foreground leading-relaxed">
          {label}
          {sublabel && <span className="block text-[.72rem] text-muted-foreground/75 mt-0.5">{sublabel}</span>}
        </div>
      </div>
    </div>
  );
}

export function Results() {
  return (
    <section id="resultados" className="px-[7%] py-10 md:py-14">
      <div className="scroll-reveal text-center mb-10">
        <div className="text-[.68rem] tracking-[.22em] uppercase text-muted-foreground mb-3">Números da VIEW</div>
        <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] mb-4">
          O que já foi entregue —{" "}
          <em className="not-italic text-primary">e de onde vem cada número</em>
        </h2>
        <p className="text-[.9rem] text-muted-foreground max-w-[560px] mx-auto leading-relaxed">
          A VIEW opera desde 2024. Estes são os números acumulados das empresas atendidas até aqui, não
          projeções nem médias de mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResultCard
          Icon={Cog}
          target={20}
          suffix="+"
          label="processos automatizados"
          sublabel="somando todos os projetos entregues desde 2024"
          colorClass="bg-accent/[.06] border-accent/25 hover:bg-accent/[.11]"
        />
        <ResultCard
          Icon={TrendingUp}
          target={50}
          prefix="+"
          suffix="%"
          label="de ganho de produtividade"
          sublabel="medido no processo automatizado, antes e depois — não na empresa inteira"
          colorClass="bg-primary/[.07] border-primary/25 hover:bg-primary/[.13]"
          delay=".08s"
        />
        <ResultCard
          Icon={Clock}
          target={100}
          suffix="h+"
          label="devolvidas à equipe por mês"
          sublabel="horas antes gastas em planilha e conferência, por operação atendida"
          colorClass="bg-primary/[.07] border-primary/25 hover:bg-primary/[.13]"
          delay=".16s"
        />
        <ResultCard
          Icon={PiggyBank}
          target={100}
          prefix="R$"
          suffix="k+"
          label="em custo operacional cortado"
          sublabel="acumulado no primeiro ano de cada projeto"
          colorClass="bg-view-green/[.06] border-view-green/25 hover:bg-view-green/[.11]"
          delay=".24s"
        />
      </div>

      <p className="scroll-reveal text-center text-[.75rem] text-muted-foreground/80 mt-6 max-w-[620px] mx-auto leading-relaxed">
        Somos uma empresa jovem e preferimos mostrar o número real a arredondá-lo para cima. No
        diagnóstico apresentamos os cálculos por trás de cada um destes valores.
      </p>
    </section>
  );
}
