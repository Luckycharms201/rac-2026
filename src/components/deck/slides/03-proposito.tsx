import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { PhotoPanel } from "@/components/deck/photo-panel";
import { Lead, SlideTitle } from "@/components/deck/typography";
import { PROPOSITO_PHOTO } from "@/data/photos";

const PILARES = [
  "Reencuentro con mi generación",
  "Reencuentro con el Tec",
  "Reencuentro con mi Escuela",
];

/**
 * Slide 3 — Propósito.
 * Espeja al slide 2: aquí la foto ocupa el lado izquierdo completo. Los tres
 * pilares siguen cruzando a todo lo ancho —son el cierre del slide, no el
 * pie de la columna de texto—, así que pasan por encima de la foto; la
 * cortina inferior es la que los sostiene sobre cualquier imagen.
 */
export function Proposito() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-right", intensity: 0.4, spread: 58, length: 145 }}
      vignette={0.6}
      backdrop={
        <>
          <PhotoPanel id={PROPOSITO_PHOTO.id} side="left" width="54%" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(to_top,rgba(2,4,10,.92)_0%,rgba(2,4,10,.55)_45%,transparent_100%)]" />
        </>
      }
    >
      <div className="flex h-full w-full flex-col">
        <Reveal
          stagger={0.09}
          className="ml-auto flex min-h-0 w-full max-w-[40cqw] flex-1 flex-col justify-center"
        >
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
              <span className="font-bold uppercase tracking-[0.16em] text-white text-[clamp(.6rem,1.3cqw,1.35rem)] [text-shadow:0_2px_18px_rgba(0,0,0,.8)]">
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
