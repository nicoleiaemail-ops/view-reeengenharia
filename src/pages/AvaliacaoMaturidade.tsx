import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { DistippRadar } from "@/components/DistippRadar";
import { EVENTS, track } from "@/lib/analytics";
import {
  calcularResultado,
  DESCRICAO_NIVEL,
  RECOMENDACAO,
  type Resultado,
} from "@/lib/distipp-score";

const SEO_JSONLD = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://reengenhariaview.com.br/" },
          { "@type": "ListItem", position: 2, name: "Avaliação de Maturidade", item: "https://reengenhariaview.com.br/avaliacao-maturidade" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Diagnóstico de Maturidade Operacional DISTIPP",
        url: "https://reengenhariaview.com.br/avaliacao-maturidade",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
        description: "Ferramenta gratuita de diagnóstico de maturidade empresarial em 7 dimensões (Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos) baseada na metodologia DISTIPP da VIEW. Resultado personalizado em menos de 5 minutos.",
        provider: {
          "@type": "Organization",
          name: "VIEW Reengenharia de Processos",
          url: "https://reengenhariaview.com.br",
        },
        featureList: [
          "Diagnóstico gratuito em 7 dimensões DISTIPP",
          "Avaliação personalizada por segmento de mercado",
          "Resultado e recomendações em até 48 horas",
          "Sem compromisso de contratação",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Quiz",
        name: "Diagnóstico de Maturidade Operacional — metodologia DISTIPP",
        url: "https://reengenhariaview.com.br/avaliacao-maturidade",
        description: "Questionário de 8 etapas que avalia o grau de maturidade digital e operacional da sua empresa nas dimensões Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos.",
        educationalLevel: "Empresarial",
        about: [
          { "@type": "Thing", name: "Maturidade operacional" },
          { "@type": "Thing", name: "Evolução empresarial" },
          { "@type": "Thing", name: "Reengenharia de processos" },
          { "@type": "Thing", name: "Automação empresarial" },
        ],
        provider: {
          "@type": "Organization",
          name: "VIEW Reengenharia de Processos",
          url: "https://reengenhariaview.com.br",
        },
      },
];
import { Footer } from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Send, CheckCircle2 } from "lucide-react";

const TOTAL_STEPS = 8;

// As 7 dimensões DISTIPP explicadas na tela inicial. Além de orientar quem vai
// responder, é o conteúdo que torna a página indexável: sem isto a rota
// pré-renderizada tinha só o H1 e três parágrafos.
// Mesma rotação de cor por letra que DISTIP.tsx já usa (D/T/Processos =
// azul, Integração/Pessoas = verde, Sistemas/Inovação = dourado) -- a mesma
// dimensão tem a mesma cor em toda a base, em vez das 7 virem azuis sem
// exceção só porque essa tela nunca usava outra coisa.
const DIMENSOES = [
  {
    letra: "D",
    nome: "Dados",
    cor: "text-primary",
    texto:
      "Se as decisões da empresa nascem de números confiáveis ou de intuição. Avalia a existência de indicadores, o acesso a eles e o uso de análise para antecipar tendências.",
  },
  {
    letra: "I",
    nome: "Integração",
    cor: "text-view-green",
    texto:
      "Como a informação circula entre setores. Falhas de comunicação entre comercial, operação e financeiro são a origem mais comum de retrabalho e prazo perdido.",
  },
  {
    letra: "S",
    nome: "Sistemas",
    cor: "text-accent",
    texto:
      "Se o sistema de gestão atende à operação real ou se a equipe trabalha em volta dele com planilhas paralelas, o que costuma indicar um ERP mal ajustado ao negócio.",
  },
  {
    letra: "T",
    nome: "Tecnologia",
    cor: "text-primary",
    texto:
      "O grau de digitalização dos registros operacionais — quanto ainda depende de papel, WhatsApp e memória das pessoas, e se há dashboards acompanhando a operação.",
  },
  {
    letra: "I",
    nome: "Inovação",
    cor: "text-accent",
    texto:
      "A capacidade de testar e adotar novas práticas. Mede se existe melhoria contínua estruturada e orçamento dedicado, ou se mudanças só ocorrem sob crise.",
  },
  {
    letra: "P",
    nome: "Pessoas",
    cor: "text-view-green",
    texto:
      "Autonomia e responsabilização da equipe. Avalia se o desempenho individual é visível e se é possível reconhecer ou corrigir com base em fatos.",
  },
  {
    letra: "P",
    nome: "Processos",
    cor: "text-primary",
    texto:
      "Mapeamento, padronização e escalabilidade dos fluxos. Verifica se a empresa cresceria em volume ou equipe sem perder controle e qualidade.",
  },
];

