/* ── precarga de video ────────────────────────────────────────────
 * Bajar el archivo con `fetch` y reproducirlo desde un blob en memoria,
 * en vez de dejarle la descarga al `<video>`.
 *
 * Por qué: el deck se sirve en Cloudflare Pages, y Pages **no responde a
 * peticiones `Range`** —devuelve 200 con el archivo entero en vez de 206—
 * y marca el asset como `max-age=0, must-revalidate`. Con eso el elemento
 * de video no puede pedir el principio del archivo y arrancar: negocia,
 * revalida, y vuelve a empezar la descarga que la precarga ya había hecho.
 * Medido contra producción: los 23 MB bajan en menos de un segundo, y aun
 * así el `<video>` seguía en `readyState 0` cinco segundos después de
 * entrar al slide.
 *
 * Un blob no tiene nada de eso que negociar: cuando la lámina entra, el
 * archivo ya está en memoria y `play()` arranca en el primer cuadro.
 * ─────────────────────────────────────────────────────────────── */

const loads = new Map<string, Promise<string>>();

/**
 * Empieza (o reusa) la descarga de `src` y resuelve con una URL de blob
 * lista para `<video src>`. Llamarla varias veces con la misma ruta baja
 * el archivo una sola vez.
 */
export function preloadVideo(src: string): Promise<string> {
  const started = loads.get(src);
  if (started) return started;

  const load = fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${src}: HTTP ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => URL.createObjectURL(blob));

  /* Si falló —sala sin red, deploy a medias— se saca del mapa para que el
   * siguiente intento vuelva a probar en vez de heredar el rechazo. El
   * slide tiene su propia salida: reproduce desde la URL de red. */
  load.catch(() => loads.delete(src));

  loads.set(src, load);
  return load;
}

export default preloadVideo;
