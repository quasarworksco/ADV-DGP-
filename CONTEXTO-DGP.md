# Contexto de DGP Global Group (memoria para asistentes)

Léelo antes de trabajar en cualquier repositorio de DGP, con Codex, ChatGPT, Claude u otro asistente.
Resume el negocio, los sistemas y la forma de trabajar del dueño, para no tener que explicarlo de nuevo.

> Este archivo es público: se publica con el panel y se copia a los sitios de clientes.
> No escribas aquí claves, tokens, datos de clientes, montos cobrados ni nada privado.

## El negocio
- **DGP Global Group LLC**: agencia digital. Web: https://dgpglobalgroup.com
- **Dueño:** Paúl Andrés Espina (firma de correos y emisor de facturas).
- **Clientes:** pequeños negocios latinos y americanos en EE. UU., sobre todo Florida (Miami) y Texas (Houston, Dallas). El equipo trabaja también desde Venezuela, así que el panel usa horas de Texas, Miami y Caracas.
- **Idiomas:** español e inglés. Los correos, facturas y cotizaciones salen en el idioma del cliente.
- **Contacto público:** WhatsApp +1 (239) 823-1738 · llamadas +1 (945) 302-2923 · info@dgpglobalgroup.com · 8431 NW 7th Ave, Miami, FL 33150.
- **Reseñas en Google:** https://g.page/r/CbcyuFX7hqvuEAI/review

## Servicios y precios de referencia
Son los que usa la respuesta rápida "precios" del panel; confirma en el código o con el dueño antes de cotizar.
- **Páginas web (pago único):** Básico desde $280, Estándar desde $455, Premium desde $950. Se entregan en unas 24 horas.
- **Registro de empresa (LLC)** en cualquier estado: Básico $600 y Premium $950, con fees del estado incluidos.
- **Logo y marca:** desde $320.
- **Sistemas a la medida y CRM:** se cotizan según el proyecto.
- **Recurrentes:** hosting mensual o anual, dominios .com, manejo de redes sociales y anuncios en Meta.
- **Aliados (revendedores):** contadores, oficinas de impuestos y seguros revenden webs con precio especial (por ejemplo, sitio + 1 mes de hosting $200, o + 1 año $250).
- **Referidos:** cuando un referido paga su primera factura, quien lo refirió gana $40 de saldo a favor.
- **Formas de pago:** Zelle, PayPal, Binance/USDT, transferencias, Pago Móvil y Western Union. El cliente sube su comprobante y la IA lo lee.

## Los sistemas
| Pieza | Dónde vive | Qué hace |
|---|---|---|
| **Panel ADV** | Repositorio `quasarworksco/ADV-DGP-` → https://adv.dgp-link.com (GitHub Pages) | CRM, facturación, cobros, clientes, prospectos, suscripciones, aliados, WhatsApp, llamadas, proyectos, sitios web, dominios, auditorías, redes, contenido, Meta Ads. Casi todo está en `index.html`. |
| **Páginas públicas** | Mismo repositorio | `factura-publica.html`, `cotizacion.html`, `portal.html` (portal del cliente), `encuesta.html`, `contacto.html`, `auditoria.html`. |
| **Bot "Altair"** | `ayudante-bot/worker.js` (Cloudflare Worker `ayudante-dgp-bot`) | Asistente por Telegram con voz, correos automáticos, WhatsApp, cobrador amable, briefing de los lunes, prospección diaria, creación de sitios nuevos, tareas programadas. |
| **Base de datos** | Firebase (proyecto `dgp-group`), Firestore | Documentos (facturas, recibos), clientes, cotizaciones, suscripciones, prospectos, configuración. |
| **Correo** | Google Apps Script (`correo/enviar-correo.gs`) en info@dgpglobalgroup.com | El bot envía los correos desde la cuenta corporativa. |
| **Sitios de clientes** | Un repositorio por cliente en GitHub (`quasarworksco/<nombre>`), publicado con GitHub Pages; DNS en GoDaddy | Se crean desde el panel con **Nuevo sitio web**. |
| **Imágenes** | Cloudinary | Logos, comprobantes y contenido. |

