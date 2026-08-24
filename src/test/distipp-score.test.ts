import { describe, expect, it } from "vitest";
import { calcularResultado, nivelDe, DIMENSOES_ORDEM } from "@/lib/distipp-score";

/** Respostas que representam a maturidade mais baixa possível em cada campo. */
const PIOR: Record<string, string> = {
  dad1: "1",
  dad2: "Nenhum",
  dad3: "Sim",
  dad4: "1",
  dad5: "Não",
  int1: "5",
  int5: "1",
  sis1: "Não",
  sis2: "1",
  sis4: "5",
  sis5: "Muito",
  tec1: "1",
  tec2: "Sim",
  tec4: "Não",
  tec5: "1",
  inov1: "1",
  inov2: "1",
  inov3: "5",
  inov4: "Nunca",
  inov5: "Não",
  pes1: "1",
  pes2: "1",
  pes3: "Sim",
  pes4: "1",
  pes5: "1",
  proc1: "Não, os processos dependem do conhecimento informal das pessoas",
  proc2: "Não, cada um executa à sua maneira",
  proc3: "Frequentemente, os mesmos problemas se repetem",
  proc4: "Não, os processos raramente são revisados",
  proc5: "Não, o crescimento geraria desorganização",
};

/** Respostas que representam a maturidade mais alta possível em cada campo. */
const MELHOR: Record<string, string> = {
  dad1: "5",
  dad2: "Muito alto",
  dad3: "Não",
  dad4: "5",
  dad5: "Sim",
  int1: "1",
  int5: "5",
  sis1: "Sim",
  sis2: "5",
  sis4: "1",
  sis5: "Não",
  tec1: "5",
  tec2: "Não",
  tec4: "Sim",
  tec5: "5",
  inov1: "5",
  inov2: "5",
  inov3: "1",
  inov4: "Sempre",
  inov5: "Sim",
  pes1: "5",
  pes2: "5",
  pes3: "Não",
  pes4: "5",
  pes5: "5",
  proc1: "Sim, todos os processos estão documentados e atualizados",
  proc2: "Sim, temos padrões claros e eles são seguidos",
  proc3: "Raramente, os processos fluem bem",
  proc4: "Sim, de forma sistemática e periódica",
  proc5: "Sim, nossos processos são escaláveis",
};

describe("calcularResultado", () => {
  it("dá 0 quando tudo indica a menor maturidade", () => {
    const r = calcularResultado(PIOR);
    expect(r.geral).toBe(0);
    expect(r.nivel).toBe("Inicial");
    r.dimensoes.forEach((d) => expect(d.score).toBe(0));
  });

  it("dá 100 quando tudo indica a maior maturidade", () => {
    const r = calcularResultado(MELHOR);
    expect(r.geral).toBe(100);
    expect(r.nivel).toBe("Avançada");
    r.dimensoes.forEach((d) => expect(d.score).toBe(100));
  });

  it("pontua todas as 7 dimensões e conta as perguntas respondidas", () => {
    const r = calcularResultado(MELHOR);
    expect(r.dimensoes.map((d) => d.dimensao)).toEqual(DIMENSOES_ORDEM);
    expect(r.respondidas).toBe(r.total);
    expect(r.total).toBe(Object.keys(MELHOR).length);
  });

  /*
    A regressão mais fácil de introduzir aqui: tratar "há falhas frequentes de
    comunicação = 5" como maturidade alta. Se a inversão quebrar, o score sobe
    justamente para quem está pior.
  */
  it("inverte as perguntas em que responder alto significa maturidade baixa", () => {
    const soIntegracao = calcularResultado({ int1: "5", int5: "5" });
    const integracao = soIntegracao.dimensoes.find((d) => d.dimensao === "Integração")!;
    // int1 invertida (5 → 0) e int5 direta (5 → 100): média 50.
    expect(integracao.score).toBe(50);
  });

  it("ignora campos de texto livre e perguntas de intenção de compra", () => {
    const r = calcularResultado({
      dad1: "5",
      int2: "texto qualquer",
      int3: "5",
      int4: "Sim",
      sis3: "outro texto",
      tec3: "WhatsApp",
    });
    // Só dad1 pontua; nenhuma resposta de Integração conta.
    expect(r.respondidas).toBe(1);
    expect(r.dimensoes.find((d) => d.dimensao === "Integração")!.respondidas).toBe(0);
  });

  it("não penaliza a média geral por uma dimensão totalmente pulada", () => {
    // Apenas Dados respondida, e com nota máxima.
    const r = calcularResultado({ dad1: "5", dad2: "Muito alto", dad3: "Não", dad4: "5", dad5: "Sim" });
    expect(r.geral).toBe(100);
  });

  it("aponta como prioridades as duas dimensões mais fracas", () => {
    const r = calcularResultado({ ...MELHOR, ...{ tec1: "1", tec2: "Sim", tec4: "Não", tec5: "1" }, pes1: "1", pes2: "1", pes4: "1", pes5: "1" });
    const nomes = r.prioridades.map((d) => d.dimensao);
    expect(nomes).toContain("Tecnologia");
    expect(nomes).toContain("Pessoas");
    expect(r.prioridades).toHaveLength(2);
  });

  it("ignora respostas fora do domínio esperado", () => {
    const r = calcularResultado({ dad1: "9", dad2: "Talvez", dad4: "3" });
    expect(r.respondidas).toBe(1);
    expect(r.dimensoes.find((d) => d.dimensao === "Dados")!.score).toBe(50);
  });
});

describe("nivelDe", () => {
  it("classifica nas quatro faixas", () => {
    expect(nivelDe(0)).toBe("Inicial");
    expect(nivelDe(39)).toBe("Inicial");
    expect(nivelDe(40)).toBe("Em estruturação");
    expect(nivelDe(59)).toBe("Em estruturação");
    expect(nivelDe(60)).toBe("Estruturada");
    expect(nivelDe(79)).toBe("Estruturada");
    expect(nivelDe(80)).toBe("Avançada");
    expect(nivelDe(100)).toBe("Avançada");
  });
});
