import type { ComponentType } from "react";

import Cover from "@/components/deck/slides/01-cover";
import Video, { VIDEO_SRC } from "@/components/deck/slides/02-video";
import QueEs from "@/components/deck/slides/03-que-es";
import Fechas from "@/components/deck/slides/04-fechas";
import Retroalimentacion from "@/components/deck/slides/05-retroalimentacion";
import Momentos from "@/components/deck/slides/06-momentos";
import Propuesta from "@/components/deck/slides/07-propuesta";
import Agenda from "@/components/deck/slides/08-agenda";
import Cierre from "@/components/deck/slides/09-cierre";

import {
  CIERRE_PHOTO,
  COVER_PHOTOS,
  QUE_ES_PHOTO,
  RETRO_PHOTO,
} from "@/data/photos";

export type SlideEntry = {
  /** Identificador estable; también es la key de la transición. */
  id: string;
  /** Rótulo del HUD. */
  title: string;
  /** Fotos que usa el slide, para precargarlas desde el anterior. */
  photoIds: string[];
  /** Video del slide, si lo hay: se empieza a bajar desde el slide anterior. */
  videoSrc?: string;
  Component: ComponentType;
};

const ids = (photos: { id: string }[]) => photos.map((p) => p.id);

/** Orden de proyección. Cambiar el orden aquí cambia el deck completo. */
export const SLIDES: SlideEntry[] = [
  {
    id: "cover",
    title: "Regreso a Casa 2026",
    photoIds: ids(COVER_PHOTOS),
    Component: Cover,
  },
  {
    id: "video",
    title: "Video Regreso a Casa",
    photoIds: [],
    videoSrc: VIDEO_SRC,
    Component: Video,
  },
  {
    id: "que-es",
    title: "Regreso a Casa",
    photoIds: [QUE_ES_PHOTO.id],
    Component: QueEs,
  },
  {
    id: "fechas",
    title: "Fechas RAC 2026",
    photoIds: [],
    Component: Fechas,
  },
  {
    id: "retroalimentacion",
    title: "Retroalimentación RAC 2025",
    photoIds: [RETRO_PHOTO.id],
    Component: Retroalimentacion,
  },
  {
    id: "momentos",
    title: "Momentos clave",
    photoIds: [],
    Component: Momentos,
  },
  {
    id: "propuesta",
    title: "Propuesta: Tu Escuela Hoy",
    photoIds: [],
    Component: Propuesta,
  },
  {
    id: "agenda",
    title: "Propuesta de Agenda y Contenido",
    photoIds: [],
    Component: Agenda,
  },
  {
    id: "cierre",
    title: "Cierre",
    photoIds: [CIERRE_PHOTO.id],
    Component: Cierre,
  },
];

export default SLIDES;
