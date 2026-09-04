# Regreso a Casa 2026

Presentación web tipo keynote para el programa **Regreso a Casa 2026** del
Tecnológico de Monterrey, Campus Monterrey. Ocho slides, diseñados para 16:9 y
proyección en sala.

Vite + React + TypeScript + Tailwind CSS v4, con la estructura de proyecto de
shadcn/ui. Transiciones con framer-motion.

## Cómo correrla

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción a dist/
npm run preview  # sirve dist/ para probar el build
```

Para proyectar: abre la URL, presiona **F** para pantalla completa y navega con
las flechas. El índice del slide vive en el hash (`#4`), así que puedes recargar
o abrir un slide directo sin perder el lugar.

> **Antes de la sala:** la tipografía (Inter Tight) se carga de Google Fonts. Abre
> la presentación una vez con internet para que quede en caché, o descarga los
> `.woff2` a `public/` y sirve el `@font-face` local si la sala no tiene red. Sin
> la fuente el deck sigue funcionando, pero cae al tipo del sistema.

## Atajos de teclado

| Acción | Teclas |
| --- | --- |
| Avanzar | `→` `↓` `Espacio` `PageDown` `Enter`, o **clic izquierdo** en cualquier parte |
| Retroceder | `←` `↑` `PageUp` `Backspace`, o **clic derecho** |
| Primer slide | `Home` |
| Último slide | `End` |
| Pantalla completa | `F` (`Esc` para salir) |

No hay wrap-around: en el primer slide no retrocede y en el último no avanza. Los
atajos se ignoran si el foco está en un campo de texto o si hay `Ctrl`/`Cmd`/`Alt`
presionado. El cursor se esconde tras 3 segundos sin mover el mouse.

## Cómo reemplazar las fotos

Todo lo visual sale de un solo archivo: **`src/data/photos.ts`**.

1. Copia los archivos a `public/photos/`.
2. Agrega `src` a la entrada que corresponda:

```ts
{ id: "cierre-01", label: "Grupo con el Cerro de la Silla", ratio: "4/3",
  src: "/photos/cierre-01.webp" },
```

Una entrada sin `src` se dibuja como un placeholder degradado con su `label`
encima — nunca como imagen rota — así que puedes ir reemplazando de una en una y
proyectar en cualquier momento. El tono del placeholder se deriva del `id`, de
modo que cada hueco tiene siempre el mismo azul.

Optimiza a `.webp` antes de usarlas (`cwebp -q 82 foto.jpg -o foto.webp`). Ver
`public/photos/README.md`.

Grupos de fotos en el manifiesto:

| Constante | Slide | Qué es |
| --- | --- | --- |
| `COVER_PHOTOS` | 1 · Portada | 12 imágenes del corredor 3D |
| `QUE_ES_PHOTO` | 2 · ¿Qué es…? | 1 foto vertical, panel a altura completa |
| `PROPOSITO_PHOTO` | 3 · Propósito | 1 foto vertical, panel a altura completa |
| `CIERRE_PHOTO` | 8 · Cierre | 1 foto de fondo a toda la lámina |

**Total: 15 fotos.** Las 12 de la portada llenan los dos rieles del corredor —
ambos recorren la misma secuencia, así que no hacen falta 24. El slide 1 deriva
su número de tarjetas de `COVER_PHOTOS.length`, de modo que si agregas o quitas
entradas la densidad del corredor se ajusta sola y ninguna foto queda sin usar.

La del cierre va de fondo bajo un overlay de color, así que elige una toma
abierta: el texto va encima y centrado, y tapa el centro del encuadre. El
overlay le impone el tono institucional con `mix-blend-color`, de modo que
cualquier foto —clara, oscura, cálida— acaba leyéndose azul.

El logo de la portada no pasa por el manifiesto: es
`public/logo-rac-blanco.webp` (blanco con transparencia), referenciado directo
en `01-cover.tsx`.

## Estructura

```
src/
  components/
    ui/
      image-stream-hero.tsx   corredor 3D de la portada
      photo.tsx               <Photo id="..." /> con placeholder degradado
      light-beam.tsx          haz de luz diagonal
      grain.tsx               capa de ruido
      vignette.tsx            viñeta radial
    deck/
      Deck.tsx                navegación, fullscreen, HUD, transiciones
      SlideShell.tsx          envoltura 16:9 + fondo + grano + viñeta
      photo-panel.tsx         panel de foto a sangre, desvanecido al centro
      motion.tsx              cascada de entrada (Reveal / RevealItem)
      motion-variants.ts      variantes y easing compartidos
      typography.tsx          escala tipográfica del deck
      slides/                 01-cover … 08-cierre
  data/
    photos.ts                 manifiesto de fotos
    slides.ts                 registro ordenado de los slides
  lib/utils.ts                helper cn de shadcn
```

### Cambiar el orden o el contenido

- **Orden de los slides:** `src/data/slides.ts`.
- **Texto:** cada slide es un archivo en `src/components/deck/slides/`; los datos
  tabulares (fechas, duraciones, momentos) están al inicio de cada archivo.
- **Paleta y tokens:** `src/index.css` (`--rac-ink`, `--rac-navy`, `--rac-azure`…).

Todo el layout se expresa en `cqw`/`cqh` sobre un escenario 16:9 con
`container-type: size`, así que la lámina se ve idéntica en una laptop y en el
cañón, y nunca aparece scroll.

## Agregar componentes de shadcn/ui

El proyecto está configurado con `components.json` y el alias `@/`, así que
`npx shadcn@latest add <componente>` los instala en `src/components/ui/` sin
ajustes extra.
