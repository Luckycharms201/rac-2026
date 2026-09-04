import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { PhotoPanel } from "@/components/deck/photo-panel";
import { Lead, SlideTitle } from "@/components/deck/typography";
import { QUE_ES_PHOTO } from "@/data/photos";

/**
 * Slide 2 — ¿Qué es Regreso a Casa?
 * La foto ocupa el lado derecho completo, de borde a borde, y se desvanece
 * hacia el texto. El párrafo dejó de ir centrado a propósito — centrado
 * junto a un panel de foto se lee como dos piezas sueltas.
 */
export function QueEs() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-left", intensity: 0.38, spread: 62, length: 150 }}
      vignette={0.6}
      backdrop={<PhotoPanel id={QUE_ES_PHOTO.id} side="right" width="54%" />}
    >
      <Reveal
        stagger={0.09}
        className="flex h-full w-full max-w-[40cqw] flex-col justify-center"
      >
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
            Regreso a Casa es la experiencia de reencuentro de Campus Monterrey
            para celebrar los aniversarios de graduación de nuestros egresados.
            Busca que vuelvan a su alma mater, se reencuentren con su
            generación, conozcan la transformación del Tec y fortalezcan su
            vínculo con la institución.
          </Lead>
        </RevealItem>
      </Reveal>
    </SlideShell>
  );
}

export default QueEs;
