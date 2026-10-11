import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("empresas-de-servicos")!;

export default function SetorEmpresasServicos() {
  return <SetorPageTemplate setor={setor} />;
}
