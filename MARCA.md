# Marca Outgo

El logotipo se usa siempre como una sola imagen. No se recompone con texto HTML ni con Poppins, Inter u otra fuente. La palabra la eligió Diego y vive en el archivo del logotipo.

## Cómo es

- **Isotipo.** Anillo lavanda `#8C7AE6`, abierto, sin cola. La flecha es menta `#2ED9C3` y sale por esa abertura. El vector es `assets/outgo-isotipo.svg`.
- **Palabra.** «outgo» en minúsculas, tinta `#2B2640`, con la forma del archivo original. Sobre fondo oscuro la palabra va en blanco `#FFFFFF`. El isotipo no cambia de color.
- **Ícono de la app.** El isotipo sobre un recuadro `#2B2640` con esquinas redondeadas. Es el favicon y el ícono de inicio.

## Archivos

| Archivo | Uso |
| --- | --- |
| `assets/outgo-logo.png` | Logotipo horizontal, fondo transparente. Encabezados. |
| `assets/outgo-logo-blanco.png` | La misma composición con la palabra en blanco. Solo sobre fondo oscuro. |
| `assets/outgo-logo-vertical.png` | Isotipo arriba y palabra abajo. Pantalla de entrada. |
| `assets/outgo-isotipo.svg` | Solo el isotipo, si no cabe el logotipo horizontal. |
| `assets/outgo-icon.svg` y los PNG 32, 180, 192 y 512 | Favicon, apple-touch-icon y manifest. |

## Cómo ponerlo

```html
<img class="outgo-logo" src="assets/outgo-logo.png" alt="outgo">
```

```css
.outgo-logo{
  height: 36px;
  width: auto;
  object-fit: contain;
}
```

- Alto fijo y ancho automático. No fijar el ancho a mano ni usar `width: 100%`, salvo la pantalla de entrada, que usa el vertical con ancho fijo y alto automático.
- `object-fit: contain`. No estirar.
- Tamaño mínimo del logotipo completo: **28px de alto**. Si no cabe, usar el isotipo, no unas siglas.
- No cambiar colores. La palabra en blanco solo cuando el fondo es oscuro.

## Dónde está

La app, la página pública, el aviso de privacidad y los términos usan el horizontal. La pantalla de entrar usa el vertical. El favicon y el ícono de la PWA usan el ícono sobre `#2B2640`.

El panel `admin-banners.html` no se edita. Los logos de los anuncios son de quien compra el espacio, no son esta marca.
