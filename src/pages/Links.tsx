import { Calculator, Gauge, CalendarClock, Layers, CheckCircle2, Eye, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ViewLogo } from "@/components/ViewLogo";

/**
 * Página de destino do link da bio do Instagram. Substitui uma linktree.
 *
 * Duas coisas a saber antes de editar:
 *
 * 1. É a única página clara do site. Os botões secundários são borda navy
 *    sobre fundo transparente, o que só existe sobre branco — sobre o fundo
 *    escuro do resto do site eles desapareceriam. Por isso o wrapper pinta o
 *    próprio fundo em vez de herdar o do tema.
 *
 * 2. Não monta Navbar nem Footer. Quem chega aqui veio de um botão da bio
 *    prometendo uma coisa específica; menu e rodapé institucional só afastam
 *    o dedo do botão. O roteamento do projeto não injeta layout, então basta
 *    não importar.
 *
 * O público é celular, uma mão, conexão de rua: nenhuma imagem de fundo,
 * nenhum gradiente, nenhuma animação de entrada, e a transição que existe é
 * só de cor e fica atrás de motion-safe.
 */

const NAVY = "#0B1D3A";
const ROYAL = "#122A6B";
const AZUL_MEDIO = "#1F4EA8";
const CHUMBO = "#5A6476";
const CINZA = "#D6DAE1";

interface Botao {
  label: string;
  apoio: string;
  href: string;
  /** Ícone à esquerda -- acelera o reconhecimento do polegar rolando rápido. */
  icon: typeof Calculator;
  /** Existe exatamente um primário na página. */
  primario?: boolean;
  /** O primeiro botão recebe fundo tintado, além da borda reforçada. */
  destaque?: boolean;
}

const botoes: Botao[] = [
  {
    label: "Quanto custa o retrabalho da sua operação",
    icon: Calculator,
    apoio: "Três campos, e o número aparece na tela. Não pede e-mail.",
    href: "/?utm_source=instagram&utm_medium=bio&utm_content=calculadora#calculadora",
    destaque: true,
  },
  {
    label: "Fazer a avaliação de maturidade",
    icon: Gauge,
    apoio: "35 perguntas, menos de 5 minutos. O score das 7 dimensões aparece na hora.",
    href: "/avaliacao-maturidade?utm_source=instagram&utm_medium=bio&utm_content=avaliacao",
    primario: true,
  },
  {
    label: "Agendar a Leitura Executiva",
    icon: CalendarClock,
    apoio: "60 minutos dentro da sua empresa, presencial, em Campina Grande ou João Pessoa.",
    href: "https://wa.me/5583993224878?text=Vim%20pelo%20Instagram.%20Quero%20agendar%20a%20Leitura%20Executiva%20na%20minha%20empresa.",
  },
  {
    label: "Ver o que a VIEW resolve",
    icon: Layers,
    apoio: "As cinco frentes, com o que entra em cada uma.",
    href: "/solucoes?utm_source=instagram&utm_medium=bio&utm_content=solucoes",
  },
  {
    label: "Ver como funciona na prática",
    icon: CheckCircle2,
    apoio: "Três operações reais: o que travava e o que mudou.",
    href: "/casos?utm_source=instagram&utm_medium=bio&utm_content=casos",
  },
  {
    label: "Conhecer a VIEW",
    icon: Eye,
    apoio: "O método de seis etapas, os sete pilares e as três recusas.",
    href: "/sobre?utm_source=instagram&utm_medium=bio&utm_content=sobre",
  },
  {
    label: "Ler os artigos",
    icon: BookOpen,
    apoio: "O que a VIEW escreve sobre operação e processo.",
    href: "/blog?utm_source=instagram&utm_medium=bio&utm_content=blog",
  },
];

function Botao({ b }: { b: Botao }) {
  const base =
    "flex items-start gap-3 w-full min-h-[44px] px-5 py-3.5 rounded-[2px] no-underline text-left motion-safe:transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  // O destaque original (so a borda mais grossa) mal se distinguia dos
  // secundarios comuns lado a lado. Um fundo levemente tintado resolve --
  // ainda claramente abaixo do primario solido, mas visivelmente acima dos
  // secundarios em branco puro.
  const estilo = b.primario
    ? { background: NAVY, color: "#FFFFFF", outlineColor: AZUL_MEDIO }
    : {
        background: b.destaque ? "rgba(11,29,58,0.05)" : "transparent",
        color: NAVY,
        border: `${b.destaque ? 2 : 1}px solid ${NAVY}`,
        outlineColor: AZUL_MEDIO,
      };

  const Icon = b.icon;

  return (
    <a
      href={b.href}
      className={base}
      style={estilo}
      onMouseEnter={(e) => {
        if (b.primario) e.currentTarget.style.background = ROYAL;
      }}
      onMouseLeave={(e) => {
        if (b.primario) e.currentTarget.style.background = NAVY;
      }}
    >
      <Icon
        className="w-5 h-5 mt-0.5 flex-shrink-0"
        style={{ color: b.primario ? "#FFFFFF" : NAVY }}
        aria-hidden="true"
        strokeWidth={1.75}
      />
      <span className="flex-1">
        <span className="block font-display font-semibold text-[.95rem] leading-snug">{b.label}</span>
        <span
          className="block font-body text-[.78rem] leading-snug mt-1"
          style={{ color: b.primario ? "rgba(255,255,255,.72)" : CHUMBO }}
        >
          {b.apoio}
        </span>
      </span>
    </a>
  );
}

