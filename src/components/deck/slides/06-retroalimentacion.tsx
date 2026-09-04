import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { SlideTitle } from "@/components/deck/typography";
import { cn } from "@/lib/utils";

/* Los comentarios son citas literales de la retroalimentación de RAC 2025:
 * van tal cual las escribieron los egresados, sin corregir. */
const COMENTARIOS: { texto: string; lado: "izq" | "der" }[] = [
  {
    lado: "izq",
    texto:
      "Me hubiera gustado conocer cómo ha cambiado el plan de estudios",
  },
  {
    lado: "der",
    texto:
      "Tomar una clase actual o interaccion con alumnos de la misma carrera al dia de hoy",
  },
  {
    lado: "izq",
    texto:
      "Hacer más actividades de integración de la generación, de networking, retos, compartir que esta haciendo el Tec en temas de innovación, tecnología, etc.",
  },
];

/**
 * Slide 6 — Retroalimentación RAC 2025.
 *
 * Los comentarios van como burbujas de chat. Alternar lado y color es lo
 * que hace que se lean como mensajes y no como una lista de citas — y de
 * paso llena el 16:9, que con todo alineado a la izquierda se queda medio
 * vacío. La burbuja es el entrecomillado: por eso el texto va sin comillas.
 */
export function Retroalimentacion() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-right", intensity: 0.36, spread: 62, length: 145 }}
      vignette={0.6}
    >
      <div className="flex h-full w-full flex-col">
        <Reveal stagger={0.09}>
          <RevealItem>
            <SlideTitle className="text-[clamp(1.8rem,5cqw,5rem)] leading-[1]">
              Retroalimentación RAC 2025
            </SlideTitle>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger={0.2}
          delay={0.35}
          className="flex min-h-0 flex-1 flex-col justify-center gap-[3cqh]"
        >
          {COMENTARIOS.map((comentario) => (
            <RevealItem
              key={comentario.texto}
              className={cn(
                "flex",
                comentario.lado === "izq" ? "justify-start" : "justify-end",
              )}
            >
              <p
                className={cn(
                  "max-w-[58cqw] px-[2.4cqw] py-[2.2cqh] text-pretty font-light leading-[1.45] backdrop-blur-xl",
                  "text-[clamp(.75rem,1.55cqw,1.6rem)]",
                  // La esquina viva marca de qué lado "sale" la burbuja.
                  comentario.lado === "izq"
                    ? "rounded-[1.8cqw] rounded-bl-[0.4cqw] border border-white/12 bg-white/[0.07] text-[color:color-mix(in_oklab,var(--rac-mist)_92%,transparent)]"
                    : "rounded-[1.8cqw] rounded-br-[0.4cqw] border border-[color:color-mix(in_oklab,var(--rac-azure)_45%,transparent)] bg-[color:color-mix(in_oklab,var(--rac-blue)_38%,transparent)] text-white",
                )}
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)" }}
              >
                {comentario.texto}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </SlideShell>
  );
}

export default Retroalimentacion;
