// Pré-renderização estática das páginas públicas.
// Sobe um servidor local do build (dist/), abre cada rota num Chrome headless
// e salva o HTML já renderizado em dist/<rota>/index.html.
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
  ".xml": "application/xml",
};

function startServer(root) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      let filePath = path.join(root, urlPath);
      // Diretório → index.html; arquivo inexistente → fallback SPA (index.html raiz).
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(root, "index.html");
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

  const server = await startServer(DIST);
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
      const html = await page.content();

      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
      console.log(`[prerender] ✓ ${route} → ${path.relative(DIST, path.join(outDir, "index.html"))}`);
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
