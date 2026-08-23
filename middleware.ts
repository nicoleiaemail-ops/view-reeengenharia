// Negociação de conteúdo para agentes (Markdown for Agents).
//
// Requisição normal de navegador → HTML, exatamente como antes.
// Requisição com `Accept: text/markdown` → devolve o espelho Markdown gerado no
// build (dist/_md/<rota>.md pelo scripts/prerender.mjs), com Content-Type
// text/markdown e uma estimativa de tokens em x-markdown-tokens.
//
// Qualquer falha (rota sem espelho, build sem pré-renderização, erro de rede)
// cai de volta no HTML — o site nunca quebra por causa disto.

import { next } from "@vercel/edge";

export const config = {
  // Só as rotas públicas em HTML. Assets, /_md, /.well-known e /admin ficam fora.
  matcher: ["/", "/sobre", "/solucoes", "/avaliacao-maturidade", "/casos", "/blog", "/blog/:slug"],
};

const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</llms.txt>; rel="service-doc"; type="text/markdown"; title="Contexto da VIEW para LLMs"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"; title="Agent Skills"',
].join(", ");

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Aceita text/markdown desde que não esteja explicitamente recusado (q=0).
  return /(^|,)\s*text\/markdown\s*(;[^,]*)?/i.test(accept) && !/text\/markdown\s*;[^,]*q=0(\.0+)?(\s|,|$)/i.test(accept);
}

export default async function middleware(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  const url = new URL(request.url);
  if (!wantsMarkdown(request.headers.get("accept"))) {
    // HTML: sinaliza aos caches que a resposta varia conforme o Accept.
    return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
  }

  const mdPath = url.pathname === "/" ? "/_md/index.md" : `/_md${url.pathname.replace(/\/$/, "")}.md`;

  try {
    const res = await fetch(new URL(mdPath, url.origin), {
      headers: { "user-agent": request.headers.get("user-agent") ?? "middleware" },
    });
    if (!res.ok) return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });

    const body = await res.text();
    // O rewrite de SPA devolve index.html com status 200 para arquivos ausentes:
    // sem esta verificação, uma rota sem espelho serviria HTML rotulado de Markdown.
    if (!body.trim() || /^\s*<(!doctype|html)/i.test(body)) {
      return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
    }
    return new Response(request.method === "HEAD" ? null : body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Language": "pt-BR",
        // Estimativa (~4 caracteres por token) — não há tokenizador no edge.
        "x-markdown-tokens": String(Math.ceil(body.length / 4)),
        Vary: "Accept",
        Link: LINK_HEADER,
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
  }
}
