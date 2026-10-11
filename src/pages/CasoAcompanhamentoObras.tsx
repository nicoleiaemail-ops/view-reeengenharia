import { CasePageTemplate } from "@/components/CaseKit";
import { getCaso } from "@/content/casos";

const caso = getCaso("construtora-acompanhamento-de-obras")!;

export default function CasoAcompanhamentoObras() {
  return (
    <CasePageTemplate
      caso={caso}
      path="/casos/construtora-acompanhamento-de-obras"
      title="Acompanhamento de Obras em Tempo Real | VIEW"
      description="Caso real: como uma construtora passou a acompanhar obras pelo celular, com visibilidade total e sem depender de ligações."
      h1="Como uma construtora acompanha obras em tempo real pelo celular"
      setor="Construção Civil"
      intro="O supervisor precisava ligar para cada encarregado para saber o andamento da obra. Hoje ele abre o aplicativo e vê tudo — o que foi feito, o que atrasou, quem está onde."
    />
  );
}
