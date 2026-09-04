import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { Lead, SlideTitle } from "@/components/deck/typography";

/** Slide 2 — ¿Qué es Regreso a Casa? */
export function QueEs() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-right", intensity: 0.42, spread: 62, length: 150 }}
      vignette={0.6}
    >
      <Reveal
        stagger={0.09}
        className="flex h-full w-full flex-col items-center justify-center text-center"
      >
        <RevealItem>
          <SlideTitle>¿Qué es Regreso a Casa?</SlideTitle>
        </RevealItem>

        <RevealItem className="mt-[5cqh] max-w-[60cqw]">
          <Lead>
            Regreso a Casa es la experiencia de reencuentro de Campus Monterrey
            para celebrar los aniversarios de graduación de nuestros egresados.
            Busca que vuelvan a su alma mater, se reencuentren con su
            generación, conozcan la transformación del Tec y fortalezcan su
            vínculo con la institución.
          </Lead>
        </RevealItem>

        <RevealItem className="mt-[6cqh]">
          <span className="block h-px w-[16cqw] bg-[linear-gradient(to_right,transparent,color-mix(in_oklab,var(--rac-azure)_80%,transparent),transparent)]" />
        </RevealItem>
      </Reveal>
    </SlideShell>
  );
}

export default QueEs;
