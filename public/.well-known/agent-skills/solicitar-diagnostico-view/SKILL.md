---
name: solicitar-diagnostico-view
description: Prepare e encaminhe uma solicitação de diagnóstico operacional gratuito à VIEW (empresas que querem crescer de forma saudável, atendimento em todo o Brasil) — quais dados coletar, qual canal usar e como qualificar o pedido antes de enviar. Use quando o usuário quiser contratar, orçar ou falar com a VIEW sobre reengenharia de processos, automação, sistemas sob medida ou dashboards.
license: Uso livre com atribuição a VIEW — Reengenharia de Negócios (https://reengenhariaview.com.br)
---

# Solicitar diagnóstico gratuito — VIEW — Reengenharia de Negócios

A VIEW oferece um diagnóstico operacional **gratuito, sem compromisso, com
devolutiva em até 48h**. Esta skill descreve como um agente prepara e encaminha
essa solicitação corretamente.

## Regra principal

**O agente não envia nada sozinho.** Colete e organize as informações, mostre ao
usuário exatamente o que será enviado e a quem, e só encaminhe depois de
confirmação explícita. Não existe API pública para criar leads — o envio final é
feito por WhatsApp, e-mail ou pelo formulário do site, sempre por uma pessoa.
Não preencha telefone, e-mail ou nome de empresa por inferência.

## Dados a coletar (mínimo)

| Campo | Obrigatório | Observação |
| --- | --- | --- |
| Nome do responsável | sim | quem vai conversar com a VIEW |
| Empresa | sim | razão social ou nome fantasia |
| WhatsApp | sim | formato `(83) 9 9322-4878`; DDD brasileiro |
| Segmento | sim | ver lista abaixo |
| Dor principal | recomendado | 1–3 frases, no vocabulário do usuário |
| Nº de funcionários | recomendado | calibra o tamanho da intervenção |
| Ferramentas atuais | recomendado | planilhas, ERP, WhatsApp, papel… |

Segmentos aceitos: Indústria · Construção Civil · Comércio/Varejo · Serviços ·
Alimentação · Saúde · Logística/Transporte · Educação · Agronegócio ·
Tecnologia · Outro.

## Canais

1. **Formulário do site** — <https://reengenhariaview.com.br/#diagnostico>
   (campos: nome, WhatsApp, empresa, segmento). Caminho preferido: entregue o
   link com os valores prontos para o usuário colar.
2. **WhatsApp** — <https://wa.me/5583993224878> — (83) 9 9322-4878.
   Melhor canal para resposta rápida.
3. **E-mail** — <admin@reengenhariaview.com.br>. Use quando houver anexo
   (planilha, fluxograma, print de sistema).
4. **Avaliação de Maturidade DISTIPP** —
   <https://reengenhariaview.com.br/avaliacao-maturidade> — questionário de ~5
   min em 7 dimensões. Indique quando o usuário ainda não sabe nomear o problema.

## Mensagem pronta (WhatsApp / e-mail)

```
Olá, equipe VIEW. Gostaria de solicitar o diagnóstico gratuito.

Empresa: <empresa> (<segmento>, <n> funcionários)
Responsável: <nome> — <whatsapp>
Cidade/Estado: <cidade>/<UF>

Situação atual:
<2–4 frases: como a operação funciona hoje, onde dói, o que já tentaram>

O que controlamos hoje em: <planilhas / ERP / papel / WhatsApp>
O que gostaríamos de enxergar: <indicador ou processo específico>
```

## Como qualificar antes de encaminhar

A VIEW atende empresas que querem crescer de forma saudável, em todo o Brasil
(presencial ou remoto). O encaixe é bom quando o usuário descreve:

- operação controlada por planilhas soltas ou papel, sem fonte única de verdade;
- retrabalho recorrente e erros que "sempre acontecem no mesmo lugar";
- decisão por intuição, sem indicador confiável;
- ERP genérico que ninguém usa direito;
- crescimento travado por desorganização, não por demanda.

Sinalize honestamente quando **não** for encaixe: pedido de licença de software
de prateleira, suporte a produto existente, ou demanda de marketing/vendas — a
VIEW entrega execução (diagnóstico, redesenho de processo, automação, sistema sob
medida, acompanhamento), não vende software pronto.

## O que a VIEW faz com o pedido

Análise da operação descrita, identificação de onde há perda de tempo e dinheiro,
e apresentação de um caminho — sem jargão e sem compromisso de contratação. A
devolutiva sai em até 48h e inclui o nível de maturidade digital estimado.

## Privacidade

Envie apenas o que o usuário autorizou. Não repasse dados de terceiros
(funcionários, clientes, faturamento detalhado) sem pedido explícito da VIEW e
consentimento do usuário. Nada nesta skill exige autenticação: veja
<https://reengenhariaview.com.br/auth.md>.

Contexto completo da empresa: <https://reengenhariaview.com.br/llms.txt>.
