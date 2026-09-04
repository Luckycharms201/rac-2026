import * as React from "react";
import { cn } from "@/lib/utils";
import { Grain } from "@/components/ui/grain";
import { Vignette } from "@/components/ui/vignette";
import { LightBeam, type LightBeamProps } from "@/components/ui/light-beam";

const TONES = {
  /* Negro azulado con una subida de azul hacia abajo: el fondo por defecto. */
  ink: "bg-[radial-gradient(120%_90%_at_50%_120%,#08183a_0%,#04070f_58%,#02040a_100%)] text-[#f3f7ff]",
  /* Más azul, para el cierre. */
  deep: "bg-[linear-gradient(to_top,#00276b_0%,#001233_42%,#04070f_100%)] text-[#f3f7ff]",
  /* El corte claro del slide de fechas. */
  paper: "bg-[var(--rac-paper)] text-[var(--rac-navy)]",
  /* Sin fondo: lo pone el propio slide (portada). */
  none: "",
} as const;

export type SlideTone = keyof typeof TONES;

export type SlideShellProps = {
  /** Fondo del slide. @default "ink" */
  tone?: SlideTone;
  /** Haz de luz. `false` lo apaga; un objeto configura el `<LightBeam />`. */
  beam?: LightBeamProps | false;
  /** Fuerza de la viñeta, o `false`. @default 0.55 */
  vignette?: number | false;
  /** Opacidad del grano, o `false`. @default 0.045 */
  grain?: number | false;
  /** Quita el padding estándar (la portada lo necesita a sangre). */
  bleed?: boolean;
  /**
   * Capa a sangre entre el haz de luz y el contenido: paneles de foto que
   * llegan al borde del slide, ignorando el padding. La viñeta y el grano
   * siguen pasando por encima, que es lo que la integra con la lámina.
   */
  backdrop?: React.ReactNode;
  /** Clases del contenedor de contenido. */
  className?: string;
  children: React.ReactNode;
};

/**
 * Envoltura de un slide: ocupa el escenario 16:9 completo y apila fondo,
 * haz de luz, contenido, viñeta y grano en ese orden. El grano va hasta
 * arriba a propósito: es lo que amarra fotos y vectores en una sola
 * textura.
 */
export function SlideShell({
  tone = "ink",
  beam = { from: "bottom-right" },
  vignette = 0.55,
  grain = 0.045,
  bleed = false,
  backdrop,
  className,
  children,
}: SlideShellProps) {
  const isPaper = tone === "paper";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", TONES[tone])}>
      {beam ? <LightBeam {...beam} /> : null}

      {backdrop ? (
        <div className="pointer-events-none absolute inset-0 z-[5]">
          {backdrop}
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col",
          !bleed && "px-[7.5cqw] py-[7cqh]",
          className,
        )}
      >
        {children}
      </div>

      {vignette !== false ? (
        <Vignette strength={isPaper ? vignette * 0.35 : vignette} />
      ) : null}
      {grain !== false ? (
        <Grain
          opacity={isPaper ? grain * 0.8 : grain}
          blend={isPaper ? "multiply" : "overlay"}
        />
      ) : null}
    </div>
  );
}

export default SlideShell;
