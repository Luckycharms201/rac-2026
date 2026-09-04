import * as React from "react";
import { cn } from "@/lib/utils";
import { Grain } from "@/components/ui/grain";
import { getPhoto, placeholderTones } from "@/data/photos";

export type PhotoProps = {
  /** id dentro de `src/data/photos.ts`. */
  id: string;
  /** Sobreescribe el ratio del manifiesto, p. ej. "16/9". */
  ratio?: string;
  /**
   * Ignora el ratio y llena el contenedor padre. Para los paneles de foto a
   * altura completa, donde manda el hueco y no la proporción del archivo.
   */
  fill?: boolean;
  /**
   * Desvanece la foto hacia ese lado con una máscara alpha, de modo que se
   * funde con el fondo real del slide en vez de contra un color plano.
   * Los otros tres lados quedan a filo: la foto sangra hasta el borde.
   */
  fade?: "left" | "right";
  /** Desactiva el lazy loading: úsalo en el slide visible. */
  priority?: boolean;
  /**
   * Muestra el indicador del placeholder (ícono + label). Apágalo cuando la
   * foto es un fondo a toda la lámina: cualquier marca cae detrás del texto.
   * @default true
   */
  showLabel?: boolean;
  className?: string;
  /** Clases para el <img> / relleno interno. */
  imgClassName?: string;
};

/* Máscara del desvanecido. Va sobre la foto, no sobre un degradado de color
 * encima: así lo que asoma es el fondo real del slide —haz de luz incluido—
 * y el panel se funde de verdad en vez de aclararse contra un negro plano. */
function fadeMask(side: "left" | "right"): React.CSSProperties {
  const direction = side === "left" ? "to right" : "to left";
  const gradient = `linear-gradient(${direction}, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 12%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,1) 52%)`;
  return {
    maskImage: gradient,
    WebkitMaskImage: gradient,
  };
}

/**
 * Un hueco de foto. Con `src` en el manifiesto renderiza la imagen; sin
 * él dibuja un placeholder degradado con su label, para que el deck se
 * pueda proyectar completo antes de tener una sola foto.
 */
export function Photo({
  id,
  ratio,
  fill = false,
  fade,
  priority = false,
  showLabel = true,
  className,
  imgClassName,
}: PhotoProps) {
  const photo = getPhoto(id);
  const aspect = ratio ?? photo.ratio;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black/40",
        fill && "h-full w-full",
        className,
      )}
      style={{
        ...(fill ? undefined : { aspectRatio: aspect }),
        ...(fade ? fadeMask(fade) : undefined),
      }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.label}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <PhotoPlaceholder
          id={id}
          label={photo.label}
          showLabel={showLabel}
          fade={fade}
          className={imgClassName}
        />
      )}
    </div>
  );
}

type PhotoPlaceholderProps = {
  id: string;
  label: string;
  showLabel: boolean;
  fade?: "left" | "right";
  className?: string;
};

function PhotoPlaceholder({
  id,
  label,
  showLabel,
  fade,
  className,
}: PhotoPlaceholderProps) {
  const tones = React.useMemo(() => placeholderTones(id), [id]);

  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(${tones.angle}deg, ${tones.from} 0%, ${tones.via} 55%, ${tones.to} 100%)`,
      }}
    >
      {/* Brillo alto a la izquierda: le da volumen al plano. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 28% 20%, rgba(255,255,255,.15) 0%, rgba(255,255,255,0) 68%)",
        }}
      />
      <Grain opacity={0.06} className="z-0" />

      {/* Con máscara, el centro geométrico del panel cae dentro de la zona
       * ya desvanecida. El padding empuja el ícono y el label al centro de
       * la parte que de verdad se ve. Sólo afecta al placeholder: una foto
       * real llena el hueco con object-cover y no necesita nada. */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-center gap-[4%] px-[8%] text-center",
          fade === "left" && "pl-[52%]",
          fade === "right" && "pr-[52%]",
        )}
      >
        {showLabel ? (
          <>
            <ImageGlyph className="w-[16%] min-w-6 max-w-16 text-white/25" />
            <span className="text-[clamp(.5rem,1.05cqw,.8rem)] font-medium uppercase leading-tight tracking-[0.22em] text-white/40">
              {label}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ImageGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.75" cy="9.75" r="1.6" />
      <path d="M3.5 16.4l4.6-4.2a2 2 0 0 1 2.7-.05l3.4 3.05a2 2 0 0 0 2.75-.07L20.5 12" />
    </svg>
  );
}

export default Photo;
