import { Link } from "react-router-dom";

/**
 * Prova social.
 *
 * ATENÇÃO — este é o maior gargalo de conversão que sobrou no site, e ele não
 * se resolve em código. Hoje são três depoimentos, dois deles da mesma
 * construtora, todos identificados só por iniciais e sem foto. Para uma venda
 * consultiva de ticket alto isso não sustenta a decisão de compra.
 *
 * O componente já aceita nome completo, cargo, empresa e foto. O que falta é
 * autorização de cliente. Cada depoimento preenchido com `empresa` e `foto`
 * reais vale mais do que qualquer outra mudança pendente nesta página — a
 * prioridade comercial dos próximos 30 dias é conseguir dois.
 *
 * `anonimo: true` deixa explícito que a omissão foi pedido do cliente, o que
 * é muito melhor do que parecer que a VIEW não quis dizer quem é.
 */
interface Depoimento {
  texto: string;
  resultados: string[];
  iniciais: string;
  nome: string;
  cargo: string;
  empresa: string;
  /** Caminho da foto em /public. Sem foto, cai nas iniciais. */
  foto?: string;
  anonimo?: boolean;
  tag: string;
}

const depoimentos: Depoimento[] = [
  {
    texto:
      "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
    resultados: ["ISO 9001 mantido sem retrabalho", "Planejamento de obras em tempo real"],
    iniciais: "VD",
    nome: "Vitória D.",
    cargo: "Diretora",
    empresa: "Construtora de médio porte",
    anonimo: true,
    tag: "Construção Civil",
  },
  {
    texto:
      "Antes eu precisava ligar pra cada encarregado pra saber o que tava acontecendo. Agora abro o aplicativo e vejo tudo: o que foi feito, o que atrasou, quem tá onde. Mudou completamente a forma como eu gerencio a obra.",
    resultados: ["Acompanhamento em tempo real", "Gestão completa pelo celular"],
    iniciais: "AS",
    nome: "Aguinaldo S.",
    cargo: "Supervisor de obra",
    empresa: "Construtora de médio porte",
    anonimo: true,
    tag: "Construção Civil",
  },
  {
    texto:
      "A cozinha vivia em caos na hora do almoço. Pedidos atrasavam, cliente reclamava, equipe estressada. A VIEW mapeou cada etapa — do pedido ao pagamento — e reorganizou o layout da cozinha. Hoje o atendimento é mais rápido, os custos caíram e o cliente percebe a diferença.",
    resultados: [
      "Atendimento mais rápido no horário de pico",
      "Redução de custo operacional",
      "Gargalos da cozinha eliminados",
    ],
    iniciais: "RA",
    nome: "Proprietário",
    cargo: "Sócio-fundador",
    empresa: "Restaurante de médio porte",
    anonimo: true,
    tag: "Alimentação",
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary py-10 md:py-16 px-[7%] border-t border-view-line" id="depoimentos">
      <div className="scroll-reveal text-center mb-12">
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-3">
          Quem já enxerga diferente.
        </h2>
        <p className="text-[.9rem] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
          Empresas reais, resultados reais — da construção civil à alimentação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-view-line border border-view-line">
        {depoimentos.map((d, i) => (
          <figure
            key={i}
            className="scroll-reveal bg-background p-6 md:p-10 flex flex-col gap-6 hover:bg-secondary transition-colors m-0"
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <blockquote className="m-0">
              <div className="text-[3rem] leading-none text-primary/35 mb-1" aria-hidden="true">
                &ldquo;
              </div>
              <p className="text-[.92rem] text-muted-foreground leading-relaxed italic">{d.texto}</p>
            </blockquote>

            <ul className="bg-primary/[.08] border-l-2 border-primary py-3 px-4 flex flex-col gap-1.5 list-none m-0">
              {d.resultados.map((r) => (
                <li key={r} className="text-[.8rem] text-primary/90 leading-relaxed flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  {r}
                </li>
              ))}
            </ul>

            <figcaption className="flex items-center gap-3.5 mt-auto">
              {d.foto ? (
                <img
                  src={d.foto}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-view-line"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full bg-secondary border border-view-line flex items-center justify-center font-display font-extrabold text-[.85rem] text-primary/80 flex-shrink-0"
                  aria-hidden="true"
                >
                  {d.iniciais}
                </div>
              )}
              <div className="min-w-0">
                <div className="font-display text-[.86rem] font-bold text-foreground">{d.nome}</div>
                <div className="text-[.76rem] text-muted-foreground mt-0.5">
                  {d.cargo} · {d.empresa}
                </div>
              </div>
              <span className="ml-auto text-[.64rem] tracking-[.12em] uppercase border border-view-line px-2.5 py-1 text-muted-foreground whitespace-nowrap">
                {d.tag}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {depoimentos.some((d) => d.anonimo) && (
        <p className="scroll-reveal text-center text-[.75rem] text-muted-foreground/80 mt-6 max-w-[620px] mx-auto leading-relaxed">
          Alguns clientes preferem não ter o nome da empresa divulgado. Podemos apresentá-los como
          referência durante a proposta, mediante autorização.
        </p>
      )}

      <div className="scroll-reveal text-center mt-8">
        <Link
          to="/casos"
          className="inline-flex items-center gap-2 text-[.86rem] text-muted-foreground hover:text-foreground transition-colors font-display font-semibold"
        >
          Ver casos completos com desafio, solução e resultados →
        </Link>
      </div>
    </section>
  );
}
