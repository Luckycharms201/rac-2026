# public/photos

Aquí van las fotografías reales de la presentación.

1. Copia los archivos a esta carpeta (`.webp` de preferencia, ver abajo).
2. Abre `src/data/photos.ts` y agrega `src` a la entrada correspondiente:

```ts
{ id: "cover-01", label: "Egresados llegando al campus", ratio: "3/4",
  src: "/photos/cover-01.webp" },
```

Las entradas sin `src` se dibujan como placeholder degradado, así que puedes
reemplazar de una en una sin romper nada.

## Optimiza a webp antes de subirlas

```sh
cwebp -q 82 foto-original.jpg -o cover-01.webp
```

Guía de tamaños: el corredor de la portada muestra las fotos pequeñas y en
movimiento (900 px de ancho basta); las de los slides 5 y 8 se ven grandes,
apunta a ~1800 px en el lado largo.
