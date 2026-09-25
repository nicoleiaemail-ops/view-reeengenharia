// WebMCP — expõe as ações do site como ferramentas para agentes de IA que
// navegam pelo navegador (https://webmachinelearning.github.io/webmcp/).
//
// Regras adotadas aqui:
// · Somente ferramentas de leitura e de navegação. Nada envia formulário, cria
//   lead nem dispara mensagem — pedir diagnóstico continua sendo ação humana.
// · Se a API não existir no navegador, o módulo não faz nada.

import { articles } from "@/content/blog";

const SITE = "https://reengenhariaview.com.br";

type ToolResult = { content: Array<{ type: "text"; text: string }> };

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => ToolResult | Promise<ToolResult>;
}

interface ModelContext {
  provideContext?: (context: { tools: WebMcpTool[] }) => void;
  registerTool?: (tool: WebMcpTool) => void;
}

const text = (body: string): ToolResult => ({ content: [{ type: "text", text: body.trim() }] });

const NO_ARGS = { type: "object", properties: {}, additionalProperties: false } as const;

const SOLUCOES = [
  {
    area: "IA & Automação",
    dor: "Sua equipe ainda faz tarefas que deveriam ser automáticas?",
    entregas: ["Agentes de IA autônomos", "Chatbot com IA para atendimento", "Automação de fluxos repetitivos", "Consultoria em IA"],
    url: `${SITE}/solucoes#ia-automacao`,
  },
  {
    area: "Sistemas & Dados",
    dor: "Você decide com dados ou com achismo?",
    entregas: ["Sistemas de gestão personalizados", "Dashboards de BI em tempo real (inclusive no celular)", "Análise de maturidade digital"],
    url: `${SITE}/solucoes#sistemas-dados`,
  },
  {
    area: "Reengenharia de Processos",
    dor: "Os mesmos problemas se repetem todo mês?",
    entregas: ["Padronização com SOPs, checklists e fluxogramas", "Auditoria operacional completa", "Arquitetura empresarial (redesenho de setores e responsabilidades)"],
    url: `${SITE}/solucoes#reengenharia`,
  },
  {
    area: "Consultoria Estratégica",
    dor: "Você sabe se está crescendo de forma saudável?",
    entregas: ["Planejamento estratégico", "Análise de viabilidade de negócio", "Finanças corporativas (margem, custo, fluxo de caixa)", "Estruturas de governança"],
    url: `${SITE}/solucoes#consultoria-estrategica`,
  },
  {
    area: "Capacitação",
    dor: "Sua equipe sabe usar IA no dia a dia?",
    entregas: ["Treinamento prático de IA para equipes", "Construção de agentes próprios", "Implantação guiada de ferramentas de IA"],
    url: `${SITE}/solucoes#capacitacao`,
  },
];

const DIMENSOES = [
  ["Dados", "Capacidade de decidir com base em evidências e indicadores confiáveis."],
  ["Integração", "Comunicação e fluxo de informação entre setores e sistemas."],
  ["Sistemas", "Adequação e eficácia dos sistemas de gestão utilizados."],
  ["Tecnologia", "Grau de digitalização dos processos e rastreabilidade das operações."],
  ["Inovação", "Compromisso com melhoria contínua e adoção de novas práticas."],
  ["Pessoas", "Gestão de desempenho, autonomia e rastreabilidade de responsabilidades."],
  ["Processos", "Padronização, documentação e escalabilidade dos fluxos operacionais."],
];

const PASSOS = [
  "Diagnóstico gratuito — mapeamento da operação atual, resultado em 48h, sem custo e sem compromisso.",
  "Mapeamento e redesenho — documentação de cada fluxo, eliminação do que não agrega valor, padronização do replicável.",
  "Automação e sistema sob medida — automação de tarefas repetitivas e sistema adaptado à operação (iOS, Android, Desktop).",
  "Dashboards em tempo real — KPIs acessíveis de qualquer lugar.",
  "Acompanhamento contínuo — parceria de longo prazo com monitoramento de resultados.",
];