**Publicación:** al unir cambios a `main`, GitHub Pages publica el panel y Cloudflare Workers Builds publica el bot (unos 30 segundos). Las claves viven solo en Cloudflare, nunca en el código.

## Automatizaciones que ya existen
Cada una tiene su interruptor en el panel (Altair → Automatizaciones). En esa misma ventana, **Altair en vivo** muestra qué está haciendo el bot, los contadores del día, la bitácora y las próximas tareas, y **Preguntar** es un chat con Altair sobre los datos del negocio. La conversación se guarda hasta que el dueño la borra.
- Recibo por correo y WhatsApp al registrar un pago o un abono, con el saldo que queda pendiente.
- Cobrador amable: recordatorios los días 3 y 8 de atraso; el día 15 avisa para llamar.
- Vendedor nocturno: responde al instante a quien escribe en la web y arma una cotización para aprobar.
- Briefing de los lunes por Telegram, en texto y audio.
- Encuesta después de cada proyecto, invitación a reseña en Google, felicitaciones de aniversario y cumpleaños con descuento.
- Prospección: busca cada día negocios de Florida y Texas sin web (o con web de Facebook o gratuita), les envía un correo personalizado con un ejemplo del portafolio y hace seguimiento.
- Factura nueva por WhatsApp, renovación de suscripciones y hosting de aliados.
- Barra de **periodo de prueba** en un sitio de cliente desde **Sitios web** (botón del reloj de arena). Muestra "Vista previa", una cuenta regresiva y el botón "Activar mi sitio" hacia el WhatsApp de DGP; al vencer, invita a escribir. El bot sube `assets/dgp-trial.js` (copia de `kit-diseno/dgp-trial.js` del panel) y su `<script>`, y al quitarla borra los dos.
- Cerrar y abrir un sitio de cliente desde **Sitios web** (botón del candado). Muestra un aviso de "sitio temporalmente cerrado" sin borrar nada; GitHub Pages publica la rama `sitio-cerrado` y, al abrir, vuelve a la rama de antes.

## Cómo trabaja el dueño (preferencias)
- Habla en español informal y escribe rápido, con errores de tipeo: interpreta la intención. Responde en español sencillo, sin jerga técnica.
- Quiere que el asistente **lo haga todo**: programar, probar, unir a `main` y publicar, no solo explicar. Avisa con claridad qué quedó listo y qué falta.
- **No quiere que se rompa nada** de lo que ya funciona. Prueba antes de publicar y di qué se probó y qué no.
- Le gusta el diseño premium, limpio y con vida: animaciones suaves, números en vivo, modo noche cuidado, buen aspecto en celular y laptop.
- Prefiere que le propongan ideas y él elige. Ya **descartó**: la tarjeta "Qué hacer hoy", bots que lean grupos de Facebook, el buscador con clave de Google Places, listas de grupos y secuencias de seguimiento de prospectos.
- En el panel, los colores tienen significado: verde = cobrado, ámbar = pendiente, rojo = vencido, azul = lo demás.

## Decide sin preguntar de más
El dueño se cansa cuando el asistente le da muchas opciones. Por eso:
- **Decide tú** con lo que ya está en el repositorio, en este archivo, en el `AGENTS.md`, en el logo y en las recetas de abajo. Elige la mejor opción y di en una línea cuál elegiste, para que pueda cambiarla si quiere.
- **Pregunta solo lo que no se puede inventar:** datos de contacto, precios del cliente, accesos o claves. Junta todo en un solo mensaje corto, o termina el trabajo con lo que hay y al final haz una lista de lo que falta.
- **No ofrezcas menús de opciones** ("¿A, B o C?") para diseño, estructura, colores, textos o tecnología. Si de verdad hay dos caminos con consecuencias distintas, recomienda uno y explica en una frase por qué.
- Si una skill (por ejemplo, la entrevista de `init` o `shape` de Impeccable) pide preguntar, saca las respuestas del brief, de este archivo y del sitio. Pregunta como máximo una vez y solo lo imprescindible.

