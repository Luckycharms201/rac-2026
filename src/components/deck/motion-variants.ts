import type { Variants } from "framer-motion";

/** Easing del deck. Arranca rápido y aterriza largo: se lee como inercia. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Transición entre slides: crossfade con un empujón vertical mínimo. */
export const slideTransition: Variants = {
  enter: { opacity: 0, y: 10, scale: 1.02 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: { duration: 0.42, ease: EASE },
  },
};

export const slideTransitionReduced: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

/* ── entrada escalonada ───────────────────────────────────────────
 * Cada slide arranca sus elementos en cascada de 80 ms: título,
 * cuerpo, tarjetas. El `delayChildren` deja que el crossfade avance
 * un poco antes de que empiece la cascada; sin ese respiro las dos
 * animaciones se pisan y el slide entra sucio. */

export function revealContainer(stagger = 0.08, delay = 0.18): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const revealItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};
