import { AtendimentoPageTemplate } from "@/components/AtendimentoKit";
import { getCidade } from "@/content/atendimento";

const cidade = getCidade("natal")!;

export default function AtendimentoNatal() {
  return <AtendimentoPageTemplate cidade={cidade} />;
}
