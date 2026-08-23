# Descoberta por agentes de IA (agent readiness)

Este documento descreve o que o site publica para agentes de IA, como verificar
cada item e o que ficou **deliberadamente de fora** — com o motivo.

Base do site: `https://reengenhariaview.com.br`

## Implementado

| Item | Onde | Arquivo |
| --- | --- | --- |
| Cabeçalhos `Link` (RFC 8288) | páginas HTML públicas | [vercel.json](../vercel.json) + [middleware.ts](../middleware.ts) |
| Content Signals | `/robots.txt` | [public/robots.txt](../public/robots.txt) |
| API Catalog (RFC 9727) | `/.well-known/api-catalog` | [public/.well-known/api-catalog](../public/.well-known/api-catalog) |
| Agent Skills (RFC v0.2.0) | `/.well-known/agent-skills/index.json` | gerado por [scripts/agent-skills-index.mjs](../scripts/agent-skills-index.mjs) |
| Auth.md | `/auth.md` | [public/auth.md](../public/auth.md) |
| Markdown for Agents | `Accept: text/markdown` em qualquer página pública | [middleware.ts](../middleware.ts) + [scripts/prerender.mjs](../scripts/prerender.mjs) |
| WebMCP | ferramentas no carregamento da página | [src/lib/webmcp.ts](../src/lib/webmcp.ts) |

### Cabeçalhos Link

Quatro relações registradas na IANA, em todas as páginas públicas:
`api-catalog`, `service-doc`, `describedby` e `service-desc`. Estão declaradas
duas vezes de propósito — em `vercel.json` (estático, sempre presente) e no
middleware (para a resposta em Markdown, que é construída pelo edge).

### Markdown for Agents

O `scripts/prerender.mjs` gera, junto do HTML pré-renderizado, um espelho em
Markdown de cada rota em `dist/_md/<rota>.md`. O `middleware.ts` intercepta as
rotas públicas e, quando o `Accept` inclui `text/markdown`, devolve esse arquivo
com `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` e
`x-markdown-tokens` (estimativa de ~4 caracteres por token — não há tokenizador
no runtime edge).

Navegador continua recebendo HTML. Qualquer falha (rota sem espelho, erro de
rede) cai de volta no HTML: o site nunca quebra por causa da negociação.
Atenção ao detalhe que os testes cobrem: o rewrite de SPA devolve `index.html`
com status **200** para arquivos ausentes, então o middleware precisa checar o
corpo, não só o status.

### Agent Skills

As skills são conteúdo próprio da VIEW, em `public/.well-known/agent-skills/<nome>/SKILL.md`.
O `index.json` é **gerado no build** (`npm run build:prerender`) para que o
`digest` sha256 nunca fique defasado. Para publicar uma nova skill, basta criar
a pasta com um `SKILL.md` com `name` e `description` no front-matter.

### WebMCP

Somente ferramentas de leitura e de navegação (`view_visao_geral`,
`view_listar_solucoes`, `view_metodologia_distipp`, `view_listar_artigos`,
`view_ler_artigo`, `view_contato`, `view_abrir_pagina`). Nenhuma ferramenta
envia formulário, cria lead ou dispara mensagem — pedido de diagnóstico continua
sendo ação humana. Os dados de artigos vêm de `src/content/blog.ts`; se as áreas
de solução mudarem em `src/components/Servicos.tsx`, atualize também
`src/lib/webmcp.ts`.

## Não implementado — e por quê

Estes itens aparecem em auditorias de "agent readiness", mas exigiriam declarar
infraestrutura que não existe. Publicar metadados falsos é pior que não publicar:
o agente tenta autenticar ou conectar contra endpoints mortos.

| Item | Motivo |
| --- | --- |
| `/.well-known/openid-configuration` | não existe Authorization Server OIDC |
| `/.well-known/oauth-authorization-server` | não existe OAuth 2.0 (`issuer`, `token_endpoint`, `jwks_uri`) |
| `/.well-known/oauth-protected-resource` | não existe recurso protegido — todo o conteúdo é público |
| `/.well-known/mcp/server-card.json` (SEP-1649) | não existe servidor MCP remoto nem endpoint de transporte |

`/auth.md` documenta explicitamente essa situação, para que o agente saiba que a
ausência é intencional e que o acesso é anônimo de leitura.

Quando houver API autenticada ou servidor MCP, implemente na ordem:
`oauth-protected-resource` → `oauth-authorization-server` → `server-card.json` →
atualizar `/auth.md` e `/.well-known/api-catalog`.

## Pendente: DNS-AID (exige acesso ao DNS)

DNS for AI Discovery ([draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/),
[RFC 9460](https://www.rfc-editor.org/rfc/rfc9460)) não pode ser configurado
neste repositório — depende do painel de DNS do domínio.

Registro mínimo de entrypoint, apontando para o próprio site:

```dns
_index._agents.reengenhariaview.com.br. 3600 IN HTTPS 1 reengenhariaview.com.br. (
    alpn="h2,h3" port=443 )
```

Passos:

1. No provedor de DNS de `reengenhariaview.com.br`, criar o registro HTTPS
   (SVCB ServiceMode) acima. Se o provedor não suportar tipo `HTTPS`/`SVCB`
   (a Vercel não gerencia esses tipos hoje), o registro precisa ficar num
   provedor que suporte — Cloudflare DNS, por exemplo.
2. Habilitar **DNSSEC** na zona, para que resolvers validantes devolvam dado
   autenticado. Isso é requisito do draft, não opcional.
3. Só adicionar `_a2a._agents` ou `_mcp._agents` **quando** existir de fato um
   endpoint A2A/MCP servindo naquele host.
4. Verificar: `dig +dnssec _index._agents.reengenhariaview.com.br HTTPS`.

## Como verificar em produção

```bash
BASE=https://reengenhariaview.com.br

# Link headers na home
curl -sI $BASE/ | grep -i '^link'

# Markdown para agentes (deve devolver text/markdown + x-markdown-tokens)
curl -sI $BASE/ -H 'Accept: text/markdown' | grep -iE 'content-type|x-markdown-tokens|vary'
# ...e HTML para navegador
curl -sI $BASE/ -H 'Accept: text/html' | grep -i content-type

# API catalog (application/linkset+json)
curl -si $BASE/.well-known/api-catalog | head -20

# Agent skills + conferência do digest
curl -s $BASE/.well-known/agent-skills/index.json | jq .
curl -s $BASE/.well-known/agent-skills/diagnostico-maturidade-distipp/SKILL.md | shasum -a 256

# Content Signals
curl -s $BASE/robots.txt | grep -i content-signal

# auth.md (text/markdown, não HTML)
curl -sI $BASE/auth.md | grep -i content-type
```

Auditoria completa: <https://isitagentready.com>.

## Deploy

O middleware e o espelho Markdown só existem no build. Deploy sempre com build
local + `--prebuilt`:

```bash
vercel build && vercel deploy --prebuilt --prod
```

Um `vercel deploy` direto refaz o build no servidor; confirme nos logs que
`[prerender]` rodou — sem Chrome disponível, a pré-renderização é pulada e as
rotas ficam sem espelho Markdown (o site continua funcionando, a negociação
apenas devolve HTML).
