import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { SlideTitle } from "@/components/deck/typography";

const FILAS = [
  { actividad: "Bienvenida", minutos: 3 },
  { actividad: "Platicar cómo es la Carrera / Escuela hoy", minutos: 7 },
  {
    actividad:
      "Explicarles cómo pueden participar (socio formador, mentoría, proyectos, vinculación profesional o empresarial, etc.)",
    minutos: 7,
  },
  { actividad: "Cierre + QR con siguientes pasos", minutos: 3 },
];

const MAX_MINUTOS = Math.max(...FILAS.map((f) => f.minutos));

/**
 * Slide 7 — Propuesta de Agenda y Contenido.
 * La barra proporcional al tiempo hace legible el ritmo del bloque de
 * un vistazo: dos extremos cortos y dos bloques largos en medio.
 */
export function Agenda() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "right", intensity: 0.34, spread: 60, length: 130 }}
      vignette={0.6}
    >
      <Reveal stagger={0.09} className="flex h-full w-full flex-col">
        <RevealItem>
          <SlideTitle className="text-[clamp(1.8rem,5cqw,5rem)] leading-[1]">
            Propuesta de Agenda y Contenido
          </SlideTitle>
        </RevealItem>

        <div className="mt-[5cqh] flex flex-1 flex-col justify-center">
          <RevealItem className="flex items-end justify-between border-b border-white/15 pb-[1.4cqh]">
            <span className="font-semibold uppercase tracking-[0.26em] text-[color:var(--rac-sky)] text-[clamp(.5rem,1cqw,1rem)]">
              Actividad
            </span>
            <span className="font-semibold uppercase tracking-[0.26em] text-[color:var(--rac-sky)] text-[clamp(.5rem,1cqw,1rem)]">
              Duración
            </span>
          </RevealItem>

          {FILAS.map((fila) => (
            <RevealItem
              key={fila.actividad}
              className="border-b border-white/8 py-[2.2cqh]"
            >
              <div className="flex items-center justify-between gap-[3cqw]">
                <span className="text-pretty font-light leading-[1.3] text-[color:color-mix(in_oklab,var(--rac-mist)_90%,transparent)] text-[clamp(.7rem,1.55cqw,1.6rem)]">
                  {fila.actividad}
                </span>

                <span className="flex shrink-0 items-baseline gap-[0.7cqw]">
                  <span className="tnum font-semibold leading-none tracking-[-0.03em] text-[color:var(--rac-azure)] text-[clamp(1.4rem,3.6cqw,3.6rem)]">
                    {fila.minutos}
                  </span>
                  <span className="font-light uppercase tracking-[0.2em] text-white/50 text-[clamp(.5rem,.95cqw,.95rem)]">
                    minutos
                  </span>
                </span>
              </div>

              {/* Barra proporcional al tiempo. La pista se queda en media
               * lámina a propósito: a todo lo ancho, la barra de 7 min
               * coincidiría con la línea de la fila y dejaría de leerse
               * como una medida. */}
              <div className="mt-[1.5cqh] h-[3px] w-[42cqw] rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(to_right,color-mix(in_oklab,var(--rac-blue)_85%,transparent),var(--rac-azure))]"
                  style={{ width: `${(fila.minutos / MAX_MINUTOS) * 100}%` }}
                />
              </div>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

export default Agenda;
