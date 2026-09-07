import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  slideTransition,
  slideTransitionReduced,
} from "@/components/deck/motion-variants";
import { photoSources } from "@/data/photos";
import { preloadVideo } from "@/lib/video-preload";
import type { SlideEntry } from "@/data/slides";

/* ── el motor ─────────────────────────────────────────────────────
 * Un slide a la vez, avance lineal, sin wrap-around: en una sala uno
 * quiere saber que el siguiente clic siempre va hacia adelante y que
 * el último slide se queda quieto.
 *
 * Todo el layout cuelga de un escenario 16:9 con `container-type: size`,
 * así que cada medida en `cqw`/`cqh` es un porcentaje del escenario, no
 * del viewport: la lámina se ve idéntica en una laptop y en el cañón.
 * ─────────────────────────────────────────────────────────────── */

const CURSOR_IDLE_MS = 3000;
const HINT_MS = 4000;

const NEXT_KEYS = new Set([
  "ArrowRight",
  "ArrowDown",
  "PageDown",
  "Enter",
  " ",
  "Spacebar",
]);
const PREV_KEYS = new Set(["ArrowLeft", "ArrowUp", "PageUp", "Backspace"]);

/** ¿El foco está en un campo de texto? Entonces los atajos no aplican. */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return /^(input|textarea|select|button)$/i.test(target.tagName);
}

function slideFromHash(total: number): number {
  const raw = Number.parseInt(window.location.hash.replace("#", ""), 10);
  if (!Number.isFinite(raw)) return 0;
  return Math.min(Math.max(raw, 1), total) - 1;
}

export type DeckProps = {
  slides: SlideEntry[];
};

