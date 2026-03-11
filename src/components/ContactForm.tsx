import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const inputCls = "w-full bg-foreground/[.08] border border-view-line/60 rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/60 focus:bg-foreground/[.12] transition-colors placeholder:text-muted-foreground/60";
const selectCls = `${inputCls} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-[right_14px_center] bg-no-repeat`;
const labelCls = "block text-[.7rem] tracking-[.08em] uppercase text-foreground/80 font-semibold mb-1.5";

const segmentos = [
  { value: "industria", label: "🏭 Indústria", sub: "Manufatura, produção, transformação" },
  { value: "construcao", label: "🏗️ Construção Civil", sub: "Construtoras, incorporadoras, obras" },
  { value: "comercio", label: "🛒 Comércio / Varejo", sub: "Lojas, atacado, e-commerce" },
  { value: "servicos", label: "🔧 Serviços", sub: "Manutenção, consultoria, facilities" },
  { value: "alimentacao", label: "🍽️ Alimentação", sub: "Restaurantes, cafeterias, food service" },
  { value: "saude", label: "🏥 Saúde", sub: "Clínicas, hospitais, laboratórios" },
  { value: "logistica", label: "🚚 Logística / Transporte", sub: "Frota, armazém, distribuição" },
  { value: "educacao", label: "📚 Educação", sub: "Escolas, cursos, treinamentos" },
  { value: "agro", label: "🌾 Agronegócio", sub: "Fazendas, cooperativas, insumos" },
  { value: "tech", label: "💻 Tecnologia", sub: "Software, startups, SaaS" },
  { value: "outro", label: "📋 Outro segmento", sub: "" },
];

const cidades = [
  { group: "Paraíba", items: ["João Pessoa", "Campina Grande", "Patos", "Bayeux", "Santa Rita", "Cabedelo"] },
  { group: "Pernambuco", items: ["Recife", "Olinda", "Jaboatão dos Guararapes", "Caruaru", "Petrolina"] },
  { group: "Rio Grande do Norte", items: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante"] },
  { group: "Outros estados", items: ["Outra cidade (atendimento remoto)"] },
];

const funcionarios = [
  { value: "1-10", label: "1 a 10 funcionários" },
  { value: "11-30", label: "11 a 30 funcionários" },
  { value: "31-50", label: "31 a 50 funcionários" },
  { value: "51-100", label: "51 a 100 funcionários" },
  { value: "101-200", label: "101 a 200 funcionários" },
  { value: "201-500", label: "201 a 500 funcionários" },
  { value: "500+", label: "Mais de 500 funcionários" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  }, []);

  const handlePhoneKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const { error } = await supabase.from("diagnostic_leads").insert({
        nome: formData.get("nome") as string,
        email: formData.get("email") as string,
        whatsapp: phone,
        empresa: formData.get("empresa") as string,
        num_funcionarios: formData.get("num_funcionarios") as string,
        segmento: formData.get("segmento") as string,
        cidade: formData.get("cidade") as string,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Diagnóstico solicitado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-28 px-[7%] border-t border-view-line" id="diagnostico">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="scroll-reveal">
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-4">
            Diagnóstico gratuito.<br />Resultado em 48h.
          </h2>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full py-2 px-4 mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--view-accent))] flex-shrink-0" style={{ animation: "blink 2s infinite" }} />
            <span className="text-[.65rem] tracking-[.08em] text-primary/90 font-display font-semibold">Apenas 3 vagas disponíveis esta semana</span>
          </div>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-8">
            Nossa equipe analisa sua operação, identifica onde você está perdendo tempo e dinheiro, e apresenta um caminho claro — sem jargão técnico, sem compromisso.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Mapeamento do seu nível de maturidade digital",
              "Identificação dos principais gargalos e custos ocultos",
              "Proposta personalizada com prazo e investimento",
              "Atendimento em PB, PE e RN — presencial ou remoto",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[.85rem] text-muted-foreground leading-relaxed">
                <span className="w-[17px] h-[17px] border border-foreground/20 rounded-sm flex items-center justify-center text-[.58rem] text-primary flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="scroll-reveal bg-secondary border border-view-line rounded p-6 md:p-9" style={{ transitionDelay: ".15s" }}>
          <div className="font-display font-extrabold text-[1.1rem] mb-1">Quero meu Diagnóstico Grátis</div>
          <div className="text-[.75rem] text-muted-foreground mb-7">Formulário de 2 minutos · Resposta em até 48h</div>

          <form onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="mb-3.5">
              <label className={labelCls}>Nome</label>
              <input name="nome" type="text" placeholder="Seu nome completo" required maxLength={100} className={inputCls} />
            </div>

            {/* Email + WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className={labelCls}>E-mail</label>
                <input name="email" type="email" placeholder="seu@email.com" required maxLength={255} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>WhatsApp</label>
                <input
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
            </div>

            {/* Empresa + Funcionários */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className={labelCls}>Empresa</label>
                <input name="empresa" type="text" placeholder="Nome da empresa" required maxLength={100} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Nº de funcionários</label>
                <select name="num_funcionarios" required defaultValue="" className={selectCls}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
                >
                  <option value="" disabled>Selecione</option>
                  {funcionarios.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Segmento + Cidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className={labelCls}>Segmento</label>
                <select name="segmento" required defaultValue="" className={selectCls}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
                >
                  <option value="" disabled>Selecione o segmento</option>
                  {segmentos.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Cidade</label>
                <select name="cidade" required defaultValue="" className={selectCls}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
                >
                  <option value="" disabled>Selecione a cidade</option>
                  {cidades.map((g) => (
                    <optgroup key={g.group} label={`── ${g.group}`}>
                      {g.items.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={submitted || submitting}
              className={`w-full rounded-sm py-4 font-display font-extrabold text-[.86rem] tracking-[.07em] mt-4 transition-all cursor-pointer ${
                submitted
                  ? "bg-view-green text-background"
                  : "bg-foreground text-background hover:opacity-88 hover:-translate-y-px"
              }`}
            >
              {submitted ? "✓ Solicitado! Entraremos em contato em até 48h." : submitting ? "Enviando..." : "SOLICITAR DIAGNÓSTICO GRATUITO →"}
            </button>
            <div className="text-center text-[.67rem] text-muted-foreground mt-3">🔒 Seus dados estão protegidos. Sem spam.</div>
          </form>
        </div>
      </div>
    </section>
  );
}
