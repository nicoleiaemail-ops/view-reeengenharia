import { CasePageTemplate } from "@/components/CaseKit";
import { getCaso } from "@/content/casos";

const caso = getCaso("restaurante-processos")!;

export default function CasoRestauranteProcessos() {
  return (
    <CasePageTemplate
      caso={caso}
      path="/casos/restaurante-processos"
      title="Processos de Restaurante: Caso Real | VIEW"
      description="Como a VIEW mapeou o processo de um restaurante do pedido ao pagamento e eliminou o caos da cozinha no horário de pico."
      h1="Como um restaurante eliminou o caos da cozinha no horário de pico"
      setor="Alimentação"
      intro="No almoço, a cozinha operava no limite e ninguém sabia onde o fluxo travava. Hoje o processo do pedido ao pagamento tem dados em tempo real, do pedido à mesa."
    />
  );
}
