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
      {
        type: "link",
        text: "Veja o detalhamento completo de cada um dos 7 pilares no método DISTIPP →",
        href: "/metodo-distipp",
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
    readingMinutes: 8,
    lead: "A pergunta não é qual sistema é melhor — é se o seu processo é parecido com o de qualquer empresa do seu setor ou se ele tem uma particularidade que nenhum sistema pronto resolve de verdade. A resposta muda a decisão inteira.",
    body: [
      {
        type: "p",
        text: "Toda empresa em crescimento chega nessa encruzilhada: continuar com o sistema pronto que já usa, trocar por outro sistema pronto, ou desenvolver algo sob medida. A tentação é decidir pelo preço — o sistema pronto quase sempre custa menos no primeiro mês. Mas essa não é a pergunta certa, e decidir só por ela é o motivo mais comum de uma empresa trocar de sistema duas ou três vezes em poucos anos sem nunca resolver o problema de fato.",
      },
      {
        type: "p",
        text: "A pergunta certa é: o seu processo é igual ao de qualquer empresa do seu setor, ou ele tem uma particularidade que faz diferença na prática? Se a resposta for 'é tudo igual', um sistema pronto resolve, e desenvolver algo sob medida seria gastar tempo e dinheiro reinventando o que já existe. Se a resposta for 'tem uma parte que é só nossa', vale olhar com mais cuidado antes de assinar qualquer contrato.",
      },
      { type: "h2", text: "O sinal mais comum de que o sistema pronto não encaixa" },
      {
        type: "p",
        text: "Não é o preço da licença. É a planilha paralela. Quando a equipe usa o sistema pronto para uma parte do trabalho e mantém uma planilha por fora para o que o sistema não dá conta, isso é o processo real da empresa tentando existir dentro de um sistema genérico demais para ele. Com o tempo, essa planilha vira a fonte de verdade de fato — e o sistema pronto vira só um registro incompleto que ninguém confia plenamente.",
      },
      {
        type: "ul",
        items: [
          "Campos obrigatórios que não fazem sentido para a sua operação, e que a equipe preenche com qualquer coisa só para avançar a tela.",
          "Uma etapa do seu processo que o sistema não tem como representar, então vira anotação, e-mail ou mensagem de WhatsApp.",
          "Relatório que você precisa montar 'na mão' depois, porque o sistema não cruza os dados do jeito que a sua gestão precisa decidir.",
          "Mais de uma pessoa reconciliando a mesma informação em lugares diferentes, porque nenhum sistema sozinho conta a história inteira.",
        ],
      },
      {
        type: "p",
        text: "Esse padrão tem um custo que raramente aparece em nenhuma planilha de orçamento: o tempo gasto reconciliando informação é tempo que não vai para atender cliente, vender ou produzir. Quando esse tempo se acumula mês após mês, ele costuma superar, de longe, a diferença de preço entre manter o sistema pronto remendado e investir em algo que resolva o processo de uma vez.",
      },
      { type: "h2", text: "Quando o sistema pronto é a escolha certa" },
      {
        type: "p",
        text: "Processos de apoio que são praticamente iguais em qualquer empresa — folha de pagamento, emissão de nota fiscal, contabilidade — raramente justificam um sistema sob medida. A regra é padronizada por lei ou por convenção do mercado, e um sistema pronto, bem configurado, resolve com menos risco e menos custo. Nesses casos, o diferencial competitivo da empresa não está em como a nota fiscal é emitida — está em outro lugar, e é lá que vale concentrar o investimento.",
      },
      {
        type: "p",
        text: "Vale lembrar também que 'sistema pronto' não é sinônimo de 'sem ajuste'. Muita plataforma de mercado permite configuração, campo customizado e integração via API — o que, para boa parte das empresas, já é suficiente. O erro é supor que, por ser pronto, o sistema precisa ser usado exatamente como veio de fábrica, sem nenhuma adaptação ao processo real.",
      },
      { type: "h2", text: "Quando vale a pena desenvolver sob medida" },
      {
        type: "p",
        text: "Quando o processo que diferencia a sua empresa da concorrente — a forma como você atende, produz, entrega ou presta contas — não cabe em nenhum sistema genérico sem ser forçado. Nesses casos, adaptar o processo ao sistema custa mais caro no longo prazo do que construir o sistema certo desde o início: a empresa perde exatamente a particularidade que a diferencia, só para caber num fluxo pensado para outra empresa.",
      },
      {
        type: "p",
        text: "Um sinal complementar: se a resposta de 'por que fazemos assim' é uma vantagem real (um atendimento mais rápido, uma entrega mais confiável, um controle que o concorrente não tem), esse é precisamente o processo que não deveria ser padronizado para caber num sistema de prateleira.",
      },
      { type: "h2", text: "O meio-termo que poucas empresas consideram: integrar em vez de substituir" },
      {
        type: "p",
        text: "A escolha raramente precisa ser 'tudo pronto' ou 'tudo sob medida'. Em muitos projetos, a solução certa é manter o sistema pronto que já funciona para o que ele resolve bem — financeiro, nota fiscal, folha — e desenvolver sob medida só a parte que de fato diferencia a operação, integrando as duas pontas para que a informação circule sem reconciliação manual. Essa combinação costuma custar menos do que substituir tudo, e entrega exatamente o ganho que faltava.",
      },
      { type: "h2", text: "Como esse diagnóstico é feito na prática" },
      {
        type: "p",
        text: "O caminho mais seguro não é decidir pelo preço da licença nem pelo preço do desenvolvimento: é mapear o processo primeiro e só depois comparar as duas opções com clareza sobre o que cada uma resolve e o que cada uma deixa sem solução. Isso significa descrever o processo como ele realmente acontece — não como o manual diz que deveria ser — antes de qualquer conversa sobre sistema.",
      },
      {
        type: "p",
        text: "Só depois desse mapeamento é possível comparar com honestidade: quanto custa manter o sistema pronto com a planilha paralela, quanto custaria desenvolver o sistema sob medida, e qual das duas contas realmente fecha para o tamanho e o estágio daquela empresa hoje — não para o que ela pretende ser daqui a cinco anos.",
      },
      { type: "h2", text: "Um raciocínio hipotético, só para ilustrar" },
      {
        type: "p",
        text: "Para tornar esse raciocínio mais concreto, vale um exemplo hipotético — sem nenhuma empresa real por trás, só para ilustrar o padrão. Imagine uma operação que usa um sistema de gestão genérico para controlar pedidos, mas tem uma etapa de conferência que o sistema não enxerga, porque essa etapa só existe naquele negócio específico. Hoje essa conferência é feita numa planilha separada, e alguém precisa copiar o resultado de volta para o sistema principal todos os dias.",
      },
      {
        type: "p",
        text: "Nesse cenário hipotético, a pergunta não é se o sistema atual é bom ou ruim — é se aquela etapa de conferência é exceção rara ou parte estrutural do negócio. Se for exceção, um ajuste pontual no processo pode bastar. Se for estrutural, nenhuma configuração do sistema pronto vai eliminar a planilha paralela, porque o sistema nunca foi desenhado para representar aquela etapa.",
      },
      { type: "h2", text: "O risco de trocar de sistema pronto sem resolver a causa" },
      {
        type: "p",
        text: "Um padrão comum é trocar de sistema pronto esperando que o novo resolva o que o antigo não resolveu — e descobrir, meses depois, a mesma planilha paralela, só que ao lado de uma ferramenta diferente. Isso acontece porque a causa do problema nunca estava no sistema escolhido: estava em tentar encaixar um processo particular dentro de qualquer solução genérica, seja ela qual for.",
      },
      {
        type: "p",
        text: "Por isso a pergunta deste artigo não é 'qual sistema pronto escolher' — é se, antes de qualquer escolha, o processo foi de fato entendido a ponto de saber se ele é genérico (e cabe em qualquer sistema de mercado) ou particular (e vai continuar escapando de qualquer sistema pronto, até que alguém desenhe algo sob medida para ele).",
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
      {
        q: "Dá para integrar um sistema sob medida com o sistema pronto que já uso?",
        a: "Na maioria dos casos sim. É inclusive o caminho mais comum: manter o que já funciona bem e desenvolver sob medida apenas a parte do processo que o sistema pronto não resolve.",
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
    readingMinutes: 7,
    lead: "A pergunta mais cara que uma empresa faz sobre atendimento no WhatsApp não é 'quanto custa a IA'. É se o problema dela é mesmo de IA — ou se uma automação bem mais simples e mais barata já resolveria.",
    body: [
      {
        type: "p",
        text: "IA no WhatsApp virou sinônimo de modernização, e isso cria um efeito colateral: empresas contratam agentes de IA para problemas que uma automação tradicional resolveria com menos custo, menos risco de erro e implantação mais rápida. O resultado costuma ser um projeto caro, complexo de manter, e que resolve um problema que nunca precisou de inteligência artificial para começar.",
      },
      {
        type: "p",
        text: "Isso não significa que IA no WhatsApp seja exagero. Significa que a decisão certa começa num lugar diferente de onde a maioria das empresas começa: não em 'qual IA contratar', mas em 'o que, exatamente, está travando o atendimento hoje'.",
      },
      { type: "h2", text: "O teste simples: a conversa varia ou é sempre igual?" },
      {
        type: "p",
        text: "Se as perguntas do cliente seguem um roteiro fixo e previsível — horário de funcionamento, endereço, status de um pedido com número de referência —, uma automação tradicional, com fluxo de respostas programadas, resolve sem precisar interpretar linguagem natural. Esse tipo de automação é mais barata, mais rápida de implantar e praticamente não tem margem de erro, porque segue uma regra fixa.",
      },
      {
        type: "p",
        text: "A IA se justifica quando a conversa varia: o cliente escreve de um jeito diferente a cada vez, faz mais de uma pergunta na mesma mensagem, ou traz uma dúvida que depende de entender contexto para responder direito. Nesses casos, um fluxo de respostas fixas quebra rápido — qualquer pergunta fora do roteiro previsto trava a conversa ou gera uma resposta sem sentido, e o cliente percebe isso na hora.",
      },
      {
        type: "p",
        text: "Vale notar que essa variação não precisa ser constante para justificar IA — basta que ela apareça numa parte relevante do volume de conversas. Uma empresa pode ter 80% das mensagens seguindo um roteiro fixo e perfeitamente resolvível por automação tradicional, e ainda assim valer a pena um agente de IA para os 20% restantes, se esses 20% representarem o atendimento que mais frustra o cliente quando mal resolvido.",
      },
      { type: "h2", text: "Onde a IA no WhatsApp costuma valer a pena" },
      {
        type: "ul",
        items: [
          "Qualificação de leads: entender o que o cliente precisa antes de passar para um vendedor, poupando tempo de quem vende.",
          "Triagem de pedidos ou dúvidas que chegam em formatos variados, para direcionar ao time certo sem alguém ler mensagem por mensagem.",
          "Agendamento que depende de cruzar disponibilidade real da equipe com a preferência do cliente, em vez de um horário fixo.",
          "Primeiro atendimento fora do horário comercial, quando o volume de mensagens justifica uma resposta imediata e contextual em vez de um aviso genérico de ausência.",
        ],
      },
      {
        type: "p",
        text: "Em todos esses casos, o ponto em comum é a variação: o que o cliente escreve, quando escreve e o que ele precisa mudam de conversa para conversa. É exatamente esse tipo de variação que uma automação de regra fixa não acompanha, e que justifica o custo adicional de um agente de IA.",
      },
      { type: "h2", text: "Onde uma automação simples já resolve" },
      {
        type: "p",
        text: "Confirmação de recebimento, envio de boleto, aviso de status de entrega com código de rastreio, resposta para perguntas frequentes sempre iguais — tudo isso é regra fixa, e regra fixa não precisa de inteligência artificial para funcionar bem. Uma automação tradicional entrega exatamente o mesmo resultado nesses casos, com menos custo de manutenção e sem o risco de uma resposta mal interpretada.",
      },
      {
        type: "p",
        text: "Vale notar que as duas abordagens não são excludentes. Muitos projetos bons combinam as duas: uma camada de automação tradicional cuida do que é previsível, e um agente de IA entra só na parcela de conversas que realmente exige entender contexto. Essa combinação costuma custar menos do que colocar IA em tudo, e entrega o mesmo resultado onde ele importa.",
      },
      { type: "h2", text: "O erro mais caro: automatizar um atendimento que ninguém mapeou" },
      {
        type: "p",
        text: "O erro mais caro não é escolher IA por engano. É aplicar IA — ou automação — sobre um atendimento que ninguém mapeou direito. Nesse caso, a ferramenta certa só acelera a confusão que já existia: se hoje o cliente já recebe respostas inconsistentes dependendo de quem atende, um agente de IA treinado em cima dessa inconsistência vai replicar o mesmo problema, só que mais rápido e em maior volume.",
      },
      {
        type: "p",
        text: "É por isso que, antes de qualquer decisão sobre tecnologia, vale mapear o fluxo real de atendimento: quais perguntas chegam, com que frequência, quem responde hoje e o que diferencia uma resposta boa de uma resposta ruim. Só com esse mapeamento em mãos a escolha entre automação tradicional e IA deixa de ser uma aposta e passa a ser uma decisão com critério.",
      },
      { type: "h2", text: "O que medir antes de decidir" },
      {
        type: "p",
        text: "Dois números simples já ajudam bastante nessa decisão: quantas conversas por dia chegam no WhatsApp da empresa, e que fração delas segue, de fato, um roteiro previsível. Quando a maior parte do volume é repetitiva e previsível, a prioridade é automação tradicional — o ganho ali é imediato e o investimento, baixo. Quando uma fração relevante das conversas exige entender o que o cliente quis dizer, é nessa fração que vale concentrar o investimento em IA, em vez de aplicá-la ao volume inteiro.",
      },
      {
        type: "p",
        text: "Vale medir também o que acontece hoje quando o atendimento humano não dá conta do volume: mensagem sem resposta, resposta demorada, cliente que desiste de esperar. Esse é o custo real de não automatizar nada — e é ele que deveria ser comparado ao custo de implantar automação ou IA, não o contrário.",
      },
      { type: "h2", text: "Como esse projeto costuma ser desenhado" },
      {
        type: "p",
        text: "Um projeto de atendimento no WhatsApp bem desenhado separa claramente as duas camadas antes de escrever uma linha de configuração: o que é regra fixa vira automação tradicional, testada e estável; o que exige entender contexto vira escopo do agente de IA, delimitado o suficiente para que ele saiba, com clareza, quando transferir a conversa para uma pessoa em vez de arriscar uma resposta errada.",
      },
      {
        type: "p",
        text: "Esse desenho por camadas também facilita medir o resultado depois: é possível acompanhar separadamente quantas conversas a automação tradicional resolveu sem nenhuma intervenção humana, e quantas o agente de IA qualificou ou resolveu antes de precisar de alguém da equipe — dois números que, juntos, mostram se o investimento voltou no tempo e no atendimento que a empresa esperava.",
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
      {
        q: "Dá para combinar automação tradicional e IA no mesmo atendimento?",
        a: "Sim, e é uma combinação comum: a automação tradicional cuida do que é previsível e repetitivo, e a IA entra só na parte da conversa que exige interpretar contexto.",
      },
      {
        q: "Quanto tempo leva para implantar um agente de IA no WhatsApp?",
        a: "Depende do escopo definido no mapeamento do atendimento. Um escopo pequeno e bem delimitado costuma ser mais rápido de implantar do que tentar cobrir toda a conversa de uma vez.",
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
    readingMinutes: 8,
    lead: "Automatizar o processo errado só faz o erro acontecer mais rápido. Estas sete perguntas, nesta ordem, são o que separa uma automação que funciona de uma que só parece moderna.",
    body: [
      {
        type: "p",
        text: "A primeira reação de muita empresa diante de um processo lento é perguntar 'como automatizar isso?'. A pergunta certa vem antes: esse processo deveria continuar existindo do jeito que está? Automatizar sem passar por isso é acelerar o problema, não resolvê-lo — e é também a forma mais cara de descobrir, meses depois, que o dinheiro foi investido em automatizar uma etapa que nem precisava existir.",
      },
      {
        type: "p",
        text: "O roteiro abaixo não é burocracia: é a ordem que evita o retrabalho de automatizar, perceber o erro e desfazer tudo depois. Cada pergunta só faz sentido depois que a anterior foi respondida com honestidade — pular uma delas é o que costuma transformar um projeto de automação em um projeto de correção.",
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
      { type: "h2", text: "Por que as três primeiras perguntas vêm antes de qualquer ferramenta" },
      {
        type: "p",
        text: "As perguntas 1 a 3 — existir, eliminar, simplificar — não têm nada a ver com tecnologia, e é exatamente por isso que costumam ser puladas. Elas exigem olhar para o processo com desconfiança, questionando uma etapa que a equipe já executa há tanto tempo que ninguém mais se pergunta por quê. É mais fácil perguntar 'que sistema resolve isso' do que perguntar 'isso devia continuar existindo'.",
      },
      {
        type: "p",
        text: "Só que a conta não fecha ao contrário. Automatizar uma etapa desnecessária entrega, no melhor dos casos, a mesma etapa desnecessária — só que mais rápida. O desperdício continua, agora rodando sozinho e mais difícil de notar, porque ninguém mais precisa executá-lo manualmente para perceber que ele não gera valor.",
      },
      { type: "h2", text: "Padronizar antes de automatizar: o passo que a maioria subestima" },
      {
        type: "p",
        text: "A pergunta 4 — pode ser padronizado? — é onde mais automação falha silenciosamente. Um processo que cada pessoa executa de um jeito não tem uma única regra para automatizar: tem várias regras concorrentes, e a automação só vai conseguir reproduzir uma delas. O resultado é uma ferramenta que funciona para parte da equipe e cria atrito para o resto, que vai continuar fazendo do seu próprio jeito por fora do sistema.",
      },
      {
        type: "p",
        text: "Padronizar antes significa decidir, com quem executa o processo, qual é a forma certa de fazer — não a forma de quem fala mais alto na reunião. Esse acordo, firmado antes da automação entrar, é o que garante que a ferramenta valha para a empresa inteira, não para uma parte dela.",
      },
      { type: "h2", text: "Automação tradicional ou IA: a escolha que vem nas perguntas 5 e 6" },
      {
        type: "p",
        text: "Depois que o processo está confirmado, simplificado e padronizado, a pergunta deixa de ser 'automatizar ou não' e passa a ser 'com o quê'. A pergunta 5 filtra o que é regra fixa e previsível — isso quase sempre se resolve com automação tradicional, mais barata e mais fácil de manter. Só o que sobra depois desse filtro chega à pergunta 6, que avalia se de fato existe uma necessidade real de interpretar linguagem, imagem ou contexto variável — e é só aí que a IA se justifica.",
      },
      {
        type: "p",
        text: "Inverter essa ordem — perguntar primeiro 'onde cabe IA' — é o que leva empresas a aplicar uma solução cara e complexa em um problema que uma automação simples resolveria com uma fração do custo e do risco.",
      },
      { type: "h2", text: "A pergunta que decide se o projeto deveria começar" },
      {
        type: "p",
        text: "Se não houver uma resposta clara para a pergunta 7 — qual resultado será medido —, o projeto não deveria começar. É o critério mais simples para saber se uma automação foi bem pensada ou só parece moderna: sem um número combinado antes de automatizar, não existe como comparar o antes e o depois, e sem essa comparação não há como provar que o investimento valeu.",
      },
      {
        type: "p",
        text: "Esse número não precisa ser sofisticado. Pode ser tempo gasto na etapa, quantidade de erro por lote, ou tempo de resposta ao cliente — o que importa é que ele exista antes da primeira linha de automação ser escrita, para que a comparação depois seja contra um ponto de partida real, não contra uma impressão de que 'ficou mais rápido'.",
      },
      { type: "h2", text: "Como aplicar este roteiro num processo real" },
      {
        type: "p",
        text: "Na prática, aplicar as sete perguntas funciona melhor como uma conversa com quem executa o processo todos os dias, não como um questionário preenchido sozinho por quem decide o investimento. Quem está na rotina sabe, muitas vezes de cabeça, qual etapa é pura formalidade, qual já causou confusão por ser diferente para cada pessoa, e qual exigiria interpretar uma mensagem ou uma imagem para ser resolvida de verdade.",
      },
      {
        type: "p",
        text: "Vale documentar as respostas das sete perguntas antes de qualquer cotação de sistema ou de projeto de automação. Esse documento simples — um processo com sete respostas ao lado — já é, na prática, o escopo do que precisa ser construído, e evita que o fornecedor (interno ou externo) proponha uma solução maior, mais cara ou mais complexa do que o problema exige.",
      },
      { type: "h2", text: "O que acontece quando a empresa ignora essas perguntas" },
      {
        type: "p",
        text: "O cenário mais comum de automação que não entrega resultado não é a ferramenta errada — é a pergunta que nunca foi feita. Uma automação implantada sobre um processo não padronizado, por exemplo, tende a funcionar bem nos primeiros testes (feitos por quem desenhou a automação, do jeito que ela espera) e falhar na operação real, onde cada pessoa ainda executa o processo de um jeito levemente diferente.",
      },
      {
        type: "p",
        text: "Quando isso acontece, a reação mais comum é culpar a ferramenta e procurar outra — repetindo o mesmo erro, porque o problema nunca esteve na ferramenta. Seguir as sete perguntas em ordem, mesmo que de forma rápida e informal, é o que evita esse ciclo de troca de ferramenta sem troca de diagnóstico.",
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
      {
        q: "Essas sete perguntas substituem um diagnóstico de processo?",
        a: "Não — elas são o roteiro de raciocínio por trás de um diagnóstico. O diagnóstico aplica essas perguntas ao processo real da empresa, com quem o executa no dia a dia.",
      },
    ],
  },
  {
    slug: "agente-de-ia-sem-processo-mapeado-por-que-falha",
    title: "Agente de IA sem processo mapeado: por que o projeto falha",
    seoTitle: "Agente de IA sem Processo Mapeado: Por que Falha | VIEW",
    description:
      "Mais de 40% dos projetos de agentes de IA serão cancelados até 2027, segundo o Gartner. O motivo raramente é a tecnologia — é o processo que nunca foi mapeado antes de automatizar.",
    datePublished: "2026-10-10",
    dateModified: "2026-10-10",
    author: "Equipe VIEW",
    tag: "IA Aplicada",
    readingMinutes: 6,
    lead: "Toda empresa quer um agente de IA. Quase nenhuma sabe explicar como o próprio processo funciona hoje. E é exatamente nessa lacuna que a maioria dos projetos de agentes de IA está falhando.",
    body: [
      {
        type: "p",
        text: "A cena se repete com uma regularidade incômoda: alguém vê uma demonstração impecável de um agente de IA, pede algo parecido para o atendimento da própria empresa e, meses depois, o agente responde errado e trava na primeira exceção. A reação mais comum é culpar o modelo, a ferramenta ou o fornecedor. Mas o problema quase sempre aparece antes da tecnologia — no processo que ninguém chegou a desenhar com clareza.",
      },
      { type: "h2", text: "O que os números já confirmam" },
      {
        type: "p",
        text: "Isso deixou de ser percepção isolada. Em junho de 2025, a Gartner projetou que mais de 40% dos projetos de agentes de IA serão cancelados até 2027 — por custo, risco pouco claro ou valor que não se confirma na prática. O MIT, em sua pesquisa NANDA sobre o estado da IA nas empresas em 2025, encontrou o mesmo padrão por outro caminho: a maior parte das iniciativas de IA generativa não entrega retorno mensurável, não porque os modelos sejam fracos, mas porque são colocados em cima de um fluxo de trabalho que nunca foi revisto.",
      },
      {
        type: "p",
        text: "As duas pesquisas chegam à mesma conclusão por ângulos diferentes: o gargalo não está na capacidade da IA, está na maturidade do processo que ela precisa operar. Empresas que mapeiam o processo antes de automatizar são, segundo o próprio MIT, as que de fato colhem resultado — as demais acumulam projetos caros que nunca saem do piloto ou são abandonados depois de meses em produção.",
      },
      { type: "h2", text: "Por que o agente herda o caos do processo" },
      {
        type: "p",
        text: "Um agente de IA não inventa regras — ele aprende e reproduz as que encontra. Se o atendimento de hoje já responde de um jeito diferente dependendo de quem atende, se as exceções são resolvidas 'no jeitinho' e se não existe uma única fonte de verdade sobre o que fazer em cada situação, o agente herda cada um desses atalhos improvisados. A diferença é que ele aplica esse caos com a velocidade e o volume de uma máquina, o que torna o erro mais visível e mais caro de corrigir depois.",
      },
      {
        type: "p",
        text: "É por isso que a demonstração sempre funciona bem: ela é testada com os casos previstos por quem construiu o agente. A operação real tem casos que ninguém previu, porque ninguém documentou o processo o suficiente para saber que eles existiam.",
      },
      { type: "h2", text: "Sinais de que o processo ainda não está pronto para um agente" },
      {
        type: "ul",
        items: [
          "Duas pessoas da equipe respondem a mesma pergunta do cliente de formas diferentes.",
          "Não existe um documento ou fluxo único que descreva o que fazer nas exceções — cada caso é resolvido \"na hora\".",
          "A informação que o agente precisaria consultar está espalhada entre sistemas, planilhas e mensagens, sem uma fonte confiável.",
          "Ninguém consegue dizer, com um número, quanto tempo ou quantas mensagens o atendimento atual consome hoje.",
          "A regra de quando transferir para um humano nunca foi escrita — só existe na cabeça de quem atende.",
        ],
      },
      { type: "h2", text: "Mapear primeiro, automatizar depois" },
      {
        type: "p",
        text: "A saída não é desistir do agente de IA — é inverter a ordem do projeto. Antes de escolher ferramenta ou modelo, mapeia-se o processo como ele realmente acontece hoje: quais perguntas chegam, quem decide o quê, onde estão as exceções e qual é a regra para cada uma. Só depois desse mapeamento o agente tem uma base sólida para operar, porque está automatizando um processo que a própria empresa já entende e já confia.",
      },
      {
        type: "p",
        text: "Essa é a lógica por trás da metodologia DISTIPP, usada pela VIEW para diagnosticar a maturidade operacional de uma empresa antes de qualquer projeto de automação ou IA. Um agente de IA bem-sucedido não é o que usa o modelo mais avançado — é o que herda um processo que já faz sentido.",
      },
      {
        type: "link",
        text: "Descubra o nível de maturidade do seu processo com o método DISTIPP →",
        href: "/metodo-distipp",
      },
    ],
    faqs: [
      {
        q: "É verdade que a maioria dos projetos de agentes de IA é cancelada?",
        a: "A Gartner projetou, em junho de 2025, que mais de 40% dos projetos de agentes de IA serão cancelados até 2027, citando custo, risco pouco claro e valor que não se confirma na prática.",
      },
      {
        q: "Por que a pesquisa do MIT mostra que a IA generativa não entrega retorno?",
        a: "O MIT NANDA, em \"The GenAI Divide: State of AI in Business 2025\", encontrou um padrão recorrente: a IA costuma ser aplicada sobre um processo que nunca foi revisto, e o agente herda cada atalho improvisado desse fluxo. As empresas que mapeiam o processo antes são as que colhem resultado.",
      },
      {
        q: "Como saber se minha empresa está pronta para um agente de IA?",
        a: "Se o processo que o agente vai executar ainda não está mapeado — com regras claras para as exceções e uma fonte única de informação — o agente vai herdar essa desorganização. O primeiro passo é diagnosticar a maturidade do processo, não escolher a ferramenta.",
      },
    ],
  },
  {
    slug: "por-que-fabricas-bem-montadas-ainda-escondem-capacidade",
    title: "Por que fábricas bem montadas ainda escondem capacidade",
    seoTitle: "Por que Fábricas Bem Montadas Ainda Escondem Capacidade | VIEW",
    description:
      "Mesmo fábricas organizadas perdem capacidade em transporte interno, estoque parado entre etapas e postos desbalanceados. Veja onde ela se esconde e como simular cenários antes de comprar máquina.",
    datePublished: "2026-10-16",
    dateModified: "2026-10-16",
    // TODO: nome de quem assina o artigo, quando a autoria for definida.
    // "Equipe VIEW" é a assinatura já usada em todo o blog (não é um nome
    // fabricado) — mantida aqui em vez de um placeholder visível.
    author: "Equipe VIEW",
    tag: "Engenharia de Produção",
    readingMinutes: 7,
    lead: "Uma fábrica pode estar limpa, organizada e bem gerida e, mesmo assim, estar produzindo bem menos do que poderia. A diferença não aparece numa inspeção visual — aparece quando alguém mede o fluxo de verdade.",
    body: [
      {
        type: "p",
        text: "É comum associar perda de capacidade a bagunça: fábrica desorganizada, processo informal, equipamento velho. Mas boa parte da capacidade perdida numa fábrica não tem nada a ver com desorganização visível. Ela está escondida em decisões que parecem neutras — onde uma máquina foi posicionada, em que ordem os produtos são fabricados, quanto material fica parado entre uma etapa e outra — e que nunca foram medidas com rigor.",
      },
      {
        type: "p",
        text: "O resultado é um padrão que se repete: a gestão sente que a fábrica poderia produzir mais, mas a primeira resposta que aparece é comprar uma máquina nova ou ampliar o galpão. Às vezes é mesmo a solução certa. Na maioria das vezes, não é — o gargalo está em outro lugar, e aumentar a capacidade de uma etapa que não é o gargalo real não aumenta a capacidade da fábrica inteira.",
      },
      { type: "h2", text: "Onde a capacidade se esconde" },
      {
        type: "p",
        text: "Seis pontos concentram a maior parte da capacidade perdida em fábricas que, por fora, parecem bem montadas:",
      },
      {
        type: "ul",
        items: [
          "Transporte interno desnecessário: produto, insumo ou operador percorrendo mais distância do que o processo exigiria, se o layout acompanhasse o fluxo real.",
          "Estoque parado entre etapas (o chamado WIP, work in process): material em processamento se acumula esperando a próxima etapa, escondendo quanto tempo a produção realmente perde ali.",
          "Postos desbalanceados: um posto sobrecarregado, outro esperando — a capacidade da linha inteira fica presa no ritmo do posto mais lento, e nenhum dos outros postos, por mais rápidos que sejam, compensa isso.",
          "Setup e troca de produto demorados: cada troca de produto ou de ferramenta consome tempo de produção que raramente é contado como perda, porque acontece todos os dias e virou parte da rotina.",
          "Sequência de produção mal planejada: a ordem em que os produtos são feitos influencia quantas trocas de setup acontecem no dia, e essa conta quase nunca é feita.",
          "Fadiga e postura ruim no fim do turno: o ritmo cai nas últimas horas não por desânimo, mas porque o posto de trabalho exige um esforço que o corpo não sustenta pelo turno inteiro.",
        ],
      },
      {
        type: "p",
        text: "Nenhum desses pontos aparece numa caminhada rápida pela fábrica. Todos aparecem quando alguém para para medir: cronometrar o tempo de cada etapa, contar quanto material fica parado, mapear a distância percorrida por um lote típico do início ao fim.",
      },
      { type: "h2", text: "Medir antes de simular, simular antes de investir" },
      {
        type: "p",
        text: "A tentação, diante de uma fábrica que não acompanha os pedidos, é pular direto para o investimento: comprar a máquina, contratar mais gente, ampliar a área construída. O problema é que esse tipo de decisão, tomada sem medir o fluxo real, acerta por sorte com mais frequência do que deveria.",
      },
      {
        type: "p",
        text: "O caminho mais seguro segue uma ordem simples: medir os tempos, o fluxo e a capacidade de cada posto para encontrar o gargalo real; modelar o processo como ele é hoje; simular cenários alternativos de layout, sequência e turno antes de mexer em qualquer coisa de verdade; comparar os cenários simulados e escolher o de maior ganho pelo menor investimento; e, só depois de implantar, medir de novo para confirmar se o ganho projetado se confirmou na prática.",
      },
      {
        type: "p",
        text: "A etapa de simulação é a que mais evita gasto errado. Simular significa testar, num modelo do processo, o que aconteceria se uma máquina mudasse de lugar, se a sequência de produção fosse outra, ou se um turno extra fosse aberto — sem ainda ter gastado um real nisso. Quando a simulação mostra que o gargalo está em um posto específico, fica claro que comprar uma máquina para outro posto não resolveria nada, por mais moderna que essa máquina fosse.",
      },
      { type: "h2", text: "A escada de maturidade" },
      {
        type: "p",
        text: "Nem toda fábrica está pronta para simular cenários — e tentar simular antes da hora costuma gerar um modelo bonito que não representa a realidade. A VIEW organiza esse caminho em quatro degraus, e cada fábrica entra pelo degrau em que já está, não necessariamente pelo primeiro.",
      },
      {
        type: "ul",
        items: [
          "Organizar: fluxo, layout, ergonomia e procedimentos operacionais padrão (POPs) — a base sem a qual nenhuma medição ou simulação futura é confiável, porque o processo ainda muda de forma dependendo de quem o executa.",
          "Medir: indicadores de produção acompanhados de verdade — o que acontece na fábrica passa a ter número, não impressão de quem está no chão naquele dia.",
          "Simular e otimizar: cenários de capacidade, layout e programação, testados num modelo antes de qualquer investimento real.",
          "Automatizar e usar IA: controle da produção, alertas e agentes de IA — depois que organizar, medir e simular já sustentam a decisão, nunca antes disso.",
        ],
      },
      {
        type: "p",
        text: "Pular degraus é o erro mais comum: tentar simular cenários de capacidade numa fábrica que ainda não tem indicador de produção confiável produz um modelo baseado em suposição, não em dado. E tentar automatizar o controle de produção antes de organizar o fluxo só digitaliza a desorganização, deixando-a mais difícil de perceber.",
      },
      { type: "h2", text: "Por que isso importa mais ainda para a agroindústria" },
      {
        type: "p",
        text: "Em agroindústrias — polpas de frutas, laticínios, engenhos, usinas, frigoríficos, rações — a perda de capacidade escondida costuma ter um agravante: a matéria-prima tem prazo de validade ou janela de processamento. Um gargalo não identificado não significa só menos produto saindo por dia; pode significar matéria-prima perdida porque não foi processada a tempo. Medir o fluxo real e simular cenários antes de investir tem, nesses casos, um retorno que vai além da capacidade — chega a afetar diretamente o desperdício de insumo.",
      },
      {
        type: "p",
        text: "Isso não é exclusivo da agroindústria: qualquer fábrica com sazonalidade de demanda ou prazo apertado de entrega sente o mesmo efeito. A diferença é de grau, não de tipo.",
      },
      {
        type: "p",
        text: "Há ainda um efeito menos óbvio: numa fábrica que já opera perto do limite, qualquer perda de capacidade não identificada se traduz direto em pedido não atendido no prazo. Quando a demanda está dentro da capacidade real, o mesmo gargalo passa despercebido — ele só aparece no número quando o volume aperta. Isso faz com que o problema pareça ter surgido do nada, justamente quando na verdade só estava escondido, esperando a demanda crescer o suficiente para revelá-lo.",
      },
      { type: "h2", text: "O primeiro passo é um dia de observação, não uma decisão de compra" },
      {
        type: "p",
        text: "Antes de decidir comprar máquina, ampliar galpão ou abrir um turno a mais, vale um dia de observação estruturada da fábrica: medir os tempos reais, mapear o fluxo do recebimento à expedição e identificar o gargalo de fato — não o que parece ser gargalo à primeira vista. Esse diagnóstico costuma custar uma fração do que custaria um investimento decidido sem essa medição, e é o que transforma 'acho que dá para produzir mais' em um número que sustenta a decisão.",
      },
      {
        type: "link",
        text: "Veja como funciona o Diagnóstico de Produtividade e a simulação de cenários da VIEW →",
        href: "/aumentar-capacidade-produtiva",
      },
    ],
    faqs: [
      {
        q: "Uma fábrica organizada também pode ter capacidade escondida?",
        a: "Sim — e é o caso mais comum. Organização visível (limpeza, ordem, disciplina) não é o mesmo que fluxo medido. A capacidade escondida só aparece quando alguém mede tempo, distância e estoque parado entre etapas.",
      },
      {
        q: "Simular cenários substitui a decisão de comprar máquina?",
        a: "Não substitui — orienta. A simulação mostra qual alternativa (layout, sequência, turno ou, sim, às vezes uma máquina nova) traz o maior ganho pelo menor investimento, antes de qualquer dinheiro ser gasto.",
      },
      {
        q: "Minha fábrica precisa estar em qual degrau da escada para simular cenários?",
        a: "Pelo menos nos dois primeiros: fluxo e layout organizados, e indicadores de produção medidos com alguma confiabilidade. Sem isso, a simulação parte de suposição em vez de dado real.",
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
