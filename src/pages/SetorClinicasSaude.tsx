import { SetorPageTemplate } from "@/components/SetorKit";
import { getSetor } from "@/content/setores";

const setor = getSetor("clinicas-e-saude")!;

export default function SetorClinicasSaude() {
  return <SetorPageTemplate setor={setor} />;
}
