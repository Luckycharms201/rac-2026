#!/usr/bin/env node
/**
 * Exporta el deck a PDF, una lámina por página.
 *
 *     npm run pdf                      # -> Regreso-a-Casa-2026.pdf
 *     npm run pdf -- --salida x.pdf
 *
 * Levanta `vite preview` sobre el build, abre `?print=1` en un Chrome sin
 * ventana y le pide imprimir. No usa Puppeteer: Chrome ya trae
 * `--print-to-pdf` y es una dependencia menos que instalar.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const CHROMES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
];

const PUERTO = 4319;
/* Tiempo virtual antes de imprimir: los diez slides se montan a la vez y
 * cada uno corre su cascada de entrada. Con menos, el PDF sale a medias. */
const PRESUPUESTO_MS = 25_000;

const args = process.argv.slice(2);
const salida = resolve(
  args[args.indexOf("--salida") + 1] && args.includes("--salida")
    ? args[args.indexOf("--salida") + 1]
    : "Regreso-a-Casa-2026.pdf",
);

const chrome = CHROMES.find((ruta) => existsSync(ruta));
if (!chrome) {
  console.error("No encontré Chrome. Rutas probadas:\n  " + CHROMES.join("\n  "));
  process.exit(1);
}

if (!existsSync("dist/index.html")) {
  console.log("· Falta dist/, construyendo…");
  const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

console.log("· Sirviendo dist/ …");
const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PUERTO), "--strictPort"],
  { stdio: ["ignore", "pipe", "inherit"] },
);

const cerrar = () => { try { server.kill(); } catch {} };
process.on("exit", cerrar);
process.on("SIGINT", () => { cerrar(); process.exit(130); });

const url = `http://localhost:${PUERTO}/?print=1`;
await esperar(url, 20_000);

console.log(`· Imprimiendo ${url} …`);
const perfil = `/tmp/rac-pdf-${process.pid}`;
const print = spawnSync(chrome, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  `--user-data-dir=${perfil}`,
  "--no-pdf-header-footer",
  "--run-all-compositor-stages-before-draw",
  `--virtual-time-budget=${PRESUPUESTO_MS}`,
  `--print-to-pdf=${salida}`,
  url,
], { stdio: "inherit" });

cerrar();
rmSync(perfil, { recursive: true, force: true });

if (print.status !== 0 || !existsSync(salida)) {
  console.error("✗ Chrome no generó el PDF.");
  process.exit(1);
}
console.log(`✓ ${salida}`);

/** Espera a que el servidor responda, o se rinde. */
async function esperar(url, limite) {
  const hasta = Date.now() + limite;
  while (Date.now() < hasta) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  cerrar();
  console.error("✗ El servidor no respondió a tiempo.");
  process.exit(1);
}
