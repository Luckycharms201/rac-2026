import * as React from "react";
import { cn } from "@/lib/utils";

/* Escala tipográfica del deck. Todo en `cqw` con clamp: el mismo peso
 * óptico en una laptop y en el cañón, sin recalcular nada. */

/**
 * Título de slide.
 *
 * OJO al sobreescribir el tamaño: en Tailwind una utilidad de `font-size`
 * arrastra su propio `line-height`, así que `tailwind-merge` borra todo
 * `leading-*` que venga *antes* de un `text-[...]` — incluido el de aquí
 * abajo. Si cambias el tamaño, vuelve a pasar el leading y ponlo *después*
 * del tamaño en la misma cadena:
 *
 *   ✅ className="text-[clamp(...)] leading-[0.98]"
 *   ❌ className="leading-[0.98] text-[clamp(...)]"   ← se pierde el leading
 *
 * Si no, el título cae al 1.5 por defecto y los de dos líneas se abren.
 */
export function SlideTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "rac-title text-balance font-semibold leading-[0.98] tracking-[-0.03em]",
        "text-[clamp(2.25rem,6.4cqw,6.5rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Lead({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-pretty font-light leading-[1.5] tracking-[-0.005em] text-[color:color-mix(in_oklab,var(--rac-mist)_88%,transparent)]",
        "text-[clamp(.9rem,1.85cqw,1.9rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Eyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-medium uppercase tracking-[0.3em] text-[color:var(--rac-sky)]",
        "text-[clamp(.55rem,.95cqw,.95rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