// 3 passos sem cor semantica previa -- alternado so para variedade visual.
const COMO_FUNCIONA = [
  {
    titulo: "Você responde as 7 dimensões",
    cor: "text-primary",
    texto:
      "São 5 perguntas por dimensão, em escala ou múltipla escolha. Leva menos de 5 minutos e não exige preparação nem consulta a documentos. A identificação fica para o fim.",
  },
  {
    titulo: "Seu score aparece na hora",
    cor: "text-accent",
    texto:
      "Ao terminar, você vê na própria tela a pontuação geral, o radar das sete dimensões e as duas que a VIEW priorizaria na sua empresa. Sem esperar, sem depender de email.",
  },
  {
    titulo: "O relatório completo chega em até 48 horas",
    cor: "text-view-green",
    texto:
      "Nossa equipe cruza suas respostas com o padrão do seu segmento e envia a leitura detalhada de cada dimensão, com os gargalos prioritários e o plano de ação sugerido. Sem compromisso de contratação.",
  },
];

const FAQS = [
  {
    q: "A avaliação de maturidade é realmente gratuita?",
    a: "Sim. O diagnóstico é gratuito e não exige contratação. A VIEW usa a avaliação como primeiro contato para entender a operação antes de propor qualquer trabalho.",
  },
  {
    q: "Quanto tempo leva para responder?",
    a: "Menos de 5 minutos. São 8 etapas com perguntas objetivas em escala ou múltipla escolha, sem necessidade de levantar dados ou consultar relatórios.",
  },
  {
    q: "O que é a metodologia DISTIPP?",
    a: "DISTIPP é o framework de diagnóstico da VIEW que mede a maturidade operacional de uma empresa em sete dimensões: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos. Cada dimensão revela um tipo diferente de gargalo, e a combinação delas mostra por onde começar a melhorar.",
  },
  {
    q: "Quando recebo o resultado?",
    a: "Em até 48 horas após o envio. O retorno traz o nível de maturidade por dimensão, os gargalos prioritários e as oportunidades de melhoria específicas do seu negócio.",
  },
  {
    q: "Preciso ser uma empresa grande para fazer a avaliação?",
    a: "Não. A avaliação foi desenhada para empresas de 20 a 300 pessoas em crescimento — justamente o momento em que os processos informais começam a virar gargalo. Atendemos construção civil, indústria, logística, tecnologia, serviços e comércio.",
  },
];

const seoTags = (
  <SEO
    title="Avaliação de Maturidade Empresarial — Diagnóstico DISTIPP Gratuito"
    description="Descubra em 5 minutos o nível de maturidade operacional da sua empresa. Diagnóstico gratuito baseado na metodologia DISTIPP da VIEW — 7 dimensões, resultado em até 48h."
    path="/avaliacao-maturidade"
    jsonLd={[
      ...SEO_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ]}
  />
);

const segments = [
  "Construção civil",
  "Indústria",
  "Logística",
  "Tecnologia",
  "Serviços",
  "Comércio",
  "Outro",
];

const scaleOptions = ["1", "2", "3", "4", "5"];

function ScaleField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground/90 text-[.82rem] leading-relaxed font-medium">{label}</Label>
      <div className="flex gap-2">
        {scaleOptions.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-11 h-11 rounded-md font-display font-bold text-sm transition-all duration-200 border ${
              value === n
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[.65rem] text-muted-foreground/60 px-1">
        <span>Muito baixo</span>
        <span>Muito alto</span>
      </div>
    </div>
  );
}

