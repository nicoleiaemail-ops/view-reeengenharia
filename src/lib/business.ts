// Fonte única de verdade para NAP (nome, endereço, telefone) e para os
// blocos de JSON-LD institucionais repetidos em quase toda página do site.
//
// Antes cada página tinha sua própria cópia do Organization/ProfessionalService,
// já levemente divergentes entre si (telefone com e sem espaço, endereço com
// e sem complemento, nome ora "VIEW", ora "VIEW Reengenharia de Processos").
// Isso é exatamente o tipo de inconsistência que confunde o Google e qualquer
// agente de IA tentando reconciliar duas declarações da mesma empresa — e foi
// a causa de pelo menos uma rodada inteira de retrabalho nesta base.
//
// Páginas importam BUSINESS_JSONLD_BASE e fazem spread dele dentro do seu
// próprio objeto de Organization/ProfessionalService/LocalBusiness, somando
// os campos específicos daquela página (description, review, hasOfferCatalog
// etc.) por cima. O que é igual em toda página mora aqui; o que varia por
// página continua na página.

export const SITE_URL = "https://reengenhariaview.com.br";

// Nome oficial da empresa. "VIEW" sozinho continua sendo a marca exibida
// visualmente (logotipo na Navbar/Footer, títulos curtos de página) — esta
// constante é para os lugares que citam a razão social por extenso: o campo
// `name` dos dados estruturados, o rodapé, o llms.txt e as agent-skills.
export const BUSINESS_NAME = "VIEW — Reengenharia de Negócios";
export const BUSINESS_SHORT_NAME = "VIEW";

export const BUSINESS_PHONE_E164 = "+55-83-99322-4878";
export const BUSINESS_PHONE_DISPLAY = "(83) 99322-4878";
export const BUSINESS_WHATSAPP_NUMBER = "5583993224878";
export const BUSINESS_WHATSAPP_URL = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`;
export const BUSINESS_EMAIL = "admin@reengenhariaview.com.br";
export const BUSINESS_INSTAGRAM_URL = "https://www.instagram.com/reengenhariaview";
export const BUSINESS_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/3eS9uGY33MLKijYL9";

export const BUSINESS_ADDRESS = {
  streetAddress: "Av. Pres. Epitácio Pessoa, 1251, Sala 101, Cxpst 88 – Estados",
  addressLocality: "João Pessoa",
  addressRegion: "PB",
  postalCode: "58030-000",
  addressCountry: "BR",
};

export const BUSINESS_ADDRESS_DISPLAY =
  "Av. Pres. Epitácio Pessoa, 1251, Sala 101, Cxpst 88 – Estados, João Pessoa – PB, 58030-000";

// Alinhado em toda página de propósito: duas declarações de horário
// diferentes para a mesma empresa confundem tanto o Google quanto um agente
// de IA tentando reconciliar as duas.
export const BUSINESS_OPENING_HOURS = "Mo-Fr 08:00-18:00";

export const BUSINESS_SAME_AS = [BUSINESS_INSTAGRAM_URL, BUSINESS_GOOGLE_MAPS_URL];

export const BUSINESS_AREA_SERVED = [
  { "@type": "City", name: "João Pessoa" },
  { "@type": "State", name: "Paraíba" },
  { "@type": "Country", name: "Brasil" },
];

/**
 * Campos comuns a qualquer declaração de Organization/ProfessionalService/
 * LocalBusiness no site. Spread isto dentro do objeto da página e acrescente
 * por cima o que for específico dela (description, foundingDate, review...).
 */
export const BUSINESS_JSONLD_BASE = {
  name: BUSINESS_NAME,
  alternateName: BUSINESS_SHORT_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: BUSINESS_PHONE_E164,
  email: BUSINESS_EMAIL,
  address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
  areaServed: BUSINESS_AREA_SERVED,
  openingHours: BUSINESS_OPENING_HOURS,
  sameAs: BUSINESS_SAME_AS,
};

/** Gera o bloco FAQPage a partir da mesma lista de perguntas renderizada na tela. */
export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Trilha de navegação simples (Início → página atual). */
export function breadcrumbJsonLd(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: pageName, item: `${SITE_URL}${path}` },
    ],
  };
}

/** Link de WhatsApp com mensagem pré-preenchida específica de um contexto. */
export function whatsappUrl(message: string): string {
  return `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
