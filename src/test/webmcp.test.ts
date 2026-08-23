import { beforeAll, describe, expect, it } from "vitest";
import { articles } from "@/content/blog";
import { registerWebMcpTools } from "@/lib/webmcp";

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => { content: Array<{ type: string; text: string }> };
};

// O módulo registra as ferramentas uma única vez (guarda interna), então a captura
// também acontece uma vez e é compartilhada pelos testes.
let tools: Tool[] = [];

beforeAll(() => {
  const captured: Tool[] = [];
  Object.defineProperty(navigator, "modelContext", {
    configurable: true,
    value: {
      provideContext: ({ tools: t }: { tools: Tool[] }) => captured.push(...t),
    },
  });
  registerWebMcpTools();
  tools = captured;
});

const tool = (name: string): Tool => {
  const found = tools.find((t) => t.name === name);
  if (!found) throw new Error(`ferramenta ausente: ${name}`);
  return found;
};

describe("ferramentas WebMCP", () => {
  it("não quebra quando o navegador não implementa a API", () => {
    Reflect.deleteProperty(navigator as object, "modelContext");
    expect(() => registerWebMcpTools()).not.toThrow();
  });

  it("registra as ferramentas com nome, descrição e schema válidos", () => {
    expect(tools.length).toBeGreaterThanOrEqual(6);
    for (const tool of tools) {
      expect(tool.name).toMatch(/^view_[a-z_]+$/);
      expect(tool.description.length).toBeGreaterThan(40);
      expect(tool.inputSchema).toMatchObject({ type: "object" });
      expect(typeof tool.execute).toBe("function");
    }
    expect(new Set(tools.map((t) => t.name)).size).toBe(tools.length);
  });

  it("retorna texto não vazio nas ferramentas sem argumentos", () => {
    for (const t of tools) {
      if (Object.keys(t.inputSchema.properties as object).length > 0) continue;
      const result = t.execute({});
      expect(result.content[0].type).toBe("text");
      expect(result.content[0].text.length).toBeGreaterThan(80);
    }
  });

  it("lê um artigo real do blog pelo slug", () => {
    const slug = articles[0].slug;
    const text = tool("view_ler_artigo").execute({ slug }).content[0].text;
    expect(text).toContain(articles[0].title);
    expect(text).toContain(`/blog/${slug}`);
    expect(text.length).toBeGreaterThan(500);
  });

  it("responde com os slugs disponíveis quando o artigo não existe", () => {
    const text = tool("view_ler_artigo").execute({ slug: "nao-existe" }).content[0].text;
    expect(text).toContain("não encontrado");
    expect(text).toContain(articles[0].slug);
  });

  it("lista todos os artigos publicados", () => {
    const text = tool("view_listar_artigos").execute({}).content[0].text;
    for (const a of articles) expect(text).toContain(a.slug);
  });

  it("não expõe nenhuma ferramenta que envie dados", () => {
    const proibido = /enviar|submit|criar_lead|cadastrar/i;
    for (const t of tools) expect(t.name).not.toMatch(proibido);
  });
});
