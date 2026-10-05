import { afterEach, describe, expect, it, vi } from "vitest";
import middleware, { __BLOG_SLUGS_FOR_TESTS } from "../../middleware";
import { articles, publishedArticles } from "../content/blog";

const SLUG = articles[0].slug;

const MD = "# VIEW\n\nConteúdo em markdown.\n";
const HTML = '<!doctype html><html lang="pt-BR"><head></head><body></body></html>';

/** Simula o Vercel: /_md/<rota>.md existe; o resto cai no rewrite de SPA (index.html, 200). */
function mockOrigin(available: string[]) {
  const fetchMock = vi.fn(async (input: URL | RequestInfo) => {
    const path = new URL(String(input)).pathname;
    return available.includes(path)
      ? new Response(MD, { status: 200, headers: { "content-type": "text/markdown" } })
      : new Response(HTML, { status: 200, headers: { "content-type": "text/html" } });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const get = (path: string, accept: string, method = "GET") =>
  middleware(new Request(`https://reengenhariaview.com.br${path}`, { method, headers: { accept } }));

/** next() do @vercel/edge marca a resposta para o Vercel continuar servindo o HTML. */
const isPassThrough = (res: Response) => res.headers.get("x-middleware-next") === "1";

afterEach(() => vi.unstubAllGlobals());

describe("negociação de conteúdo para agentes", () => {
  it("serve HTML para navegador, com Vary e Link", async () => {
    mockOrigin(["/_md/index.md"]);
    const res = await get("/", "text/html,application/xhtml+xml,*/*;q=0.8");
    expect(isPassThrough(res)).toBe(true);
    expect(res.headers.get("Vary")).toBe("Accept");
    expect(res.headers.get("Link")).toContain('rel="api-catalog"');
  });

  it("serve markdown quando o agente pede text/markdown", async () => {
    mockOrigin(["/_md/index.md"]);
    const res = await get("/", "text/markdown");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("Vary")).toBe("Accept");
    expect(Number(res.headers.get("x-markdown-tokens"))).toBeGreaterThan(0);
    expect(await res.text()).toBe(MD);
  });

  it("mapeia rotas aninhadas para /_md/<rota>.md", async () => {
    const fetchMock = mockOrigin([`/_md/blog/${SLUG}.md`]);
    const res = await get(`/blog/${SLUG}`, "text/markdown, text/html;q=0.9");
    expect(await res.text()).toBe(MD);
    expect(String(fetchMock.mock.calls[0][0])).toContain(`/_md/blog/${SLUG}.md`);
  });

  it("cai no HTML quando a rota não tem espelho markdown (rewrite de SPA devolve 200)", async () => {
    mockOrigin([]);
    const res = await get("/casos", "text/markdown");
    expect(isPassThrough(res)).toBe(true);
    expect(res.headers.get("Content-Type")).not.toBe("text/markdown; charset=utf-8");
  });

  it("respeita text/markdown;q=0 e serve HTML", async () => {
    mockOrigin(["/_md/index.md"]);
    const res = await get("/", "text/html, text/markdown;q=0");
    expect(isPassThrough(res)).toBe(true);
  });

  it("cai no HTML se a origem falhar", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );
    const res = await get("/", "text/markdown");
    expect(isPassThrough(res)).toBe(true);
  });

  it("responde HEAD sem corpo, mantendo os cabeçalhos", async () => {
    mockOrigin(["/_md/index.md"]);
    const res = await get("/", "text/markdown", "HEAD");
    expect(res.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toBe("");
  });

  it("não intercepta POST", async () => {
    mockOrigin(["/_md/index.md"]);
    const res = await get("/", "text/markdown", "POST");
    expect(isPassThrough(res)).toBe(true);
  });
});

describe("404 real em vez de soft 404", () => {
  const HTML_ACCEPT = "text/html,application/xhtml+xml,*/*;q=0.8";

  // O middleware não pode importar src/content/blog (o bundler do Vercel não
  // resolve o import e o emite literal, quebrando em runtime), então a lista de
  // slugs é duplicada lá. Este teste é o que impede as duas divergirem: sem ele,
  // publicar um artigo novo faria a rota dele responder 404.
  //
  // Comparado contra publishedArticles(), não contra articles: um rascunho
  // (draft: true) fica de propósito fora de BLOG_SLUGS, para a rota responder
  // 404 real e não ser indexada enquanto não for aprovado — mesmo continuando
  // acessível por link direto, já que a SPA ainda renderiza o artigo.
  it("a lista de slugs do middleware está sincronizada com os artigos publicados do blog", () => {
    expect([...__BLOG_SLUGS_FOR_TESTS].sort()).toEqual(publishedArticles().map((a) => a.slug).sort());
  });

  it("responde 404 e noindex para rota inexistente", async () => {
    mockOrigin([]);
    const res = await get("/pagina-que-nao-existe", HTML_ACCEPT);
    expect(res.status).toBe(404);
    expect(res.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(await res.text()).toBe(HTML);
  });

  it("responde 404 para slug de blog inexistente", async () => {
    mockOrigin([]);
    const res = await get("/blog/artigo-que-nunca-existiu", HTML_ACCEPT);
    expect(res.status).toBe(404);
  });

  it("mantém 200 nas rotas conhecidas, com e sem barra final", async () => {
    mockOrigin([]);
    for (const path of ["/", "/casos", "/casos/", "/blog", `/blog/${SLUG}`]) {
      const res = await get(path, HTML_ACCEPT);
      expect(isPassThrough(res), `esperava pass-through em ${path}`).toBe(true);
    }
  });

  it("não transforma arquivo estático de public/ em 404", async () => {
    mockOrigin([]);
    for (const path of ["/llms.txt", "/favicon.ico", "/og-image.png"]) {
      const res = await get(path, HTML_ACCEPT);
      expect(isPassThrough(res), `esperava pass-through em ${path}`).toBe(true);
    }
  });

  it("deixa /admin passar sem Link headers", async () => {
    mockOrigin([]);
    const res = await get("/admin", HTML_ACCEPT);
    expect(isPassThrough(res)).toBe(true);
    expect(res.headers.get("Link")).toBeNull();
  });

  it("responde HEAD 404 sem corpo", async () => {
    mockOrigin([]);
    const res = await get("/nao-existe", HTML_ACCEPT, "HEAD");
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("");
  });

  it("ainda responde 404 se a origem falhar ao buscar o index.html", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );
    const res = await get("/nao-existe", HTML_ACCEPT);
    expect(res.status).toBe(404);
  });
});
