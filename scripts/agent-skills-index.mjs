// Gera public/.well-known/agent-skills/index.json a partir das skills reais.
// Lê cada public/.well-known/agent-skills/<nome>/SKILL.md, extrai name/description
// do front-matter e calcula o digest sha256 do arquivo. Roda antes do build para
// que o digest nunca fique defasado em relação ao conteúdo publicado.
// Formato: Agent Skills Discovery RFC v0.2.0.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(__dirname, "..", "public", ".well-known", "agent-skills");
const SITE = "https://reengenhariaview.com.br";
const SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

// Extrai um campo escalar do front-matter YAML (suporta valor em linhas contínuas).
function frontMatterField(src, field) {
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const lines = fm[1].split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith(`${field}:`));
  if (start === -1) return null;
  let value = lines[start].slice(field.length + 1).trim();
  for (let i = start + 1; i < lines.length; i++) {
    if (/^[A-Za-z_][\w-]*:/.test(lines[i])) break;
    value += ` ${lines[i].trim()}`;
  }
  return value.replace(/^["']|["']$/g, "").trim();
}

const skills = fs
  .readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => path.join(SKILLS_DIR, e.name, "SKILL.md"))
  .filter((f) => fs.existsSync(f))
  .sort()
  .map((file) => {
    const raw = fs.readFileSync(file);
    const src = raw.toString("utf-8");
    const dir = path.basename(path.dirname(file));
    const name = frontMatterField(src, "name") || dir;
    const description = frontMatterField(src, "description");
    if (!description) {
      throw new Error(`[agent-skills] SKILL.md sem "description" no front-matter: ${file}`);
    }
    return {
      name,
      type: "skill-md",
      description,
      url: `${SITE}/.well-known/agent-skills/${dir}/SKILL.md`,
      digest: `sha256:${crypto.createHash("sha256").update(raw).digest("hex")}`,
    };
  });

if (skills.length === 0) {
  throw new Error("[agent-skills] Nenhuma SKILL.md encontrada em public/.well-known/agent-skills/");
}

const out = path.join(SKILLS_DIR, "index.json");
fs.writeFileSync(out, `${JSON.stringify({ $schema: SCHEMA, skills }, null, 2)}\n`, "utf-8");
console.log(`[agent-skills] ✓ index.json com ${skills.length} skill(s):`);
for (const s of skills) console.log(`  · ${s.name} ${s.digest.slice(0, 18)}…`);
