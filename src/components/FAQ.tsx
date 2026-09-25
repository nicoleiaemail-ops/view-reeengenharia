/**
 * Âncora de investimento.
 *
 * O FAQ respondia "Qual o investimento?" sem dar nenhuma referência, o que faz
 * duas coisas ruins: o lead qualificado hesita em pedir contato sem ideia de
 * ordem de grandeza, e o lead sem orçamento entra no funil e consome hora de
 * reunião.
 *
 * >>> PREENCHER: substitua pela faixa real da VIEW. Enquanto estiver `null`, o
 * FAQ explica o modelo de cobrança sem citar valor — é honesto, mas filtra
 * bem menos do que uma faixa citada. Não deixe assim por muito tempo.
 */
const FAIXA_INVESTIMENTO: string | null = null;

const respostaInvestimento = FAIXA_INVESTIMENTO
  ? `O diagnóstico é 100% gratuito e sem compromisso. Projetos ficam <strong>${FAIXA_INVESTIMENTO}</strong>, conforme o número de processos envolvidos e a profundidade da automação. O valor fechado sai depois do diagnóstico, quando o escopo já está claro — nunca antes.`
  : "O diagnóstico é 100% gratuito e sem compromisso. Projetos são cobrados por <strong>escopo fechado</strong>, definido depois do diagnóstico, e podem ser parcelados ao longo da implantação. O acompanhamento contínuo é opcional e cobrado à parte, mensalmente. Na conversa do diagnóstico apresentamos a faixa de investimento antes de qualquer proposta formal — você não precisa avançar às cegas.";

const faqs = [
  {
    q: "O que é reengenharia de processos?",
    a: "Reengenharia de processos é o redesign completo de como sua empresa funciona — substituindo rotinas manuais, planilhas descentralizadas e decisões baseadas em achismo por fluxos digitais, automatizados e orientados a dados em tempo real.",
  },
  {
    q: "O que é a metodologia DISTIPP?",
    a: "DISTIPP é a metodologia exclusiva da VIEW para diagnóstico de maturidade empresarial. Analisa sete dimensões: <strong>Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos.</strong> Com base nesse mapeamento, a VIEW define quais áreas priorizar para gerar mais resultado.",
  },
  {
    q: "Qual o investimento?",
    a: respostaInvestimento,
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "O diagnóstico gratuito é concluído em 48 horas. Projetos de automação costumam ter <strong>primeiros resultados visíveis entre 3 e 6 meses</strong> após o início da implementação.",
  },
  {
    q: "Qual a diferença entre automação e reengenharia de processos?",
    a: "Reengenharia redesenha como o processo funciona. Automação executa processos já bem definidos sem intervenção humana. A VIEW sempre faz reengenharia antes de automatizar: <strong>não automatizamos o caos.</strong>",
  },
  {
    q: "A VIEW atende empresas de qualquer segmento?",
    a: "Sim. Já atuamos em construção civil, alimentação, indústria, serviços e varejo. Atendemos presencialmente em PB, PE e RN, e remotamente em todo o Brasil.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "Em até 48 horas identificamos os principais gargalos, custos ocultos e oportunidades de automação da sua operação — e apresentamos um caminho claro, <strong>sem compromisso e sem jargão técnico.</strong>",
  },
  {
    q: "A VIEW vende software?",
    a: "Não. Entregamos execução completa: diagnóstico, redesign de processos, automação, sistema sob medida e acompanhamento contínuo. O software é uma consequência do processo bem estruturado.",
  },
  {
    q: "O que é maturidade operacional de uma empresa?",
    a: "É o grau em que a empresa tem processos documentados, dados centralizados, tecnologia integrada e equipes orientadas por indicadores. <strong>Empresas com alta maturidade tomam decisões mais rápidas e escalam com mais controle.</strong>",
  },
  {
    q: "A VIEW atende pequenas e médias empresas?",
    a: "Sim. A VIEW foi criada para PMEs que querem operar com a mesma inteligência das grandes corporações, sem precisar de um departamento de TI próprio. Atendemos empresas de 20 a 300 pessoas.",
  },
  {
    q: "O que acontece com os dados que eu enviar?",
    a: 'Ficam armazenados em servidor próprio e são usados apenas para preparar e apresentar seu diagnóstico. Não vendemos, não compartilhamos com terceiros e não usamos para disparo em massa. Você pode pedir a exclusão a qualquer momento — detalhes na <a href="/privacidade" class="text-primary underline">Política de Privacidade</a>.',
  },
];

/** Exportado para a home montar o JSON-LD de FAQPage a partir da mesma fonte. */
export const faqItems = faqs.map(({ q, a }) => ({
  q,
  // O JSON-LD não aceita marcação: o schema precisa do texto limpo.
  a: a.replace(/<[^>]+>/g, ""),
}));

export function FAQ() {
  return (
    <section className="py-10 md:py-16 px-[5%]" id="faq">
      <div className="max-w-[760px] mx-auto">
        <div className="scroll-reveal text-center mb-12">
          <div className="text-[.68rem] tracking-[.22em] uppercase text-muted-foreground mb-3">
            Tire suas dúvidas
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1]">
            Perguntas frequentes sobre
            <br />
            <em className="not-italic text-primary">reengenharia de processos</em>
          </h2>
        </div>

        <div className="scroll-reveal flex flex-col gap-0.5">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="faq-item bg-foreground/[.03] border border-foreground/[.07] rounded-[10px] overflow-hidden transition-all"
            >
              <summary className="p-5 px-6 cursor-pointer list-none flex justify-between items-center gap-4 font-display font-bold text-[.95rem] text-foreground select-none [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
                {f.q}
                <span
                  className="faq-chevron text-[1.1rem] text-primary flex-shrink-0 transition-transform duration-300"
                  aria-hidden="true"
                >
                  ＋
                </span>
              </summary>
              <div
                className="faq-body px-6 pb-5 text-[.9rem] text-muted-foreground leading-relaxed [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: f.a }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
