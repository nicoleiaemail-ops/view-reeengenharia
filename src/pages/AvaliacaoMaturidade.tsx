import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";

const seoTags = (
  <SEO
    title="Avaliação de Maturidade Empresarial — Diagnóstico VIEW"
    description="Faça o diagnóstico gratuito de maturidade da sua empresa baseado na metodologia DISTIPP e descubra oportunidades de automação e ganho operacional."
    path="/avaliacao-maturidade"
    jsonLd={[
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://viewprocessos.com.br/" },
          { "@type": "ListItem", position: 2, name: "Avaliação de Maturidade", item: "https://viewprocessos.com.br/avaliacao-maturidade" },
        ],
      },
    ]}
  />
);
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
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = intro
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<string[]>([]);

  const set = (key: string, val: string) => setData((prev) => ({ ...prev, [key]: val }));

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);

  const validateStep = (): boolean => {
    const missing: string[] = [];
    if (step === 1) {
      if (!data.nome?.trim()) missing.push("nome");
      if (!data.email?.trim()) missing.push("email");
      if (!data.telefone?.trim()) missing.push("telefone");
      if (!data.segmento) missing.push("segmento");
    }
    // Scale/radio fields – at least answer something (soft validation)
    setErrors(missing);
    return missing.length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
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
      setSubmitted(true);
      toast.success("Avaliação enviada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        {seoTags}
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-[7%] pt-24 pb-16">
          <div className="max-w-lg text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-view-green mx-auto" />
            <h1 className="font-display font-extrabold text-2xl text-foreground">
              Obrigado por responder a Avaliação Estratégica de Maturidade Empresarial.
            </h1>
            <p className="text-muted-foreground text-[.9rem] leading-relaxed">
              Nossa equipe analisará suas respostas e em breve enviaremos um diagnóstico inicial com oportunidades de melhoria para o seu negócio.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary text-primary-foreground font-display font-bold tracking-wide"
            >
              Voltar para o site
            </Button>
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
        <main className="min-h-screen flex items-center justify-center px-[7%] pt-24 pb-16">
          <div className="max-w-2xl text-center space-y-6">
            <span className="inline-block font-display text-[.6rem] tracking-[.25em] uppercase text-primary border border-primary/20 rounded-full px-4 py-1.5">
              Diagnóstico Gratuito
            </span>
            <h1 className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] text-foreground">
              Avaliação Estratégica de Maturidade Empresarial
            </h1>
            <p className="text-primary font-display font-semibold text-[.85rem] tracking-wide">
              Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos
            </p>
            <p className="text-muted-foreground text-[.88rem] leading-relaxed max-w-xl mx-auto">
              Este formulário foi criado para ajudar a avaliar o quão bem estruturados estão os principais pilares do seu negócio.
              O objetivo é identificar oportunidades de melhoria que possam aumentar a eficiência operacional, reduzir custos e melhorar a tomada de decisão em tempo real.
            </p>
            <p className="text-muted-foreground text-[.85rem] leading-relaxed max-w-xl mx-auto">
              As perguntas estão organizadas em sete dimensões essenciais para o sucesso em um ambiente de negócios dinâmico e competitivo.
            </p>
            <p className="text-foreground/60 text-[.75rem]">Leva menos de 5 minutos para responder.</p>
            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="bg-primary text-primary-foreground font-display font-extrabold tracking-wide text-[.85rem] px-10"
            >
              Iniciar Avaliação
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputCls = "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50";
  const hasError = (field: string) => errors.includes(field);

  const sections: Record<number, React.ReactNode> = {
    1: (
      <div className="space-y-5">
        <div>
          <Label className="text-foreground/90 text-[.82rem] font-medium">Nome ou Empresa *</Label>
          <Input value={data.nome || ""} onChange={(e) => set("nome", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("nome") ? "border-destructive" : ""}`} placeholder="Seu nome ou empresa" />
        </div>
        <div>
          <Label className="text-foreground/90 text-[.82rem] font-medium">Email *</Label>
          <Input type="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("email") ? "border-destructive" : ""}`} placeholder="seu@email.com" />
        </div>
        <div>
          <Label className="text-foreground/90 text-[.82rem] font-medium">Telefone para contato *</Label>
          <Input value={data.telefone || ""} onChange={(e) => set("telefone", e.target.value)} className={`${inputCls} mt-1.5 ${hasError("telefone") ? "border-destructive" : ""}`} placeholder="(00) 00000-0000" />
        </div>
        <div>
          <Label className="text-foreground/90 text-[.82rem] font-medium">Qual segmento mais representa sua empresa? *</Label>
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
      </div>
    ),
    2: (
      <div className="space-y-6">
        <ScaleField label="Sua empresa consegue tomar decisões estratégicas com base nos dados disponíveis?" value={data.dad1 || ""} onChange={(v) => set("dad1", v)} />
        <RadioField label="O quanto de retorno financeiro sua empresa já obteve a partir do uso de dados bem analisados?" options={["Nenhum", "Baixo", "Moderado", "Alto", "Muito alto"]} value={data.dad2 || ""} onChange={(v) => set("dad2", v)} />
        <RadioField label="Sua empresa sente falta de indicadores de desempenho detalhados?" options={["Sim", "Não", "Às vezes"]} value={data.dad3 || ""} onChange={(v) => set("dad3", v)} />
        <ScaleField label="Os dados disponíveis são acessíveis e de fácil interpretação?" value={data.dad4 || ""} onChange={(v) => set("dad4", v)} />
        <RadioField label="Sua empresa utiliza ferramentas analíticas para prever tendências?" options={["Sim", "Não", "Em desenvolvimento"]} value={data.dad5 || ""} onChange={(v) => set("dad5", v)} />
      </div>
    ),
    3: (
      <div className="space-y-6">
        <ScaleField label="Há falhas frequentes de comunicação entre os setores?" value={data.int1 || ""} onChange={(v) => set("int1", v)} />
        <TextField label="Quais impactos essas falhas causam na empresa?" value={data.int2 || ""} onChange={(v) => set("int2", v)} />
        <ScaleField label="Você valoriza visualizar o desempenho de diferentes setores simultaneamente?" value={data.int3 || ""} onChange={(v) => set("int3", v)} />
        <RadioField label="Sua empresa investiria em uma solução que permita visualizar dados em tempo real?" options={["Sim", "Talvez", "Não"]} value={data.int4 || ""} onChange={(v) => set("int4", v)} />
        <ScaleField label="Os sistemas e departamentos estão bem integrados?" value={data.int5 || ""} onChange={(v) => set("int5", v)} />
      </div>
    ),
    4: (
      <div className="space-y-6">
        <RadioField label="Sua empresa possui um sistema de gestão personalizado para suas necessidades específicas?" options={["Sim", "Não", "Parcialmente"]} value={data.sis1 || ""} onChange={(v) => set("sis1", v)} />
        <ScaleField label="Seu sistema de gestão apresenta todas as informações que você precisa de forma clara e acessível?" value={data.sis2 || ""} onChange={(v) => set("sis2", v)} />
        <TextField label="Quais são as principais limitações do seu sistema de gestão?" value={data.sis3 || ""} onChange={(v) => set("sis3", v)} />
        <ScaleField label="O uso diário do sistema causa estresse para você ou seus funcionários?" value={data.sis4 || ""} onChange={(v) => set("sis4", v)} />
        <RadioField label="Você acredita que seu sistema de gestão poderia ser melhorado?" options={["Sim", "Não", "Muito"]} value={data.sis5 || ""} onChange={(v) => set("sis5", v)} />
      </div>
    ),
    5: (
      <div className="space-y-6">
        <ScaleField label="O quão digitalizados estão os registros operacionais da empresa?" value={data.tec1 || ""} onChange={(v) => set("tec1", v)} />
        <RadioField label="Sua empresa ainda depende muito de papel para registrar dados?" options={["Sim", "Não", "Parcialmente"]} value={data.tec2 || ""} onChange={(v) => set("tec2", v)} />
        <TextField label="Quais canais de comunicação sua empresa usa diariamente?" value={data.tec3 || ""} onChange={(v) => set("tec3", v)} />
        <RadioField label="Sua empresa utiliza dashboards para monitorar operações em tempo real?" options={["Sim", "Não", "Parcialmente"]} value={data.tec4 || ""} onChange={(v) => set("tec4", v)} />
        <ScaleField label="A tecnologia atual permite tomar decisões rápidas e informadas?" value={data.tec5 || ""} onChange={(v) => set("tec5", v)} />
      </div>
    ),
    6: (
      <div className="space-y-6">
        <ScaleField label="O quanto sua empresa investe em melhoria contínua dos processos e operações?" value={data.inov1 || ""} onChange={(v) => set("inov1", v)} />
        <ScaleField label="Sua empresa busca ativamente investir em novas tecnologias e práticas inovadoras?" value={data.inov2 || ""} onChange={(v) => set("inov2", v)} />
        <ScaleField label="Você acredita que seu negócio poderia se beneficiar mais com o uso de tecnologias emergentes?" value={data.inov3 || ""} onChange={(v) => set("inov3", v)} />
        <RadioField label="Com que frequência sua empresa testa e implementa novas ideias ou soluções?" options={["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]} value={data.inov4 || ""} onChange={(v) => set("inov4", v)} />
        <RadioField label="Sua empresa possui um orçamento dedicado à inovação e desenvolvimento?" options={["Sim", "Não", "Parcialmente"]} value={data.inov5 || ""} onChange={(v) => set("inov5", v)} />
      </div>
    ),
    7: (
      <div className="space-y-6">
        <ScaleField label="Qual o nível de confiança que você tem em seus funcionários para executar responsabilidades sem supervisão constante?" value={data.pes1 || ""} onChange={(v) => set("pes1", v)} />
        <ScaleField label="Você tem certeza de que seus funcionários cumprem seus procedimentos e responsabilidades?" value={data.pes2 || ""} onChange={(v) => set("pes2", v)} />
        <RadioField label="Você já teve prejuízos significativos devido à displicência de funcionários?" options={["Sim", "Não"]} value={data.pes3 || ""} onChange={(v) => set("pes3", v)} />
        <ScaleField label="É fácil visualizar o desempenho individual dos funcionários?" value={data.pes4 || ""} onChange={(v) => set("pes4", v)} />
        <ScaleField label="Você consegue reconhecer ou punir funcionários de acordo com o desempenho?" value={data.pes5 || ""} onChange={(v) => set("pes5", v)} />
      </div>
    ),
    8: (
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
    1: { title: "Quem está respondendo", desc: "Informações básicas sobre você e sua empresa." },
    2: { title: "Dimensão Dados", desc: "Esta dimensão analisa o uso de dados para tomada de decisão estratégica." },
    3: { title: "Dimensão Integração", desc: "Esta dimensão analisa a comunicação e integração entre setores da empresa." },
    4: { title: "Dimensão Sistemas", desc: "Esta dimensão examina a eficácia dos sistemas de gestão utilizados pela empresa." },
    5: { title: "Dimensão Tecnologia", desc: "Esta dimensão avalia o grau de digitalização dos processos empresariais." },
    6: { title: "Dimensão Inovação", desc: "Esta dimensão avalia o compromisso da empresa com a melhoria contínua e a implementação de novas tecnologias e práticas." },
    7: { title: "Dimensão Pessoas", desc: "Esta dimensão avalia a gestão do capital humano." },
    8: { title: "Dimensão Processos", desc: "Esta dimensão avalia o nível de mapeamento, padronização e controle dos fluxos operacionais da empresa." },
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
                {submitting ? "Enviando..." : "Enviar avaliação"} <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