function articleToMarkdown(slug: string): string | null {
  const a = articles.find((art) => art.slug === slug);
  if (!a) return null;
  const body = a.body
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      return b.text;
    })
    .join("\n\n");
  const faqs = a.faqs.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n");
  return [
    `# ${a.title}`,
    `> ${a.lead}`,
    `Autor: ${a.author} · Publicado: ${a.datePublished} · Leitura: ${a.readingMinutes} min · Tema: ${a.tag}`,
    `Fonte: ${SITE}/blog/${a.slug}`,
    "---",
    body,
    faqs && `## Perguntas frequentes\n\n${faqs}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

const tools: WebMcpTool[] = [
  {
    name: "view_visao_geral",
    description:
      "Retorna o que é a VIEW Reengenharia de Processos: proposta, público atendido, áreas de atuação, cobertura geográfica e canais de contato. Use antes das outras ferramentas para se situar.",
    inputSchema: NO_ARGS,
    execute: () =>
      text(`
VIEW — a VIEW devolve o controle da operação para quem toma decisão. Primeiro o processo
desenhado, depois o sistema, a automação e o dado. Nessa ordem, com a medição feita antes e
depois. Atende empresas de 20 a 300 pessoas.

Fundada em 2024 por uma equipe de engenharia de produção com mais de cinco anos em grandes
indústrias brasileiras (Baterias Moura, Alpargatas). Aplica os mesmos princípios de excelência
operacional em PMEs em crescimento.

A VIEW não vende software de prateleira. Entrega execução: diagnóstico, redesenho de processos,
automação, sistema sob medida e acompanhamento contínuo.

Áreas: ${SOLUCOES.map((s) => s.area).join(" · ")}
Metodologia: DISTIPP (7 dimensões de maturidade operacional)
Cobertura: Paraíba, Pernambuco, Rio Grande do Norte e todo o Brasil (remoto). Base em João Pessoa/PB.
Diagnóstico gratuito com devolutiva em até 48h.

Contato: WhatsApp (83) 9 9322-4878 · admin@reengenhariaview.com.br
Contexto completo para leitura: ${SITE}/llms.txt
`),
  },
  {
    name: "view_listar_solucoes",
    description:
      "Lista as cinco áreas de solução da VIEW com a dor que cada uma resolve, as entregas concretas e o link da seção correspondente. Use quando o usuário perguntar o que a VIEW faz ou se um problema específico é atendido.",
    inputSchema: NO_ARGS,
    execute: () =>
      text(
        SOLUCOES.map(
          (s) => `## ${s.area}\nDor: ${s.dor}\nEntregas: ${s.entregas.join("; ")}\nDetalhes: ${s.url}`
        ).join("\n\n")
      ),
  },
  {
    name: "view_metodologia_distipp",
    description:
      "Explica a metodologia DISTIPP: as 7 dimensões de maturidade operacional avaliadas (Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas, Processos) e os 5 passos de execução da VIEW.",
    inputSchema: NO_ARGS,
    execute: () =>
      text(`
# Metodologia DISTIPP

Framework de diagnóstico de maturidade operacional da VIEW. Avalia sete dimensões:

${DIMENSOES.map(([nome, desc], i) => `${i + 1}. **${nome}** — ${desc}`).join("\n")}

## Os 5 passos de execução

${PASSOS.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Autodiagnóstico guiado (skill publicada):
${SITE}/.well-known/agent-skills/diagnostico-maturidade-distipp/SKILL.md
Versão oficial com análise da equipe: ${SITE}/avaliacao-maturidade
`),
  },
  {
    name: "view_listar_artigos",
    description:
      "Lista os artigos publicados no blog da VIEW com slug, título, descrição, data e tempo de leitura. Use para descobrir qual artigo ler com view_ler_artigo.",
    inputSchema: NO_ARGS,
    execute: () =>
      text(
        articles
          .map(
            (a) =>
              `- **${a.title}**\n  slug: ${a.slug}\n  ${a.description}\n  ${a.tag} · ${a.readingMinutes} min · ${a.datePublished} · ${SITE}/blog/${a.slug}`
          )
          .join("\n")
      ),
  },
  {
    name: "view_ler_artigo",
    description:
      "Retorna o texto completo de um artigo do blog da VIEW em Markdown, incluindo as perguntas frequentes. Informe o slug obtido em view_listar_artigos.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Slug do artigo, por exemplo: metodologia-distipp-7-dimensoes-maturidade-operacional",
          enum: articles.map((a) => a.slug),
        },
      },
      required: ["slug"],
      additionalProperties: false,
    },
    execute: ({ slug }) => {
      const md = articleToMarkdown(String(slug ?? ""));
      return md
        ? text(md)
        : text(
            `Artigo não encontrado. Slugs disponíveis:\n${articles.map((a) => `- ${a.slug}`).join("\n")}`
          );
    },
  },
  {
    name: "view_contato",
    description:
      "Retorna os canais oficiais de contato da VIEW e o que é preciso informar para solicitar o diagnóstico gratuito. Não envia nada — apenas devolve as instruções para o usuário decidir.",
    inputSchema: NO_ARGS,
    execute: () =>
      text(`
Canais oficiais da VIEW:
- WhatsApp: https://wa.me/5583993224878 — (83) 9 9322-4878
- E-mail: admin@reengenhariaview.com.br
- Formulário de diagnóstico gratuito: ${SITE}/#diagnostico
- Avaliação de Maturidade DISTIPP (~5 min): ${SITE}/avaliacao-maturidade

Para pedir o diagnóstico, tenha em mãos: nome do responsável, empresa, WhatsApp, segmento e
uma descrição curta da dor operacional. O envio deve ser feito pelo próprio usuário — nenhuma
ferramenta deste site envia dados em nome dele.

Roteiro completo: ${SITE}/.well-known/agent-skills/solicitar-diagnostico-view/SKILL.md
`),
  },
  {
    name: "view_abrir_pagina",
    description:
      "Navega o navegador do usuário até uma página pública da VIEW (home, soluções, sobre, casos, blog, avaliação de maturidade ou o formulário de diagnóstico). Não preenche nem envia formulários.",
    inputSchema: {
      type: "object",
      properties: {
        pagina: {
          type: "string",
          enum: ["home", "solucoes", "sobre", "casos", "blog", "avaliacao-maturidade", "diagnostico"],
          description: "Página de destino.",
        },
      },
      required: ["pagina"],
      additionalProperties: false,
    },
    execute: ({ pagina }) => {
      const rotas: Record<string, string> = {
        home: "/",
        solucoes: "/solucoes",
        sobre: "/sobre",
        casos: "/casos",
        blog: "/blog",
        "avaliacao-maturidade": "/avaliacao-maturidade",
        diagnostico: "/#diagnostico",
      };
      const destino = rotas[String(pagina)];
      if (!destino) {
        return text(`Página desconhecida. Opções: ${Object.keys(rotas).join(", ")}`);
      }
      window.location.assign(destino);
      return text(`Navegando para ${SITE}${destino}.`);
    },
  },
];

let registered = false;

export function registerWebMcpTools(): void {
  if (registered || typeof navigator === "undefined") return;
  const ctx = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!ctx) return;
  try {
    if (typeof ctx.provideContext === "function") {
      ctx.provideContext({ tools });
    } else if (typeof ctx.registerTool === "function") {
      for (const tool of tools) ctx.registerTool(tool);
    } else {
      return;
    }
    registered = true;
  } catch (err) {
    // WebMCP é progressivo: falha aqui não pode afetar o site.
    console.debug("[webmcp] registro de ferramentas ignorado:", err);
  }
}
