import { PAGE } from "@/lib/print";
import type { SlideEntry } from "@/data/slides";

/* ──────────────────────────────────────────────────────────────────────
 * Hoja de impresión.
 *
 * Los diez slides uno tras otro, cada uno en su página. No reusa el Deck
 * a propósito: el Deck monta UN slide a la vez dentro de un AnimatePresence
 * y escala el escenario al viewport, y para imprimir hace falta lo
 * contrario — los diez montados a la vez y a un tamaño fijo.
 *
 * Cada página es un escenario 16:9 con `container-type: size`, igual que
 * el del Deck, así que todas las medidas en `cqw`/`cqh` de los slides
 * siguen valiendo sin tocar una sola lámina.
 * ────────────────────────────────────────────────────────────────────── */

export function PrintSheet({ slides }: { slides: SlideEntry[] }) {
  return (
    <div className="rac-print-sheet">
      {slides.map((slide) => (
        <section
          key={slide.id}
          className="rac-print-page relative overflow-hidden bg-[var(--rac-ink)]"
          style={{
            width: PAGE.width,
            height: PAGE.height,
            containerType: "size",
          }}
          aria-label={slide.title}
        >
          <slide.Component />
        </section>
      ))}
    </div>
  );
}
