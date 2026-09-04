import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { Lead, SlideTitle } from "@/components/deck/typography";
import { Photo } from "@/components/ui/photo";
import { PROPOSITO_PHOTO } from "@/data/photos";

const PILARES = [
  "Reencuentro con mi generación",
  "Reencuentro con el Tec",
  "Reencuentro con mi Escuela",
];

/**
 * Slide 3 — Propósito.
 * Espeja al slide 2: aquí la foto va a la izquierda. Los tres pilares
 * cruzan a todo lo ancho por debajo de las dos columnas, para que sigan
 * leyéndose como una sola línea de cierre y no como pie de la columna
 * de texto.
 */
export function Proposito() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-right", intensity: 0.4, spread: 58, length: 145 }}
      vignette={0.6}
    >
      <div className="flex h-full w-full flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] items-center gap-[5cqw]">
          <Reveal delay={0.3} className="h-full py-[2cqh]">
            <RevealItem className="h-full">
              <Photo
                id={PROPOSITO_PHOTO.id}
                fill
                priority
                className="rounded-[1.4cqw] shadow-[0_40px_90px_-40px_rgba(0,0,0,.95)]"
              />
            </RevealItem>
          </Reveal>

          <Reveal stagger={0.09} className="flex flex-col">
            <RevealItem>
              <SlideTitle className="text-[clamp(2rem,5.8cqw,5.8rem)] leading-[0.98]">
                Propósito
              </SlideTitle>
            </RevealItem>

            <RevealItem className="mt-[4.5cqh]">
              <span className="block h-px w-[8cqw] bg-[linear-gradient(to_right,var(--rac-azure),transparent)]" />
            </RevealItem>

            <RevealItem className="mt-[4cqh]">
              <Lead className="text-[clamp(.8rem,1.6cqw,1.65rem)]">
                Busca que los egresados vuelvan a su alma mater, se reencuentren
                con su generación, conozcan la transformación del Tec y
                fortalezcan su vínculo con la institución.
              </Lead>
            </RevealItem>
          </Reveal>
        </div>

        {/* Los tres pilares, en una línea, entrando uno tras otro. */}
        <Reveal
          stagger={0.14}
          delay={0.6}
          className="flex shrink-0 flex-wrap items-center justify-center gap-x-[1.4cqw] gap-y-[1.5cqh] pt-[4cqh]"
        >
          {PILARES.map((pilar, i) => (
            <RevealItem
              key={pilar}
              className="flex items-center gap-[1.4cqw] whitespace-nowrap"
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="text-[color:var(--rac-azure)] text-[clamp(.7rem,1.3cqw,1.3rem)]"
                >
                  ·
                </span>
              ) : null}
              <span className="font-bold uppercase tracking-[0.16em] text-white text-[clamp(.6rem,1.3cqw,1.35rem)]">
                {pilar}
              </span>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </SlideShell>
  );
}

export default Proposito;
