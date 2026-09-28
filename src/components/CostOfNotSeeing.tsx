import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { PrimaryCTA } from "./CTA";

/**
 * Calculador de custo operacional oculto.
 *
 * A versão anterior desta seção exibia "Prejuízo estimado R$ 55.000/mês",
 * somando quatro valores fixos (R$ 8.000 de retrabalho, R$ 12.000 de decisão
 * tardia, R$ 15.000 de gargalo, R$ 20.000 de processo na cabeça das pessoas)
 * sob a afirmação "esses números são reais". Não eram: eram os mesmos para
 * uma padaria de seis pessoas e para uma indústria de duzentas. Um comprador
 * cético lê isso como número inventado — e a seção que deveria criar urgência
 * criava desconfiança.
 *
 * Aqui os números saem dos dados que o próprio visitante informa, e o modelo
 * de cálculo fica visível na tela. Ele fica defensável numa reunião, o que a
 * versão anterior não ficava.
 */

/** Semanas por mês (52/12). */
const SEMANAS_MES = 4.33;

/**
 * Proporções aplicadas sobre as horas manuais informadas. São faixas
 * observadas pela VIEW em diagnóstico, declaradas na tela para que o visitante
 * possa discordar do número em vez de simplesmente não acreditar nele.
 */
const FATOR_RETRABALHO = 0.25;
const FATOR_ESPERA = 0.15;

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

interface CampoProps {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Campo({ id, label, hint, min, max, step, value, format, onChange }: CampoProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <label htmlFor={id} className="font-display font-semibold text-[.86rem] text-foreground">
          {label}
        </label>
        <output htmlFor={id} className="font-display font-extrabold text-[1.05rem] text-primary tabular-nums">
          {format(value)}
        </output>
      </div>
      <p className="text-[.75rem] text-muted-foreground mb-2.5 leading-relaxed">{hint}</p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-foreground/15 accent-primary cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      />
    </div>
  );
}

function LinhaCusto({
  titulo,
  descricao,
  valor,
  base,
  cor,
}: {
  titulo: string;
  descricao: string;
  valor: number;
  base: string;
  cor: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 py-4 border-b border-view-line last:border-b-0">
      <div className="flex-1">
        <div className="font-display font-bold text-[.88rem] text-foreground mb-0.5">{titulo}</div>
        <div className="text-[.78rem] text-muted-foreground leading-relaxed">{descricao}</div>
        <div className="text-[.72rem] text-muted-foreground/70 mt-1 tabular-nums">{base}</div>
      </div>
      <div className={`font-display font-extrabold text-[1.15rem] whitespace-nowrap tabular-nums ${cor}`}>
        {brl(valor)}
      </div>
    </div>
  );
}

