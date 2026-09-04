import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { SlideTitle } from "@/components/deck/typography";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/utils";

type Momento = { texto: string; destacado?: boolean };

const DIAS: { titulo: string; foto: string; momentos: Momento[] }[] = [
  {
    titulo: "Día 1 – Viernes",
    foto: "momentos-dia-1",
    momentos: [
      { texto: "Registro" },
      { texto: "Mensaje de Directivos" },
      { texto: "Cena de gala" },
    ],
  },
  {
    titulo: "Día 2 – Sábado",
    foto: "momentos-dia-2",
    momentos: [
      { texto: "Desayuno" },
      { texto: "Tu Escuela Hoy", destacado: true },
      { texto: "Tour por el Campus" },
      { texto: "Foto en el Mural" },
      { texto: "Clase de Recuerdo" },
    ],
  },
];

/** Slide 5 — Momentos clave. */
export function Momentos() {
  return (
    <SlideShell
      tone="ink"
      beam={{ from: "bottom-center", intensity: 0.32, spread: 70, length: 130 }}
      vignette={0.62}
      className="items-center"
    >
      <Reveal stagger={0.1} className="flex h-full w-full flex-col items-center">
        <RevealItem>
          <SlideTitle className="text-center">Momentos clave</SlideTitle>
        </RevealItem>

        <div className="mt-[4cqh] grid min-h-0 w-full flex-1 grid-cols-2 gap-[3cqw]">
          {DIAS.map((dia) => (
            <RevealItem
              key={dia.titulo}
              className="rac-glass flex min-h-0 flex-col overflow-hidden rounded-[1.6cqw] p-[1.5cqw]"
            >
              <Photo
                id={dia.foto}
                ratio="16/9"
                priority
                className="max-h-[22cqh] w-full shrink-0 rounded-[1cqw]"
              />

              <h3 className="mt-[2cqh] shrink-0 font-semibold tracking-[-0.02em] text-[color:var(--rac-sky)] text-[clamp(.85rem,1.8cqw,1.85rem)]">
                {dia.titulo}
              </h3>

              <ul className="mt-[1.2cqh] flex min-h-0 flex-col gap-[0.6cqh]">
                {dia.momentos.map((momento) => (
                  <li
                    key={momento.texto}
                    className={cn(
                      "flex items-center gap-[1cqw] rounded-[0.6cqw] py-[0.5cqh] text-[clamp(.7rem,1.5cqw,1.55rem)]",
                      momento.destacado
                        ? // El punto central de toda la presentación.
                          "-ml-[0.6cqw] border-l-[3px] border-[color:var(--rac-azure)] bg-[color:color-mix(in_oklab,var(--rac-azure)_15%,transparent)] px-[1cqw] font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--rac-azure)_60%,transparent)]"
                        : "font-light text-[color:color-mix(in_oklab,var(--rac-mist)_82%,transparent)]",
                    )}
                  >
                    {!momento.destacado ? (
                      <span
                        aria-hidden
                        className="h-[0.35cqw] w-[0.35cqw] min-h-[3px] min-w-[3px] shrink-0 rounded-full bg-[color:var(--rac-azure)]"
                      />
                    ) : null}
                    {momento.texto}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

export default Momentos;
