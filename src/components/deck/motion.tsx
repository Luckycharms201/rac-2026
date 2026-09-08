import type * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SHOT } from "@/lib/print";
import {
  revealContainer,
  revealItem,
  revealItemReduced,
} from "@/components/deck/motion-variants";

type RevealProps = React.ComponentProps<typeof motion.div> & {
  /** Segundos entre hijos. @default 0.08 */
  stagger?: number;
  /** Retraso antes del primer hijo. @default 0.18 */
  delay?: number;
};

/** Contenedor de una cascada. Sus `<RevealItem>` entran uno tras otro. */
export function Reveal({
  stagger = 0.08,
  delay = 0.18,
  className,
  children,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      /* En modo captura la cascada nace terminada: si no, el screenshot
       * agarra la lámina a media entrada. */
      initial={SHOT ? false : "hidden"}
      animate="show"
      variants={revealContainer(reduced ? 0.03 : stagger, reduced ? 0 : delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = React.ComponentProps<typeof motion.div>;

/** Un escalón de la cascada. */
export function RevealItem({ className, children, ...props }: RevealItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={reduced ? revealItemReduced : revealItem}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
