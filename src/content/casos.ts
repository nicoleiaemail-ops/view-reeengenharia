// Conteúdo dos casos de sucesso. Extraído de dentro de Casos.tsx para ser a
// fonte única usada tanto pela listagem (/casos) quanto pelas páginas
// individuais (/casos/:slug) — antes só existia dentro do componente da
// listagem, e duplicar esses dados numa página nova teria o mesmo risco de
// divergência que business.ts resolveu para o NAP.

export interface Caso {
  // Usado como id de âncora em /casos (#id) e como slug de /casos/:slug.
  id: string;
  tag: string;
  color: string;
  borderColor: string;
  bgColor: string;
  accentColor: string;
  tagBg: string;
  icon: string;
  client: string;
  role: string;
  headline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  solutions_used: string[];
}

export const casos: Caso[] = [
  {
    id: "construtora-terre-iso-9001",
    tag: "Construção Civil",
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.05]",
    accentColor: "text-primary",
    tagBg: "bg-primary/10",
    icon: "🏗️",
    client: "Vitória D.",
    role: "Diretora · Construtora TERRE",
    headline: "ISO 9001 mantido sem retrabalho — registros automáticos em cada etapa da obra",
    challenge:
      "A cada ciclo de auditoria ISO 9001, a equipe precisava reunir registros dispersos em papel, planilhas e WhatsApp. Era uma corrida contra o tempo que consumia dias de trabalho, gerava erros e colocava o certificado em risco. Além disso, a diretoria não tinha visibilidade do andamento real dos projetos sem ligar para cada encarregado.",
    solution:
      "A VIEW mapeou cada etapa do processo de obra — do início ao entregável — e desenvolveu um sistema sob medida que gera registros automáticos em tempo real. Cada marco, inspeção e aprovação passa a ser documentado digitalmente no momento em que acontece, não depois.",
    results: [
      "ISO 9001 mantido sem retrabalho em auditoria",
      "Planejamento de obras acompanhado em tempo real de qualquer lugar",
      "Eliminação de registros manuais em papel",
      "Rastreabilidade completa por projeto e etapa",
    ],
    quote:
      "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
    solutions_used: ["Sistemas de Gestão Customizados", "Automação de Processos", "Dashboards em Tempo Real"],
  },
  {
    id: "construtora-acompanhamento-de-obras",
    tag: "Construção Civil",
    color: "view-green",
    borderColor: "border-view-green/25",
    bgColor: "bg-view-green/[.05]",
    accentColor: "text-view-green",
    tagBg: "bg-view-green/10",
    icon: "📱",
    client: "Aguinaldo S.",
    role: "Supervisor de Obra · Construtora",
    headline: "Gestão completa de obra pelo celular — visibilidade total sem uma única ligação",
    challenge:
      "O supervisor precisava ligar para cada encarregado individualmente para saber o que estava acontecendo na obra. Sem visibilidade centralizada, era impossível identificar atrasos com antecedência, alocar equipes com eficiência ou apresentar relatórios de progresso precisos para clientes.",
    solution:
      "A VIEW implementou um aplicativo de gestão de obra que centraliza em tempo real: atividades concluídas, atrasos identificados, localização de equipes e progresso por etapa. Cada encarregado registra o avanço direto no sistema — o supervisor visualiza tudo em um único painel, de qualquer lugar.",
    results: [
      "Gestão completa pelo celular — sem dependência de ligações",
      "Acompanhamento em tempo real de atividades e atrasos",
      "Visibilidade de localização e alocação de equipes",
      "Relatórios de progresso gerados automaticamente",
    ],
    quote:
      "Antes eu precisava ligar pra cada encarregado pra saber o que tava acontecendo. Agora abro o aplicativo e vejo tudo: o que foi feito, o que atrasou, quem tá onde. Mudou completamente a forma como eu gerencio a obra.",
    solutions_used: ["Sistemas de Gestão Customizados", "Dashboards em Tempo Real", "Automação de Processos"],
  },
  {
    id: "restaurante-processos",
    tag: "Alimentação",
    color: "accent",
    borderColor: "border-accent/25",
    bgColor: "bg-accent/[.05]",
    accentColor: "text-accent",
    tagBg: "bg-accent/10",
    icon: "🍽️",
    client: "Restaurante",
    role: "Proprietário · Setor de Alimentação",
    headline: "Caos na cozinha eliminado — atendimento mais rápido e custos reduzidos",
    challenge:
      "No horário de pico do almoço, a cozinha operava no limite: pedidos atrasavam, a equipe ficava estressada, clientes reclamavam e o proprietário não tinha dados sobre o fluxo real da operação — do pedido ao pagamento. Sem visibilidade dos gargalos, cada melhoria era tentativa e erro.",
    solution:
      "A VIEW mapeou cada etapa da operação — do recebimento do pedido à finalização do pagamento — e identificou onde o fluxo travava. A solução combinou redesign do processo de cozinha, reorganização do layout físico e um sistema de controle de pedidos que dá visibilidade em tempo real a cada etapa.",
    results: [
      "Atendimento mais rápido no horário de pico",
      "Redução de custos operacionais mensurada",
      "Gargalos da cozinha identificados e eliminados",
      "Dados do pedido ao pagamento em tempo real",
      "Equipe menos estressada, cliente mais satisfeito",
    ],
    quote:
      "A cozinha vivia em caos na hora do almoço. A VIEW mapeou cada etapa — do pedido ao pagamento — e reorganizou o layout. Hoje o atendimento é mais rápido, os custos caíram e o cliente percebe a diferença.",
    solutions_used: ["Reengenharia de Processos", "Sistemas de Gestão Customizados", "Dashboards em Tempo Real"],
  },
];

export function getCaso(id: string): Caso | undefined {
  return casos.find((c) => c.id === id);
}
