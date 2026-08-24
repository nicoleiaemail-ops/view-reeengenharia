/**
 * Cálculo do score DISTIPP.
 *
 * A avaliação pedia 40 respostas e devolvia um ícone de "enviado" com a
 * promessa de retorno em 48h. Quem investiu dez minutos recebia nada na hora —
 * quebra de reciprocidade no pior momento possível, e o principal suspeito
 * pela desistência no meio do questionário.
 *
 * Todas as respostas já estão em memória no navegador, então o score sai de
 * graça: este módulo normaliza cada pergunta para 0–100, agrega por dimensão e
 * devolve o diagnóstico. O relatório enviado depois deixa de ser o produto e
 * passa a ser o gancho de acompanhamento.
 */

export type Dimensao = "Dados" | "Integração" | "Sistemas" | "Tecnologia" | "Inovação" | "Pessoas" | "Processos";

export const DIMENSOES_ORDEM: Dimensao[] = [
  "Dados",
  "Integração",
  "Sistemas",
  "Tecnologia",
  "Inovação",
  "Pessoas",
  "Processos",
];

export const LETRA_DIMENSAO: Record<Dimensao, string> = {
  Dados: "D",
  Integração: "I",
  Sistemas: "S",
  Tecnologia: "T",
  Inovação: "I",
  Pessoas: "P",
  Processos: "P",
};

/**
 * `escala`  — resposta de 1 a 5.
 * `ordinal` — lista de opções da pior para a melhor (ou o contrário, com `inverso`).
 * `mapa`    — opções sem ordem natural, pontuadas uma a uma.
 *
 * `inverso` marca as perguntas em que responder "alto" significa maturidade
 * BAIXA — por exemplo "há falhas frequentes de comunicação entre setores?" ou
 * "o uso diário do sistema causa estresse?". Sem essa marcação o score premia
 * exatamente o que deveria penalizar.
 */
type Regra =
  | { dim: Dimensao; tipo: "escala"; inverso?: boolean }
  | { dim: Dimensao; tipo: "ordinal"; opcoes: string[]; inverso?: boolean }
  | { dim: Dimensao; tipo: "mapa"; valores: Record<string, number> };

/**
 * Perguntas de intenção de compra ("investiria numa solução assim?",
 * "valoriza ver o desempenho dos setores?") ficam de fora: medem interesse,
 * não maturidade, e inflariam o score de quem só está animado com a ideia.
 * Campos de texto livre também não pontuam.
 */
