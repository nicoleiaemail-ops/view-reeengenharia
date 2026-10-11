import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("varejo")!;

export default function SetorVarejo() {
  return <SetorPageTemplate setor={setor} />;
}
