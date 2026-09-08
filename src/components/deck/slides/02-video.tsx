import * as React from "react";
import { SlideShell } from "@/components/deck/SlideShell";
import { preloadVideo } from "@/lib/video-preload";
import { SHOT } from "@/lib/print";

/** El master de 96 MB vive en la raíz del repo; esto es la copia servida. */
export const VIDEO_SRC = "/video/rac-2026.mp4";
/** Primer cuadro del video: tapa el hueco si la descarga no acabó. */
const POSTER_SRC = "/video/rac-2026-poster.webp";

/**
 * Slide 2 — Video.
 *
 * El video a sangre y nada más: sin haz, sin viñeta y sin grano. Las otras
 * láminas usan esas tres capas para amarrar fotos y vectores en una sola
 * textura, pero aquí no hay nada que amarrar — encima de imagen en
 * movimiento el grano se lee como ruido de compresión y la viñeta como un
 * defecto del proyector.
 *
 * El escenario es 16:9 y el video también, así que `object-cover` calza
 * exacto: no recorta nada.
 *
 * El `<video>` no aparece hasta que el archivo está en memoria (ver
 * `preloadVideo`), y mientras tanto se ve el póster — que es el primer
 * cuadro, así que el cambio a reproducción no se nota. Lo normal es que
 * ya esté listo desde la portada y no haya póster que ver.
 */
export function Video() {
  const [src, setSrc] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    /* En modo captura el video no se baja: la lámina del PDF es el póster
     * —el primer cuadro— y así el export no espera 23 MB ni atrapa un
     * fotograma cualquiera a media reproducción. */
    if (SHOT) return;
    let alive = true;
    preloadVideo(VIDEO_SRC).then(
      (blobUrl) => {
        if (alive) setSrc(blobUrl);
      },
      () => {
        /* Sin blob, a la URL de red: más lento, pero se ve. */
        if (alive) setSrc(VIDEO_SRC);
      },
    );
    return () => {
      alive = false;
    };
  }, []);

  React.useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    /* Arranca con sonido. El navegador sólo lo permite si ya hubo un gesto
     * del usuario, y en la sala siempre lo hay (a este slide se llega con
     * clic o con flecha). Pero si alguien abre `#2` en frío el `play()` se
     * rechaza, y ahí caemos a mudo: una lámina muda es recuperable —
     * basta subir el volumen del video— y una congelada en el primer
     * cuadro no. */
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {
        /* Ni así: queda el póster, que es una imagen válida. */
      });
    });
  }, [src]);

  return (
    <SlideShell
      tone="ink"
      beam={false}
      vignette={false}
      grain={false}
      bleed
      backdrop={
        <>
          <img
            src={POSTER_SRC}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {src ? (
            <video
              ref={ref}
              src={src}
              preload="auto"
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </>
      }
    >
      {/* Sin contenido encima: el video es el slide. */}
      <></>
    </SlideShell>
  );
}

export default Video;
