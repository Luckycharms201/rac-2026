import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SHOT } from "@/lib/print";
import { EASE } from "@/components/deck/motion-variants";
import { Photo } from "@/components/ui/photo";

export type PhotoPanelProps = {
  /** id dentro de `src/data/photos.ts`. */
  id: string;
  /** Lado del slide que ocupa el panel. */
  side: "left" | "right";
  /** Ancho del panel, en % del slide. @default "52%" */
  width?: string;
  className?: string;
};

/**
 * Panel de foto a sangre: ocupa un lado completo del slide, de borde a borde,
 * y se desvanece hacia el centro.
 *
 * Va dentro del `backdrop` de `<SlideShell>`, no del contenido, porque tiene
 * que ignorar el padding de la lámina — un panel que respeta el padding se
 * lee como una tarjeta grande, no como una foto que sangra.
 *
 * Entra con un empuje de escala y sin desplazamiento vertical: al estar
 * anclado a los dos bordes, cualquier `y` abriría una franja de fondo en el
 * canto durante la transición.
 */
export function PhotoPanel({
  id,
  side,
  width = "52%",
  className,
}: PhotoPanelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={SHOT ? false : reduced ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{
        duration: reduced ? 0.25 : 0.95,
        delay: reduced ? 0 : 0.2,
        ease: EASE,
      }}
      className={cn(
        "absolute inset-y-0",
        side === "right" ? "right-0" : "left-0",
        className,
      )}
      style={{ width }}
    >
      <Photo
        id={id}
        fill
        priority
        // El desvanecido mira siempre hacia el centro de la lámina.
        fade={side === "right" ? "left" : "right"}
        className="rounded-none border-0"
      />
    </motion.div>
  );
}

export default PhotoPanel;