function RadioField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground/90 text-[.82rem] leading-relaxed font-medium">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((opt) => (
          <div key={opt} className="flex items-center gap-3">
            <RadioGroupItem value={opt} id={`${label}-${opt}`} />
            <Label htmlFor={`${label}-${opt}`} className="text-foreground/80 text-[.8rem] cursor-pointer font-normal">
              {opt}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground/90 text-[.82rem] leading-relaxed font-medium">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva aqui..."
        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 min-h-[80px]"
      />
    </div>
  );
}

type FormData = Record<string, string>;

export default function AvaliacaoMaturidade() {
  const [step, setStep] = useState(0); // 0 = intro
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const set = (key: string, val: string) => setData((prev) => ({ ...prev, [key]: val }));

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);

  const validateStep = (): boolean => {
    const missing: string[] = [];
    // A identificação passou a ser a última etapa (era a primeira).
    if (step === TOTAL_STEPS) {
      if (!data.nome?.trim()) missing.push("nome");
      if (!data.email?.trim()) missing.push("email");
      if (!data.telefone?.trim()) missing.push("telefone");
      if (!data.segmento) missing.push("segmento");
      if (!consent) missing.push("consent");
    }
    setErrors(missing);
    return missing.length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) {
      const proximo = step + 1;
      setStep(proximo);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Registra em que etapa as pessoas param. Era impossível saber antes.
      track(EVENTS.quizStep, { step: proximo });
    }
  };

  const prev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!validateStep()) {
      toast.error("Preencha os campos obrigatórios e aceite a Política de Privacidade.");
      return;
    }
    setSubmitting(true);
    try {
      const { nome, email, telefone, segmento, ...respostas } = data;
      const { error } = await supabase.rpc("submit_maturity_assessment", {
        p_nome: nome,
        p_email: email,
        p_telefone: telefone,
        p_segmento: segmento,
        p_respostas: respostas,
      });
      if (error) throw error;

      // O score sai das respostas que já estão aqui no navegador: entregar na
      // hora não custa uma requisição sequer.
      const calculado = calcularResultado(respostas);
      setResultado(calculado);
      track(EVENTS.quizComplete, { segmento, score: calculado.geral, nivel: calculado.nivel });
      track(EVENTS.quizResultView, { score: calculado.geral });
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Avaliação enviada. Seu score está abaixo.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (resultado) {
    const corDoScore = (s: number) =>
      s < 40 ? "text-destructive" : s < 60 ? "text-accent" : s < 80 ? "text-primary" : "text-view-green";
    const barraDoScore = (s: number) =>
      s < 40 ? "bg-destructive" : s < 60 ? "bg-accent" : s < 80 ? "bg-primary" : "bg-view-green";

    return (
      <>
        {seoTags}
        <Navbar />
        <main className="min-h-screen px-[7%] pt-28 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Score geral */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-view-green text-[.75rem] font-display font-semibold tracking-[.14em] uppercase mb-5">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Avaliação concluída
              </div>
              <h1 className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-foreground mb-6">
                O nível de maturidade da sua operação
              </h1>

              <div className="inline-flex flex-col items-center border border-view-line rounded-2xl px-12 py-8 bg-foreground/[.03]">
                <div className={`font-display font-extrabold text-[4rem] leading-none tabular-nums ${corDoScore(resultado.geral)}`}>
                  {resultado.geral}
                  <span className="text-[1.4rem] text-muted-foreground font-bold">/100</span>
                </div>
                <div className="font-display font-bold text-[1.05rem] text-foreground mt-3">
                  Maturidade {resultado.nivel.toLowerCase()}
                </div>
                <div className="text-[.76rem] text-muted-foreground mt-1">
                  {resultado.respondidas} de {resultado.total} perguntas pontuadas
                </div>
              </div>

              <p className="text-muted-foreground text-[.92rem] leading-relaxed max-w-xl mx-auto mt-7">
                {DESCRICAO_NIVEL[resultado.nivel]}
              </p>
            </div>

            {/* Radar */}
            <div className="border border-view-line rounded-xl p-6 md:p-8 bg-foreground/[.02] mb-8">
              <h2 className="font-display font-extrabold text-[1.1rem] text-foreground mb-1 text-center">
                Seu perfil nas 7 dimensões
              </h2>
              <p className="text-[.82rem] text-muted-foreground text-center mb-6">
                Quanto mais para fora, mais madura a dimensão.
              </p>
              <DistippRadar dimensoes={resultado.dimensoes} />
            </div>

            {/* Barras por dimensão */}
            <div className="border border-view-line rounded-xl p-6 md:p-8 bg-foreground/[.02] mb-8">
              <h2 className="font-display font-extrabold text-[1.1rem] text-foreground mb-6">
                Dimensão por dimensão
              </h2>
              <div className="flex flex-col gap-5">
                {[...resultado.dimensoes]
                  .sort((a, b) => a.score - b.score)
                  .map((d) => (
                    <div key={d.dimensao}>
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <span className="font-display font-bold text-[.9rem] text-foreground">{d.dimensao}</span>
                        <span className="text-[.8rem] text-muted-foreground">
                          <span className={`font-display font-extrabold text-[.95rem] tabular-nums ${corDoScore(d.score)}`}>
                            {d.score}
                          </span>
                          <span className="ml-2">{d.nivel}</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barraDoScore(d.score)}`}
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Prioridades */}
            <div className="border border-primary/25 rounded-xl p-6 md:p-8 bg-primary/[.05] mb-10">
              <h2 className="font-display font-extrabold text-[1.1rem] text-foreground mb-2">
                Por onde a VIEW começaria na sua empresa
              </h2>
              <p className="text-[.86rem] text-muted-foreground mb-6 leading-relaxed">
                Estas são as duas dimensões com menor pontuação. Mexer nelas primeiro costuma destravar as
                outras — o contrário raramente é verdade.
              </p>
              <ol className="flex flex-col gap-6 list-none p-0 m-0">
                {resultado.prioridades.map((d, i) => (
                  <li key={d.dimensao} className="flex gap-4">
                    <span className="font-display font-extrabold text-primary text-xl leading-none pt-0.5 w-6 shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-[.95rem] mb-1">
                        {d.dimensao}{" "}
                        <span className="text-muted-foreground font-normal">— score {d.score}/100</span>
                      </h3>
                      <p className="text-muted-foreground text-[.88rem] leading-relaxed">
                        {RECOMENDACAO[d.dimensao]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Próximo passo */}
            <div className="text-center border-t border-view-line pt-10">
              <h2 className="font-display font-extrabold text-[1.15rem] text-foreground mb-3">
                O relatório completo chega em até 48h
              </h2>
              <p className="text-muted-foreground text-[.9rem] leading-relaxed max-w-xl mx-auto mb-7">
                Enviamos para <strong className="text-foreground">{data.email}</strong> a leitura detalhada
                de cada dimensão, comparada com o padrão do seu segmento, e o plano de ação sugerido. Se
                quiser conversar antes disso, é só chamar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/5583993224878?text=${encodeURIComponent(
                    `Olá! Acabei de fazer a avaliação DISTIPP e meu score foi ${resultado.geral}/100 (${resultado.nivel}). Gostaria de conversar sobre o resultado.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track(EVENTS.whatsappClick, { location: "quiz_resultado" })}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-md font-display font-extrabold text-[.86rem] tracking-[.06em] no-underline hover:opacity-[.88] transition-opacity"
                >
                  Discutir meu resultado no WhatsApp →
                </a>
                <Link
                  to="/casos"
                  className="inline-flex items-center justify-center gap-2 border border-muted-foreground/30 text-muted-foreground px-7 py-3.5 rounded-md font-display font-semibold text-[.84rem] no-underline hover:text-foreground hover:border-foreground/40 transition-all"
                >
                  Ver casos parecidos com o meu
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Intro screen
  if (step === 0) {
    return (
      <>
        {seoTags}
        <Navbar />
        <main className="min-h-screen px-[7%] pt-32 pb-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-block font-display text-[.6rem] tracking-[.25em] uppercase text-primary border border-primary/20 rounded-full px-4 py-1.5">
              Diagnóstico Gratuito
            </span>
            <h1 className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] text-foreground">
              Avaliação Estratégica de Maturidade Empresarial
            </h1>
            <p className="text-muted-foreground font-display font-semibold text-[.85rem] tracking-wide">
              Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos
            </p>
            <p className="text-muted-foreground text-[.88rem] leading-relaxed max-w-xl mx-auto">
              Este formulário foi criado para ajudar a avaliar o quão bem estruturados estão os principais pilares do seu negócio.
              O objetivo é identificar oportunidades de melhoria que possam aumentar a eficiência operacional, reduzir custos e melhorar a tomada de decisão em tempo real.
            </p>
            <p className="text-muted-foreground text-[.85rem] leading-relaxed max-w-xl mx-auto">
              As perguntas estão organizadas em sete dimensões essenciais para o sucesso em um ambiente de negócios dinâmico e competitivo.
            </p>
            <p className="text-muted-foreground text-[.8rem]">
              Leva menos de 5 minutos · Seu score aparece na tela ao terminar
            </p>
            <Button
              onClick={() => {
                track(EVENTS.quizStart, { origem: "intro_topo" });
                setStep(1);
              }}
              size="lg"
              className="bg-primary text-primary-foreground font-display font-extrabold tracking-wide text-[.85rem] px-10"
            >
              Iniciar avaliação
            </Button>
          </div>

          <div className="max-w-2xl mx-auto mt-24 space-y-16 text-left">
            <section>
              <h2 className="font-display font-extrabold text-xl text-foreground mb-3">
                O que a avaliação mede
              </h2>
              <p className="text-muted-foreground text-[.88rem] leading-relaxed mb-8">
                A avaliação segue o DISTIPP, framework de diagnóstico da VIEW que
                mede a maturidade operacional em sete dimensões. Cada uma revela um
                tipo diferente de gargalo — e é a combinação delas que mostra por
                onde a mudança precisa começar.
              </p>
              <ul className="space-y-6">
                {DIMENSOES.map(({ letra, nome, cor, texto }) => (
                  <li key={nome} className="flex gap-4">
                    <span className={`font-display font-extrabold text-lg leading-none pt-0.5 w-6 shrink-0 ${cor}`}>
                      {letra}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-[.92rem] mb-1">
                        {nome}
                      </h3>
                      <p className="text-muted-foreground text-[.85rem] leading-relaxed">
                        {texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display font-extrabold text-xl text-foreground mb-8">
                Como funciona
              </h2>
              <ol className="space-y-6">
                {COMO_FUNCIONA.map(({ titulo, cor, texto }, i) => (
                  <li key={titulo} className="flex gap-4">
                    <span className={`font-display font-extrabold text-lg leading-none pt-0.5 w-6 shrink-0 ${cor}`}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-[.92rem] mb-1">
                        {titulo}
                      </h3>
                      <p className="text-muted-foreground text-[.85rem] leading-relaxed">
                        {texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-display font-extrabold text-xl text-foreground mb-8">
                Perguntas frequentes
              </h2>
              <dl className="space-y-6">
                {FAQS.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display font-bold text-foreground text-[.92rem] mb-1.5">
                      {q}
                    </dt>
                    <dd className="text-muted-foreground text-[.85rem] leading-relaxed">
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="text-center pt-4">
              <Button
                onClick={() => {
                  track(EVENTS.quizStart, { origem: "intro_rodape" });
                  setStep(1);
                }}
                size="lg"
                className="bg-primary text-primary-foreground font-display font-extrabold tracking-wide text-[.85rem] px-10"
              >
                Iniciar avaliação
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputCls = "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50";
  const hasError = (field: string) => errors.includes(field);

  const sections: Record<number, React.ReactNode> = {
    /*
      Os dados de contato eram pedidos na etapa 1, antes de qualquer valor ter
      sido entregue — o visitante precisava se identificar para só então
      descobrir do que se tratava. Agora ficam na etapa 8, depois das sete
      dimensões: quem chegou até aqui já investiu o tempo e tem o score à
      espera do outro lado do botão.
    */
    8: (
      <div className="space-y-5">
        <div className="bg-primary/[.06] border border-primary/20 rounded-lg p-4 mb-2">
          <p className="text-[.85rem] text-foreground leading-relaxed">
            <strong className="font-display font-bold">Falta só isto.</strong> Ao enviar, seu score nas 7
            dimensões aparece na hora, nesta tela. O relatório com o plano de ação vai para o seu email em
            até 48h.
          </p>
        </div>
        <div>
          <Label htmlFor="av-nome" className="text-foreground/90 text-[.85rem] font-medium">Nome ou Empresa *</Label>
          <Input id="av-nome" autoComplete="name" value={data.nome || ""} onChange={(e) => set("nome", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("nome") ? "border-destructive" : ""}`} placeholder="Seu nome ou empresa" />
        </div>
        <div>
          <Label htmlFor="av-email" className="text-foreground/90 text-[.85rem] font-medium">Email *</Label>
          <Input id="av-email" type="email" autoComplete="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("email") ? "border-destructive" : ""}`} placeholder="seu@email.com" />
        </div>
        <div>
          <Label htmlFor="av-telefone" className="text-foreground/90 text-[.85rem] font-medium">Telefone para contato *</Label>
          <Input id="av-telefone" autoComplete="tel" value={data.telefone || ""} onChange={(e) => set("telefone", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("telefone") ? "border-destructive" : ""}`} placeholder="(00) 00000-0000" />
        </div>
        <div>
          <Label className="text-foreground/90 text-[.85rem] font-medium">Qual segmento mais representa sua empresa? *</Label>
          <Select value={data.segmento || ""} onValueChange={(v) => set("segmento", v)}>
            <SelectTrigger className={`${inputCls} mt-1.5 ${hasError("segmento") ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-border">
              {segments.map((s) => (
                <SelectItem key={s} value={s} className="text-foreground hover:bg-primary/10">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className={`mt-0.5 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer ${hasError("consent") ? "outline outline-2 outline-destructive" : ""}`}
          />
          <span className="text-[.79rem] text-muted-foreground leading-relaxed">
            Autorizo a VIEW a usar meus dados e minhas respostas para gerar e enviar meu diagnóstico,
            conforme a{" "}
            <Link to="/privacidade" className="text-primary underline hover:no-underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
      </div>
    ),
    1: (
      <div className="space-y-6">
        <ScaleField label="Sua empresa consegue tomar decisões estratégicas com base nos dados disponíveis?" value={data.dad1 || ""} onChange={(v) => set("dad1", v)} />
        <RadioField label="O quanto de retorno financeiro sua empresa já obteve a partir do uso de dados bem analisados?" options={["Nenhum", "Baixo", "Moderado", "Alto", "Muito alto"]} value={data.dad2 || ""} onChange={(v) => set("dad2", v)} />
        <RadioField label="Sua empresa sente falta de indicadores de desempenho detalhados?" options={["Sim", "Não", "Às vezes"]} value={data.dad3 || ""} onChange={(v) => set("dad3", v)} />
        <ScaleField label="Os dados disponíveis são acessíveis e de fácil interpretação?" value={data.dad4 || ""} onChange={(v) => set("dad4", v)} />
        <RadioField label="Sua empresa utiliza ferramentas analíticas para prever tendências?" options={["Sim", "Não", "Em desenvolvimento"]} value={data.dad5 || ""} onChange={(v) => set("dad5", v)} />
      </div>
    ),
    2: (
      <div className="space-y-6">
        <ScaleField label="Há falhas frequentes de comunicação entre os setores?" value={data.int1 || ""} onChange={(v) => set("int1", v)} />
        <TextField label="Quais impactos essas falhas causam na empresa?" value={data.int2 || ""} onChange={(v) => set("int2", v)} />
        <ScaleField label="Você valoriza visualizar o desempenho de diferentes setores simultaneamente?" value={data.int3 || ""} onChange={(v) => set("int3", v)} />
        <RadioField label="Sua empresa investiria em uma solução que permita visualizar dados em tempo real?" options={["Sim", "Talvez", "Não"]} value={data.int4 || ""} onChange={(v) => set("int4", v)} />
        <ScaleField label="Os sistemas e departamentos estão bem integrados?" value={data.int5 || ""} onChange={(v) => set("int5", v)} />
      </div>
    ),
    3: (
      <div className="space-y-6">
        <RadioField label="Sua empresa possui um sistema de gestão personalizado para suas necessidades específicas?" options={["Sim", "Não", "Parcialmente"]} value={data.sis1 || ""} onChange={(v) => set("sis1", v)} />
        <ScaleField label="Seu sistema de gestão apresenta todas as informações que você precisa de forma clara e acessível?" value={data.sis2 || ""} onChange={(v) => set("sis2", v)} />
        <TextField label="Quais são as principais limitações do seu sistema de gestão?" value={data.sis3 || ""} onChange={(v) => set("sis3", v)} />
        <ScaleField label="O uso diário do sistema causa estresse para você ou seus funcionários?" value={data.sis4 || ""} onChange={(v) => set("sis4", v)} />
        <RadioField label="Você acredita que seu sistema de gestão poderia ser melhorado?" options={["Sim", "Não", "Muito"]} value={data.sis5 || ""} onChange={(v) => set("sis5", v)} />
      </div>
    ),
    4: (
      <div className="space-y-6">
        <ScaleField label="O quão digitalizados estão os registros operacionais da empresa?" value={data.tec1 || ""} onChange={(v) => set("tec1", v)} />
        <RadioField label="Sua empresa ainda depende muito de papel para registrar dados?" options={["Sim", "Não", "Parcialmente"]} value={data.tec2 || ""} onChange={(v) => set("tec2", v)} />
        <TextField label="Quais canais de comunicação sua empresa usa diariamente?" value={data.tec3 || ""} onChange={(v) => set("tec3", v)} />
        <RadioField label="Sua empresa utiliza dashboards para monitorar operações em tempo real?" options={["Sim", "Não", "Parcialmente"]} value={data.tec4 || ""} onChange={(v) => set("tec4", v)} />
        <ScaleField label="A tecnologia atual permite tomar decisões rápidas e informadas?" value={data.tec5 || ""} onChange={(v) => set("tec5", v)} />
      </div>
    ),
    5: (
      <div className="space-y-6">
        <ScaleField label="O quanto sua empresa investe em melhoria contínua dos processos e operações?" value={data.inov1 || ""} onChange={(v) => set("inov1", v)} />
        <ScaleField label="Sua empresa busca ativamente investir em novas tecnologias e práticas inovadoras?" value={data.inov2 || ""} onChange={(v) => set("inov2", v)} />
        <ScaleField label="Você acredita que seu negócio poderia se beneficiar mais com o uso de tecnologias emergentes?" value={data.inov3 || ""} onChange={(v) => set("inov3", v)} />
        <RadioField label="Com que frequência sua empresa testa e implementa novas ideias ou soluções?" options={["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]} value={data.inov4 || ""} onChange={(v) => set("inov4", v)} />
        <RadioField label="Sua empresa possui um orçamento dedicado à inovação e desenvolvimento?" options={["Sim", "Não", "Parcialmente"]} value={data.inov5 || ""} onChange={(v) => set("inov5", v)} />
      </div>
    ),
    6: (
      <div className="space-y-6">
        <ScaleField label="Qual o nível de confiança que você tem em seus funcionários para executar responsabilidades sem supervisão constante?" value={data.pes1 || ""} onChange={(v) => set("pes1", v)} />
        <ScaleField label="Você tem certeza de que seus funcionários cumprem seus procedimentos e responsabilidades?" value={data.pes2 || ""} onChange={(v) => set("pes2", v)} />
        <RadioField label="Você já teve prejuízos significativos devido à displicência de funcionários?" options={["Sim", "Não"]} value={data.pes3 || ""} onChange={(v) => set("pes3", v)} />
        <ScaleField label="É fácil visualizar o desempenho individual dos funcionários?" value={data.pes4 || ""} onChange={(v) => set("pes4", v)} />
        <ScaleField label="Você consegue reconhecer ou punir funcionários de acordo com o desempenho?" value={data.pes5 || ""} onChange={(v) => set("pes5", v)} />
      </div>
    ),
    7: (
      <div className="space-y-6">
        <RadioField label="Os principais processos da sua empresa estão mapeados e documentados de forma clara?" options={["Sim, todos os processos estão documentados e atualizados", "Parcialmente, alguns processos estão documentados", "Não, os processos dependem do conhecimento informal das pessoas"]} value={data.proc1 || ""} onChange={(v) => set("proc1", v)} />
        <RadioField label="Seus funcionários seguem procedimentos padronizados (SOPs, checklists, fluxogramas) na execução das atividades?" options={["Sim, temos padrões claros e eles são seguidos", "Temos alguns padrões, mas nem sempre são seguidos", "Não, cada um executa à sua maneira"]} value={data.proc2 || ""} onChange={(v) => set("proc2", v)} />
        <RadioField label="Com que frequência sua empresa enfrenta retrabalho, erros repetitivos ou gargalos nos processos?" options={["Raramente, os processos fluem bem", "Às vezes, há alguns pontos de atrito", "Frequentemente, os mesmos problemas se repetem"]} value={data.proc3 || ""} onChange={(v) => set("proc3", v)} />
        <RadioField label="Sua empresa revisa e melhora seus processos com base em dados e resultados operacionais?" options={["Sim, de forma sistemática e periódica", "Às vezes, quando surgem problemas evidentes", "Não, os processos raramente são revisados"]} value={data.proc4 || ""} onChange={(v) => set("proc4", v)} />
        <RadioField label="Os processos da sua empresa permitiriam crescer (em volume, equipe ou faturamento) sem perder qualidade ou controle?" options={["Sim, nossos processos são escaláveis", "Parcialmente, teríamos dificuldades em alguns pontos", "Não, o crescimento geraria desorganização"]} value={data.proc5 || ""} onChange={(v) => set("proc5", v)} />
      </div>
    ),
  };

  const stepTitles: Record<number, { title: string; desc: string }> = {
    1: { title: "Dimensão Dados", desc: "Esta dimensão analisa o uso de dados para tomada de decisão estratégica." },
    2: { title: "Dimensão Integração", desc: "Esta dimensão analisa a comunicação e integração entre setores da empresa." },
    3: { title: "Dimensão Sistemas", desc: "Esta dimensão examina a eficácia dos sistemas de gestão utilizados pela empresa." },
    4: { title: "Dimensão Tecnologia", desc: "Esta dimensão avalia o grau de digitalização dos processos empresariais." },
    5: { title: "Dimensão Inovação", desc: "Esta dimensão avalia o compromisso da empresa com a melhoria contínua e a implementação de novas tecnologias e práticas." },
    6: { title: "Dimensão Pessoas", desc: "Esta dimensão avalia a gestão do capital humano." },
    7: { title: "Dimensão Processos", desc: "Esta dimensão avalia o nível de mapeamento, padronização e controle dos fluxos operacionais da empresa." },
    8: { title: "Para onde enviamos o resultado", desc: "Última etapa. Seu score aparece aqui mesmo assim que você enviar." },
  };

  const current = stepTitles[step];

  return (
    <>
      {seoTags}
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-[7%]">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-[.7rem] text-muted-foreground mb-2">
              <span>Etapa {step} de {TOTAL_STEPS}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-secondary" />
          </div>

          {/* Step header */}
          <div className="mb-8">
            <h2 className="font-display font-extrabold text-xl text-foreground mb-2">{current.title}</h2>
            <p className="text-muted-foreground text-[.82rem] leading-relaxed">{current.desc}</p>
          </div>

          {/* Fields */}
          {sections[step]}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            <Button variant="ghost" onClick={prev} disabled={step <= 1} className="text-muted-foreground gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            {step < TOTAL_STEPS ? (
              <Button onClick={next} className="bg-primary text-primary-foreground font-display font-bold gap-2">
                Próximo <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="bg-view-green text-background font-display font-bold gap-2">
                {submitting ? "Calculando..." : "Ver meu score"} <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
