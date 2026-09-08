#!/usr/bin/env node
/**
 * Exporta el deck a PDF: una lámina por página, más un PDF por lámina.
 *
 *     npm run pdf
 *
 * Captura cada slide en un viewport real de 1920×1080 a 2x y arma los PDFs
 * con las imágenes. NO usa la impresión de Chrome: estas láminas llevan
 * grano, viñeta, mix-blend y backdrop-blur, y con eso el motor de
 * impresión rasteriza la página entera a la resolución del papel y el
 * texto sale suave.
 *
 * El disparo va por CDP y no por `--screenshot`: un solo Chrome para las
 * diez láminas, y —lo que importa— el obturador espera a que la lámina
 * esté *terminada* (fuentes cargadas, imágenes decodificadas, animaciones
 * finitas cerradas, dos frames quietos) en vez de confiar en un
 * presupuesto de tiempo virtual. Con `?shot=1` la lámina además nace en su
 * estado final: framer no anima la entrada y no hay HUD encima.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const CHROMES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
];

const PUERTO = 4319;
const DEPURACION = 9333;
const ANCHO = 1920;
const ALTO = 1080;
/** 2x: el PDF sale a 288 dpi sobre una página de 13.333 × 7.5 pulgadas. */
const ESCALA = 2;
const TOTAL = 10;
/** Colchón tras el "ya está todo" del navegador, por si algo respira tarde. */
const REPOSO_MS = 900;
const SALIDA = resolve("Regreso-a-Casa-2026.pdf");
const SALIDA_SUELTAS = resolve("PDF");
const TMP = resolve(".pdf-frames");

const chrome = CHROMES.find(existsSync);
if (!chrome) {
  console.error("No encontré Chrome:\n  " + CHROMES.join("\n  "));
  process.exit(1);
}

/* Reconstruye sólo si hace falta: el build tarda minutos y el 90 % de las
 * corridas es re-capturar el mismo dist. `--build` lo fuerza. */
if (process.argv.includes("--build") || desactualizado()) {
  const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PUERTO), "--strictPort"],
  { stdio: ["ignore", "ignore", "inherit"] },
);

let navegador = null;
const cerrar = () => {
  try { navegador?.kill(); } catch {}
  try { server.kill(); } catch {}
};
process.on("exit", cerrar);
process.on("SIGINT", () => { cerrar(); process.exit(130); });

await esperarHttp(`http://localhost:${PUERTO}/`, 20_000);

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

navegador = spawn(chrome, [
  "--headless=new",
  "--hide-scrollbars",
  "--mute-audio",
  "--no-first-run",
  "--no-default-browser-check",
  /* Congela el corredor de la portada —un loop infinito— en un cuadro
   * estable, y deja a framer en sus variantes sin movimiento. */
  "--force-prefers-reduced-motion",
  "--disable-lcd-text",
  `--remote-debugging-port=${DEPURACION}`,
  `--user-data-dir=${TMP}/perfil`,
  `--window-size=${ANCHO},${ALTO}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "ignore"] });

const version = await esperarJson(
  `http://localhost:${DEPURACION}/json/version`,
  20_000,
);
const cdp = await conectar(version.webSocketDebuggerUrl);

const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await cdp.send("Target.attachToTarget", {
  targetId,
  flatten: true,
});
const pagina = cdp.sesion(sessionId);

await pagina.send("Page.enable");
await pagina.send("Runtime.enable");
await pagina.send("Emulation.setDeviceMetricsOverride", {
  width: ANCHO,
  height: ALTO,
  deviceScaleFactor: ESCALA,
  mobile: false,
});

for (let n = 1; n <= TOTAL; n++) {
  process.stdout.write(`· lámina ${n}/${TOTAL}\r`);
  const cargada = pagina.esperar("Page.loadEventFired", 30_000);
  /* El `i` repite el número de lámina en el query: sin él, ir de `#1` a
   * `#2` es un cambio de hash —misma página, sin recarga y sin
   * `load`— y la captura saldría del slide anterior. */
  await pagina.send("Page.navigate", {
    url: `http://localhost:${PUERTO}/?shot=1&i=${n}#${n}`,
  });
  await cargada;
  await lista(pagina);
  const { data } = await pagina.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    optimizeForSpeed: false,
  });
  const ruta = `${TMP}/slide-${String(n).padStart(2, "0")}.png`;
  writeFileSync(ruta, Buffer.from(data, "base64"));
}
console.log(`· ${TOTAL} láminas capturadas          `);
cerrar();

const armar = spawnSync(
  "python3",
  [resolve("scripts/armar-pdf.py"), TMP, SALIDA, SALIDA_SUELTAS],
  { stdio: "inherit" },
);
if (armar.status !== 0) process.exit(armar.status ?? 1);
rmSync(TMP, { recursive: true, force: true });

