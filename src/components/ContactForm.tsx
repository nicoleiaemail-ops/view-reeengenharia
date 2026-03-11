import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-28 px-[7%] border-t border-view-line" id="diagnostico">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
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

        <div className="scroll-reveal bg-secondary border border-view-line rounded p-9" style={{ transitionDelay: ".15s" }}>
          <div className="font-display font-extrabold text-[1.1rem] mb-1">Quero meu Diagnóstico Grátis</div>
          <div className="text-[.75rem] text-muted-foreground mb-7">Formulário de 2 minutos · Resposta em até 48h</div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="mb-3.5">
              <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">Nome</label>
              <input type="text" placeholder="Seu nome" required className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">E-mail</label>
                <input type="email" placeholder="seu@email.com" required className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors" />
              </div>
              <div>
                <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">WhatsApp</label>
                <input type="tel" placeholder="(83) 9 0000-0000" className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors" />
              </div>
            </div>
            <div className="mb-3.5">
              <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">Empresa</label>
              <input type="text" placeholder="Nome da empresa" className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">Segmento</label>
                <select className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors appearance-none">
                  <option value="" disabled selected>Selecione</option>
                  <option>Indústria</option>
                  <option>Construção</option>
                  <option>Comércio</option>
                  <option>Serviços</option>
                  <option>Saúde</option>
                  <option>Logística</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-[.65rem] tracking-[.1em] uppercase text-muted-foreground mb-1">Cidade</label>
                <select className="w-full bg-foreground/[.05] border border-view-line rounded-sm px-3.5 py-3 text-foreground font-body text-[.88rem] outline-none focus:border-primary/45 transition-colors appearance-none">
                  <option value="" disabled selected>Selecione</option>
                  <option>João Pessoa — PB</option>
                  <option>Campina Grande — PB</option>
                  <option>Recife — PE</option>
                  <option>Natal — RN</option>
                  <option>Outra</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={submitted}
              className={`w-full rounded-sm py-4 font-display font-extrabold text-[.86rem] tracking-[.07em] mt-4 transition-all cursor-pointer ${
                submitted
                  ? "bg-view-green text-background"
                  : "bg-foreground text-background hover:opacity-88 hover:-translate-y-px"
              }`}
            >
              {submitted ? "✓ Solicitado! Entraremos em contato em até 48h." : "SOLICITAR DIAGNÓSTICO GRATUITO →"}
            </button>
            <div className="text-center text-[.67rem] text-muted-foreground mt-3">🔒 Seus dados estão protegidos. Sem spam.</div>
          </form>
        </div>
      </div>
    </section>
  );
}
