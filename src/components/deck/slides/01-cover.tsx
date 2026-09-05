import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { COVER_PHOTOS, streamImages } from "@/data/photos";

const IMAGES = streamImages();

/**
 * Slide 1 — Portada.
 * El corredor de fotos a sangre; el logo arriba y el año abajo, con el
 * centro libre. Anclar la tipografía a los dos extremos deja ver el
 * corredor justo donde el movimiento es más grande — que es lo que hace
 * la portada.
 */
export function Cover() {
  return (
    <SlideShell
      // Mismo fondo que el resto del deck: el azul `ink` y el haz. El
      // corredor no tapa la lámina — es transparente entre tarjeta y
      // tarjeta — así que el degradado y la luz se ven por los huecos y
      // la portada deja de flotar sobre negro plano.
      tone="ink"
      beam={{ from: "bottom-right", intensity: 0.5, spread: 62, length: 155 }}
      bleed
      vignette={0.55}
      grain={0.05}
    >
      <ImageStreamHero
        images={IMAGES}
        // Una tarjeta por foto del manifiesto: así todas se ven y no hay
        // entradas muertas al final de la lista.
        cards={COVER_PHOTOS.length}
        speed={22}
        axis={50}
        className="absolute inset-0 h-full w-full rounded-none border-0"
      >
        {/* Oscurecimiento base para que el texto lea sobre cualquier foto.
         * Teñido con el azul de la lámina, no negro puro: el negro tapaba
         * justo la parte baja, que es donde el `ink` y el haz son más
         * brillantes, y el fondo del deck no llegaba a verse. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,20,.6)_0%,rgba(2,6,20,.42)_42%,rgba(2,6,20,.24)_100%)]" />
        {/* Cortinas arriba y abajo: el logo y el año viven en los bordes,
         * que es donde el degradado base era más claro. Deliberadamente
         * suaves y con el centro limpio — las tarjetas más grandes del
         * corredor salen justo por ahí, y apagarlas mata la portada. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.52)_0%,rgba(0,0,0,.16)_22%,transparent_40%,transparent_62%,rgba(2,4,10,.42)_82%,rgba(2,4,10,.8)_100%)]" />

        <Reveal
          stagger={0.14}
          delay={0.25}
          className="relative z-10 flex h-full w-full flex-col items-center justify-between px-[7.5cqw] pt-[11cqh] pb-[8cqh]"
        >
          <RevealItem>
            <img
              src="/logo-rac-blanco.webp"
              alt="Regreso a Casa · Tec de Monterrey"
              width={886}
              height={240}
              draggable={false}
              className="h-auto w-[42cqw] max-w-[520px] drop-shadow-[0_10px_50px_rgba(0,0,0,.75)]"
            />
          </RevealItem>

          <div className="flex flex-col items-center gap-[3cqh]">
            <RevealItem>
              <span className="tnum block font-light leading-none tracking-[-0.02em] text-white text-[clamp(1.6rem,4.6cqw,4.8rem)]">
                2026
              </span>
            </RevealItem>

            <RevealItem>
              <p className="font-medium uppercase tracking-[0.42em] text-white/55 text-[clamp(.5rem,1cqw,1rem)]">
                Tecnológico de Monterrey · Campus Monterrey
              </p>
            </RevealItem>
          </div>
        </Reveal>
      </ImageStreamHero>
    </SlideShell>
  );
}

export default Cover;
