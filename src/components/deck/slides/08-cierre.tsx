import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { EASE } from "@/components/deck/motion-variants";
import { Photo } from "@/components/ui/photo";
import { CIERRE_PHOTOS } from "@/data/photos";

/* Rotación alterna: apenas grado y medio, lo justo para que las tres
 * fotos se lean como impresiones sobre una mesa y no como una tira. */
const GIROS = [-1.5, 0, 1.5];

/** Slide 8 — Cierre. */
export function Cierre() {
  return (
    <SlideShell
      tone="deep"
      beam={{ from: "bottom-center", intensity: 0.3, spread: 80, length: 120 }}
      vignette={0.55}
    >
      <Reveal
        stagger={0.09}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <RevealItem>
          <h2 className="rac-title-gradient text-center font-semibold leading-[1.05] tracking-[-0.035em] text-[clamp(1.6rem,4.4cqw,4.4rem)]">
            Construyamos juntos una experiencia
            <br />
            que haga de Regreso a Casa el inicio
            <br />
            de una nueva conexión con su Escuela
          </h2>
        </RevealItem>

        <div className="mt-[7cqh] grid w-full grid-cols-3 gap-[3cqw]">
          {CIERRE_PHOTOS.map((photo, i) => (
            <RevealItem
              key={photo.id}
              className="group/foto will-change-transform"
              style={{ rotate: GIROS[i] ?? 0 }}
              whileHover={{ y: -14, scale: 1.025 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Photo
                id={photo.id}
                ratio="4/3"
                priority
                className="border-white/20 shadow-[0_30px_70px_-30px_rgba(0,0,0,.95)] transition-shadow duration-500 group-hover/foto:shadow-[0_40px_90px_-28px_color-mix(in_oklab,var(--rac-blue)_55%,rgba(0,0,0,.9))]"
              />
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

export default Cierre;
