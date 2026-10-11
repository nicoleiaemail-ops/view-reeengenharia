// Conteúdo das páginas de cidades vizinhas atendidas (/atendimento/:slug).
// Pedido explícito do briefing: cada página precisa ter contexto de mercado
// local real e distinto — nada de copiar uma página e trocar o nome da
// cidade. Os fatos sobre cada cidade (distância, perfil econômico) são de
// conhecimento público; nenhum número de cliente, caso ou resultado
// específico daquela cidade é inventado — os casos citados são os mesmos 3
// já documentados em src/content/casos.ts, sem atribuí-los a uma cidade onde
// não aconteceram.

import type { FAQItem } from "@/components/LandingKit";

export interface Cidade {
  slug: string;
  nome: string;
  estado: string;
  distancia: string;
  tagline: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  perfilEconomico: { titulo: string; desc: string }[];
  entregas: string[];
  numero1: { valor: string; label: string };
  numero2: { valor: string; label: string };
  whatsappMessage: string;
  serviceType: string;
  serviceDescription: string;
  faqs: FAQItem[];
}

export const cidades: Cidade[] = [
  {
    slug: "campina-grande",
    nome: "Campina Grande",
    estado: "PB",
    distancia: "a cerca de 130 km de João Pessoa",
    tagline: "VIEW · Atendimento em Campina Grande · PB",
    title: "Consultoria de Processos e Sistemas em Campina Grande | VIEW",
    description:
      "A VIEW atende empresas de Campina Grande (PB) com reengenharia de processos, sistemas sob medida e automação. Sede em João Pessoa, visita presencial.",
    h1: "Consultoria de processos e sistemas para empresas de Campina Grande",
    intro:
      "Campina Grande fica a cerca de 130 km de João Pessoa — perto o bastante para a VIEW acompanhar o projeto presencialmente quando faz sentido, e atender remotamente no dia a dia. A cidade concentra um dos principais polos industriais do interior nordestino, com força em confecção e têxtil, além de um polo de tecnologia reconhecido, puxado pela presença da UFCG.",
    perfilEconomico: [
      {
        titulo: "Indústria de confecção e têxtil",
        desc: "Produção que cresceu em volume, mas muitas vezes ainda roda com apontamento manual e pouca integração entre PCP, estoque e expedição.",
      },
      {
        titulo: "Polo de tecnologia e empresas de serviço",
        desc: "Empresas de base tecnológica e de serviços em crescimento, que sentem o processo interno (atendimento, proposta, entrega) não acompanhar o ritmo comercial.",
      },
      {
        titulo: "Construção civil em expansão",
        desc: "Construtoras locais com a mesma dor documentada em outras praças: documentação de obra dispersa e pouca visibilidade do andamento para a diretoria.",
      },
    ],
    entregas: [
      "Mapeamento do processo antes de qualquer sistema ou automação entrar.",
      "Sistema sob medida ou integração dos sistemas já usados pela empresa.",
      "Automação de processos repetitivos, com IA só onde for realmente necessário.",
      "Indicadores de produção, venda ou atendimento visíveis para quem decide.",
    ],
    numero1: { valor: "20+", label: "Processos automatizados desde 2024" },
    numero2: { valor: "+50%", label: "Ganho de produtividade no processo automatizado" },
    whatsappMessage: "Olá, eu tenho uma empresa em Campina Grande e quero conversar sobre processos e sistemas.",
    serviceType: "Consultoria de processos e sistemas para empresas de Campina Grande",
    serviceDescription:
      "Reengenharia de processos, sistemas sob medida e automação para empresas de Campina Grande (PB), com atendimento presencial e remoto a partir de João Pessoa.",
    faqs: [
      {
        q: "A VIEW atende empresas de Campina Grande presencialmente?",
        a: "Sim. A sede é em João Pessoa, a cerca de 130 km de Campina Grande, e a equipe se desloca para reuniões presenciais quando o projeto pede — o acompanhamento do dia a dia é remoto.",
      },
      {
        q: "Quanto custa um projeto para uma empresa de Campina Grande?",
        a: "Depende do tamanho da empresa e do processo a ser resolvido, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Vocês atendem indústria têxtil e de confecção?",
        a: "Sim. É um dos perfis mais comuns em Campina Grande — o ponto de partida é sempre o mapeamento do processo de produção atual, antes de propor sistema ou automação.",
      },
      {
        q: "Funciona também para empresas de tecnologia e serviços?",
        a: "Sim. O mesmo método de mapear o processo antes de propor ferramenta vale tanto para indústria quanto para empresas de serviço ou tecnologia.",
      },
    ],
  },
  {
    slug: "recife",
    nome: "Recife",
    estado: "PE",
    distancia: "a cerca de 120 km de João Pessoa",
    tagline: "VIEW · Atendimento em Recife · PE",
    title: "Consultoria de Processos e Sistemas em Recife | VIEW",
    description:
      "A VIEW atende empresas do Recife (PE) com reengenharia de processos, sistemas sob medida e automação. Sede em João Pessoa, visita presencial.",
    h1: "Consultoria de processos e sistemas para empresas do Recife",
    intro:
      "O Recife fica a cerca de 120 km de João Pessoa, o que permite à VIEW atender a capital pernambucana com a mesma proximidade presencial de quem está na própria base. É uma praça consolidada em varejo e redes de loja, com um ecossistema de tecnologia maduro (puxado pelo Porto Digital) e um parque industrial relevante na região metropolitana.",
    perfilEconomico: [
      {
        titulo: "Redes de varejo e comércio",
        desc: "Empresas com mais de uma loja ou unidade, onde padronizar o fluxo de venda e estoque entre pontos costuma ser o maior gargalo.",
      },
      {
        titulo: "Ecossistema de tecnologia e serviços",
        desc: "Empresas de serviço e tecnologia em estágio de crescimento, com processo de atendimento e entrega que ainda depende de planilha ou grupo de WhatsApp.",
      },
      {
        titulo: "Indústria na região metropolitana",
        desc: "Plantas industriais que precisam de rastreabilidade de produção e integração entre produção, qualidade e manutenção.",
      },
    ],
    entregas: [
      "Mapeamento do processo antes de qualquer sistema ou automação entrar.",
      "Integração entre os sistemas que a empresa já usa — PDV, estoque, gestão, CRM.",
      "Automação de processos repetitivos, com IA só onde for realmente necessário.",
      "Indicadores de venda, produção ou atendimento visíveis para quem decide.",
    ],
    numero1: { valor: "100h+", label: "Devolvidas à equipe por mês, por operação atendida" },
    numero2: { valor: "R$100k+", label: "Em custo operacional cortado no primeiro ano" },
    whatsappMessage: "Olá, eu tenho uma empresa no Recife e quero conversar sobre processos e sistemas.",
    serviceType: "Consultoria de processos e sistemas para empresas do Recife",
    serviceDescription:
      "Reengenharia de processos, sistemas sob medida e automação para empresas do Recife (PE), com atendimento presencial e remoto a partir de João Pessoa.",
    faqs: [
      {
        q: "A VIEW atende empresas do Recife presencialmente?",
        a: "Sim. A sede é em João Pessoa, a cerca de 120 km do Recife, e a equipe se desloca para reuniões presenciais quando o projeto pede — o acompanhamento do dia a dia é remoto.",
      },
      {
        q: "Quanto custa um projeto para uma empresa do Recife?",
        a: "Depende do tamanho da empresa e do processo a ser resolvido, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Vocês atendem rede de varejo com várias lojas?",
        a: "Sim. É um dos perfis mais comuns na região — o ponto de partida é mapear o fluxo de venda e estoque loja a loja antes de integrar qualquer sistema.",
      },
      {
        q: "Funciona também para empresas de tecnologia e serviços?",
        a: "Sim. O mesmo método de mapear o processo antes de propor ferramenta vale tanto para indústria quanto para empresas de serviço ou tecnologia.",
      },
    ],
  },
  {
    slug: "natal",
    nome: "Natal",
    estado: "RN",
    distancia: "a cerca de 180 km de João Pessoa",
    tagline: "VIEW · Atendimento em Natal · RN",
    title: "Consultoria de Processos e Sistemas em Natal | VIEW",
    description:
      "A VIEW atende empresas de Natal (RN) com reengenharia de processos, sistemas sob medida e automação. Sede em João Pessoa, visita presencial.",
    h1: "Consultoria de processos e sistemas para empresas de Natal",
    intro:
      "Natal fica a cerca de 180 km de João Pessoa, distância que a VIEW cobre para reuniões presenciais em pontos-chave do projeto, com acompanhamento remoto no restante do tempo. A capital potiguar tem na hotelaria e no turismo um dos pilares da economia local, ao lado de um mercado forte de construção civil litorânea e comércio.",
    perfilEconomico: [
      {
        titulo: "Hotelaria e turismo",
        desc: "Operação que depende de coordenar reserva, check-in/check-out, governança e atendimento em tempo real, muitas vezes em sistemas que não conversam entre si.",
      },
      {
        titulo: "Construção civil litorânea",
        desc: "Empreendimentos residenciais e hoteleiros com a mesma dor documentada em outras praças: documentação de obra dispersa e pouca visibilidade para a diretoria.",
      },
      {
        titulo: "Comércio e empresas de serviço",
        desc: "Negócios que atendem tanto o público local quanto o turista, com processo de atendimento que muda dependendo de quem atende.",
      },
    ],
    entregas: [
      "Mapeamento do processo antes de qualquer sistema ou automação entrar.",
      "Integração entre os sistemas de reserva, gestão e atendimento já usados.",
      "Automação de processos repetitivos, com IA só onde for realmente necessário.",
      "Indicadores de ocupação, obra ou atendimento visíveis para quem decide.",
    ],
    numero1: { valor: "20+", label: "Processos automatizados desde 2024" },
    numero2: { valor: "100h+", label: "Devolvidas à equipe por mês, por operação atendida" },
    whatsappMessage: "Olá, eu tenho uma empresa em Natal e quero conversar sobre processos e sistemas.",
    serviceType: "Consultoria de processos e sistemas para empresas de Natal",
    serviceDescription:
      "Reengenharia de processos, sistemas sob medida e automação para empresas de Natal (RN), com atendimento presencial e remoto a partir de João Pessoa.",
    faqs: [
      {
        q: "A VIEW atende empresas de Natal presencialmente?",
        a: "Sim. A sede é em João Pessoa, a cerca de 180 km de Natal, e a equipe se desloca para reuniões presenciais em pontos-chave do projeto — o acompanhamento do dia a dia é remoto.",
      },
      {
        q: "Quanto custa um projeto para uma empresa de Natal?",
        a: "Depende do tamanho da empresa e do processo a ser resolvido, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito.",
        links: [
          { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
          { label: "Falar no WhatsApp", href: "https://wa.me/5583993224878", external: true },
        ],
      },
      {
        q: "Vocês atendem hotéis e pousadas?",
        a: "Sim. O ponto de partida é mapear o fluxo de reserva, hospedagem e atendimento antes de integrar ou automatizar qualquer sistema.",
      },
      {
        q: "Funciona também para construtoras da região?",
        a: "Sim. É o mesmo processo aplicado a construtoras de outras praças: mapeamento do processo de obra e, quando faz sentido, sistema de registro e preparação para auditoria de qualidade.",
      },
    ],
  },
];

export function getCidade(slug: string): Cidade | undefined {
  return cidades.find((c) => c.slug === slug);
}
