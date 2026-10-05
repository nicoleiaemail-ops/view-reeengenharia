// Conteúdo do blog. Cada artigo é editável aqui — o texto pode ser revisado
// livremente. As páginas /blog e /blog/:slug são geradas a partir destes dados.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  // Link interno real (não clicável se fosse só texto dentro de "p") — usado
  // para linkar de um artigo para uma landing page relacionada.
  | { type: "link"; text: string; href: string };

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
  // Rascunho: continua acessível por link direto (para revisão), mas some da
  // listagem de /blog, do JSON-LD de Blog/BlogPosting e do sitemap.xml — não
  // deve ser indexado nem recomendado por buscador ou agente antes de aprovado.
  draft?: boolean;
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
  {
    slug: "software-sob-medida-ou-sistema-pronto-como-decidir",
    title: "Software sob medida ou sistema pronto? Como decidir",
    seoTitle: "Software Sob Medida ou Sistema Pronto? Como Decidir | VIEW",
    description:
      "Critérios para decidir entre comprar um sistema pronto e desenvolver um software sob medida: quando cada caminho compensa e qual é o erro mais comum nessa escolha.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    author: "Equipe VIEW",
    tag: "Sistemas",
    readingMinutes: 6,
    draft: true,
    lead: "A pergunta não é qual sistema é melhor — é se o seu processo é parecido com o de qualquer empresa do seu setor ou se ele tem uma particularidade que nenhum sistema pronto resolve de verdade. A resposta muda a decisão inteira.",
    body: [
      {
        type: "p",
        text: "Toda empresa em crescimento chega nessa encruzilhada: continuar com o sistema pronto que já usa, trocar por outro sistema pronto, ou desenvolver algo sob medida. A tentação é decidir pelo preço — o sistema pronto quase sempre custa menos no primeiro mês. Mas essa não é a pergunta certa.",
      },
      {
        type: "p",
        text: "A pergunta certa é: o seu processo é igual ao de qualquer empresa do seu setor, ou ele tem uma particularidade que faz diferença na prática? Se a resposta for 'é tudo igual', um sistema pronto resolve, e desenvolver algo sob medida seria gastar tempo e dinheiro reinventando o que já existe.",
      },
      { type: "h2", text: "O sinal mais comum de que o sistema pronto não encaixa" },
      {
        type: "p",
        text: "Não é o preço da licença. É a planilha paralela. Quando a equipe usa o sistema pronto para uma parte do trabalho e mantém uma planilha por fora para o que o sistema não dá conta, isso é o processo real da empresa tentando existir dentro de um sistema genérico demais para ele.",
      },
      {
        type: "ul",
        items: [
          "Campos obrigatórios que não fazem sentido para a sua operação, e que a equipe preenche com qualquer coisa só para avançar a tela.",
          "Uma etapa do seu processo que o sistema não tem como representar, então vira anotação, e-mail ou mensagem de WhatsApp.",
          "Relatório que você precisa montar 'na mão' depois, porque o sistema não cruza os dados do jeito que a sua gestão precisa decidir.",
        ],
      },
      { type: "h2", text: "Quando o sistema pronto é a escolha certa" },
      {
        type: "p",
        text: "Processos de apoio que são praticamente iguais em qualquer empresa — folha de pagamento, emissão de nota fiscal, contabilidade — raramente justificam um sistema sob medida. A regra é padronizada por lei ou por convenção do mercado, e um sistema pronto, bem configurado, resolve com menos risco e menos custo.",
      },
      { type: "h2", text: "Quando vale a pena desenvolver sob medida" },
      {
        type: "p",
        text: "Quando o processo que diferencia a sua empresa da concorrente — a forma como você atende, produz, entrega ou presta contas — não cabe em nenhum sistema genérico sem ser forçado. Nesses casos, adaptar o processo ao sistema custa mais caro no longo prazo do que construir o sistema certo desde o início.",
      },
      {
        type: "p",
        text: "O caminho mais seguro não é decidir pelo preço da licença nem pelo preço do desenvolvimento: é mapear o processo primeiro e só depois comparar as duas opções com clareza sobre o que cada uma resolve e o que cada uma deixa sem solução.",
      },
      {
        type: "link",
        text: "Ver como funciona a fábrica de software sob medida da VIEW em João Pessoa",
        href: "/fabrica-de-software-sob-medida-joao-pessoa",
      },
    ],
    faqs: [
      {
        q: "Sistema sob medida é sempre mais caro que sistema pronto?",
        a: "No primeiro momento, quase sempre. No longo prazo, depende de quanto a empresa gasta hoje contornando as limitações do sistema pronto com planilha e retrabalho manual.",
      },
      {
        q: "Dá para começar com sistema pronto e migrar depois?",
        a: "Sim, e é um caminho comum. O risco é deixar essa migração tarde demais, quando o processo já cresceu em cima das limitações do sistema atual.",
      },
      {
        q: "Quem decide isso dentro da empresa?",
        a: "Idealmente, quem conhece o processo operacional na prática, não só quem assina o contrato do sistema. É por isso que o diagnóstico de processo vem antes da escolha do sistema.",
      },
    ],
  },
  {
    slug: "ia-no-whatsapp-quando-vale-a-pena",
    title: "IA no WhatsApp: quando vale a pena e quando uma automação simples resolve",
    seoTitle: "IA no WhatsApp: Quando Vale a Pena? | VIEW",
    description:
      "Nem todo atendimento no WhatsApp precisa de inteligência artificial. Veja quando uma automação tradicional resolve e quando um agente de IA realmente compensa.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    author: "Equipe VIEW",
    tag: "IA Aplicada",
    readingMinutes: 5,
    draft: true,
    lead: "A pergunta mais cara que uma empresa faz sobre atendimento no WhatsApp não é 'quanto custa a IA'. É se o problema dela é mesmo de IA — ou se uma automação bem mais simples e mais barata já resolveria.",
    body: [
      {
        type: "p",
        text: "IA no WhatsApp virou sinônimo de modernização, e isso cria um efeito colateral: empresas contratam agentes de IA para problemas que uma automação tradicional resolveria com menos custo, menos risco de erro e implantação mais rápida.",
      },
      { type: "h2", text: "O teste simples: a conversa varia ou é sempre igual?" },
      {
        type: "p",
        text: "Se as perguntas do cliente seguem um roteiro fixo e previsível — horário de funcionamento, endereço, status de um pedido com número de referência —, uma automação tradicional, com fluxo de respostas programadas, resolve sem precisar interpretar linguagem natural.",
      },
      {
        type: "p",
        text: "A IA se justifica quando a conversa varia: o cliente escreve de um jeito diferente a cada vez, faz mais de uma pergunta na mesma mensagem, ou traz uma dúvida que depende de entender contexto para responder direito.",
      },
      { type: "h2", text: "Onde a IA no WhatsApp costuma valer a pena" },
      {
        type: "ul",
        items: [
          "Qualificação de leads: entender o que o cliente precisa antes de passar para um vendedor, poupando tempo de quem vende.",
          "Triagem de pedidos ou dúvidas que chegam em formatos variados, para direcionar ao time certo sem alguém ler mensagem por mensagem.",
          "Agendamento que depende de cruzar disponibilidade real da equipe com a preferência do cliente, em vez de um horário fixo.",
        ],
      },
      { type: "h2", text: "Onde uma automação simples já resolve" },
      {
        type: "p",
        text: "Confirmação de recebimento, envio de boleto, aviso de status de entrega com código de rastreio, resposta para perguntas frequentes sempre iguais — tudo isso é regra fixa, e regra fixa não precisa de inteligência artificial para funcionar bem.",
      },
      {
        type: "p",
        text: "O erro mais caro não é escolher IA por engano. É aplicar IA — ou automação — sobre um atendimento que ninguém mapeou direito. Nesse caso, a ferramenta certa só acelera a confusão que já existia.",
      },
      {
        type: "link",
        text: "Ver como a VIEW implanta agentes de IA no WhatsApp em João Pessoa",
        href: "/agentes-de-ia-whatsapp-joao-pessoa",
      },
    ],
    faqs: [
      {
        q: "Um agente de IA no WhatsApp substitui a equipe de atendimento?",
        a: "Não. Ele assume o repetitivo e a triagem inicial; decisão, negociação e exceção continuam sendo resolvidas por uma pessoa.",
      },
      {
        q: "É possível começar pequeno e expandir depois?",
        a: "Sim — e é o caminho mais seguro. Um escopo pequeno e testado reduz o risco de implantar um agente que erra justamente no primeiro contato com o cliente.",
      },
      {
        q: "O que acontece quando o agente não sabe responder?",
        a: "O desenho correto prevê isso: o agente reconhece o limite do que pode responder e transfere a conversa para um humano, em vez de arriscar uma resposta errada.",
      },
    ],
  },
  {
    slug: "7-perguntas-antes-de-automatizar-qualquer-processo",
    title: "7 perguntas antes de automatizar qualquer processo",
    seoTitle: "7 Perguntas Antes de Automatizar Qualquer Processo | VIEW",
    description:
      "O roteiro de 7 perguntas que a VIEW usa antes de qualquer automação ou IA: da eliminação do processo à métrica que prova se funcionou.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    author: "Equipe VIEW",
    tag: "Automação",
    readingMinutes: 5,
    draft: true,
    lead: "Automatizar o processo errado só faz o erro acontecer mais rápido. Estas sete perguntas, nesta ordem, são o que separa uma automação que funciona de uma que só parece moderna.",
    body: [
      {
        type: "p",
        text: "A primeira reação de muita empresa diante de um processo lento é perguntar 'como automatizar isso?'. A pergunta certa vem antes: esse processo deveria continuar existindo do jeito que está? Automatizar sem passar por isso é acelerar o problema, não resolvê-lo.",
      },
      { type: "h2", text: "As sete perguntas, na ordem" },
      {
        type: "ul",
        items: [
          "1. Esse processo precisa existir? Às vezes a etapa só existe porque sempre existiu, não porque alguém precisa dela hoje.",
          "2. Ele pode ser eliminado? Antes de melhorar uma etapa, vale testar se dá para cortá-la de vez.",
          "3. Ele pode ser simplificado? Muita etapa sobrevive porque ninguém nunca tentou torná-la mais simples.",
          "4. Ele pode ser padronizado? Um processo que muda de forma a cada pessoa que executa não está pronto para automação nenhuma.",
          "5. Automação tradicional resolve? Regra fixa, sem necessidade de interpretar linguagem ou imagem, costuma ser resolvida sem IA.",
          "6. A IA é realmente necessária? Só depois de descartar as opções mais simples e mais baratas.",
          "7. Qual resultado será medido? Sem um número combinado antes, não tem como saber se a automação funcionou.",
        ],
      },
      { type: "h2", text: "Por que a ordem importa mais que a lista" },
      {
        type: "p",
        text: "Inverter essa ordem é o erro mais comum: aplicar IA ou automação às pressas, para só depois descobrir que o processo tinha uma etapa que nem precisava existir. Nesse caso, o trabalho de desfazer e refazer custa mais do que teria custado seguir a ordem certa desde o início.",
      },
      {
        type: "p",
        text: "Se não houver uma resposta clara para a pergunta 7 — qual resultado será medido —, o projeto não deveria começar. É o critério mais simples para saber se uma automação foi bem pensada ou só parece moderna.",
      },
      {
        type: "link",
        text: "Ver como a VIEW aplica automação de processos com IA em João Pessoa",
        href: "/automacao-de-processos-joao-pessoa",
      },
    ],
    faqs: [
      {
        q: "Essas sete perguntas servem para qualquer tipo de processo?",
        a: "Sim. O roteiro vale tanto para um processo manual simples quanto para um fluxo que hoje já envolve vários sistemas.",
      },
      {
        q: "Quem deveria responder essas perguntas dentro da empresa?",
        a: "Quem executa o processo no dia a dia, junto com quem decide o investimento. Responder só do ponto de vista gerencial costuma pular etapas que a prática revelaria.",
      },
      {
        q: "O que fazer se a resposta da pergunta 7 não existir?",
        a: "Definir a métrica antes de prosseguir. Automatizar sem saber o que medir é o sinal mais claro de que o projeto ainda não está pronto para começar.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Artigos publicados — usar para listagem, JSON-LD e sitemap. */
export function publishedArticles(): Article[] {
  return articles.filter((a) => !a.draft);
}
