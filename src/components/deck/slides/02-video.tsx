import * as React from "react";
import { SlideShell } from "@/components/deck/SlideShell";

/** El master de 96 MB vive en la raíz del repo; esto es la copia servida. */
export const VIDEO_SRC = "/video/rac-2026.mp4";

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
 */
export function Video() {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    /* Arranca con sonido. El navegador sólo lo permite si ya hubo un gesto
     * del usuario, y en la sala siempre lo hay (a este slide se llega con
     * clic o con flecha). Pero si alguien abre `#2` en frío el `play()` se
     * rechaza, y ahí caemos a mudo: una lámina muda es recuperable —
     * basta subir el volumen del video— y una congelada en el primer
     * cuadro no. */
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {
        /* Ni así: queda el primer cuadro, que es una imagen válida. */
      });
    });
  }, []);

  return (
    <SlideShell
      tone="ink"
      beam={false}
      vignette={false}
      grain={false}
      bleed
      backdrop={
        <video
          ref={ref}
          src={VIDEO_SRC}
          preload="auto"
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      }
    >
      {/* Sin contenido encima: el video es el slide. */}
      <></>
    </SlideShell>
  );
}

export default Video;
