import type { ReactNode } from "react";
import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";

/* La luminosidad sube de arriba hacia abajo: en el arte original el haz
 * de luz entra por abajo y atraviesa las tarjetas, así que la última es
 * la más encendida. */
const NIVELES = [
  "bg-white/[0.04] border-white/[0.08]",
  "bg-white/[0.07] border-white/[0.12]",
  "bg-white/[0.11] border-white/[0.18]",
];

const BLOQUES: { titulo: string; cuerpo: ReactNode }[] = [
  {
    titulo: "¿Qué es?",
    cuerpo:
      "Un espacio para que nuestros egresados conozcan cómo ha evolucionado su carrera y las formas en las que hoy pueden volver a vincularse con su Escuela y con el Tec.",
  },
  {
    titulo: "¿Cuál es el objetivo?",
    cuerpo: (
      <>
        Que al terminar este espacio el egresado pueda responder dos preguntas:
        {/* Apiladas, no seguidas dentro del párrafo: son las dos preguntas que
         * el bloque promete, y en línea corrida se leen como una sola frase
         * larga en la que la segunda se pierde. */}
        <span className="mt-[1.4cqh] flex flex-col gap-[0.7cqh] italic text-white">
          <span>¿Cómo ha evolucionado mi carrera desde que me gradué?</span>
          <span>¿Cómo puedo participar hoy con mi Escuela y con el Tec?</span>
        </span>
      </>
    ),
  },
  {
    titulo: "¿En qué momento sucederá?",
    cuerpo:
      "Entre el desayuno y el tour, abrir un espacio de 20 minutos por Escuela y/o carrera. Cada egresado podrá elegir la Escuela de su interés, independientemente de la carrera que haya estudiado.",
  },
];

/** Slide 6 — Propuesta: Tu Escuela Hoy. */
export function Propuesta() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-left", intensity: 0.46, spread: 66, length: 165 }}
      vignette={0.58}
    >
      <Reveal stagger={0.1} className="flex h-full w-full flex-col">
        <RevealItem>
          <h2 className="rac-title font-semibold leading-[1] tracking-[-0.035em] text-[clamp(1.9rem,5.2cqw,5.2rem)]">
            Propuesta: Tu Escuela Hoy
          </h2>
        </RevealItem>

        <div className="mt-[5cqh] flex flex-1 flex-col justify-center gap-[2.4cqh]">
          {BLOQUES.map((bloque, i) => (
            <RevealItem
              key={bloque.titulo}
              className={`grid grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] items-start gap-x-[3cqw] rounded-[1.4cqw] border p-[2.4cqw] backdrop-blur-xl ${NIVELES[i] ?? ""}`}
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.12)" }}
            >
              <h3 className="font-bold uppercase leading-[1.15] tracking-[0.1em] text-[color:var(--rac-sky)] text-[clamp(.6rem,1.4cqw,1.45rem)]">
                {bloque.titulo}
              </h3>
              <p className="text-pretty font-light leading-[1.45] text-[color:color-mix(in_oklab,var(--rac-mist)_88%,transparent)] text-[clamp(.7rem,1.5cqw,1.55rem)]">
                {bloque.cuerpo}
              </p>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

export default Propuesta;
