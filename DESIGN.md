# Sistema visual del panel ADV

Este archivo describe cómo se ve y se mueve el panel (`index.html`). Toda sección o página nueva del panel debe sentirse parte de él: **reutiliza estas piezas en vez de crear estilos nuevos**. Si hace falta algo que no existe, constrúyelo con los mismos tokens, radios, sombras y curvas de movimiento.

## Tokens (en `:root`, con variante `html.dark`)
- **Color:** `--blue` (#1438cc, acento; el usuario puede cambiarlo y existe el modo `html.mono` blanco y negro), `--black` (texto), `--white` (fondo de tarjetas), `--off` (fondos suaves), `--border`, `--text-soft`, `--text-mid`, `--green-dark`, `--amber`.
- **Significado del color:** verde = cobrado, ámbar = pendiente, rojo = vencido, azul = todo lo demás. No uses colores decorativos fuera de esto.
- **Tipografía:** Plus Jakarta Sans (interfaz) y Bebas Neue solo en detalles heredados. Las cifras usan `font-variant-numeric: tabular-nums`. Los títulos de sección van en texto normal, no en mayúsculas espaciadas.
- **Movimiento:** `--ease-out: cubic-bezier(.2,.7,.2,1)`, `--t-fast: .16s`, `--t-med: .24s`. Para entradas más largas se usa `cubic-bezier(.23,1,.32,1)`.

## Superficies
- **Tarjetas:** `.nd-c` (inicio) y `.cb-card` / `.cb-tile` (resto). Radio de 18px, fondo `var(--white)`, borde fino translúcido, sombra en capas y un brillo suave de acento en la esquina, que sale de `--acc`. En modo noche usan un degradado oscuro.
- **Encabezado de sección:** `.db-head` con `.dash-section-label`, título pequeño con una línea fina al lado.
- **Filtros tipo píldora:** `.nd-act-f button` (activo en negro, o claro en modo noche) y `.dash-period-btn`.
- **Fondo de página:** degradados radiales azules muy suaves (`#app-shell .page`) y la "aurora" animada detrás.
- **Ventanas:** `ptModal(título, subtítulo, html)` y `closePortalModal()`. Abren en 140–200 ms, sin rebote. Los formularios internos usan `.ff` (campo con `label`) y `.rd-form`.
- **Avisos:** `toast(mensaje, 'ok'|'err')`, y `toastAccion(mensaje, 'Deshacer', fn)` para acciones que se pueden revertir.
- **Estados vacíos y de carga:** `.pt-empty` / `.vacio` para vacíos, y `.sk` / `.sk-row` (skeleton con brillo) mientras carga. Nunca dejes una sección en blanco.

## Animaciones que dan vida (reutilízalas)
- **Cambio de sección:** `.page.active` entra con `pageIn2` (aparece y sube unos 10px en .42s).
- **Tarjetas:** `cardIn` y `ndSube` (aparecen subiendo, escalonadas con `animation-delay`).
- **Números que suben:** cifras con `<span class="nd-cnt" data-v="1234">` (y `data-m="1"` si es dinero) que anima `ndContar()`; el destello `ndDest` marca una cifra que cambia en vivo.
- **Gráficas:** la línea se dibuja con `pathLength="1"` + `stroke-dashoffset` (`ndTrazo`, `vtTrazo`), el área aparece después (`ndFade`), las barras crecen (`barUp`, `ndAlto`), los anillos se llenan (`ndAnillo`) y el punto de hoy late (`ndLatido`, `vtLatido`).
- **Íconos:** pequeñas animaciones al pasar el mouse (`icCampana`, `icGiro180`, `icSalto`…).
- **Siempre** respeta `@media (prefers-reduced-motion: reduce)` y desactiva las animaciones decorativas.

## Reglas al crear algo nuevo
1. Antes de escribir CSS, busca en `index.html` una clase que ya haga lo que necesitas (`grep -n "\.cb-card\|\.nd-" index.html`) y úsala.
2. Una sección nueva va dentro de `<div id="page-xxx" class="page">`, se registra en `switchPage()` y en el dock/barra, y se pinta con las mismas tarjetas, encabezados y píldoras.
3. Prueba en modo día, modo noche y modo blanco y negro, a 390 px y 1366 px.