/* ── espera a que la lámina esté terminada ──────────────────────────
 * Fuentes, imágenes decodificadas, videos con su primer cuadro, y las
 * animaciones que sí acaban (las infinitas —el corredor— nunca prometen
 * nada, así que se ignoran). Después, dos frames seguidos quietos. */
async function lista(pagina) {
  const guion = `(async () => {
    const cuadro = () => new Promise((r) => requestAnimationFrame(() => r()));
    await cuadro();
    try { await document.fonts.ready; } catch {}
    await Promise.all([...document.images].map((img) =>
      img.complete
        ? (img.decode ? img.decode().catch(() => {}) : null)
        : new Promise((r) => { img.onload = img.onerror = () => r(); })));
    await Promise.all([...document.querySelectorAll("video")].map((v) =>
      v.readyState >= 2
        ? null
        : new Promise((r) => {
            const t = setTimeout(r, 4000);
            v.onloadeddata = () => { clearTimeout(t); r(); };
            v.onerror = () => { clearTimeout(t); r(); };
          })));
    const finitas = document.getAnimations().filter((a) => {
      const it = a.effect && a.effect.getComputedTiming
        ? a.effect.getComputedTiming().iterations
        : 1;
      return it !== Infinity;
    });
    await Promise.race([
      Promise.all(finitas.map((a) => a.finished.catch(() => {}))),
      new Promise((r) => setTimeout(r, 5000)),
    ]);
    await new Promise((r) => setTimeout(r, ${REPOSO_MS}));
    await cuadro();
    await cuadro();
    return true;
  })()`;
  await pagina.send("Runtime.evaluate", {
    expression: guion,
    awaitPromise: true,
    returnByValue: true,
  });
}

/* ── plomería CDP ──────────────────────────────────────────────── */

async function conectar(url) {
  const ws = new WebSocket(url);
  await new Promise((ok, mal) => {
    ws.addEventListener("open", ok, { once: true });
    ws.addEventListener("error", mal, { once: true });
  });

  let id = 0;
  const pendientes = new Map();
  const oyentes = new Set();

  ws.addEventListener("message", (evento) => {
    const msg = JSON.parse(evento.data);
    if (msg.id !== undefined) {
      const p = pendientes.get(msg.id);
      if (!p) return;
      pendientes.delete(msg.id);
      msg.error ? p.mal(new Error(msg.error.message)) : p.ok(msg.result);
    } else {
      for (const oyente of [...oyentes]) oyente(msg);
    }
  });

  const enviar = (method, params, sessionId) =>
    new Promise((ok, mal) => {
      const propio = ++id;
      pendientes.set(propio, { ok, mal });
      ws.send(JSON.stringify({ id: propio, method, params, sessionId }));
    });

  const esperarEvento = (method, sessionId, limite) =>
    new Promise((ok, mal) => {
      const reloj = setTimeout(() => {
        oyentes.delete(oyente);
        mal(new Error(`sin ${method} en ${limite} ms`));
      }, limite);
      const oyente = (msg) => {
        if (msg.method !== method) return;
        if (sessionId && msg.sessionId !== sessionId) return;
        clearTimeout(reloj);
        oyentes.delete(oyente);
        ok(msg.params);
      };
      oyentes.add(oyente);
    });

  return {
    send: (method, params) => enviar(method, params, undefined),
    sesion: (sessionId) => ({
      send: (method, params) => enviar(method, params, sessionId),
      esperar: (method, limite) => esperarEvento(method, sessionId, limite),
    }),
  };
}

/** ¿Hay algo en `src/` (o el index) más nuevo que el `dist` construido? */
function desactualizado() {
  if (!existsSync("dist/index.html")) return true;
  const hecho = statSync("dist/index.html").mtimeMs;
  const mirar = (dir) =>
    readdirSync(dir, { withFileTypes: true }).some((e) => {
      const ruta = `${dir}/${e.name}`;
      return e.isDirectory() ? mirar(ruta) : statSync(ruta).mtimeMs > hecho;
    });
  return mirar("src") || statSync("index.html").mtimeMs > hecho;
}

async function esperarHttp(url, limite) {
  const hasta = Date.now() + limite;
  while (Date.now() < hasta) {
    try { if ((await fetch(url, { signal: AbortSignal.timeout(1500) })).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  cerrar();
  console.error(`✗ no respondió ${url}`);
  process.exit(1);
}

async function esperarJson(url, limite) {
  const hasta = Date.now() + limite;
  while (Date.now() < hasta) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (r.ok) return await r.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  cerrar();
  console.error(`✗ no respondió ${url}`);
  process.exit(1);
}
