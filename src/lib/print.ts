/**
 * Modos de exportación.
 *
 * `?shot=1` dibuja UN slide —el del hash— llenando el viewport, sin HUD y
 * sin animación de entrada: el estado final, listo para capturar. De ahí
 * sale el PDF (`npm run pdf`), una captura por lámina.
 *
 * No se exporta con la impresión de Chrome a propósito. Estas láminas
 * llevan grano, viñeta, mix-blend y backdrop-blur, y con eso el motor de
 * impresión rasteriza la página completa a la resolución del papel: el
 * texto sale suave. Capturando el viewport a 2x el pixel es real.
 */
export const SHOT =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("shot");
