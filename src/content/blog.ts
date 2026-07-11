// Conteúdo do blog. Cada artigo é editável aqui — o texto pode ser revisado
// livremente. As páginas /blog e /blog/:slug são geradas a partir destes dados.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  // Título usado na aba do navegador e nos buscadores (mais curto/otimizado).
  seoTitle: string;
  description: string;
  datePublished: string; // ISO (AAAA-MM-DD)
  dateModified?: string;
  author: string;
  tag: string;
  readingMinutes: number;
  // Resumo de destaque exibido no topo do artigo.
  lead: string;
  body: Block[];
  // Perguntas frequentes específicas do artigo (geram FAQPage — bom para AEO).
  faqs: { q: string; a: string }[];
}

export const articles: Article[] = [
  {
    slug: "metodologia-distipp-7-dimensoes-maturidade-operacional",
    title:
      "Metodologia DISTIPP: as 7 dimensões da maturidade operacional de uma empresa",
    seoTitle:
      "Metodologia DISTIPP — as 7 Dimensões da Maturidade Operacional | VIEW",
    description:
      "Entenda a metodologia DISTIPP da VIEW: as 7 dimensões (Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos) que medem a maturidade operacional de uma PME e mostram por onde começar a melhorar.",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    author: "Equipe VIEW",
    tag: "Metodologia",
    readingMinutes: 6,
    lead: "DISTIPP é a metodologia proprietária da VIEW para diagnosticar a maturidade operacional de uma empresa em sete dimensões. Em vez de tratar sintomas isolados, ela revela onde estão os gargalos reais — e em que ordem resolvê-los.",
    body: [
      {
        type: "p",
        text: "Toda empresa que cresce chega a um ponto em que o esforço da equipe deixa de ser suficiente para dar conta da desorganização. Pedidos se perdem, informações ficam em cabeças ou em planilhas soltas, e ninguém enxerga o processo inteiro. O problema raramente é falta de trabalho — é falta de estrutura. A metodologia DISTIPP existe para medir, de forma objetiva, o quanto essa estrutura está madura.",
      },
      {
        type: "p",
        text: "O nome DISTIPP é formado pelas iniciais das sete dimensões avaliadas: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos. Cada uma representa uma frente que, quando negligenciada, freia o crescimento da operação. Avaliá-las em conjunto evita o erro mais comum na gestão: investir pesado em uma área enquanto o gargalo real está em outra.",
      },
      { type: "h2", text: "As 7 dimensões da metodologia DISTIPP" },
      {
        type: "ul",
        items: [
          "Dados — analisa o uso de dados para a tomada de decisão estratégica. Empresas maduras decidem com base em números confiáveis, não em achismo.",
          "Integração — avalia a comunicação e a integração entre os setores. Quando cada área trabalha isolada, retrabalho e ruído aumentam.",
          "Sistemas — examina a eficácia dos sistemas de gestão utilizados. Ter sistema não basta; ele precisa refletir a operação real.",
          "Tecnologia — mede o grau de digitalização dos processos. Processos ainda manuais são lentos, caros e difíceis de rastrear.",
          "Inovação — avalia o compromisso com a melhoria contínua e a adoção de novas práticas e tecnologias.",
          "Pessoas — analisa a gestão do capital humano: papéis claros, capacitação e engajamento da equipe.",
          "Processos — avalia o nível de mapeamento, padronização e controle dos fluxos operacionais da empresa.",
        ],
      },
      {
        type: "h2",
        text: "Por que avaliar as sete dimensões juntas",
      },
      {
        type: "p",
        text: "Uma empresa pode ter tecnologia de ponta e, ainda assim, viver no caos porque seus processos nunca foram mapeados. Outra pode ter processos bem definidos no papel, mas sem sistemas que os sustentem no dia a dia. A força da DISTIPP está justamente em cruzar as dimensões: o diagnóstico mostra não só onde a empresa está fraca, mas qual sequência de melhorias gera o maior retorno com o menor esforço.",
      },
      {
        type: "p",
        text: "É por isso que a reengenharia de processos conduzida pela VIEW não começa pela ferramenta — começa pelo diagnóstico. Primeiro entendemos a maturidade atual em cada dimensão; depois desenhamos a solução (mapeamento de processos, automação, sistema sob medida ou visibilidade em tempo real) para as lacunas que realmente importam.",
      },
      { type: "h2", text: "Como descobrir a maturidade da sua empresa" },
      {
        type: "p",
        text: "A VIEW disponibiliza um diagnóstico gratuito baseado na metodologia DISTIPP. Em menos de cinco minutos, o questionário avalia as sete dimensões e devolve um retrato do nível de maturidade operacional do seu negócio, com indicação de por onde começar. É o primeiro passo para trocar o esforço improvisado por uma operação que você consegue enxergar e controlar.",
      },
    ],
    faqs: [
      {
        q: "O que significa a sigla DISTIPP?",
        a: "DISTIPP reúne as iniciais das sete dimensões avaliadas pela metodologia da VIEW: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos.",
      },
      {
        q: "A avaliação de maturidade DISTIPP é gratuita?",
        a: "Sim. A VIEW oferece um diagnóstico gratuito de maturidade operacional baseado na metodologia DISTIPP, com resultado personalizado em menos de cinco minutos.",
      },
      {
        q: "Para que tipo de empresa a metodologia DISTIPP serve?",
        a: "A DISTIPP foi desenhada para pequenas e médias empresas que querem organizar e escalar sua operação — de construtoras a restaurantes — avaliando de forma objetiva onde estão os gargalos que impedem o crescimento.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
