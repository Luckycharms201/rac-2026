import * as React from "react";
import { cn } from "@/lib/utils";

/* ── el haz ──────────────────────────────────────────────────────
 * La firma visual de los slides oscuros: una cuña de luz azul que
 * entra desde una esquina y cruza el encuadre en diagonal.
 *
 * Es un rectángulo con degradado longitudinal, rotado desde su borde
 * izquierdo (`transform-origin: 0 50%`) y desenfocado. Rotar desde el
 * borde y no desde el centro es lo que deja anclar el haz exactamente
 * en el punto de entrada: el origen es la boca del haz, y `angle`
 * apunta hacia dónde se abre.
 *
 * Encima va un bloom radial en el mismo punto. Sin él el haz nace con
 * un corte recto que se lee como un rectángulo borroso, no como luz.
 * ─────────────────────────────────────────────────────────────── */

/** Puntos de entrada típicos: origen (% del slide) y hacia dónde apunta. */
const ORIGINS = {
  "bottom-right": { x: 96, y: 108, angle: -128 },
  "bottom-left": { x: 4, y: 108, angle: -52 },
  "bottom-center": { x: 50, y: 112, angle: -74 },
  "top-left": { x: 2, y: -8, angle: 46 },
  "top-right": { x: 98, y: -8, angle: 134 },
  left: { x: -6, y: 62, angle: -14 },
  right: { x: 106, y: 38, angle: 194 },
} as const;

export type BeamOrigin = keyof typeof ORIGINS;

export type LightBeamProps = {
  /** Esquina o borde por donde entra la luz. @default "bottom-right" */
  from?: BeamOrigin;
  /** Sobreescribe el ángulo del preset, en grados. */
  angle?: number;
  /** Largo del haz, en % del ancho del slide. @default 140 */
  length?: number;
  /** Ancho de la boca del haz, en % del alto del slide. @default 56 */
  spread?: number;
  /** Opacidad global. @default 0.5 */
  intensity?: number;
  /** Color del haz. @default var(--rac-azure) */
  color?: string;
  /** Radio del desenfoque. @default 80 */
  blur?: number;
  className?: string;
};

export function LightBeam({
  from = "bottom-right",
  angle,
  length = 140,
  spread = 56,
  intensity = 0.5,
  color = "var(--rac-azure)",
  blur = 80,
  className,
}: LightBeamProps) {
  const origin = ORIGINS[from];
  const rotation = angle ?? origin.angle;

  const style: React.CSSProperties = {
    left: `${origin.x}%`,
    top: `${origin.y}%`,
    width: `${length}%`,
    height: `${spread}%`,
    marginTop: `${-spread / 2}%`,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: "0 50%",
    filter: `blur(${blur}px)`,
    background: `linear-gradient(to right,
      color-mix(in oklab, ${color} 78%, transparent) 0%,
      color-mix(in oklab, ${color} 42%, transparent) 26%,
      color-mix(in oklab, ${color} 14%, transparent) 62%,
      transparent 100%)`,
    borderRadius: "50%",
    opacity: intensity,
  };

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
    >
      <div className="absolute" style={style} />
      {/* Bloom en la boca del haz: sin esto el nacimiento se ve recortado. */}
      <div
        className="absolute"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          width: `${spread * 1.5}%`,
          height: `${spread * 1.5}%`,
          transform: "translate(-50%, -50%)",
          filter: `blur(${blur * 0.9}px)`,
          background: `radial-gradient(circle, color-mix(in oklab, ${color} 55%, transparent) 0%, transparent 70%)`,
          opacity: intensity * 0.85,
        }}
      />
    </div>
  );
}

export default LightBeam;
