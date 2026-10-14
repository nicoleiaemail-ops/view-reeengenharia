import { Link } from "react-router-dom";
import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("industria")!;

export default function SetorIndustria() {
  return (
    <SetorPageTemplate setor={setor}>
      <section className="py-10 border-t border-view-line">
        <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
          Serviço relacionado
        </h2>
        <Link
          to="/engenharia-de-producao-agroindustria-paraiba"
          className="block bg-foreground/[.03] border border-foreground/[.08] rounded-lg p-5 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
        >
          <div className="text-[.65rem] tracking-[.15em] uppercase text-primary font-bold mb-2">
            Agroindústria e fábricas
          </div>
          <div className="text-[.92rem] text-foreground font-medium leading-snug">
            Engenharia de produção para agroindústria na Paraíba — fluxo, layout, ergonomia e capacidade →
          </div>
        </Link>
      </section>
    </SetorPageTemplate>
  );
}
