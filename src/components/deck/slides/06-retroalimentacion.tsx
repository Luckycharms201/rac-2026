import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { PhotoPanel } from "@/components/deck/photo-panel";
import { SlideTitle } from "@/components/deck/typography";
import { RETRO_PHOTO } from "@/data/photos";

/* Citas literales de la retroalimentación de RAC 2025: van tal cual las
 * escribieron los egresados, sin corregir acentos ni redacción. */
const COMENTARIOS = [
  "Me hubiera gustado conocer cómo ha cambiado el plan de estudios",
  "Tomar una clase actual o interaccion con alumnos de la misma carrera al dia de hoy",
  "Hacer más actividades de integración de la generación, de networking, retos, compartir que esta haciendo el Tec en temas de innovación, tecnología, etc.",
];

/**
 * Slide 6 — Retroalimentación RAC 2025.
 *
 * Los comentarios van como burbujas de chat, todas del mismo lado: son tres
 * voces de egresados, y alternar lados haría leer una conversación entre dos
 * partes que no existe.
 *
 * El ancho lo pone la columna (`max-w-[42cqw]`), no cada burbuja: los tres
 * comentarios son largos y envuelven, así que en la práctica las tres llegan
 * al mismo borde. El `w-fit` sólo entra si algún día se agrega un comentario
 * corto que quepa en una línea.
 */
export function Retroalimentacion() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-left", intensity: 0.36, spread: 62, length: 145 }}
      vignette={0.6}
      backdrop={<PhotoPanel id={RETRO_PHOTO.id} side="right" width="54%" />}
    >
      <div className="flex h-full w-full max-w-[42cqw] flex-col justify-center">
        <Reveal stagger={0.09}>
          <RevealItem>
            <SlideTitle className="text-[clamp(1.5rem,4.2cqw,4.2rem)] leading-[1]">
              Retroalimentación RAC 2025
            </SlideTitle>
          </RevealItem>

          <RevealItem className="mt-[4cqh]">
            <span className="block h-px w-[8cqw] bg-[linear-gradient(to_right,var(--rac-azure),transparent)]" />
          </RevealItem>
        </Reveal>

        <Reveal
          stagger={0.2}
          delay={0.5}
          className="mt-[4.5cqh] flex flex-col items-start gap-[2.2cqh]"
        >
          {COMENTARIOS.map((comentario) => (
            <RevealItem key={comentario}>
              <p
                className="w-fit rounded-[1.8cqw] rounded-bl-[0.4cqw] border border-white/12 bg-white/[0.07] px-[2.2cqw] py-[1.9cqh] text-pretty font-light leading-[1.45] text-[color:color-mix(in_oklab,var(--rac-mist)_92%,transparent)] backdrop-blur-xl text-[clamp(.72rem,1.45cqw,1.5rem)]"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)" }}
              >
                “{comentario}”
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </SlideShell>
  );
}

export default Retroalimentacion;
