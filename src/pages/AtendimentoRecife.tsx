import { AtendimentoPageTemplate } from "@/components/AtendimentoKit";
import { getCidade } from "@/content/atendimento";

const cidade = getCidade("recife")!;

export default function AtendimentoRecife() {
  return <AtendimentoPageTemplate cidade={cidade} />;
}
