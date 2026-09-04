import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { FourPointStar } from "@/components/deck/typography";
import { streamImages } from "@/data/photos";

const IMAGES = streamImages();

/** Slide 1 — Portada. El corredor de fotos a sangre, el título encima. */
export function Cover() {
  return (
    <SlideShell tone="none" beam={false} bleed vignette={0.5} grain={0.05}>
      <ImageStreamHero
        images={IMAGES}
        cards={9}
        speed={22}
        axis={50}
        className="absolute inset-0 h-full w-full rounded-none border-0"
      >
        {/* Oscurecimiento para que el texto lea sobre cualquier foto. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_60%,rgba(0,18,51,.72)_0%,transparent_62%)]" />

        <Reveal
          stagger={0.1}
          delay={0.25}
          className="relative z-10 flex h-full w-full flex-col justify-end px-[7.5cqw] pb-[9cqh]"
        >
          <RevealItem>
            <h1 className="rac-title-gradient text-left font-semibold leading-[0.86] tracking-[-0.045em] text-[clamp(3rem,11.5cqw,12rem)]">
              Regreso
              <br />
              a Casa
            </h1>
          </RevealItem>

          {/* Estrella · línea · año — el detalle del arte original. */}
          <RevealItem className="mt-[3.5cqh] flex items-center gap-[1.6cqw]">
            <FourPointStar className="w-[3.2cqw] min-w-5 shrink-0 drop-shadow-[0_0_18px_rgba(46,125,246,.55)]" />
            <span className="h-px flex-1 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--rac-azure)_85%,transparent),color-mix(in_oklab,var(--rac-sky)_45%,transparent)_45%,transparent_100%)]" />
            <span className="tnum shrink-0 font-light leading-none tracking-[-0.02em] text-white text-[clamp(1.75rem,5.2cqw,5.5rem)]">
              2026
            </span>
          </RevealItem>

          <RevealItem className="mt-[4.5cqh]">
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