export function CostOfNotSeeing() {
  const [funcionarios, setFuncionarios] = useState(25);
  const [horasManuais, setHorasManuais] = useState(6);
  const [custoHora, setCustoHora] = useState(35);

  const calculo = useMemo(() => {
    const horasMes = funcionarios * horasManuais * SEMANAS_MES;
    const manual = horasMes * custoHora;
    const retrabalho = manual * FATOR_RETRABALHO;
    const espera = manual * FATOR_ESPERA;
    return {
      horasMes: Math.round(horasMes),
      manual,
      retrabalho,
      espera,
      total: manual + retrabalho + espera,
      totalAno: (manual + retrabalho + espera) * 12,
    };
  }, [funcionarios, horasManuais, custoHora]);

  // Um evento por sessão de uso, e só depois que o visitante parou de mexer —
  // caso contrário cada passo do slider viraria um evento no relatório.
  const jaRegistrado = useRef(false);
  useEffect(() => {
    if (jaRegistrado.current) return;
    const t = setTimeout(() => {
      jaRegistrado.current = true;
      track(EVENTS.calculatorUse, {
        funcionarios,
        horas_manuais: horasManuais,
        custo_hora: custoHora,
        total_mes: Math.round(calculo.total),
      });
    }, 1500);
    return () => clearTimeout(t);
  }, [funcionarios, horasManuais, custoHora, calculo.total]);

  return (
    <section className="py-10 md:py-16 px-[7%] relative overflow-hidden" id="calculadora">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-destructive/[.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="scroll-reveal text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/25 rounded-full py-2 px-5 mb-6">
            <span
              className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]"
              style={{ animation: "blink 1.5s infinite" }}
            />
            <span className="text-[.68rem] tracking-[.1em] uppercase text-destructive font-display font-semibold">
              Calculadora de custo oculto
            </span>
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] mb-4">
            Quanto custa <em className="not-italic text-destructive">não enxergar</em>
            <br />
            sua operação?
          </h2>
          <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
            Ajuste os três campos para a realidade da sua empresa. O cálculo aparece na hora, e a conta
            que gerou cada linha fica visível — para você poder discordar dela.
          </p>
        </div>

        <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-10">
          {/* Entradas */}
          <div className="bg-foreground/[.03] border border-view-line rounded-xl p-6 md:p-8 flex flex-col gap-7">
            <Campo
              id="calc-funcionarios"
              label="Pessoas na operação"
              hint="Quem executa, registra, confere ou reporta o trabalho do dia a dia."
              min={3}
              max={200}
              step={1}
              value={funcionarios}
              format={(v) => `${v}`}
              onChange={setFuncionarios}
            />
            <Campo
              id="calc-horas"
              label="Horas por semana em trabalho manual"
              hint="Por pessoa: planilha, digitação em dois sistemas, conferência, montagem de relatório, procurar informação."
              min={1}
              max={25}
              step={1}
              value={horasManuais}
              format={(v) => `${v}h`}
              onChange={setHorasManuais}
            />
            <Campo
              id="calc-custo"
              label="Custo médio da hora trabalhada"
              hint="Salário com encargos dividido pelas horas do mês. Costuma ficar entre R$ 20 e R$ 60."
              min={15}
              max={120}
              step={5}
              value={custoHora}
              format={(v) => brl(v)}
              onChange={setCustoHora}
            />
          </div>

          {/* Resultado */}
          <div className="flex flex-col gap-5">
            <div
              className="bg-destructive/[.06] border border-destructive/25 rounded-xl p-6 md:p-8 text-center"
              aria-live="polite"
            >
              <div className="text-[.68rem] tracking-[.2em] uppercase text-destructive/80 mb-2">
                Custo estimado por mês
              </div>
              <div className="font-display font-extrabold text-[clamp(2.2rem,4vw,3rem)] text-destructive leading-none tabular-nums">
                {brl(calculo.total)}
              </div>
              <div className="text-[.8rem] text-muted-foreground mt-3">
                {brl(calculo.totalAno)} por ano ·{" "}
                <span className="tabular-nums">{calculo.horasMes.toLocaleString("pt-BR")}</span> horas/mês em
                trabalho manual
              </div>
            </div>

            <div className="bg-foreground/[.02] border border-view-line rounded-xl px-6 py-2">
              <LinhaCusto
                titulo="Trabalho manual"
                descricao="Horas gastas alimentando planilha, conferindo e montando relatório em vez de produzir."
                base={`${funcionarios} pessoas × ${horasManuais}h × ${SEMANAS_MES} semanas × ${brl(custoHora)}`}
                valor={calculo.manual}
                cor="text-destructive"
              />
              <LinhaCusto
                titulo="Retrabalho"
                descricao="Tarefa refeita por falta de registro, padrão ou rastreabilidade do que já foi feito."
                base={`${FATOR_RETRABALHO * 100}% das horas manuais`}
                valor={calculo.retrabalho}
                cor="text-accent"
              />
              <LinhaCusto
                titulo="Espera por informação"
                descricao="Decisão parada porque o dado ainda não chegou, ou chegou depois da hora de usar."
                base={`${FATOR_ESPERA * 100}% das horas manuais`}
                valor={calculo.espera}
                cor="text-primary"
              />
            </div>

            <p className="text-[.73rem] text-muted-foreground/80 leading-relaxed">
              Estimativa, não promessa. As proporções de retrabalho e espera são faixas que a VIEW observa
              em diagnóstico de empresas desse porte — a sua pode ser maior ou menor. O diagnóstico gratuito mede os
              números reais da sua operação em vez de estimá-los.
            </p>
          </div>
        </div>

        {/* Fechamento */}
        <div className="scroll-reveal" style={{ transitionDelay: ".2s" }}>
          <div className="border border-destructive/20 rounded-xl bg-destructive/[.04] p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="font-display font-extrabold text-[1.15rem] text-foreground mb-2">
                E o pior: esse custo não aparece em nenhum relatório.
              </div>
              <p className="text-[.88rem] text-muted-foreground leading-relaxed">
                Ele está diluído na folha, então ninguém o vê como despesa — e por isso ninguém corta.
                Não é falta de esforço da sua equipe. É falta de{" "}
                <strong className="text-foreground">estrutura para enxergar</strong>.
              </p>
            </div>
            <PrimaryCTA location="calculadora" className="flex-shrink-0 px-8 py-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