export function Deck({ slides }: DeckProps) {
  const total = slides.length;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* `order` sólo sube, nunca baja. Es lo que deja apilar el slide que entra
   * *encima* del que sale, en las dos direcciones de navegación — sin eso
   * AnimatePresence deja arriba al saliente y, como los fondos son opacos,
   * el cruce se ve como un parpadeo a negro en vez de un disolvido. */
  type Nav = { index: number; order: number };
  const [nav, setNav] = React.useState<Nav>(() => ({
    index: slideFromHash(total),
    order: 0,
  }));
  const { index } = nav;

  const [cursorIdle, setCursorIdle] = React.useState(false);
  const [showHint, setShowHint] = React.useState(true);

  /** Único punto de cambio de slide: recorta al rango y avanza el orden. */
  const goTo = React.useCallback(
    (resolve: (current: number) => number) => {
      setNav((current) => {
        const target = Math.min(
          Math.max(resolve(current.index), 0),
          total - 1,
        );
        return target === current.index
          ? current
          : { index: target, order: current.order + 1 };
      });
    },
    [total],
  );

  const go = React.useCallback(
    (target: number) => {
      goTo(() => target);
      setShowHint(false);
    },
    [goTo],
  );

  const next = React.useCallback(() => goTo((i) => i + 1), [goTo]);
  const prev = React.useCallback(() => goTo((i) => i - 1), [goTo]);

  /* ── fullscreen ── */
  const toggleFullscreen = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void root.requestFullscreen().catch(() => {
        /* El navegador puede negarlo si no hay gesto de usuario. */
      });
    }
  }, []);

  /* ── teclado ── */
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;

      const { key } = event;

      if (NEXT_KEYS.has(key)) {
        event.preventDefault();
        next();
      } else if (PREV_KEYS.has(key)) {
        event.preventDefault();
        prev();
      } else if (key === "Home") {
        event.preventDefault();
        go(0);
      } else if (key === "End") {
        event.preventDefault();
        go(total - 1);
      } else if (key === "f" || key === "F") {
        event.preventDefault();
        toggleFullscreen();
      } else {
        return;
      }

      setShowHint(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, next, prev, toggleFullscreen, total]);

  /* ── hash ⇄ índice ── */
  React.useEffect(() => {
    const hash = `#${index + 1}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, [index]);

  React.useEffect(() => {
    const onHashChange = () => goTo(() => slideFromHash(total));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goTo, total]);

  /* ── precarga del siguiente slide ──
   * Sólo las fotos que ya tienen archivo: los placeholders son data URIs
   * y no cruzan la red. El video pesa lo que pesan todas las fotos juntas
   * varias veces, así que empezar a bajarlo un slide antes es la
   * diferencia entre que arranque solo y que se quede pensando en la
   * sala. Va por `fetch` a un blob y no por la caché del navegador: el
   * porqué está en `video-preload.ts`. */
  React.useEffect(() => {
    const upcoming = slides[index + 1];
    if (!upcoming) return;
    for (const src of photoSources(upcoming.photoIds)) {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    }
    if (upcoming.videoSrc) void preloadVideo(upcoming.videoSrc).catch(() => {});
  }, [index, slides]);

  /* ── cursor: se esconde tras 3 s sin mover el mouse ── */
  React.useEffect(() => {
    let timer = window.setTimeout(() => setCursorIdle(true), CURSOR_IDLE_MS);

    const onMove = () => {
      setCursorIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setCursorIdle(true), CURSOR_IDLE_MS);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  /* ── hint inicial ── */
  React.useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(false), HINT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const variants = reduced ? slideTransitionReduced : slideTransition;
  const current = slides[index];

  return (
    <div
      ref={rootRef}
      onClick={next}
      onContextMenu={(event) => {
        event.preventDefault();
        prev();
      }}
      className={cn(
        "relative grid h-full w-full place-items-center overflow-hidden bg-[var(--rac-ink)] select-none",
        cursorIdle && "cursor-none",
      )}
    >
      {/* Escenario 16:9 con letterbox exacto. */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(100vw, calc(100vh * 16 / 9))",
          height: "min(100vh, calc(100vw * 9 / 16))",
          containerType: "size",
        }}
      >
        {/* `isolate` encierra los z-index crecientes de los slides en su
         * propio contexto de apilamiento, para que nunca alcancen al HUD. */}
        <div className="absolute inset-0 isolate">
          <AnimatePresence initial={false}>
            {current ? (
              <motion.div
                key={current.id}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ zIndex: nav.order, willChange: "opacity, transform" }}
              >
                <current.Component />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <Hud
          index={index}
          total={total}
          showHint={showHint}
          title={current?.title ?? ""}
        />
      </div>
    </div>
  );
}

type HudProps = {
  index: number;
  total: number;
  showHint: boolean;
  title: string;
};

/** Discreto por defecto, legible al pasar el mouse. Nunca compite con la lámina. */
function Hud({ index, total, showHint, title }: HudProps) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const progress = ((index + 1) / total) * 100;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40">
        <div className="group pointer-events-auto relative pt-[6cqh] opacity-35 transition-opacity duration-300 hover:opacity-100">
          <div className="flex items-end justify-between px-[3cqw] pb-[2.2cqh]">
            <span className="text-[clamp(.55rem,.85cqw,.8rem)] font-medium uppercase tracking-[0.3em] text-white/60 mix-blend-difference">
              {title}
            </span>
            <span className="tnum text-[clamp(.6rem,1cqw,.95rem)] font-medium tracking-[0.18em] text-white/70 mix-blend-difference">
              {pad(index + 1)} / {pad(total)}
            </span>
          </div>

          {/* Barra de progreso: 2 px reales, pegada al borde. */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-[linear-gradient(to_right,var(--rac-blue),var(--rac-azure),var(--rac-sky))] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* El hint vive en el margen de arriba: abajo chocaría con el pie de la
       * portada, y a media altura se monta sobre el título del slide en el
       * que arranques (con deep link al hash puede ser cualquiera). */}
      <AnimatePresence>
        {showHint ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 top-[1.4cqh] z-40 flex justify-center"
          >
            <span className="rounded-full border border-white/15 bg-black/45 px-[1.6cqw] py-[0.9cqh] text-[clamp(.55rem,.9cqw,.85rem)] font-light tracking-[0.16em] text-white/70 backdrop-blur-md">
              ← → para navegar · F para pantalla completa
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Deck;
