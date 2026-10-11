// Conteúdo das páginas de setor (/setores/:slug). Mesmo padrão de
// src/content/casos.ts: os dados moram aqui, a página é só o template
// (SetorKit) mais o que for específico demais para entrar num array (a linha
// do tempo de implantação ISO 9001, só na página de Construtoras).
//
// Nenhum setor aqui referencia um caso que não exista em src/content/casos.ts.
// Onde a VIEW ainda não tem um caso documentado daquele setor, o campo
// `casoIds` fica vazio — a página não força um caso de outro setor só para
// preencher a seção (ex.: o caso do restaurante é "Alimentação", não
// "Empresas de Serviços", e por isso não aparece lá).

import type { FAQItem } from "@/components/LandingKit";

export interface Setor {
  slug: string;
  nome: string;
  tagline: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  numero1: { valor: string; label: string };
  numero2: { valor: string; label: string };
  dores: { titulo: string; desc: string }[];
  entregas: string[];
  casoIds: string[];
  whatsappMessage: string;
  serviceType: string;
  serviceDescription: string;
  faqs: FAQItem[];
}

export const setores: Setor[] = [
  {
    slug: "construtoras",
    nome: "Construtoras",
    tagline: "VIEW · Construção Civil · Brasil",
    title: "Soluções para Construtoras: Processos e Sistemas | VIEW",
    description:
      "A VIEW mapeia o processo de obra, prepara a construtora para ISO 9001/PBQP-H e entrega sistema sob medida com registro automático. Atende todo o Brasil.",
    h1: "Soluções para construtoras: processo, ISO 9001 e sistema em um só lugar",
    intro:
      "Construtora que cresce esbarra sempre no mesmo ponto: documentação de obra espalhada em papel e WhatsApp, auditoria de qualidade que vira correria e diretoria sem visibilidade real do canteiro. A VIEW desenha o processo de obra primeiro e só depois constrói o sistema que sustenta esse processo no dia a dia.",
    numero1: { valor: "20+", label: "Processos automatizados desde 2024" },
    numero2: { valor: "R$100k+", label: "Em custo operacional cortado no primeiro ano" },
    dores: [
      {
        titulo: "Documentação de obra espalhada em papel e WhatsApp",
        desc: "Checklist, inspeção e aprovação ficam soltos, sem um lugar único, até alguém precisar reunir tudo às pressas.",
      },
      {
        titulo: "Falta de visibilidade real do andamento do canteiro",
        desc: "A diretoria só sabe o que acontece em cada obra ligando para o encarregado — sem registro de quem fez o quê, quando.",
      },
      {
        titulo: "Retrabalho a cada auditoria de qualidade",
        desc: "A equipe para o que está fazendo para montar do zero a documentação de uma auditoria ISO 9001 ou PBQP-H, correndo contra o prazo.",
      },
      {
        titulo: "Sistema de qualidade que existe no papel, não na obra",
        desc: "O procedimento documentado não é o que de fato acontece no canteiro — e isso aparece exatamente na hora da auditoria.",
      },
    ],
    entregas: [
      "Mapeamento do processo de obra, do início ao entregável, antes de qualquer sistema entrar.",
      "Sistema de gestão de obra sob medida, com registro automático a cada etapa — inspeção, aprovação, marco.",
      "Preparação para auditoria ISO 9001 ou PBQP-H, com documentação organizada na origem, não montada às pressas.",
      "Aplicativo de acompanhamento de obra pelo celular, com visibilidade centralizada para administrativo e diretoria.",
      "Dashboards de andamento por projeto e por etapa, em tempo real.",
    ],
    casoIds: ["construtora-terre-iso-9001", "construtora-acompanhamento-de-obras"],
    whatsappMessage: "Olá, eu quero conversar sobre processos e sistemas para a minha construtora.",
    serviceType: "Consultoria de processos e sistemas para construtoras",
    serviceDescription:
      "Mapeamento de processo de obra, preparação para auditoria ISO 9001/PBQP-H e sistema de gestão sob medida para construtoras em todo o Brasil.",
    faqs: [
      {
        q: "A VIEW atende construtoras de qualquer porte?",
        a: "Atendemos principalmente construtoras de médio porte em crescimento, que já sentem o processo de obra travando a operação. Fale com a gente para avaliar o seu caso.",
      },
      {
        q: "Quanto custa um projeto para construtoras?",
        a: "Depende do tamanho da construtora e de quanto já está documentado, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito para ver o que se aplica à sua obra.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Quanto tempo leva para ver resultado?",
        a: "Varia conforme o quanto já existe de processo documentado. A implantação é por etapas, e o prazo exato entra na proposta depois do diagnóstico.",
      },
      {
        q: "Precisamos de um sistema novo ou dá para usar o que já temos?",
        a: "Depende do que já existe. Muitas vezes o sistema atual é aproveitado e integrado; quando a rotina de obra não encaixa em nenhum sistema existente, a VIEW desenvolve um sob medida.",
      },
      {
        q: "Vocês atendem construtoras fora de João Pessoa?",
        a: "Sim. A VIEW atende construtoras de todo o Brasil, presencialmente e remotamente.",
      },
    ],
  },
  {
    slug: "clinicas-e-saude",
    nome: "Clínicas e Saúde",
    tagline: "VIEW · Clínicas e Saúde · Brasil",
    title: "Soluções para Clínicas e Saúde: Processos e Sistemas | VIEW",
    description:
      "A VIEW mapeia o fluxo do paciente e integra agenda, prontuário e confirmação de consulta para clínicas e serviços de saúde em todo o Brasil.",
    h1: "Soluções para clínicas e saúde: menos retrabalho, mais tempo de atendimento",
    intro:
      "Em clínicas e serviços de saúde, o tempo da recepção costuma ir para confirmar consulta por telefone e reconciliar agenda com prontuário — tempo que poderia estar no atendimento. A VIEW mapeia o fluxo do paciente, da marcação à alta, antes de propor qualquer sistema ou automação.",
    numero1: { valor: "100h+", label: "Devolvidas à equipe por mês, por operação atendida" },
    numero2: { valor: "+50%", label: "Ganho de produtividade no processo automatizado" },
    dores: [
      {
        titulo: "Agenda e prontuário em sistemas que não conversam entre si",
        desc: "Cada troca de informação entre recepção, profissional e sistema financeiro exige reconciliação manual.",
      },
      {
        titulo: "Confirmação de consulta consumindo a recepção",
        desc: "Ligar um por um para confirmar horário é tempo que deixa de ser atendimento e que ainda assim não elimina a falta.",
      },
      {
        titulo: "Indicadores de atendimento que ninguém acompanha",
        desc: "Falta, ocupação da agenda e tempo de espera existem nos dados, mas não em nenhum painel que alguém de fato olha.",
      },
      {
        titulo: "Processo de atendimento que varia de profissional para profissional",
        desc: "Sem um fluxo padronizado, a experiência do paciente muda dependendo de quem o atende.",
      },
    ],
    entregas: [
      "Mapeamento do fluxo do paciente, da marcação à alta, para localizar onde o atendimento trava.",
      "Integração entre agenda, prontuário e sistema de confirmação, sem perder histórico.",
      "Automação de confirmação e lembrete de consulta, reduzindo falta sem sobrecarregar a recepção.",
      "Indicadores de ocupação, tempo de espera e falta, visíveis para quem decide.",
    ],
    casoIds: [],
    whatsappMessage: "Olá, eu quero conversar sobre processos e sistemas para a minha clínica.",
    serviceType: "Consultoria de processos e sistemas para clínicas e serviços de saúde",
    serviceDescription:
      "Mapeamento do fluxo do paciente e integração de agenda, prontuário e confirmação de consulta para clínicas e serviços de saúde em todo o Brasil.",
    faqs: [
      {
        q: "A VIEW desenvolve prontuário eletrônico do zero?",
        a: "Depende do caso. Muitas vezes o prontuário que a clínica já usa é mantido e integrado a outros sistemas; um sistema novo só entra quando o que existe não sustenta o fluxo real.",
      },
      {
        q: "Quanto custa um projeto para clínicas?",
        a: "Depende do tamanho da clínica e do que já está em uso, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Vocês mexem em dado de paciente com segurança?",
        a: "O projeto é desenhado em cima dos sistemas e da infraestrutura que a clínica já usa ou escolhe usar, e o código e os dados continuam sendo da clínica — sem dependência da VIEW depois da entrega.",
      },
      {
        q: "Quanto tempo leva para ver resultado?",
        a: "Varia conforme o quanto já existe de processo e sistema em uso. O prazo exato entra na proposta depois do diagnóstico.",
      },
      {
        q: "Atendem clínicas fora de João Pessoa?",
        a: "Sim. A VIEW atende clínicas e serviços de saúde de todo o Brasil, presencialmente e remotamente.",
      },
    ],
  },
  {
    slug: "varejo",
    nome: "Varejo",
    tagline: "VIEW · Varejo · Brasil",
    title: "Soluções para Varejo: Processos e Sistemas | VIEW",
    description:
      "A VIEW mapeia o fluxo de venda e estoque e integra PDV, estoque e gestão para redes de varejo e lojas em todo o Brasil.",
    h1: "Soluções para varejo: estoque, venda e atendimento no mesmo fluxo",
    intro:
      "No varejo, o problema raramente é falta de sistema — é sistema que não conversa com sistema. Estoque que não bate, processo de venda diferente em cada loja e dado que chega tarde para decidir compra. A VIEW mapeia o fluxo real antes de integrar ou automatizar qualquer parte dele.",
    numero1: { valor: "20+", label: "Processos automatizados desde 2024" },
    numero2: { valor: "+50%", label: "Ganho de produtividade no processo automatizado" },
    dores: [
      {
        titulo: "Estoque que não bate com o sistema",
        desc: "A contagem física diverge do que o sistema informa, e ninguém sabe ao certo em que ponto a divergência começou.",
      },
      {
        titulo: "Processo de venda e reposição diferente em cada loja",
        desc: "Sem um fluxo único, cada unidade resolve do seu jeito — e comparar desempenho entre lojas vira adivinhação.",
      },
      {
        titulo: "Dado de venda que chega tarde para decidir compra",
        desc: "A decisão de reposição é tomada com informação de semanas atrás, não com o que está acontecendo agora na loja.",
      },
      {
        titulo: "Atendimento ao cliente sem padrão nem registro",
        desc: "Perguntas pelo WhatsApp ou redes sociais são respondidas de forma diferente a cada vez, sem histórico do que já foi dito.",
      },
    ],
    entregas: [
      "Mapeamento do fluxo de venda e reposição, loja a loja.",
      "Integração entre PDV, estoque e sistema de gestão.",
      "Indicadores de venda e giro de estoque atualizados, não só no fechamento do mês.",
      "Padronização do atendimento ao cliente, com automação e IA onde fizer sentido — por exemplo, respostas no WhatsApp.",
    ],
    casoIds: [],
    whatsappMessage: "Olá, eu quero conversar sobre processos e sistemas para o meu varejo.",
    serviceType: "Consultoria de processos e sistemas para varejo",
    serviceDescription:
      "Mapeamento do fluxo de venda e estoque e integração entre PDV, estoque e sistema de gestão para redes de varejo em todo o Brasil.",
    faqs: [
      {
        q: "A VIEW substitui o sistema de PDV que já uso?",
        a: "Na maioria dos casos não: o PDV existente é integrado ao restante do fluxo. Um sistema novo só entra quando o atual não sustenta a operação.",
      },
      {
        q: "Quanto custa um projeto para varejo?",
        a: "Depende do número de lojas e do que já está em uso, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Funciona para uma loja só, ou precisa ser rede?",
        a: "Funciona para os dois casos. Em rede, o ganho de padronizar o fluxo entre lojas costuma ser maior, mas uma loja única também se beneficia de integrar estoque e venda.",
      },
      {
        q: "Quanto tempo leva para ver resultado?",
        a: "Varia conforme o número de lojas e sistemas envolvidos. O prazo exato entra na proposta depois do diagnóstico.",
      },
      {
        q: "Atendem varejo fora de João Pessoa?",
        a: "Sim. A VIEW atende redes e lojas de todo o Brasil, presencialmente e remotamente.",
      },
    ],
  },
  {
    slug: "industria",
    nome: "Indústria",
    tagline: "VIEW · Indústria · Brasil",
    title: "Soluções para Indústria: Processos e Sistemas | VIEW",
    description:
      "A VIEW mapeia o fluxo produtivo e integra produção, qualidade e manutenção com registro automático para indústrias em todo o Brasil.",
    h1: "Soluções para indústria: produção rastreada do pedido à expedição",
    intro:
      "Produção registrada em papel ou planilha, apontamento manual sujeito a erro, qualidade e manutenção tratadas separadamente. A VIEW mapeia o fluxo produtivo, do pedido à expedição, antes de propor sistema ou automação de chão de fábrica.",
    numero1: { valor: "100h+", label: "Devolvidas à equipe por mês, por operação atendida" },
    numero2: { valor: "R$100k+", label: "Em custo operacional cortado no primeiro ano" },
    dores: [
      {
        titulo: "Produção registrada em papel ou planilha",
        desc: "Sem rastreabilidade digital, reconstruir o histórico de um lote ou pedido exige procurar em vários lugares diferentes.",
      },
      {
        titulo: "Apontamento manual de parada e perda",
        desc: "O registro depende de alguém lembrar de anotar, no momento certo, o motivo exato da parada — e nem sempre acontece.",
      },
      {
        titulo: "Qualidade e manutenção tratadas separadamente",
        desc: "Sem dado cruzado entre as duas áreas, um problema recorrente de qualidade pode ter origem numa manutenção que ninguém associou a ele.",
      },
      {
        titulo: "Decisão de chão de fábrica dependendo de quem está de plantão",
        desc: "Sem indicador centralizado, cada turno decide com a informação que tem à mão, nem sempre a mesma do turno anterior.",
      },
    ],
    entregas: [
      "Mapeamento do fluxo produtivo, do pedido à expedição.",
      "Sistema de apontamento de produção e parada, com registro no momento em que acontece.",
      "Integração entre produção, qualidade e manutenção.",
      "Dashboards de indicadores de produção para a gestão decidir com dado, não com o plantão.",
    ],
    casoIds: [],
    whatsappMessage: "Olá, eu quero conversar sobre processos e sistemas para a minha indústria.",
    serviceType: "Consultoria de processos e sistemas para indústria",
    serviceDescription:
      "Mapeamento do fluxo produtivo e integração entre produção, qualidade e manutenção, com registro automático, para indústrias em todo o Brasil.",
    faqs: [
      {
        q: "A VIEW substitui o MES ou ERP que já usamos?",
        a: "Na maioria dos casos não: o sistema existente é integrado ao restante do fluxo. Um sistema novo só entra quando o atual não sustenta a operação real.",
      },
      {
        q: "Quanto custa um projeto para indústria?",
        a: "Depende do porte da planta e do que já está em uso, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Funciona para indústria de pequeno porte?",
        a: "Funciona, desde que haja um processo produtivo para mapear. O escopo do projeto é dimensionado conforme o porte da planta.",
      },
      {
        q: "Quanto tempo leva para ver resultado?",
        a: "Varia conforme a complexidade do processo produtivo. O prazo exato entra na proposta depois do diagnóstico.",
      },
      {
        q: "Atendem indústrias fora de João Pessoa?",
        a: "Sim. A VIEW atende indústrias de todo o Brasil, presencialmente e remotamente.",
      },
    ],
  },
  {
    slug: "empresas-de-servicos",
    nome: "Empresas de Serviços",
    tagline: "VIEW · Empresas de Serviços · Brasil",
    title: "Soluções para Empresas de Serviços: Processos | VIEW",
    description:
      "A VIEW padroniza o atendimento e integra proposta, agenda e equipe para empresas de serviços e consultorias em todo o Brasil.",
    h1: "Soluções para empresas de serviços: atendimento padronizado, do primeiro contato à entrega",
    intro:
      "Empresas de serviços costumam crescer apesar do processo, não por causa dele: cada cliente é atendido de um jeito, orçamento é feito item por item e a agenda da equipe mora num grupo de WhatsApp. A VIEW mapeia e padroniza o processo de atendimento antes de propor qualquer sistema.",
    numero1: { valor: "20+", label: "Processos automatizados desde 2024" },
    numero2: { valor: "100h+", label: "Devolvidas à equipe por mês, por operação atendida" },
    dores: [
      {
        titulo: "Processo de atendimento que muda a cada cliente",
        desc: "Sem um fluxo padrão, a qualidade do atendimento depende de quem pegou aquele cliente, não de um processo da empresa.",
      },
      {
        titulo: "Orçamento e proposta feitos manualmente",
        desc: "Cada proposta é montada item por item, do zero, consumindo tempo que poderia ir para atender mais clientes.",
      },
      {
        titulo: "Agenda e equipe geridas por planilha ou grupo de WhatsApp",
        desc: "Sem um sistema central, saber quem está disponível ou no que cada um está trabalhando exige perguntar.",
      },
      {
        titulo: "Indicador de produtividade e prazo só na cabeça de quem lidera",
        desc: "Sem registro centralizado, medir prazo médio de entrega ou produtividade da equipe depende de alguém reunir tudo manualmente.",
      },
    ],
    entregas: [
      "Mapeamento e padronização do processo de atendimento, do primeiro contato à entrega.",
      "Sistema de gestão de propostas, agenda e equipe em um só lugar.",
      "Automação de tarefas repetitivas — orçamento, cobrança, acompanhamento de cliente.",
      "Indicadores de prazo, produtividade e satisfação, acompanhados em tempo real.",
    ],
    casoIds: [],
    whatsappMessage: "Olá, eu quero conversar sobre processos e sistemas para a minha empresa de serviços.",
    serviceType: "Consultoria de processos e sistemas para empresas de serviços",
    serviceDescription:
      "Mapeamento e padronização do processo de atendimento e sistema de gestão de propostas, agenda e equipe para empresas de serviços em todo o Brasil.",
    faqs: [
      {
        q: "Serve para qualquer tipo de empresa de serviços?",
        a: "Serve para empresas de serviços que já têm um volume de clientes que torna o atendimento manual um gargalo — consultorias, agências, prestadoras de serviço técnico, entre outras.",
      },
      {
        q: "Quanto custa um projeto para empresas de serviços?",
        a: "Depende do tamanho da equipe e do que já está em uso, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Precisamos de um sistema novo ou dá para usar o que já temos?",
        a: "Depende do que já existe. Muitas vezes o sistema atual é aproveitado e integrado; um sistema novo só entra quando o que existe não sustenta o fluxo real.",
      },
      {
        q: "Quanto tempo leva para ver resultado?",
        a: "Varia conforme o quanto já existe de processo documentado. O prazo exato entra na proposta depois do diagnóstico.",
      },
      {
        q: "Atendem empresas de serviços fora de João Pessoa?",
        a: "Sim. A VIEW atende empresas de serviços de todo o Brasil, presencialmente e remotamente.",
      },
    ],
  },
];

export function getSetor(slug: string): Setor | undefined {
  return setores.find((s) => s.slug === slug);
}