const REGRAS: Record<string, Regra> = {
  // ── Dados ──
  dad1: { dim: "Dados", tipo: "escala" },
  dad2: { dim: "Dados", tipo: "ordinal", opcoes: ["Nenhum", "Baixo", "Moderado", "Alto", "Muito alto"] },
  dad3: { dim: "Dados", tipo: "mapa", valores: { Sim: 0, "Às vezes": 50, Não: 100 } },
  dad4: { dim: "Dados", tipo: "escala" },
  dad5: { dim: "Dados", tipo: "mapa", valores: { Sim: 100, "Em desenvolvimento": 50, Não: 0 } },

  // ── Integração ──
  int1: { dim: "Integração", tipo: "escala", inverso: true },
  int5: { dim: "Integração", tipo: "escala" },

  // ── Sistemas ──
  sis1: { dim: "Sistemas", tipo: "mapa", valores: { Sim: 100, Parcialmente: 50, Não: 0 } },
  sis2: { dim: "Sistemas", tipo: "escala" },
  sis4: { dim: "Sistemas", tipo: "escala", inverso: true },
  sis5: { dim: "Sistemas", tipo: "mapa", valores: { Não: 100, Sim: 40, Muito: 0 } },

  // ── Tecnologia ──
  tec1: { dim: "Tecnologia", tipo: "escala" },
  tec2: { dim: "Tecnologia", tipo: "mapa", valores: { Sim: 0, Parcialmente: 50, Não: 100 } },
  tec4: { dim: "Tecnologia", tipo: "mapa", valores: { Sim: 100, Parcialmente: 50, Não: 0 } },
  tec5: { dim: "Tecnologia", tipo: "escala" },

  // ── Inovação ──
  inov1: { dim: "Inovação", tipo: "escala" },
  inov2: { dim: "Inovação", tipo: "escala" },
  // Quanto mais o gestor acha que "poderia se beneficiar muito mais", maior a
  // lacuna atual — logo, menor a maturidade.
  inov3: { dim: "Inovação", tipo: "escala", inverso: true },
  inov4: {
    dim: "Inovação",
    tipo: "ordinal",
    opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"],
  },
  inov5: { dim: "Inovação", tipo: "mapa", valores: { Sim: 100, Parcialmente: 50, Não: 0 } },

  // ── Pessoas ──
  pes1: { dim: "Pessoas", tipo: "escala" },
  pes2: { dim: "Pessoas", tipo: "escala" },
  pes3: { dim: "Pessoas", tipo: "mapa", valores: { Sim: 0, Não: 100 } },
  pes4: { dim: "Pessoas", tipo: "escala" },
  pes5: { dim: "Pessoas", tipo: "escala" },

  // ── Processos ── (todas as opções vão da melhor para a pior)
  proc1: {
    dim: "Processos",
    tipo: "ordinal",
    inverso: true,
    opcoes: [
      "Sim, todos os processos estão documentados e atualizados",
      "Parcialmente, alguns processos estão documentados",
      "Não, os processos dependem do conhecimento informal das pessoas",
    ],
  },
  proc2: {
    dim: "Processos",
    tipo: "ordinal",
    inverso: true,
    opcoes: [
      "Sim, temos padrões claros e eles são seguidos",
      "Temos alguns padrões, mas nem sempre são seguidos",
      "Não, cada um executa à sua maneira",
    ],
  },
  proc3: {
    dim: "Processos",
    tipo: "ordinal",
    inverso: true,
    opcoes: [
      "Raramente, os processos fluem bem",
      "Às vezes, há alguns pontos de atrito",
      "Frequentemente, os mesmos problemas se repetem",
    ],
  },
  proc4: {
    dim: "Processos",
    tipo: "ordinal",
    inverso: true,
    opcoes: [
      "Sim, de forma sistemática e periódica",
      "Às vezes, quando surgem problemas evidentes",
      "Não, os processos raramente são revisados",
    ],
  },
  proc5: {
    dim: "Processos",
    tipo: "ordinal",
    inverso: true,
    opcoes: [
      "Sim, nossos processos são escaláveis",
      "Parcialmente, teríamos dificuldades em alguns pontos",
      "Não, o crescimento geraria desorganização",
    ],
  },
};

/** Normaliza uma resposta para 0–100, ou null se não pontuar. */
function pontuar(regra: Regra, resposta: string): number | null {
  if (!resposta) return null;

  if (regra.tipo === "escala") {
    const n = Number(resposta);
    if (!Number.isFinite(n) || n < 1 || n > 5) return null;
    const bruto = ((n - 1) / 4) * 100;
    return regra.inverso ? 100 - bruto : bruto;
  }

  if (regra.tipo === "ordinal") {
    const i = regra.opcoes.indexOf(resposta);
    if (i < 0) return null;
    const bruto = (i / (regra.opcoes.length - 1)) * 100;
    return regra.inverso ? 100 - bruto : bruto;
  }

  const v = regra.valores[resposta];
  return v === undefined ? null : v;
}

export interface ResultadoDimensao {
  dimensao: Dimensao;
  /** 0–100. */
  score: number;
  /** Quantas perguntas daquela dimensão foram efetivamente respondidas. */
  respondidas: number;
  nivel: Nivel;
}

export type Nivel = "Inicial" | "Em estruturação" | "Estruturada" | "Avançada";

export interface Resultado {
  /** Média simples das sete dimensões, 0–100. */
  geral: number;
  nivel: Nivel;
  dimensoes: ResultadoDimensao[];
  /** As duas dimensões mais fracas — por onde a VIEW recomenda começar. */
  prioridades: ResultadoDimensao[];
  /** Quantas das 32 perguntas pontuáveis foram respondidas. */
  respondidas: number;
  total: number;
}

