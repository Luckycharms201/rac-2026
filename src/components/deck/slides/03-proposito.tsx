import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { Lead, SlideTitle } from "@/components/deck/typography";

const PILARES = [
  "Reencuentro con mi generación",
  "Reencuentro con el Tec",
  "Reencuentro con mi Escuela",
];

/** Slide 3 — Propósito. */
export function Proposito() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-left", intensity: 0.4, spread: 58, length: 145 }}
      vignette={0.6}
    >
      <div className="flex h-full w-full flex-col">
        <Reveal
          stagger={0.09}
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <RevealItem>
            <SlideTitle>Propósito</SlideTitle>
          </RevealItem>

          <RevealItem className="mt-[5cqh] max-w-[58cqw]">
            <Lead>
              Busca que los egresados vuelvan a su alma mater, se reencuentren
              con su generación, conozcan la transformación del Tec y
              fortalezcan su vínculo con la institución.
            </Lead>
          </RevealItem>
        </Reveal>

        {/* Los tres pilares, en una línea, entrando uno tras otro. */}
        <Reveal
          stagger={0.14}
          delay={0.5}
          className="flex flex-wrap items-center justify-center gap-x-[1.4cqw] gap-y-[1.5cqh] pb-[1cqh]"
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
              <span className="font-bold uppercase tracking-[0.16em] text-white text-[clamp(.6rem,1.35cqw,1.4rem)]">
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
