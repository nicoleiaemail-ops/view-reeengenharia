import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("industria")!;

export default function SetorIndustria() {
  return <SetorPageTemplate setor={setor} />;
}
