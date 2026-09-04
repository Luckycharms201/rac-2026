/* ──────────────────────────────────────────────────────────────
 * MANIFIESTO DE FOTOS — Regreso a Casa 2026
 *
 * Todo lo visual del deck sale de aquí. Para publicar:
 *   1. Coloca los archivos en `public/photos/`.
 *   2. Agrega `src` a cada entrada, p. ej. src: "/photos/cover-01.webp".
 * Una entrada sin `src` se dibuja como placeholder degradado (nunca
 * como imagen rota), así que puedes ir reemplazando de una en una.
 *
 * El campo `label` describe qué foto va en ese hueco, y es el texto
 * que se ve sobre el placeholder mientras no haya archivo.
 * ────────────────────────────────────────────────────────────── */

export type Photo = {
  id: string;
  label: string; // qué va aquí, en español, para que yo sepa qué reemplazar
  ratio: string; // "4/3", "16/9", "3/4", "1/1"
  src?: string; // undefined = placeholder
};

/* ── Portada (slide 1): 12 imágenes para el corredor ──────────── */
export const COVER_PHOTOS: Photo[] = [
  { id: "cover-01", label: "Egresados llegando al campus", ratio: "3/4" },
  { id: "cover-02", label: "Abrazo de reencuentro", ratio: "3/4" },
  { id: "cover-03", label: "Rectoría al atardecer", ratio: "3/4" },
  { id: "cover-04", label: "Cena de gala, brindis", ratio: "3/4" },
  { id: "cover-05", label: "Generación posando en el Mural", ratio: "3/4" },
  { id: "cover-06", label: "Tour por el campus", ratio: "3/4" },
  { id: "cover-07", label: "Aula llena en Clase de Recuerdo", ratio: "3/4" },
  { id: "cover-08", label: "Cerro de la Silla desde el campus", ratio: "3/4" },
  { id: "cover-09", label: "Familias en el registro", ratio: "3/4" },
  { id: "cover-10", label: "Borregos en la explanada", ratio: "3/4" },
  { id: "cover-11", label: "Detalle de gafete y bienvenida", ratio: "3/4" },
  { id: "cover-12", label: "Foto de generación al cierre", ratio: "3/4" },
];

/* ── Slide 5: Momentos clave ──────────────────────────────────── */
export const MOMENTOS_PHOTOS: Photo[] = [
  { id: "momentos-dia-1", label: "Cena de gala, viernes", ratio: "16/9" },
  { id: "momentos-dia-2", label: "Tour por el campus, sábado", ratio: "16/9" },
];

/* ── Slide 8: Cierre ──────────────────────────────────────────── */
export const CIERRE_PHOTOS: Photo[] = [
  { id: "cierre-01", label: "Grupo con el Cerro de la Silla", ratio: "4/3" },
  { id: "cierre-02", label: "Generación frente al Mural", ratio: "4/3" },
  { id: "cierre-03", label: "Egresados en el evento", ratio: "4/3" },
];

/** Registro plano de todas las fotos, indexado por id. */
export const PHOTOS: readonly Photo[] = [
  ...COVER_PHOTOS,
  ...MOMENTOS_PHOTOS,
  ...CIERRE_PHOTOS,
];

const BY_ID = new Map(PHOTOS.map((p) => [p.id, p]));

/** Devuelve la entrada del manifiesto, o una vacía si el id no existe. */
export function getPhoto(id: string): Photo {
  return BY_ID.get(id) ?? { id, label: "Foto pendiente", ratio: "4/3" };
}

/* ── Placeholders deterministas ────────────────────────────────
 * El tono sale del id, no de un random: el mismo hueco tiene siempre
 * el mismo azul entre recargas, y dos huecos vecinos casi nunca
 * coinciden. Así el deck se ve compuesto aunque no haya una sola
 * foto real todavía. */

function hash(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type PlaceholderTones = {
  from: string;
  via: string;
  to: string;
  angle: number;
};

/** Paleta de un placeholder, derivada del id. */
export function placeholderTones(id: string): PlaceholderTones {
  const h = hash(id);
  // Ventana estrecha de azules: institucional arriba, casi negro abajo.
  // Estrecha de verdad — abrirla más de ~20° manda las sombras al cian y
  // los huecos dejan de leerse como parte de la misma paleta.
  const hue = 210 + (h % 20);
  const lift = ((h >> 5) % 12) - 4;
  const angle = 118 + ((h >> 9) % 62);
  return {
    from: `hsl(${hue} 74% ${34 + lift}%)`,
    via: `hsl(${hue - 4} 80% ${19 + lift * 0.5}%)`,
    to: `hsl(${hue + 4} 68% ${9 + lift * 0.3}%)`,
    angle,
  };
}

/**
 * Placeholder como data URI. Lo necesita el corredor de la portada, que
 * pide un `src` de verdad; los slides usan `<Photo />`, que dibuja el
 * placeholder en DOM y puede mostrar el label.
 */
export function placeholderDataUri(id: string): string {
  const { from, via, to, angle } = placeholderTones(id);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="480" viewBox="0 0 360 480"><defs><linearGradient id="g" gradientTransform="rotate(${angle} .5 .5)"><stop offset="0%" stop-color="${from}"/><stop offset="55%" stop-color="${via}"/><stop offset="100%" stop-color="${to}"/></linearGradient><radialGradient id="b" cx="30%" cy="22%" r="70%"><stop offset="0%" stop-color="rgba(255,255,255,.16)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><rect width="360" height="480" fill="url(#g)"/><rect width="360" height="480" fill="url(#b)"/><rect x="1" y="1" width="358" height="478" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="2"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/** Imágenes listas para `<ImageStreamHero images={...} />`. */
export function streamImages(photos: Photo[] = COVER_PHOTOS) {
  return photos.map((p) => ({
    src: p.src ?? placeholderDataUri(p.id),
    alt: "",
  }));
}

/** Rutas reales a precargar en un slide (las que ya tienen archivo). */
export function photoSources(ids: string[]): string[] {
  return ids
    .map((id) => getPhoto(id).src)
    .filter((src): src is string => Boolean(src));
}
