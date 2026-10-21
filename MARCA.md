# Marca Outgo

El logotipo se ve siempre igual que el original: isotipo a la izquierda y la palabra «outgo» a la derecha.

## Cómo es

- **Isotipo.** Anillo lavanda `#8C7AE6`, abierto, sin cola. La flecha es menta `#2ED9C3` y sale por esa abertura.
- **Palabra.** «outgo» en minúsculas, tinta `#2B2640`, con la misma forma de letra del logotipo original. No se escribe con Poppins, Inter ni ninguna otra fuente.
- Esas tres piezas viven en **un solo archivo**. No se vuelven a armar con texto HTML ni con CSS.

## Archivos

| Archivo | Uso |
| --- | --- |
| `assets/outgo-logo.svg` | Logotipo horizontal. Es el que se usa en la interfaz. |
| `assets/outgo-logo.png`, `@2x`, `@3x` | El mismo dibujo, por si el SVG no carga. |
| `assets/outgo-logo-blanco.svg` | Igual, pero la palabra en blanco `#FFFFFF`. Solo sobre fondo oscuro. El isotipo no cambia de color. |
| `assets/outgo-mark.svg` y sus PNG | Solo el isotipo, el mismo dibujo recortado al ícono. |

## Cómo ponerlo

```html
<img class="outgo-logo" src="assets/outgo-logo.svg" alt="outgo">
```

```css
.outgo-logo{
  height: 36px;      /* fijo */
  width: auto;       /* sale de la proporción del archivo */
  object-fit: contain;
}
```

- Alto fijo y ancho automático. No fijar el ancho a mano ni usar `width: 100%`.
- `object-fit: contain`. No estirar.
- El archivo ya trae aire alrededor (el mismo hueco que hay entre el isotipo y la palabra). No recortarlo con márgenes negativos.
- Tamaño mínimo del logotipo completo: **28px de alto**. Si no cabe, usar el isotipo (`outgo-mark.svg`), no una versión distinta ni unas siglas.
- No cambiar colores. La única excepción es `outgo-logo-blanco.svg` cuando el fondo es oscuro.

## Dónde está

Inicio de la app, la pantalla de entrar, la página pública, el aviso de privacidad y los términos usan `outgo-logo.svg`. El favicon y el ícono de inicio en el celular usan el isotipo, porque ahí no cabe el logotipo horizontal.

El panel `admin-banners.html` no se edita: sigue con el texto anterior. Los logos de los anuncios son de quien compra el espacio, no son esta marca.
