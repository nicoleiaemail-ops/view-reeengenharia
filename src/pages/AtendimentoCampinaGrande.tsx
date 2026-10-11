import { AtendimentoPageTemplate } from "@/components/AtendimentoKit";
import { getCidade } from "@/content/atendimento";

const cidade = getCidade("campina-grande")!;

export default function AtendimentoCampinaGrande() {
  return <AtendimentoPageTemplate cidade={cidade} />;
}
