import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { Lead, SlideTitle } from "@/components/deck/typography";
import { Photo } from "@/components/ui/photo";
import { QUE_ES_PHOTO } from "@/data/photos";

/**
 * Slide 2 — ¿Qué es Regreso a Casa?
 * Composición partida: la foto ocupa media lámina a altura completa y el
 * texto se alinea a la izquierda contra ella. El párrafo dejó de ir
 * centrado a propósito — texto centrado junto a un panel de foto se lee
 * como dos piezas sueltas en vez de una composición.
 */
export function QueEs() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-left", intensity: 0.38, spread: 62, length: 150 }}
      vignette={0.6}
    >
      <div className="grid h-full w-full grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] items-center gap-[5cqw]">
        <Reveal stagger={0.09} className="flex flex-col">
          <RevealItem>
            <SlideTitle className="text-[clamp(1.9rem,5.4cqw,5.4rem)] leading-[0.98]">
              ¿Qué es Regreso a Casa?
            </SlideTitle>
          </RevealItem>

          <RevealItem className="mt-[4.5cqh]">
            <span className="block h-px w-[8cqw] bg-[linear-gradient(to_right,var(--rac-azure),transparent)]" />
          </RevealItem>

          <RevealItem className="mt-[4cqh]">
            <Lead className="text-[clamp(.8rem,1.6cqw,1.65rem)]">
              Regreso a Casa es la experiencia de reencuentro de Campus
              Monterrey para celebrar los aniversarios de graduación de nuestros
              egresados. Busca que vuelvan a su alma mater, se reencuentren con
              su generación, conozcan la transformación del Tec y fortalezcan su
              vínculo con la institución.
            </Lead>
          </RevealItem>
        </Reveal>

        <Reveal delay={0.3} className="h-full py-[2cqh]">
          <RevealItem className="h-full">
            <Photo
              id={QUE_ES_PHOTO.id}
              fill
              priority
              className="rounded-[1.4cqw] shadow-[0_40px_90px_-40px_rgba(0,0,0,.95)]"
            />
          </RevealItem>
        </Reveal>
      </div>
    </SlideShell>
  );
}

export default QueEs;
