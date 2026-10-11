import { useState, useCallback, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd } from "@/lib/business";

/**
 * Página "em breve" (Parte 4, item 3). O estudo ainda não existe — nenhum
 * dado dele é publicado aqui, só a descrição do que ele vai medir e um
 * formulário de interesse.
 *
 * O formulário reaproveita o mecanismo do diagnóstico (mesma função do banco,
 * submit_diagnostic_lead) em vez de um backend dedicado: nesta sessão não há
 * acesso para criar uma função/tabela nova no Supabase. O campo "segmento" é
 * reaproveitado para o setor de quem se interessou pelo estudo. Quando houver
 * acesso ao banco, o ideal é uma tabela própria (ex. estudo_maturidade_leads)
 * em vez deste reaproveitamento.
 */

const PATH = "/estudos/maturidade-operacional-paraiba-2026";
const TITLE = "Estudo: Maturidade Operacional na Paraíba | VIEW";
const DESCRIPTION =
  "Em breve: o primeiro estudo da VIEW sobre maturidade operacional de empresas na Paraíba. Deixe seu contato para receber em primeira mão.";

const segmentos = [
  { value: "industria", label: "Indústria" },
  { value: "construcao", label: "Construção Civil" },
  { value: "comercio", label: "Comércio / Varejo" },
  { value: "servicos", label: "Serviços" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "saude", label: "Saúde" },
  { value: "logistica", label: "Logística / Transporte" },
  { value: "outro", label: "Outro segmento" },
];

const inputCls =
  "w-full bg-foreground/[.08] border border-view-line/60 rounded-md px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/60 focus:bg-foreground/[.12] transition-colors placeholder:text-muted-foreground/60";
const labelCls = "block text-[.7rem] tracking-[.08em] uppercase text-foreground/80 font-semibold mb-1.5";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function InteresseEstudoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const startTracked = useRef(false);

  const trackStart = useCallback(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    track(EVENTS.formStart, { form: "estudo_maturidade_pb" });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      track(EVENTS.leadSubmit, { form: "estudo_maturidade_pb", segmento: formData.get("segmento") as string });
      toast.success("Interesse registrado! Avisaremos assim que o estudo sair.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} onFocus={trackStart} className="bg-secondary border border-view-line rounded-lg p-6 md:p-9">
      <div className="font-display font-extrabold text-[1.1rem] mb-1">Quero receber o estudo</div>
      <div className="text-[.75rem] text-muted-foreground mb-7">
        Avisamos por WhatsApp assim que o estudo for publicado.
      </div>

      <div className="mb-4">
        <label className={labelCls} htmlFor="estudo-nome">Nome</label>
        <input id="estudo-nome" name="nome" type="text" placeholder="Seu nome completo" required maxLength={100} autoComplete="name" className={inputCls} />
      </div>

      <div className="mb-4">
        <label className={labelCls} htmlFor="estudo-whatsapp">WhatsApp</label>
        <input
          id="estudo-whatsapp"
          autoComplete="tel"
          type="tel"
          inputMode="numeric"
          placeholder="(83) 9 0000-0000"
          required
          value={phone}
          onChange={(e) => { trackStart(); setPhone(formatPhone(e.target.value)); }}
          maxLength={16}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls} htmlFor="estudo-empresa">Empresa</label>
          <input id="estudo-empresa" name="empresa" type="text" placeholder="Nome da empresa" required maxLength={100} autoComplete="organization" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="estudo-segmento">Setor</label>
          <select id="estudo-segmento" name="segmento" required defaultValue="" className={inputCls}>
            <option value="" disabled>Selecione</option>
            {segmentos.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitted || submitting}
        className={`w-full rounded-md py-4 font-display font-extrabold text-[.88rem] tracking-[.06em] mt-2 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
          submitted ? "bg-view-green text-background" : "bg-foreground text-background hover:opacity-[.88] hover:-translate-y-px"
        }`}
      >
        {submitted ? "✓ Interesse registrado!" : submitting ? "Enviando..." : "Quero receber o estudo →"}
      </button>
    </form>
  );
}

export default function EstudoMaturidadePB() {
  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        noindex
        jsonLd={[
          breadcrumbJsonLd("Estudo: Maturidade Operacional na Paraíba", PATH),
          { "@context": "https://schema.org", "@type": "Organization", ...BUSINESS_JSONLD_BASE },
        ]}
      />
      <Navbar />

      <section className="px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[700px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold text-accent">
            Em breve
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.15] mb-5">
            Maturidade Operacional na Paraíba — 2026
          </h1>
          <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
            A VIEW está preparando o primeiro estudo próprio sobre maturidade operacional de empresas na
            Paraíba, baseado na metodologia DISTIPP. Nenhum dado foi coletado ou publicado ainda — esta
            página existe para você ser avisado assim que o estudo sair.
          </p>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%] pb-20">
        <section className="py-10 border-t border-view-line grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-extrabold text-[1.3rem] leading-[1.2] mb-4">O que o estudo vai medir</h2>
            <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-4">
              O estudo vai reunir respostas de empresas paraibanas na Avaliação de Maturidade DISTIPP, para
              traçar um retrato regional: em quais das sete dimensões (Dados, Integração, Sistemas,
              Tecnologia, Inovação, Pessoas, Processos) as empresas do estado estão mais maduras — e onde
              estão os gargalos mais comuns.
            </p>
            <p className="text-[.9rem] text-muted-foreground leading-relaxed">
              Nenhum número deste estudo foi apurado ainda. O que existe hoje é o método (DISTIPP) e a
              decisão de produzir o estudo — os dados e as conclusões virão depois, com volume real de
              respostas.
            </p>
          </div>
          <InteresseEstudoForm />
        </section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
