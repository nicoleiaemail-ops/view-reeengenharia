import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EVENTS, track } from "@/lib/analytics";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const inputCls = "w-full bg-foreground/[.08] border border-view-line/60 rounded-md px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/60 focus:bg-foreground/[.12] transition-colors placeholder:text-muted-foreground/60";
const selectCls = `${inputCls} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-[right_14px_center] bg-no-repeat`;
const labelCls = "block text-[.7rem] tracking-[.08em] uppercase text-foreground/80 font-semibold mb-1.5";

const segmentos = [
  { value: "industria", label: "🏭 Indústria" },
  { value: "construcao", label: "🏗️ Construção Civil" },
  { value: "comercio", label: "🛒 Comércio / Varejo" },
  { value: "servicos", label: "🔧 Serviços" },
  { value: "alimentacao", label: "🍽️ Alimentação" },
  { value: "saude", label: "🏥 Saúde" },
  { value: "logistica", label: "🚚 Logística / Transporte" },
  { value: "educacao", label: "📚 Educação" },
  { value: "agro", label: "🌾 Agronegócio" },
  { value: "tech", label: "💻 Tecnologia" },
  { value: "outro", label: "📋 Outro segmento" },
];

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  // "Começou a preencher" é a métrica que revela abandono de formulário —
  // sem ela, um formulário com 90% de desistência é indistinguível de um
  // formulário que ninguém viu.
  const startTracked = useRef(false);
  const trackStart = useCallback(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    track(EVENTS.formStart, { form: "diagnostico" });
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      trackStart();
      setPhone(formatPhone(e.target.value));
    },
    [trackStart]
  );

  const handlePhoneKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      toast.error("É preciso aceitar a Política de Privacidade para enviar.");
      return;
    }
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const { error } = await supabase.rpc("submit_diagnostic_lead", {
        p_nome: formData.get("nome") as string,
        p_whatsapp: phone,
        p_empresa: formData.get("empresa") as string,
        p_segmento: formData.get("segmento") as string,
      });
      if (error) throw error;
      setSubmitted(true);
      track(EVENTS.leadSubmit, { form: "diagnostico", segmento: formData.get("segmento") as string });
      toast.success("Diagnóstico solicitado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-10 md:py-16 px-[7%] border-t border-view-line" id="diagnostico">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="scroll-reveal">
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-4">
            Diagnóstico gratuito.<br />Resultado em 48h.
          </h2>
          {/*
            Aqui havia um selo "Apenas 3 vagas disponíveis esta semana" fixo no
            código, que aparecia para todo visitante em toda visita. Quem
            voltasse duas semanas depois via o mesmo texto e entendia o jogo —
            escassez que não é real custa mais credibilidade do que gera
            urgência. O reforço agora é uma promessa que a VIEW cumpre.
          */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full py-2 px-4 mb-5">
            <span
              className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--view-accent))] flex-shrink-0"
              style={{ animation: "blink 2s infinite" }}
            />
            <span className="text-[.7rem] tracking-[.08em] text-primary font-display font-semibold">
              Retorno em até 48h úteis
            </span>
          </div>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed mb-8">
            Nossa equipe analisa sua operação, identifica onde você está perdendo tempo e dinheiro, e apresenta um caminho claro — sem jargão técnico, sem compromisso.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Mapeamento do seu nível de maturidade digital",
              "Identificação dos principais gargalos e custos ocultos",
              "Proposta personalizada com prazo e investimento",
              "Atendimento em todo o Brasil — presencial ou remoto",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[.85rem] text-muted-foreground leading-relaxed">
                <span className="w-[17px] h-[17px] border border-foreground/20 rounded-sm flex items-center justify-center text-[.58rem] text-primary flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="scroll-reveal bg-secondary border border-view-line rounded-lg p-6 md:p-9" style={{ transitionDelay: ".15s" }}>
          <div className="font-display font-extrabold text-[1.1rem] mb-1">Quero meu Diagnóstico Grátis</div>
          <div className="text-[.75rem] text-muted-foreground mb-7">Formulário de 30 segundos · Resposta em até 48h</div>

          <form onSubmit={handleSubmit} onFocus={trackStart}>
            {/* Nome */}
            <div className="mb-4">
              <label className={labelCls} htmlFor="lead-nome">Nome</label>
              <input id="lead-nome" name="nome" type="text" placeholder="Seu nome completo" required maxLength={100} autoComplete="name" className={inputCls} />
            </div>

            {/* WhatsApp */}
            <div className="mb-4">
              <label className={labelCls} htmlFor="lead-whatsapp">WhatsApp</label>
              <input
                id="lead-whatsapp"
                autoComplete="tel"
                type="tel"
                inputMode="numeric"
                placeholder="(83) 9 0000-0000"
                required
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                maxLength={16}
                className={inputCls}
              />
            </div>

            {/* Empresa + Segmento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} htmlFor="lead-empresa">Empresa</label>
                <input id="lead-empresa" name="empresa" type="text" placeholder="Nome da empresa" required maxLength={100} autoComplete="organization" className={inputCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="lead-segmento">Segmento</label>
                <select id="lead-segmento" name="segmento" required defaultValue="" className={selectCls}
                  style={{ backgroundImage: chevronSvg }}
                >
                  <option value="" disabled>Selecione</option>
                  {segmentos.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/*
              Consentimento LGPD. O formulário coleta nome, telefone, empresa e
              segmento e antes só exibia "🔒 Seus dados estão protegidos. Sem
              spam." — sem base legal registrada, sem política publicada e sem
              nenhum aceite do titular.
            */}
            <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
              />
              <span className="text-[.76rem] text-muted-foreground leading-relaxed">
                Autorizo a VIEW a usar meus dados para entrar em contato e preparar meu diagnóstico,
                conforme a{" "}
                <Link to="/privacidade" className="text-primary underline hover:no-underline">
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={submitted || submitting || !consent}
              className={`w-full rounded-md py-4 font-display font-extrabold text-[.88rem] tracking-[.06em] mt-4 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                submitted
                  ? "bg-view-green text-background"
                  : "bg-foreground text-background hover:opacity-[.88] hover:-translate-y-px"
              }`}
            >
              {submitted
                ? "✓ Solicitado! Entraremos em contato em até 48h."
                : submitting
                  ? "Enviando..."
                  : "Solicitar diagnóstico gratuito →"}
            </button>
            <div className="text-center text-[.74rem] text-muted-foreground mt-3">
              🔒 Sem spam. Você pode pedir a exclusão dos seus dados a qualquer momento.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
