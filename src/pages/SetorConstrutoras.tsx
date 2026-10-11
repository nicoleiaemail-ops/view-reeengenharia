import { Link } from "react-router-dom";
import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("construtoras")!;

/**
 * A página mais completa das 5, como pedido: além do template padrão, traz a
 * linha do tempo de implantação do sistema de qualidade (ISO 9001/PBQP-H).
 * Os nomes das etapas vêm do que já está documentado no caso da Construtora
 * TERRE e na landing /consultoria-iso-9001-construtoras — não é informação
 * nova, é a mesma sequência reaproveitada num formato de linha do tempo.
 */
const etapas = [
  {
    titulo: "Diagnóstico do processo de obra",
    desc: "Mapeamento de como a documentação de qualidade é produzida hoje — onde fica, quem registra, em que momento.",
  },
  {
    titulo: "Desenho do fluxo de qualidade",
    desc: "O procedimento que vai para o sistema é o mesmo que a obra de fato executa, não um procedimento genérico de ISO 9001 adaptado à força.",
  },
  {
    titulo: "Implantação do sistema de registro",
    desc: "Sistema sob medida que gera registro automático a cada etapa — inspeção, aprovação, marco — no momento em que acontece.",
  },
  {
    titulo: "Homologação com a equipe de obra",
    desc: "Encarregados e administrativo testam o fluxo real antes da virada definitiva, etapa por etapa.",
  },
  {
    titulo: "Acompanhamento contínuo entre auditorias",
    desc: "A certificação deixa de depender de um esforço pontual a cada ciclo — a documentação já existe quando a auditoria chega.",
  },
];

export default function SetorConstrutoras() {
  return (
    <SetorPageTemplate setor={setor}>
      <section className="py-10 border-t border-view-line">
        <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
          Linha do tempo de implantação (ISO 9001 / PBQP-H)
        </h2>
        <ol className="flex flex-col gap-5">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="flex gap-4">
              <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <div className="font-display font-bold text-foreground text-[.92rem] mb-1">{e.titulo}</div>
                <div className="text-muted-foreground text-[.85rem] leading-relaxed">{e.desc}</div>
              </div>
            </li>
          ))}
        </ol>
        <Link
          to="/consultoria-iso-9001-construtoras"
          className="inline-block mt-6 text-[.85rem] font-display font-semibold text-primary hover:underline"
        >
          Ver a página completa de consultoria ISO 9001 →
        </Link>
      </section>
    </SetorPageTemplate>
  );
}
