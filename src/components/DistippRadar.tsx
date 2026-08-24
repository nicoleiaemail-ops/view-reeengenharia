import { DIMENSOES_ORDEM, type ResultadoDimensao } from "@/lib/distipp-score";

/**
 * Radar das sete dimensões, em SVG puro.
 *
 * Feito à mão de propósito: uma biblioteca de gráficos acrescentaria dezenas
 * de KB ao bundle para desenhar um único heptágono estático.
 */

const TAMANHO = 320;
const CENTRO = TAMANHO / 2;
const RAIO = 118;
const ANEIS = [0.25, 0.5, 0.75, 1];

/** Começa no topo (-90°) e segue no sentido horário. */
function ponto(indice: number, fracao: number, total: number) {
  const angulo = (Math.PI * 2 * indice) / total - Math.PI / 2;
  return {
    x: CENTRO + Math.cos(angulo) * RAIO * fracao,
    y: CENTRO + Math.sin(angulo) * RAIO * fracao,
  };
}

function poligono(fracoes: number[]) {
  return fracoes
    .map((f, i) => {
      const p = ponto(i, f, fracoes.length);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

export function DistippRadar({ dimensoes }: { dimensoes: ResultadoDimensao[] }) {
  const total = DIMENSOES_ORDEM.length;
  const valores = DIMENSOES_ORDEM.map(
    (d) => (dimensoes.find((x) => x.dimensao === d)?.score ?? 0) / 100
  );

  return (
    <svg
      viewBox={`0 0 ${TAMANHO} ${TAMANHO}`}
      className="w-full max-w-[340px] mx-auto h-auto"
      role="img"
      aria-label={`Radar de maturidade: ${dimensoes
        .map((d) => `${d.dimensao} ${d.score} de 100`)
        .join(", ")}.`}
    >
      {/* Anéis de referência */}
      {ANEIS.map((f) => (
        <polygon
          key={f}
          points={poligono(Array(total).fill(f))}
          fill="none"
          stroke="hsl(var(--view-line))"
          strokeWidth="1"
        />
      ))}

      {/* Eixos */}
      {DIMENSOES_ORDEM.map((_, i) => {
        const p = ponto(i, 1, total);
        return (
          <line
            key={i}
            x1={CENTRO}
            y1={CENTRO}
            x2={p.x}
            y2={p.y}
            stroke="hsl(var(--view-line))"
            strokeWidth="1"
          />
        );
      })}

      {/* Área do resultado */}
      <polygon
        points={poligono(valores)}
        fill="hsl(var(--view-accent) / .22)"
        stroke="hsl(var(--view-accent))"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Vértices */}
      {valores.map((f, i) => {
        const p = ponto(i, f, total);
        return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="hsl(var(--view-accent))" />;
      })}

      {/* Rótulos */}
      {DIMENSOES_ORDEM.map((dim, i) => {
        const p = ponto(i, 1.19, total);
        const ancora = p.x > CENTRO + 6 ? "start" : p.x < CENTRO - 6 ? "end" : "middle";
        const score = dimensoes.find((x) => x.dimensao === dim)?.score ?? 0;
        return (
          <text
            key={dim}
            x={p.x}
            y={p.y}
            textAnchor={ancora}
            dominantBaseline="middle"
            className="font-display"
            fill="hsl(var(--foreground))"
            fontSize="10.5"
            fontWeight="600"
          >
            {dim}
            <tspan fill="hsl(var(--view-accent))" fontSize="10.5">
              {" "}
              {score}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}
