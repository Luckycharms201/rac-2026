import { SlideShell } from "@/components/deck/SlideShell";
import { Reveal, RevealItem } from "@/components/deck/motion";
import { Photo } from "@/components/ui/photo";
import { CIERRE_PHOTO } from "@/data/photos";

/**
 * Slide 8 — Cierre.
 * Una sola foto a toda la lámina, con el degradado del deck encima como
 * overlay de color. El overlay es opaco a propósito: el texto tiene que
 * leerse encima de la foto sea clara u oscura.
 *
 * El bloque de texto va anclado abajo y no centrado, y por eso es más
 * chico de lo que pediría un cierre. La foto tiene el mensaje escrito en
 * el chaleco —"El Tec siempre será tu casa"— justo a media altura, que
 * es donde caía el titular: centrado, el slide tapaba precisamente la
 * frase que lo justifica. Bajar el texto deja libre esa franja, y el
 * scrim local baja con él para no apagarla.
 */
export function Cierre() {
  return (
    <SlideShell
      tone="deep"
      beam={false}
      vignette={0.62}
      backdrop={
        <>
          <Photo
            id={CIERRE_PHOTO.id}
            fill
            priority
            showLabel={false}
            className="rounded-none border-0"
            imgClassName="grayscale-[.5]"
          />
          {/* Overlay de color de verdad, no un velo oscuro: `mix-blend-color`
           * se queda con la luminancia de la foto y le impone el tono
           * institucional. Un rgba encima sólo la oscurece y los verdes y
           * rojos de la foto sobreviven, así que el slide deja de leerse
           * azul en cuanto cambia la imagen. */}
          <div className="absolute inset-0 bg-[var(--rac-navy)] opacity-80 mix-blend-color" />
          {/* Y ya con el tono fijo, un velo suave para bajar el brillo. */}
          <div className="absolute inset-0 bg-[rgba(0,18,51,.34)]" />
          {/* Y el degradado del deck: azul abajo, negro arriba. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,39,107,.45)_0%,rgba(0,18,51,.18)_45%,rgba(4,7,15,.6)_100%)]" />
          {/* Scrim local detrás del texto. Sostiene el titular sobre una foto
           * clara sin tener que subir el tinte general — subirlo apagaría la
           * foto entera, que es justo lo que no queremos. */}
          <div className="absolute inset-0 bg-[radial-gradient(80%_34%_at_50%_78%,rgba(2,4,10,.66)_0%,rgba(2,4,10,.32)_55%,transparent_78%)]" />
        </>
      }
    >
      <Reveal
        stagger={0.1}
        className="flex h-full w-full flex-col items-center justify-end"
      >
        <RevealItem>
          <h2 className="rac-title max-w-[80cqw] text-center font-semibold text-[clamp(.8rem,2.3cqw,2.3rem)] leading-[1.3] tracking-[-0.02em]">
            {/* El corte deja "Regreso a Casa" al frente del segundo
             * renglón, para que el nombre del programa abra línea. */}
            Construyamos juntos una experiencia que haga de
            <br />
            Regreso a Casa el inicio de una nueva conexión con su Escuela
          </h2>
        </RevealItem>

        <RevealItem className="mt-[3.5cqh]">
          <span className="block h-px w-[14cqw] bg-[linear-gradient(to_right,transparent,color-mix(in_oklab,var(--rac-azure)_85%,transparent),transparent)]" />
        </RevealItem>
      </Reveal>
    </SlideShell>
  );
}

export default Cierre;
