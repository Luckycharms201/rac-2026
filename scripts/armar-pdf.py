#!/usr/bin/env python3
"""Junta las capturas en un PDF de una lámina por página, y saca además un
PDF suelto por lámina en la carpeta que se pase como tercer argumento."""
import sys, glob, os, shutil
from PIL import Image

carpeta, salida = sys.argv[1], sys.argv[2]
sueltas = sys.argv[3] if len(sys.argv) > 3 else None

# Nombres legibles para los PDFs sueltos: el orden es el del deck.
NOMBRES = [
    "01-portada", "02-video", "03-que-es", "04-fechas",
    "05-retroalimentacion", "06-momentos", "07-propuesta",
    "08-agenda", "09-necesitamos", "10-cierre",
]

rutas = sorted(glob.glob(os.path.join(carpeta, "slide-*.png")))
if not rutas:
    print("✗ no hay capturas"); sys.exit(1)

# Página de 13.333 × 7.5 pulgadas — el 16:9 estándar de presentación, el
# mismo de PowerPoint. La resolución sale del ancho real de la captura, así
# que el PDF conserva cada pixel capturado en vez de remuestrear.
paginas = [Image.open(r).convert("RGB") for r in rutas]
dpi = round(paginas[0].width / 13.333)

paginas[0].save(
    salida, "PDF", save_all=True, append_images=paginas[1:],
    resolution=dpi, quality=92,
)
mb = os.path.getsize(salida) / 1048576
print(f"✓ {salida}  ·  {len(paginas)} páginas  ·  {paginas[0].width}×{paginas[0].height}px  ·  {dpi} dpi  ·  {mb:.1f} MB")

if sueltas:
    shutil.rmtree(sueltas, ignore_errors=True)
    os.makedirs(sueltas, exist_ok=True)
    for i, pagina in enumerate(paginas):
        nombre = NOMBRES[i] if i < len(NOMBRES) else f"{i+1:02d}-lamina"
        destino = os.path.join(sueltas, f"{nombre}.pdf")
        pagina.save(destino, "PDF", resolution=dpi, quality=92)
    total = sum(
        os.path.getsize(os.path.join(sueltas, f))
        for f in os.listdir(sueltas)
    ) / 1048576
    print(f"✓ {sueltas}/  ·  {len(paginas)} PDFs sueltos  ·  {total:.1f} MB")
