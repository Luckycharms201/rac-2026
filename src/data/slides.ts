import type { ComponentType } from "react";

import Cover from "@/components/deck/slides/01-cover";
import QueEs from "@/components/deck/slides/02-que-es";
import Proposito from "@/components/deck/slides/03-proposito";
import Fechas from "@/components/deck/slides/04-fechas";
import Momentos from "@/components/deck/slides/05-momentos";
import Propuesta from "@/components/deck/slides/06-propuesta";
import VeinteMinutos from "@/components/deck/slides/07-veinte-minutos";
import Cierre from "@/components/deck/slides/08-cierre";

import {
  CIERRE_PHOTO,
  COVER_PHOTOS,
  PROPOSITO_PHOTO,
  QUE_ES_PHOTO,
} from "@/data/photos";

export type SlideEntry = {
  /** Identificador estable; también es la key de la transición. */
  id: string;
  /** Rótulo del HUD. */
  title: string;
  /** Fotos que usa el slide, para precargarlas desde el anterior. */
  photoIds: string[];
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
    id: "que-es",
    title: "¿Qué es Regreso a Casa?",
    photoIds: [QUE_ES_PHOTO.id],
    Component: QueEs,
  },
  {
    id: "proposito",
    title: "Propósito",
    photoIds: [PROPOSITO_PHOTO.id],
    Component: Proposito,
  },
  {
    id: "fechas",
    title: "Fechas RAC 2026",
    photoIds: [],
    Component: Fechas,
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
    id: "veinte-minutos",
    title: "¿Cómo se verán estos 20 minutos?",
    photoIds: [],
    Component: VeinteMinutos,
  },
  {
    id: "cierre",
    title: "Cierre",
    photoIds: [CIERRE_PHOTO.id],
    Component: Cierre,
  },
];

export default SLIDES;
