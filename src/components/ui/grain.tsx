import * as React from "react";
import { cn } from "@/lib/utils";

/* Ruido de película. Un feTurbulence fractal renderizado una sola vez a
 * un data URI y repetido como tile de 180px: cuesta un decode y nada de
 * pintado por frame, que es lo que importa cuando se proyecta. */

function noiseTile(baseFrequency: number, octaves: number, seed: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${octaves}" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/** Tile por defecto, calculado una vez para todo el deck. */
const GRAIN_TILE = noiseTile(0.82, 4, 7);

export type GrainProps = {
  /** Opacidad de la capa. @default 0.045 */
  opacity?: number;
  /** Modo de mezcla. `overlay` es el que da la textura de las láminas. */
  blend?: React.CSSProperties["mixBlendMode"];
  className?: string;
};

export function Grain({
  opacity = 0.045,
  blend = "overlay",
  className,
}: GrainProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-30", className)}
      style={{
        backgroundImage: `url("${GRAIN_TILE}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
        opacity,
        mixBlendMode: blend,
      }}
    />
  );
}

export default Grain;