export default function Links() {
  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: NAVY }}>
      <SEO
        title="VIEW · Links"
        description="Processos, sistemas e dados para empresas de 20 a 300 pessoas. Avaliação de maturidade, calculadora de custo e contato."
        path="/links"
        noindex
      />

      <main className="mx-auto max-w-[480px] px-4 py-12">
        {/*
          O símbolo desenha os traços com --view-white e o interior do cubo com
          --view-dark, que no tema escuro do site significam claro sobre
          escuro. Aqui os dois são invertidos no escopo deste bloco, para o
          símbolo aparecer em navy sobre o branco.
        */}
        <div
          className="flex justify-center mb-6"
          style={{ ["--view-white" as string]: "217 68% 14%", ["--view-dark" as string]: "0 0% 100%" }}
        >
          <ViewLogo size={56} />
        </div>

        <header className="text-center mb-8">
          <p className="font-display font-extrabold text-[1.15rem] leading-tight">VIEW · Controle da Operação</p>
          <p className="font-body text-[.85rem] leading-relaxed mt-2" style={{ color: CHUMBO }}>
            Processos, sistemas e dados para empresas de 20 a 300 pessoas.
          </p>
          {/*
            "Paraíba, Pernambuco, Rio Grande do Norte e Estados Unidos" saiu
            daqui: nenhuma outra página do site confirma atendimento nos EUA
            (o rodapé fala só PB/PE/RN/Brasil, e o JSON-LD não lista o país).
            Prometer isso só na página de bio, sem sustentação em nenhum outro
            lugar, é o tipo de promessa que um lead dos EUA não consegue
            confirmar em lugar nenhum. Volta se for confirmado que a VIEW
            atende lá -- e nesse caso entra nos outros lugares também.
          */}
          <p className="font-body text-[.85rem] leading-relaxed" style={{ color: CHUMBO }}>
            Paraíba, Pernambuco e Rio Grande do Norte.
          </p>
        </header>

        {/*
          Prova social: mesmo numero e mesma frase que a home usa em Results.tsx
          (nao inventa claim novo -- reaproveita o que ja e verificado e
          publico), so que compacto, para nao competir com os botoes.
        */}
        <p
          className="text-center font-display font-bold text-[.78rem] tracking-[.04em] uppercase mb-8"
          style={{ color: AZUL_MEDIO }}
        >
          +20 processos automatizados desde 2024
        </p>

        <nav className="flex flex-col gap-3" aria-label="Links da VIEW">
          {botoes.map((b) => (
            <Botao key={b.href} b={b} />
          ))}
        </nav>

        {/*
          Os dois links de WhatsApp da página têm mensagens diferentes de
          propósito: o botão declara que veio do Instagram pedindo a Leitura
          Executiva, este declara que veio do site querendo conversar.

          A VIEW ainda não tem LinkedIn, então o link ficou fora. Quando tiver,
          entra aqui entre o WhatsApp e o Instagram.
        */}
        <footer
          className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[.78rem] font-body"
          style={{ borderTop: `1px solid ${CINZA}` }}
        >
          <a
            href="https://wa.me/5583993224878?text=Vim%20pelo%20site%20da%20VIEW.%20Quero%20falar%20sobre%20a%20operacao%20da%20minha%20empresa."
            className="underline underline-offset-2 inline-flex items-center min-h-[44px] px-1"
            style={{ color: AZUL_MEDIO }}
          >
            Falar no WhatsApp agora
          </a>
          <span aria-hidden="true" style={{ color: CINZA }}>
            ·
          </span>
          <a
            href="https://instagram.com/reengenhariaview"
            className="underline underline-offset-2 inline-flex items-center min-h-[44px] px-1"
            style={{ color: AZUL_MEDIO }}
          >
            @reengenhariaview
          </a>
        </footer>
      </main>
    </div>
  );
}
