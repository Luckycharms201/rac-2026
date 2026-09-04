import { cn } from "@/lib/utils";

export type VignetteProps = {
  /** Qué tan cerrada queda la viñeta. 0 = nada, 1 = bordes muy oscuros. @default 0.55 */
  strength?: number;
  className?: string;
};

/** Viñeta radial suave. Cierra el encuadre y empuja la mirada al centro. */
export function Vignette({ strength = 0.55, className }: VignetteProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-20", className)}
      style={{
        background: `radial-gradient(120% 100% at 50% 45%, transparent 38%, rgba(2,4,10,${
          strength * 0.55
        }) 78%, rgba(2,4,10,${strength}) 100%)`,
      }}
    />
  );
}

export default Vignette;
