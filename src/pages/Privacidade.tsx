import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * O site coletava nome, WhatsApp, email, empresa, segmento e 40 respostas
 * sobre a operação do cliente sem política publicada, sem base legal declarada
 * e sem aceite do titular — exposição real sob a LGPD, além de sinal ruim para
 * um comprador B2B.
 *
 * >>> REVISAR COM ADVOGADO antes de considerar isto encerrado, e preencher o
 * CNPJ e o encarregado de dados abaixo. O texto cobre o que o site de fato faz
 * hoje; não substitui revisão jurídica.
 */

const ATUALIZADO_EM = "23 de agosto de 2026";
const EMAIL_CONTATO = "admin@reengenhariaview.com.br";

const secoes = [
  {
    titulo: "1. Quem somos",
    conteudo: [
      "A VIEW Reengenharia de Processos é uma consultoria de reengenharia de processos, automação e sistemas de gestão, com sede na Av. Pres. Epitácio Pessoa, 1251, Sala 101, Bairro dos Estados, João Pessoa/PB, CEP 58030-000.",
      `Para qualquer assunto relacionado a dados pessoais, incluindo os pedidos descritos nesta política, o contato é ${EMAIL_CONTATO}.`,
    ],
  },
  {
    titulo: "2. Quais dados coletamos",
    conteudo: [
      "Coletamos apenas o que você informa voluntariamente nos formulários do site:",
    ],
    lista: [
      "Formulário de diagnóstico: nome, WhatsApp, empresa e segmento de atuação.",
      "Avaliação de maturidade DISTIPP: nome ou empresa, email, telefone, segmento e as respostas do questionário sobre a sua operação.",
      "Dados de navegação: páginas visitadas, origem do acesso e interações com a página, coletados de forma agregada por Google Analytics e Microsoft Clarity quando você aceita cookies de análise.",
    ],
    depois: [
      "Não coletamos dados sensíveis, não pedimos documentos, não solicitamos dados bancários e não usamos o site para cobrança.",
    ],
  },
  {
    titulo: "3. Para que usamos",
    conteudo: ["Os dados dos formulários são usados exclusivamente para:"],
    lista: [
      "Entrar em contato com você sobre a solicitação que você mesmo enviou.",
      "Preparar e apresentar o diagnóstico ou o relatório de maturidade solicitado.",
      "Enviar, quando aplicável, uma proposta comercial referente a esse contato.",
    ],
    depois: [
      "Os dados de navegação são usados para entender quais partes do site são úteis e corrigir o que não funciona. Eles não são associados à sua identidade.",
    ],
  },
  {
    titulo: "4. O que não fazemos",
    conteudo: [
      "Não vendemos, alugamos nem cedemos seus dados a terceiros. Não incluímos seu contato em listas de disparo em massa. Não usamos as respostas do seu questionário como exemplo público sem autorização escrita e específica sua.",
    ],
  },
  {
    titulo: "5. Base legal",
    conteudo: [
      "O tratamento dos dados enviados nos formulários se apoia no seu consentimento (art. 7º, I da LGPD), manifestado no aceite marcado no momento do envio, e nos procedimentos preliminares relacionados a contrato do qual você é parte interessada (art. 7º, V).",
      "Os dados de navegação se apoiam no legítimo interesse de manter e melhorar o site (art. 7º, IX), e você pode se opor a eles a qualquer momento.",
    ],
  },
  {
    titulo: "6. Com quem compartilhamos",
    conteudo: [
      "Seus dados ficam armazenados em infraestrutura de terceiros que atuam como operadores, apenas na medida necessária para o site funcionar:",
    ],
    lista: [
      "Supabase — banco de dados onde os formulários são armazenados.",
      "Vercel — hospedagem e entrega das páginas.",
      "Google Analytics e Microsoft Clarity — medição de uso do site, de forma agregada.",
    ],
    depois: [
      "Esses fornecedores podem processar dados fora do Brasil. Nenhum deles está autorizado a usar seus dados para finalidade própria.",
    ],
  },
  {
    titulo: "7. Por quanto tempo guardamos",
    conteudo: [
      "Mantemos os dados de contato enquanto durar a relação comercial e por até 24 meses após o último contato, prazo em que a solicitação ainda pode ser retomada. Depois disso, os registros são excluídos ou anonimizados. Se você pedir a exclusão antes, atendemos no prazo do item seguinte.",
    ],
  },
  {
    titulo: "8. Seus direitos",
    conteudo: [
      "A LGPD garante a você, a qualquer momento e sem custo, o direito de:",
    ],
    lista: [
      "Confirmar se tratamos dados seus e acessar esses dados.",
      "Corrigir dados incompletos, inexatos ou desatualizados.",
      "Pedir a anonimização, o bloqueio ou a exclusão dos dados.",
      "Solicitar a portabilidade dos dados a outro fornecedor.",
      "Revogar o consentimento e ser informado sobre as consequências disso.",
      "Se opor a um tratamento feito com base em legítimo interesse.",
    ],
    depois: [
      `Para exercer qualquer um deles, escreva para ${EMAIL_CONTATO}. Respondemos em até 15 dias.`,
    ],
  },
  {
    titulo: "9. Cookies",
    conteudo: [
      "O site usa cookies estritamente necessários para funcionar e cookies de análise (Google Analytics e Microsoft Clarity) para medir o uso das páginas. Os de análise só são carregados após sua interação com a página e podem ser bloqueados nas configurações do seu navegador, sem prejuízo do uso do site.",
    ],
  },
  {
    titulo: "10. Segurança",
    conteudo: [
      "Os dados trafegam sempre por conexão criptografada (HTTPS) e ficam em banco com acesso restrito à equipe da VIEW. Nenhum sistema é infalível: se ocorrer um incidente que possa gerar risco relevante a você, comunicaremos você e a ANPD, conforme o art. 48 da LGPD.",
    ],
  },
  {
    titulo: "11. Mudanças nesta política",
    conteudo: [
      `Esta política pode ser atualizada. A data de revisão fica sempre no topo desta página. A versão em vigor é a publicada aqui — última atualização em ${ATUALIZADO_EM}.`,
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Política de Privacidade — VIEW Reengenharia de Processos",
  url: "https://reengenhariaview.com.br/privacidade",
  description:
    "Como a VIEW coleta, usa, armazena e exclui dados pessoais enviados pelos formulários do site, conforme a LGPD.",
};

export default function Privacidade() {
  return (
    <>
      <SEO
        title="Política de Privacidade — VIEW Reengenharia de Processos"
        description="Como a VIEW coleta, usa, armazena e exclui os dados pessoais enviados pelos formulários do site, e como exercer seus direitos previstos na LGPD."
        path="/privacidade"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="min-h-screen px-[7%] pt-28 pb-20">
        <div className="max-w-[760px] mx-auto">
          <nav aria-label="Navegação estrutural" className="text-[.78rem] text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Início
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">Política de Privacidade</span>
          </nav>

          <h1 className="font-display font-extrabold text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.12] text-foreground mb-3">
            Política de Privacidade
          </h1>
          <p className="text-[.82rem] text-muted-foreground mb-10">
            Última atualização: {ATUALIZADO_EM}
          </p>

          <p className="text-[.95rem] text-muted-foreground leading-relaxed mb-12">
            Esta página explica, sem juridiquês desnecessário, quais dados a VIEW coleta neste site, o que
            faz com eles e como você pede que sejam apagados. Se algo aqui não estiver claro, escreva para{" "}
            <a href={`mailto:${EMAIL_CONTATO}`} className="text-primary underline hover:no-underline">
              {EMAIL_CONTATO}
            </a>{" "}
            e nós explicamos.
          </p>

          <div className="flex flex-col gap-10">
            {secoes.map((s) => (
              <section key={s.titulo}>
                <h2 className="font-display font-extrabold text-[1.1rem] text-foreground mb-3">{s.titulo}</h2>
                {s.conteudo.map((p) => (
                  <p key={p} className="text-[.92rem] text-muted-foreground leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {s.lista && (
                  <ul className="flex flex-col gap-2 my-4 pl-1">
                    {s.lista.map((item) => (
                      <li
                        key={item}
                        className="text-[.92rem] text-muted-foreground leading-relaxed flex gap-3"
                      >
                        <span className="text-primary flex-shrink-0" aria-hidden="true">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.depois?.map((p) => (
                  <p key={p} className="text-[.92rem] text-muted-foreground leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
