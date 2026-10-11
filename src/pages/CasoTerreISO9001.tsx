import { CasePageTemplate } from "@/components/CaseKit";
import { getCaso } from "@/content/casos";

const caso = getCaso("construtora-terre-iso-9001")!;

export default function CasoTerreISO9001() {
  return (
    <CasePageTemplate
      caso={caso}
      path="/casos/construtora-terre-iso-9001"
      title="Como a Construtora TERRE mantém a ISO 9001 | VIEW"
      description="Veja como a VIEW ajudou a Construtora TERRE a manter a ISO 9001 sem retrabalho, com registro automático em cada etapa da obra."
      h1="Como a Construtora TERRE mantém a ISO 9001 sem retrabalho"
      setor="Construção Civil"
      intro="A cada auditoria, reunir a documentação da ISO 9001 virava uma corrida contra o tempo. Hoje cada etapa da obra gera registro automático, no momento em que acontece."
    />
  );
}
