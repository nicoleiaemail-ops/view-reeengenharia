// Pré-renderização estática das páginas públicas.
// Sobe um servidor local do build (dist/), abre cada rota num Chrome headless
// e salva o HTML já renderizado em dist/<rota>/index.html.
// Além do HTML, salva uma versão Markdown em dist/_md/<rota>.md — é o que o
// middleware devolve para agentes que pedem `Accept: text/markdown`.
// Se nenhum navegador for encontrado, apenas avisa e sai sem quebrar o build.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

// Rotas públicas (nunca inclui /admin ou /admin-login).
const ROUTES = [
  "/",
  "/sobre",
  "/solucoes",
  "/avaliacao-maturidade",
  "/casos",
  "/blog",
  "/blog/metodologia-distipp-7-dimensoes-maturidade-operacional",
  "/blog/reengenharia-de-processos-o-que-e-quando-sua-empresa-precisa",
  "/blog/automacao-de-processos-para-pmes-por-onde-comecar",
  "/blog/visibilidade-operacional-em-tempo-real",
];

// Locais mais comuns do Chrome/Chromium por sistema operacional.
const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      /* ignore */
    }
  }
  return null;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".xml": "application/xml",
};

// Executado dentro da página: o index.html carrega tags estáticas de SEO (canonical,
// description, og:*, twitter:*) apontando para a home, e o react-helmet adiciona as
// tags corretas da rota em vez de substituí-las. O HTML pré-renderizado saía então
// com dois <link rel="canonical"> divergentes. Aqui a versão estática é removida
// sempre que existe a equivalente do helmet (marcada com data-rh).
function dedupeHeadTags() {
  const keyOf = (el) =>
    el.tagName === "LINK"
      ? `link:${el.getAttribute("rel")}`
      : `meta:${el.getAttribute("name") || el.getAttribute("property")}`;

  const groups = new Map();
  for (const el of document.head.querySelectorAll("meta[name], meta[property], link[rel]")) {
    const key = keyOf(el);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  }
  let removed = 0;
  for (const els of groups.values()) {
    if (els.length < 2 || !els.some((el) => el.hasAttribute("data-rh"))) continue;
    for (const el of els) {
      if (!el.hasAttribute("data-rh")) {
        el.remove();
        removed++;
      }
    }
  }
  return removed;
}