## Coherencia visual: una página nueva es parte del mismo sitio
Cualquier página o sección nueva (`/admin`, `/entrega`, una sección del panel, una landing) debe verse y moverse igual que la página principal. **No inventes un estilo nuevo.**
1. **Antes de diseñar,** abre la página principal y saca su sistema:
   - variables CSS (colores, radios, sombras),
   - fuentes,
   - componentes (botones, tarjetas, encabezados, formularios, ventanas),
   - `@keyframes`, transiciones y curvas de movimiento.

   Si existe `DESIGN.md`, síguelo. Si no existe, créalo con eso antes de construir.
2. **Reutiliza esas mismas piezas.** Si el sitio tiene el CSS dentro de `index.html`, mueve lo compartido a `assets/estilos.css` (y el movimiento a `assets/animaciones.js`) y cárgalo en las dos páginas, para no copiarlo a mano.
3. **Lleva también las animaciones y los flujos:** entradas al hacer scroll, hover, transiciones entre vistas, números que suben, estados de carga con skeleton y avisos (toasts). Un panel `/admin` no es una tabla plana: tarjetas, transiciones suaves y modo noche si el sitio lo tiene.
4. **Al terminar,** compara lado a lado la página nueva con la principal, en celular y en escritorio. Si se nota que son de "otro sitio", corrígelo.

## Recetas por defecto (úsalas salvo que el repositorio ya haga otra cosa)
- **Panel `/admin` de un sitio de cliente** (es el "panel admin con CRM" que se vende en el Paquete Avanzado):
  - **Archivo:** `admin/index.html`, en el idioma del sitio. Lleva `noindex` y no aparece en el menú.
  - **Diseño:** el mismo sistema visual del sitio principal (ver "Coherencia visual"): sus colores, fuentes, tarjetas, botones, animaciones y transiciones.
  - **Acceso:** inicio de sesión con correo y contraseña (Firebase Authentication).
  - **Datos:** Firestore; imágenes en Cloudinary.
  - **Secciones:**
    1. **Resumen:** mensajes nuevos de la semana y accesos rápidos.
    2. **Mensajes / CRM:** cada envío del formulario de contacto, con estado (nuevo, contactado, cliente o descartado), notas y botón de WhatsApp.
    3. **Contenido:** textos principales, servicios o productos con precio, y galería, que el sitio público lee y muestra.
    4. **Ajustes:** teléfono, WhatsApp, correo, dirección, horario y redes.
  - **Configuración pendiente:** el proyecto de Firebase y las cuentas de acceso las crea el dueño. Deja la configuración en un solo lugar (`admin/config.js`) y al final explica en pasos cortos qué debe pegar ahí. Las reglas de Firestore deben permitir leer solo el contenido público y escribir solo con sesión.
- **Formulario de contacto:** guarda en la colección `mensajes` de Firestore si el sitio tiene `/admin`. Si no, usa un enlace de WhatsApp con el mensaje armado.
- **Sitio bilingüe:** botón ES/EN que recuerda la elección y textos traducidos de verdad, no con traductor automático.
- **Página `/entrega`:** sigue lo que diga el `AGENTS.md` del sitio.

## Reglas para los sitios de clientes
- Diseño premium basado en el logo del cliente, **sin emojis** (solo íconos SVG), mobile first, SEO básico, botón de WhatsApp.
- Pie de página: "Diseñado por DGP Global Group" con enlace a https://dgpglobalgroup.com
- Al terminar se crea la página `/entrega` para mostrarle al cliente lo que se le entregó.
- **CSS listo para la barra de prueba de DGP:** suma `var(--dgp-trial-h,0px)` a todo lo que esté fijo arriba o dependa de esa altura: `top` del header fijo, `scroll-padding-top`, `padding-top` del hero, la barra de progreso de scroll y el enlace "saltar al contenido". Con el valor por defecto 0px no cambia nada. La barra la pone y la quita el panel; no la agregues a mano.
- El detalle de cada sitio está en su `AGENTS.md`.

## Cuidado en pruebas
- No dispares correos, WhatsApp, cobros ni tareas programadas reales al probar.
- No escribas claves ni datos de clientes en archivos del repositorio.
