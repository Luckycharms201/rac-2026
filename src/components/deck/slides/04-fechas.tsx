import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";

const FILAS = [
  { fecha: "Septiembre 25 y 26", aniversario: "Regreso a Casa 25, 30 y 35 aniversario" },
  { fecha: "Octubre 23", aniversario: "Regreso a Casa 5, 10 y 15 aniversario" },
  { fecha: "Octubre 23 y 24", aniversario: "Regreso a Casa 20 aniversario" },
  { fecha: "Noviembre 20 y 21", aniversario: "Regreso a Casa 40+ aniversario" },
];

/**
 * Slide 4 — Fechas RAC 2026.
 * El único slide claro del deck: el corte contra los oscuros es lo que
 * hace que las fechas se lean como el dato duro de la presentación.
 */
export function Fechas() {
  return (
    <SlideShell
      tone="paper"
      beam={{
        from: "bottom-right",
        color: "var(--rac-blue)",
        intensity: 0.1,
        blur: 110,
        spread: 70,
      }}
      vignette={0.3}
    >
      <Reveal stagger={0.08} className="flex h-full w-full flex-col">
        <RevealItem>
          <h2 className="rac-title-gradient-ink font-semibold leading-[1] tracking-[-0.035em] text-[clamp(2rem,5.6cqw,5.6rem)]">
            Fechas RAC 2026
          </h2>
        </RevealItem>

        <div className="mt-[6cqh] flex flex-1 flex-col justify-center">
          {/* Encabezados */}
          <RevealItem className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] items-end gap-x-[3cqw] border-b-2 border-[color:color-mix(in_oklab,var(--rac-blue)_45%,transparent)] pb-[1.6cqh]">
            <span className="pl-[4.4cqw] font-semibold uppercase tracking-[0.22em] text-[color:var(--rac-blue)] text-[clamp(.55rem,1.05cqw,1.05rem)]">
              Fechas
            </span>
            <span className="font-semibold uppercase tracking-[0.22em] text-[color:var(--rac-blue)] text-[clamp(.55rem,1.05cqw,1.05rem)]">
              Aniversario
            </span>
          </RevealItem>

          {FILAS.map((fila) => (
            <RevealItem
              key={fila.fecha + fila.aniversario}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] items-center gap-x-[3cqw] border-b border-[color:color-mix(in_oklab,var(--rac-blue)_28%,transparent)] py-[2.5cqh]"
            >
              <span className="flex items-center gap-[1.5cqw]">
                <ArrowChip />
                <span className="font-medium tracking-[-0.015em] text-[color:var(--rac-navy)] text-[clamp(.75rem,1.75cqw,1.8rem)]">
                  {fila.fecha}
                </span>
              </span>
              <span className="font-light tracking-[-0.01em] text-[color:color-mix(in_oklab,var(--rac-navy)_86%,transparent)] text-[clamp(.75rem,1.75cqw,1.8rem)]">
                {fila.aniversario}
              </span>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

/** Marcador circular de fila. */
function ArrowChip() {
  return (
    <span
      aria-hidden
      className="grid aspect-square w-[2.9cqw] min-w-6 shrink-0 place-items-center rounded-full border border-[color:color-mix(in_oklab,var(--rac-blue)_40%,transparent)] bg-[color:color-mix(in_oklab,var(--rac-blue)_10%,transparent)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--rac-blue)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[55%]"
      >
        <path d="M4 12h15" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export default Fechas;