export function nivelDe(score: number): Nivel {
  if (score < 40) return "Inicial";
  if (score < 60) return "Em estruturação";
  if (score < 80) return "Estruturada";
  return "Avançada";
}

export const DESCRICAO_NIVEL: Record<Nivel, string> = {
  Inicial:
    "A operação depende de pessoas, não de processos. As informações existem, mas espalhadas — e cada decisão exige garimpo. É o estágio em que a automação dá o maior retorno, porque quase tudo que se organiza vira ganho imediato.",
  "Em estruturação":
    "Há partes organizadas e partes no improviso, e a diferença entre elas costuma ser quem toca cada área. O risco aqui é crescer em cima da parte frágil: o que hoje é atrito vira gargalo quando o volume dobra.",
  Estruturada:
    "A base está de pé: os processos principais existem, são seguidos e geram registro. O ganho agora não vem de organizar, vem de integrar e automatizar o que já está padronizado — e de transformar registro em indicador.",
  Avançada:
    "A operação já roda com processo documentado, dados centralizados e decisão baseada em indicador. O próximo passo é margem fina: previsão, IA aplicada aos gargalos que sobraram e escala sem adicionar custo fixo.",
};

/** Recomendação por dimensão, usada nas duas prioridades do resultado. */
export const RECOMENDACAO: Record<Dimensao, string> = {
  Dados:
    "Centralizar os dados antes de qualquer automação. Enquanto o número estiver em planilha pessoal, painel de ERP e cabeça de gente, todo indicador vai ser discutível — e o que é discutível não vira decisão.",
  Integração:
    "Mapear os pontos de passagem entre setores. A maior parte do retrabalho de PME nasce na fronteira entre comercial, operação e financeiro, não dentro de cada um deles.",
  Sistemas:
    "Ajustar o sistema à operação real, em vez de treinar a equipe para contorná-lo. Planilha paralela ao ERP é sintoma de sistema mal configurado, quase nunca de equipe indisciplinada.",
  Tecnologia:
    "Digitalizar o registro na ponta, onde o trabalho acontece. Enquanto o dado nascer em papel ou WhatsApp, qualquer dashboard vai estar sempre um dia atrasado.",
  Inovação:
    "Criar um espaço fixo de melhoria — tempo e orçamento reservados. Sem isso, mudança só acontece sob crise, que é o momento mais caro possível para mudar.",
  Pessoas:
    "Tornar o desempenho visível por fato, não por percepção. Sem indicador individual, reconhecer e corrigir viram assunto de opinião, e a equipe sente isso.",
  Processos:
    "Documentar e padronizar antes de automatizar. Automatizar um processo confuso só faz a confusão acontecer mais rápido e com menos gente vendo.",
};

export function calcularResultado(respostas: Record<string, string>): Resultado {
  const acumulado = new Map<Dimensao, number[]>();
  DIMENSOES_ORDEM.forEach((d) => acumulado.set(d, []));

  let respondidas = 0;
  Object.entries(REGRAS).forEach(([campo, regra]) => {
    const nota = pontuar(regra, respostas[campo]);
    if (nota === null) return;
    respondidas++;
    acumulado.get(regra.dim)!.push(nota);
  });

  const dimensoes: ResultadoDimensao[] = DIMENSOES_ORDEM.map((dimensao) => {
    const notas = acumulado.get(dimensao)!;
    const score = notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : 0;
    return { dimensao, score, respondidas: notas.length, nivel: nivelDe(score) };
  });

  // Dimensões sem nenhuma resposta ficam fora da média geral, senão pular uma
  // etapa derrubaria o score da empresa por um motivo que não é dela.
  const comResposta = dimensoes.filter((d) => d.respondidas > 0);
  const geral = comResposta.length
    ? Math.round(comResposta.reduce((a, d) => a + d.score, 0) / comResposta.length)
    : 0;

  const prioridades = [...comResposta].sort((a, b) => a.score - b.score).slice(0, 2);

  return {
    geral,
    nivel: nivelDe(geral),
    dimensoes,
    prioridades,
    respondidas,
    total: Object.keys(REGRAS).length,
  };
}
