import { Calculator, Gauge, CalendarClock, Layers, CheckCircle2, Eye, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ViewLogo } from "@/components/ViewLogo";

/**
 * Página de destino do link da bio do Instagram. Substitui uma linktree.
 *
 * Antes era a única página clara do site, com uma paleta e um sistema de
 * botão isolados do resto do projeto. Agora usa o mesmo fundo escuro, os
 * mesmos tokens (--foreground, --primary, --muted-foreground) e os mesmos
 * padrões de botão que CTA.tsx e os cards da home já usam — a página é uma
 * extensão do site, não um microsite à parte.
 *
 * Continua sem Navbar nem Footer: quem chega aqui veio de um botão da bio
 * prometendo uma coisa específica, e menu + rodapé institucional só afastam
 * o dedo do botão. O roteamento do projeto não injeta layout, então basta
 * não importar.
 *
 * O público é celular, uma mão, conexão de rua: nenhuma imagem de fundo,
 * nenhum gradiente pesado, nenhuma animação de entrada.
 */

interface Botao {
  label: string;
  apoio: string;
  href: string;
  /** Ícone à esquerda -- acelera o reconhecimento do polegar rolando rápido. */
  icon: typeof Calculator;
  /** Existe exatamente um primário na página. */
  primario?: boolean;
  /** O primeiro botão recebe o tratamento "destaque" (tint de cor de marca). */
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
    apoio: "60 minutos dentro da sua empresa, presencial.",
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
    "flex items-start gap-3 w-full min-h-[44px] px-5 py-3.5 rounded-md no-underline text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  // Primário: mesmo tratamento do PrimaryCTA em CTA.tsx (bg-foreground /
  // text-background) -- o olho reconhece a mesma oferta em qualquer lugar
  // do site. Destaque: mesmo tint de marca do callout do DISTIP ("quer o
  // raio-x completo"). Secundário: mesmo padrão de card com borda sutil que
  // Servicos.tsx já usa.
  const variante = b.primario
    ? "bg-foreground text-background hover:opacity-90"
    : b.destaque
      ? "bg-gradient-to-br from-primary/[.1] to-primary/[.02] border border-primary/30 text-foreground hover:border-primary/50"
      : "border border-foreground/15 bg-foreground/[.02] text-foreground hover:border-foreground/30 hover:bg-foreground/[.04]";

  const Icon = b.icon;

  return (
    <a href={b.href} className={`${base} ${variante}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" strokeWidth={1.75} />
      <span className="flex-1">
        <span className="block font-display font-semibold text-[.95rem] leading-snug">{b.label}</span>
        <span
          className={`block font-body text-[.78rem] leading-snug mt-1 ${
            b.primario ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {b.apoio}
        </span>
      </span>
    </a>
  );
}

export default function Links() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="VIEW · Links"
        description="Processos, sistemas e dados para empresas que querem crescer de forma saudável. Avaliação de maturidade, calculadora de custo e contato."
        path="/links"
        noindex
      />

      <main className="mx-auto max-w-[480px] px-4 py-12">
        <div className="flex justify-center mb-6">
          <ViewLogo size={56} />
        </div>

        <header className="text-center mb-8">
          <p className="font-display font-extrabold text-[1.15rem] leading-tight">VIEW · Controle da Operação</p>
          <p className="font-body text-[.85rem] leading-relaxed mt-2 text-muted-foreground">
            Processos, sistemas e dados para empresas que querem crescer de forma saudável.
          </p>
          <p className="font-body text-[.85rem] leading-relaxed text-muted-foreground">
            Atendimento em todo o Brasil.
          </p>
        </header>

        {/*
          Prova social: mesmo numero e frase que a home usa em Results.tsx
          (nao inventa claim nova) e a mesma cor (view-green) que o site usa
          para marcar fatos verificados -- os checkmarks de DISTIP.tsx.
        */}
        <p className="text-center font-display font-bold text-[.78rem] tracking-[.04em] uppercase mb-8 text-view-green">
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
        <footer className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[.78rem] font-body border-t border-view-line">
          <a
            href="https://wa.me/5583993224878?text=Vim%20pelo%20site%20da%20VIEW.%20Quero%20falar%20sobre%20a%20operacao%20da%20minha%20empresa."
            className="inline-flex items-center min-h-[44px] px-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Falar no WhatsApp agora
          </a>
          <span aria-hidden="true" className="text-muted-foreground/50">
            ·
          </span>
          <a
            href="https://instagram.com/reengenhariaview"
            className="inline-flex items-center min-h-[44px] px-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            @reengenhariaview
          </a>
        </footer>
      </main>
    </div>
  );
}
