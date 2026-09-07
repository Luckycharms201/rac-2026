import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { SlideTitle } from "@/components/deck/typography";
import { cn } from "@/lib/utils";

type Momento = { texto: string; destacado?: boolean };

const DIAS: { titulo: string; momentos: Momento[] }[] = [
  {
    titulo: "Día 1 – Viernes",
    momentos: [
      { texto: "Registro" },
      { texto: "Mensaje de Directivos" },
      { texto: "Cena de gala" },
    ],
  },
  {
    titulo: "Día 2 – Sábado",
    momentos: [
      { texto: "Desayuno" },
      { texto: "Tu Escuela Hoy", destacado: true },
      { texto: "Tour por el Campus" },
      { texto: "Foto en el Mural" },
      { texto: "Clase de Recuerdo" },
    ],
  },
];

/**
 * Slide 6 — Momentos clave.
 * Sin fotos: las dos tarjetas son sólo el programa. Con el hueco que dejó
 * la foto, la lista crece y se centra en vertical — dejarla arriba con el
 * tamaño de antes habría hecho ver las tarjetas vacías.
 */
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

        <div className="mt-[5cqh] grid min-h-0 w-full flex-1 grid-cols-2 gap-[3cqw]">
          {DIAS.map((dia) => (
            <RevealItem
              key={dia.titulo}
              // Contenido alineado arriba, no centrado: los dos días tienen distinto
              // número de momentos, y centrarlos por separado descuadra los
              // encabezados entre una tarjeta y otra.
              className="rac-glass flex min-h-0 flex-col rounded-[1.6cqw] px-[3cqw] pt-[6cqh] pb-[3cqh]"
            >
              <h3 className="shrink-0 font-semibold tracking-[-0.02em] text-[color:var(--rac-sky)] text-[clamp(1rem,2.2cqw,2.25rem)]">
                {dia.titulo}
              </h3>

              <span className="mt-[2cqh] block h-px w-[7cqw] shrink-0 bg-[linear-gradient(to_right,var(--rac-azure),transparent)]" />

              <ul className="mt-[3cqh] flex min-h-0 flex-col gap-[1.6cqh]">
                {dia.momentos.map((momento) => (
                  <li
                    key={momento.texto}
                    className={cn(
                      "flex items-center gap-[1.2cqw] rounded-[0.6cqw] text-[clamp(.8rem,1.85cqw,1.9rem)]",
                      momento.destacado
                        ? // El punto central de toda la presentación.
                          "-ml-[1cqw] border-l-[3px] border-[color:var(--rac-azure)] bg-[color:color-mix(in_oklab,var(--rac-azure)_15%,transparent)] px-[1.2cqw] py-[1cqh] font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--rac-azure)_60%,transparent)]"
                        : "font-light text-[color:color-mix(in_oklab,var(--rac-mist)_82%,transparent)]",
                    )}
                  >
                    {!momento.destacado ? (
                      <span
                        aria-hidden
                        className="h-[0.4cqw] w-[0.4cqw] min-h-[3px] min-w-[3px] shrink-0 rounded-full bg-[color:var(--rac-azure)]"
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
