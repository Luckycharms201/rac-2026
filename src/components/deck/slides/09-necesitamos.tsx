import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { SlideTitle } from "@/components/deck/typography";

/* Las cuatro decisiones que le pedimos a la Escuela, en el orden de la
 * conversación real: primero entran, luego deciden formato, y sólo
 * después ponen nombres. */
const PETICIONES: { titulo: string; detalle?: string }[] = [
  { titulo: "Confirmar su participación" },
  { titulo: "Definir el formato", detalle: "Por Escuela o por carreras" },
  { titulo: "Designar a un responsable" },
  { titulo: "Seleccionar al vocero" },
];

/**
 * Slide 9 — ¿Qué necesitamos?
 * La lámina de la pedida. Cuatro renglones y nada más: es lo que la
 * Escuela tiene que llevarse de la junta, y cada palabra de más le resta
 * fuerza. Las filas divididas y el número en azul son los mismos recursos
 * del slide de agenda, para que las dos láminas se lean como un par.
 */
export function Necesitamos() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "top-right", intensity: 0.38, spread: 64, length: 150 }}
      vignette={0.6}
    >
      <Reveal stagger={0.1} className="flex h-full w-full flex-col">
        <RevealItem>
          <SlideTitle>¿Qué necesitamos?</SlideTitle>
        </RevealItem>

        <div className="mt-[5cqh] flex min-h-0 flex-1 flex-col justify-center">
          {PETICIONES.map((peticion, i) => (
            <RevealItem
              key={peticion.titulo}
              className="flex items-baseline gap-[3cqw] border-b border-white/10 py-[3.2cqh] last:border-b-0"
            >
              <span className="tnum w-[6cqw] shrink-0 text-right font-semibold leading-[0.85] tracking-[-0.04em] text-[color:var(--rac-azure)] text-[clamp(1.5rem,4cqw,4rem)]">
                {i + 1}
              </span>

              <div className="flex min-w-0 flex-col">
                <h3 className="rac-title text-balance font-semibold leading-[1.1] tracking-[-0.025em] text-[clamp(1rem,2.9cqw,3rem)]">
                  {peticion.titulo}
                </h3>

                {peticion.detalle ? (
                  <p className="mt-[1cqh] font-light leading-[1.35] text-[color:var(--rac-sky)] text-[clamp(.65rem,1.5cqw,1.55rem)]">
                    {peticion.detalle}
                  </p>
                ) : null}
              </div>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

export default Necesitamos;
