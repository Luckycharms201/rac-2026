import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { FourPointStar } from "@/components/deck/typography";
import { COVER_PHOTOS, streamImages } from "@/data/photos";

const IMAGES = streamImages();

/** Slide 1 — Portada. El corredor de fotos a sangre, el logo encima. */
export function Cover() {
  return (
    <SlideShell tone="none" beam={false} bleed vignette={0.5} grain={0.05}>
      <ImageStreamHero
        images={IMAGES}
        // Una tarjeta por foto del manifiesto: así todas se ven y no hay
        // entradas muertas al final de la lista.
        cards={COVER_PHOTOS.length}
        speed={22}
        axis={50}
        className="absolute inset-0 h-full w-full rounded-none border-0"
      >
        {/* Oscurecimiento para que el logo lea sobre cualquier foto. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_46%,rgba(0,18,51,.82)_0%,transparent_70%)]" />

        <Reveal
          stagger={0.12}
          delay={0.25}
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-[7.5cqw]"
        >
          <RevealItem className="w-full">
            <img
              src="/logo-rac-blanco.webp"
              alt="Regreso a Casa · Tec de Monterrey"
              width={886}
              height={240}
              draggable={false}
              className="mx-auto h-auto w-[46cqw] max-w-[560px] drop-shadow-[0_10px_50px_rgba(0,0,0,.75)]"
            />
          </RevealItem>

          {/* Estrella · línea · año — el detalle del arte original. */}
          <RevealItem className="mt-[7cqh] flex w-[46cqw] max-w-[560px] items-center gap-[1.6cqw]">
            <FourPointStar className="w-[2.6cqw] min-w-4 shrink-0 drop-shadow-[0_0_18px_rgba(46,125,246,.55)]" />
            <span className="h-px flex-1 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--rac-azure)_85%,transparent),color-mix(in_oklab,var(--rac-sky)_55%,transparent)_55%,color-mix(in_oklab,var(--rac-sky)_20%,transparent)_100%)]" />
            <span className="tnum shrink-0 font-light leading-none tracking-[-0.02em] text-white text-[clamp(1.5rem,4.2cqw,4.4rem)]">
              2026
            </span>
          </RevealItem>
        </Reveal>

        {/* Cascada propia: va anclada al pie, fuera del bloque centrado. */}
        <Reveal
          delay={0.6}
          className="absolute inset-x-0 bottom-[8cqh] z-10 text-center"
        >
          <RevealItem>
            <p className="font-medium uppercase tracking-[0.42em] text-white/55 text-[clamp(.5rem,1cqw,1rem)]">
              Tecnológico de Monterrey · Campus Monterrey
            </p>
          </RevealItem>
        </Reveal>
      </ImageStreamHero>
    </SlideShell>
  );
}

export default Cover;