// Executado dentro da página (contexto do navegador): converte o DOM renderizado
// em Markdown. Não tenta ser um conversor genérico de HTML — cobre o que o site
// usa (títulos, parágrafos, listas, tabelas, links, ênfase) e ignora o resto.
function domToMarkdown() {
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "IFRAME", "svg", "SVG", "CANVAS"]);
  const hidden = (el) =>
    SKIP.has(el.tagName) ||
    el.getAttribute("aria-hidden") === "true" ||
    el.hasAttribute("hidden");

  // Serializa conteúdo inline (texto + ênfase + links).
  const inline = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.replace(/\s+/g, " ");
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    if (hidden(node)) return "";
    if (node.tagName === "BR") return "\n";
    // Elementos irmãos (links, spans, botões) vêm sem espaço entre si no HTML;
    // sem separador o texto sairia grudado ("[Soluções](/solucoes)[Casos](/casos)").
    const parts = [];
    for (const child of node.childNodes) {
      const piece = inline(child);
      if (!piece) continue;
      const prev = parts[parts.length - 1];
      if (
        prev &&
        child.nodeType === Node.ELEMENT_NODE &&
        !/\s$/.test(prev) &&
        !/^\s/.test(piece)
      ) {
        parts.push(" ");
      }
      parts.push(piece);
    }
    const inner = parts.join("");
    const text = inner.trim();
    if (!text) return "";
    switch (node.tagName) {
      case "A": {
        const href = node.getAttribute("href");
        return href && !href.startsWith("#") ? `[${text}](${href})` : text;
      }
      case "STRONG":
      case "B":
        return `**${text}**`;
      case "EM":
      case "I":
        return `*${text}*`;
      case "CODE":
        return `\`${text}\``;
      default:
        return inner;
    }
  };

  const BLOCKISH = "h1,h2,h3,h4,h5,h6,p,ul,ol,table,section,article,header,footer,main,div,li,blockquote";
  const blocks = [];
  const seen = new Set(); // markup responsivo duplica o mesmo texto (desktop + mobile)
  const push = (text) => {
    const t = text.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
    if (!t) return;
    const key = t.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    blocks.push(t);
  };

  const walk = (parent) => {
    for (const node of parent.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        push(node.textContent);
        continue;
      }
      if (node.nodeType !== Node.ELEMENT_NODE || hidden(node)) continue;
      const tag = node.tagName;

      if (/^H[1-6]$/.test(tag)) {
        push(`${"#".repeat(Number(tag[1]))} ${inline(node)}`);
        continue;
      }
      if (tag === "P") {
        push(inline(node));
        continue;
      }
      if (tag === "BLOCKQUOTE") {
        push(
          inline(node)
            .split("\n")
            .map((l) => `> ${l}`)
            .join("\n")
        );
        continue;
      }
      if (tag === "UL" || tag === "OL") {
        let n = 1;
        const items = [];
        for (const li of node.children) {
          if (li.tagName !== "LI" || hidden(li)) continue;
          const t = inline(li).replace(/\n+/g, " ").trim();
          if (t) items.push(tag === "OL" ? `${n++}. ${t}` : `- ${t}`);
        }
        if (items.length) push(items.join("\n"));
        continue;
      }
      if (tag === "TABLE") {
        const rows = [];
        for (const tr of node.querySelectorAll("tr")) {
          const cells = Array.from(tr.children).map((td) => inline(td).replace(/\n+/g, " ").trim());
          if (cells.some(Boolean)) rows.push(`| ${cells.join(" | ")} |`);
        }
        if (rows.length) {
          const cols = (rows[0].match(/\|/g) || []).length - 1;
          rows.splice(1, 0, `|${" --- |".repeat(cols)}`);
          push(rows.join("\n"));
        }
        continue;
      }
      if (tag === "IMG") {
        const alt = (node.getAttribute("alt") || "").trim();
        if (alt) push(`![${alt}](${node.getAttribute("src")})`);
        continue;
      }
      // Contêiner sem blocos dentro → trata o conteúdo como um parágrafo.
      if (!node.querySelector(BLOCKISH)) {
        push(inline(node));
        continue;
      }
      walk(node);
    }
  };

  walk(document.querySelector("main") || document.getElementById("root"));

  const title = document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || "";
  const canonical =
    document.querySelector('link[rel="canonical"]')?.href ||
    new URL(location.pathname, "https://reengenhariaview.com.br").href;
  const head = [`# ${title}`, desc && `> ${desc}`, `Fonte: ${canonical}`].filter(Boolean).join("\n\n");

  // O primeiro H1 do corpo repetiria o título do documento.
  const body = blocks.join("\n\n").replace(/\n{3,}/g, "\n\n");
  return `${head}\n\n---\n\n${body}\n`;
}

// `fallbackHtml` é o index.html original do build, mantido em memória: o loop
// sobrescreve dist/index.html com a home já renderizada, e servir esse arquivo
// como fallback faria cada rota herdar o <head> da rota anterior.
function startServer(root, fallbackHtml) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let filePath = path.join(root, urlPath);
      // Diretório → index.html; arquivo inexistente → fallback SPA.
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(200, { "Content-Type": MIME[".html"] });
        res.end(fallbackHtml);
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function run() {
  const executablePath = findChrome();
  if (!executablePath) {
    console.warn(
      "[prerender] Nenhum navegador Chrome/Chromium encontrado — pulando a pré-renderização (o site continua funcionando como SPA)."
    );
    return;
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer-core")).default;
  } catch {
    console.warn("[prerender] puppeteer-core não instalado — pulando a pré-renderização.");
    return;
  }

  const pristineIndex = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");
  const server = await startServer(DIST, pristineIndex);
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(base + route, { waitUntil: "networkidle0", timeout: 30000 });
      // Garante que o app montou e o helmet aplicou o <title>.
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return root && root.children.length > 0 && document.title.length > 0;
        },
        { timeout: 15000 }
      );
      const deduped = await page.evaluate(dedupeHeadTags);
      const html = await page.content();

      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

      // Espelho Markdown para negociação de conteúdo (Accept: text/markdown).
      const markdown = await page.evaluate(domToMarkdown);
      const mdFile = path.join(DIST, "_md", route === "/" ? "index.md" : `${route.slice(1)}.md`);
      fs.mkdirSync(path.dirname(mdFile), { recursive: true });
      fs.writeFileSync(mdFile, markdown, "utf-8");

      console.log(
        `[prerender] ✓ ${route} → ${path.relative(DIST, path.join(outDir, "index.html"))} + ${path.relative(DIST, mdFile)}` +
          (deduped ? ` (${deduped} tag(s) de SEO duplicada(s) removida(s))` : "")
      );
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`[prerender] Concluído: ${ROUTES.length} páginas pré-renderizadas.`);
}

run().catch((err) => {
  console.error("[prerender] Erro durante a pré-renderização:", err);
  // Não derruba o build — o SPA continua servindo normalmente.
  process.exit(0);
});
