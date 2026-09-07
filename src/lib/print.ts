/**
 * Modo impresión: `?print=1` en la URL.
 *
 * En vez de un slide a la vez sobre el viewport, dibuja los diez uno tras
 * otro a tamaño fijo, cada uno en su propia página. De ahí sale el PDF,
 * con Cmd+P → Guardar como PDF o con `npm run pdf`.
 */
export const PRINT =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("print");

/**
 * Página de 13.333 × 7.5 pulgadas: el 16:9 estándar de una presentación,
 * el mismo que usa PowerPoint. A 96 dpi son 1280 × 720 px.
 */
export const PAGE = { width: 1280, height: 720 } as const;
