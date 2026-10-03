# Autenticação para agentes — VIEW

> Resumo: **nenhuma autenticação é necessária.** Todo o conteúdo de
> `https://reengenhariaview.com.br` é público, anônimo e livre para leitura por
> agentes automatizados. Não existe API protegida, não existe registro de agente
> e não há credenciais a emitir.

## Situação atual

| Item | Status |
| --- | --- |
| Conteúdo público (páginas, blog, `llms.txt`, skills) | Aberto, sem token |
| API HTTP pública | Não existe |
| Servidor MCP remoto | Não existe |
| Authorization Server (OAuth 2.0 / OIDC) | Não existe |
| Registro de agente (`register_uri`) | Não se aplica |

Por isso este site **não** publica `/.well-known/openid-configuration`,
`/.well-known/oauth-authorization-server` nem
`/.well-known/oauth-protected-resource`. Publicar esses documentos sem um
servidor de autorização real levaria agentes a tentar autenticar contra
endpoints inexistentes.

## O que um agente pode fazer sem autenticação

- Ler qualquer página do site (HTML) — inclusive em Markdown, enviando
  `Accept: text/markdown`.
- Ler `/llms.txt` para o resumo completo da empresa, serviços e metodologia.
- Ler `/sitemap.xml` para a lista de páginas públicas.
- Ler `/.well-known/agent-skills/index.json` para as skills publicadas.
- Ler `/.well-known/api-catalog` para os recursos legíveis por máquina.

Preferências de uso do conteúdo estão declaradas em `/robots.txt`
(`Content-Signal: search=yes, ai-input=yes, ai-train=yes`).

## Ações que exigem um humano

Solicitar o diagnóstico gratuito, contratar um projeto ou receber o resultado da
Avaliação de Maturidade DISTIPP passa por contato humano — não há API para isso:

- WhatsApp: <https://wa.me/5583993224878>
- E-mail: <admin@reengenhariaview.com.br>
- Formulário: <https://reengenhariaview.com.br/#contato>
- Avaliação de Maturidade: <https://reengenhariaview.com.br/avaliacao-maturidade>

Um agente pode preparar as informações do formulário e apresentá-las ao usuário,
mas o envio deve ser confirmado por uma pessoa.

## Se isso mudar

Quando a VIEW expuser uma API autenticada ou um servidor MCP, este arquivo será
atualizado com o `issuer`, os endpoints de autorização/token, o `jwks_uri` e um
bloco `agent_auth` com `register_uri`. Até então, considere este documento a
fonte da verdade: **acesso anônimo de leitura, sem registro.**

_Última atualização: 2026-07-29._
