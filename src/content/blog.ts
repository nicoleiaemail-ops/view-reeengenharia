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
  {
    slug: "reengenharia-de-processos-o-que-e-quando-sua-empresa-precisa",
    title:
      "Reengenharia de processos: o que é e quando sua empresa precisa",
    seoTitle:
      "Reengenharia de Processos: o que é e quando sua empresa precisa | VIEW",
    description:
      "O que é reengenharia de processos, como funciona na prática e quais sinais mostram que sua PME precisa repensar a forma como opera. Guia da VIEW com exemplos reais.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    author: "Equipe VIEW",
    tag: "Processos",
    readingMinutes: 6,
    lead: "Reengenharia de processos é repensar e redesenhar a forma como o trabalho acontece dentro da empresa — não para trabalhar mais, mas para eliminar o que trava, atrasa e gera retrabalho. É o oposto de automatizar o caos: primeiro se organiza o fluxo, depois a tecnologia sustenta o novo modelo.",
    body: [
      {
        type: "p",
        text: "Muitas empresas crescem empilhando soluções improvisadas. Um processo que funcionava com cinco pessoas passa a falhar com vinte, mas ninguém para para redesenhá-lo — apenas se adicionam mais planilhas, mais grupos de WhatsApp e mais horas extras. A reengenharia de processos existe para quebrar esse ciclo: em vez de remendar, ela reconstrói o fluxo de trabalho a partir da pergunta certa — 'qual é a melhor forma de fazer isso hoje?'.",
      },
      { type: "h2", text: "O que é reengenharia de processos" },
      {
        type: "p",
        text: "Reengenharia de processos é a revisão profunda de como uma atividade é executada, com o objetivo de torná-la mais rápida, mais barata e mais confiável. Não se trata de pequenos ajustes: é olhar o processo de ponta a ponta — do primeiro contato do cliente até a entrega final — e redesenhar cada etapa para eliminar desperdício, duplicidade e pontos cegos.",
      },
      {
        type: "p",
        text: "A diferença para uma simples 'digitalização' é importante. Digitalizar um processo ruim só faz o problema andar mais rápido. A reengenharia primeiro corrige a lógica do fluxo; a tecnologia entra depois, para sustentar o processo já melhorado.",
      },
      { type: "h2", text: "Como funciona na prática" },
      {
        type: "ul",
        items: [
          "Mapeamento — desenha-se o processo real como ele acontece hoje, não como deveria ser no papel. Aqui aparecem os gargalos, as etapas manuais e os pontos onde a informação se perde.",
          "Diagnóstico — identifica-se o que gera atraso, retrabalho ou falta de visibilidade, e o que pode ser eliminado, automatizado ou padronizado.",
          "Redesenho — constrói-se o novo fluxo, mais enxuto e claro, com responsáveis e registros definidos em cada etapa.",
          "Sustentação — implanta-se a tecnologia (automação, sistema sob medida, painéis em tempo real) que mantém o novo processo funcionando sem depender de esforço heroico.",
        ],
      },
      { type: "h2", text: "Sinais de que sua empresa precisa de reengenharia" },
      {
        type: "ul",
        items: [
          "Você só sabe o andamento de um trabalho ligando para perguntar a alguém.",
          "A mesma informação é digitada mais de uma vez, em lugares diferentes.",
          "Erros e atrasos se repetem, sempre nas mesmas etapas.",
          "O conhecimento do processo está na cabeça de poucas pessoas — se elas faltam, a operação trava.",
          "Auditorias, fechamentos ou relatórios viram uma corrida contra o tempo para juntar dados espalhados.",
        ],
      },
      {
        type: "p",
        text: "Foi exatamente esse cenário que uma construtora atendida pela VIEW enfrentava antes de mapear seus processos: registros de obra dispersos em papel, planilhas e mensagens, e uma corrida a cada auditoria ISO 9001. Depois do redesenho, cada etapa passou a gerar um registro automático em tempo real — e a diretoria passou a acompanhar qualquer projeto de onde estiver, sem retrabalho.",
      },
      {
        type: "p",
        text: "Se você reconheceu sua empresa em mais de um desses sinais, provavelmente o problema não é a equipe — é o processo. E processo se redesenha. O primeiro passo é entender o nível de maturidade atual da operação para saber por onde começar.",
      },
    ],
    faqs: [
      {
        q: "Qual a diferença entre reengenharia de processos e automação?",
        a: "A reengenharia redesenha a lógica do processo para eliminar desperdício e retrabalho; a automação é a tecnologia que sustenta esse novo processo. Automatizar sem redesenhar apenas acelera um processo ruim.",
      },
      {
        q: "Reengenharia de processos serve para pequenas empresas?",
        a: "Sim. PMEs costumam ter o maior ganho, porque muitos processos nunca foram formalmente desenhados. Organizar o fluxo destrava crescimento sem exigir aumento proporcional de equipe.",
      },
      {
        q: "Por onde começar uma reengenharia de processos?",
        a: "Pelo diagnóstico. Antes de mudar qualquer coisa, é preciso mapear como o processo funciona hoje e medir a maturidade da operação para priorizar as melhorias de maior retorno.",
      },
    ],
  },
  {
    slug: "automacao-de-processos-para-pmes-por-onde-comecar",
    title:
      "Automação de processos para PMEs: por onde começar sem gastar muito",
    seoTitle:
      "Automação de Processos para PMEs: por onde começar | VIEW",
    description:
      "Guia prático de automação de processos para pequenas e médias empresas: o que automatizar primeiro, erros comuns e como começar com baixo custo e alto retorno.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    author: "Equipe VIEW",
    tag: "Automação",
    readingMinutes: 5,
    lead: "Automação não é privilégio de grande empresa. Para uma PME, o segredo não é automatizar tudo de uma vez, e sim começar pelas tarefas repetitivas que consomem tempo e geram erro — aquelas que hoje dependem de alguém lembrar de fazer.",
    body: [
      {
        type: "p",
        text: "Quando se fala em automação, muita gente imagina sistemas caros e projetos longos. Na prática, para a maioria das pequenas e médias empresas, os maiores ganhos vêm de automatizar tarefas simples e repetitivas: um registro que hoje é digitado à mão, um aviso que alguém precisa lembrar de enviar, um relatório montado toda semana no braço. São pequenas fontes de desperdício que, somadas, custam horas por semana.",
      },
      { type: "h2", text: "O que automatizar primeiro" },
      {
        type: "p",
        text: "A regra é começar pelo que é ao mesmo tempo repetitivo, frequente e sujeito a erro humano. Tarefas assim dão o retorno mais rápido e são as mais seguras de automatizar.",
      },
      {
        type: "ul",
        items: [
          "Registros manuais que se repetem — dados digitados mais de uma vez em planilhas ou cadernos podem ser capturados uma única vez, na origem.",
          "Avisos e cobranças que dependem de memória — lembretes de prazo, follow-up de cliente e alertas de etapa atrasada podem ser automáticos.",
          "Relatórios recorrentes — números que alguém consolida toda semana podem ser gerados sozinhos, sempre atualizados.",
          "Passagem de informação entre setores — o que hoje se comunica por mensagem solta pode fluir direto de uma etapa para a próxima.",
        ],
      },
      { type: "h2", text: "O erro mais comum: automatizar o caos" },
      {
        type: "p",
        text: "O maior erro de uma PME ao automatizar é acelerar um processo que ainda está bagunçado. Se o fluxo tem etapas desnecessárias, retrabalho e falta de padrão, automatizá-lo só faz o problema acontecer mais rápido — e mais caro de corrigir. Por isso a automação eficiente vem depois de organizar o processo: primeiro se elimina o desperdício, depois a tecnologia sustenta o fluxo já enxuto.",
      },
      { type: "h2", text: "Como começar com baixo custo" },
      {
        type: "ul",
        items: [
          "Escolha um processo só — o que mais dói hoje — em vez de tentar mudar tudo de uma vez.",
          "Meça o tempo gasto hoje nesse processo; é o que vai provar o retorno da automação.",
          "Padronize antes de automatizar: defina como a tarefa deve ser feita da melhor forma.",
          "Implante a automação nesse processo, valide o ganho e só então avance para o próximo.",
        ],
      },
      {
        type: "p",
        text: "Foi assim que um restaurante atendido pela VIEW saiu do caos na hora do almoço: em vez de comprar um sistema genérico, primeiro mapeou-se cada etapa — do pedido ao pagamento — e reorganizou-se o fluxo. Com o processo enxuto e os dados capturados em tempo real, o atendimento ficou mais rápido e os custos caíram. A tecnologia entrou para sustentar um processo que já fazia sentido.",
      },
      {
        type: "p",
        text: "Automação bem-feita não é sobre gastar muito — é sobre começar pelo lugar certo. E o lugar certo quase sempre aparece quando você olha a maturidade da sua operação com clareza.",
      },
    ],
    faqs: [
      {
        q: "Automação de processos é cara para uma pequena empresa?",
        a: "Não precisa ser. Os maiores ganhos costumam vir de automatizar tarefas repetitivas simples, começando por um processo de cada vez. Isso reduz o custo inicial e prova o retorno antes de investir mais.",
      },
      {
        q: "O que automatizar primeiro na minha empresa?",
        a: "Comece pelas tarefas repetitivas, frequentes e sujeitas a erro: registros manuais duplicados, avisos que dependem de memória e relatórios recorrentes. São as que dão retorno mais rápido.",
      },
      {
        q: "Preciso organizar o processo antes de automatizar?",
        a: "Sim. Automatizar um processo bagunçado só acelera o problema. O ideal é padronizar e eliminar desperdício primeiro, e depois automatizar o fluxo já enxuto.",
      },
    ],
  },
  {
    slug: "visibilidade-operacional-em-tempo-real",
    title:
      "Visibilidade operacional em tempo real: o que é e por que muda a gestão",
    seoTitle:
      "Visibilidade Operacional em Tempo Real: o que é | VIEW",
    description:
      "O que é visibilidade operacional em tempo real, por que ela transforma a gestão de uma PME e como sair do 'achismo' para decisões baseadas no que realmente está acontecendo na operação.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    author: "Equipe VIEW",
    tag: "Gestão",
    readingMinutes: 5,
    lead: "Você não pode melhorar o que não consegue ver. Visibilidade operacional em tempo real é enxergar o que está acontecendo na sua operação no momento em que acontece — não horas ou dias depois, quando o problema já cresceu.",
    body: [
      {
        type: "p",
        text: "A maioria dos gestores de PME toma decisões olhando para o retrovisor: relatórios que chegam no fim do dia, planilhas atualizadas na segunda-feira, informações que dependem de alguém parar para contar o que aconteceu. Quando o dado chega, ele já é passado — e o problema que ele revela já custou tempo e dinheiro. Visibilidade em tempo real muda essa lógica.",
      },
      { type: "h2", text: "O que é visibilidade operacional em tempo real" },
      {
        type: "p",
        text: "É a capacidade de acompanhar o andamento real da operação no instante em que ela acontece: o que já foi feito, o que está em curso, o que atrasou e quem está responsável por cada etapa. Em vez de perguntar para saber, o gestor abre um painel e vê. A informação deixa de estar espalhada em cabeças, mensagens e planilhas e passa a estar num único lugar, sempre atualizada.",
      },
      { type: "h2", text: "Por que isso muda a gestão" },
      {
        type: "ul",
        items: [
          "Decisão com base em fato, não em achismo — você age sobre o que está acontecendo, não sobre o que imagina que está.",
          "Problemas aparecem cedo — um atraso é visto quando começa, não quando já contaminou o resto do trabalho.",
          "Menos tempo perdido cobrando status — a informação chega sozinha, liberando o gestor para decidir em vez de perseguir dados.",
          "Autonomia da equipe — todos enxergam a mesma verdade, o que reduz ruído e dependência de reuniões e ligações.",
        ],
      },
      { type: "h2", text: "Do achismo à clareza" },
      {
        type: "p",
        text: "Um supervisor de obra atendido pela VIEW resumiu bem a mudança: antes, precisava ligar para cada encarregado para saber o que estava acontecendo; depois, passou a abrir o aplicativo e ver tudo — o que foi feito, o que atrasou, quem está onde. A gestão deixou de ser reativa e passou a ser feita com a operação inteira à vista, pelo celular.",
      },
      {
        type: "p",
        text: "Visibilidade em tempo real não é um luxo tecnológico — é o que permite melhorar de verdade. Afinal, você não pode corrigir, otimizar ou escalar aquilo que não consegue enxergar. O ponto de partida é entender onde sua operação está hoje e quais informações você ainda toma no escuro.",
      },
    ],
    faqs: [
      {
        q: "O que é visibilidade operacional em tempo real?",
        a: "É acompanhar o andamento da operação no momento em que acontece — o que foi feito, o que está em curso, o que atrasou e quem é responsável — a partir de informação centralizada e sempre atualizada, em vez de relatórios defasados.",
      },
      {
        q: "Qual a vantagem de ter dados em tempo real numa PME?",
        a: "Permite decidir com base no que realmente está acontecendo, identificar problemas cedo, reduzir o tempo gasto cobrando status e dar mais autonomia à equipe, que passa a enxergar a mesma informação.",
      },
      {
        q: "Como implantar visibilidade em tempo real na operação?",
        a: "Primeiro se mapeia e organiza o processo; depois se captura a informação na origem, em cada etapa, e se concentra tudo em um painel único. Assim o dado deixa de estar espalhado e passa a ser visível a qualquer momento.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
