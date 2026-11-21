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
Cada una tiene su interruptor en el panel (Altair → Automatizaciones).
- Recibo por correo y WhatsApp al registrar un pago o un abono, con el saldo que queda pendiente.
- Cobrador amable: recordatorios los días 3 y 8 de atraso; el día 15 avisa para llamar.
- Vendedor nocturno: responde al instante a quien escribe en la web y arma una cotización para aprobar.
- Briefing de los lunes por Telegram, en texto y audio.
- Encuesta después de cada proyecto, invitación a reseña en Google, felicitaciones de aniversario y cumpleaños con descuento.
- Prospección: busca cada día negocios de Florida y Texas sin web (o con web de Facebook o gratuita), les envía un correo personalizado con un ejemplo del portafolio y hace seguimiento.
- Factura nueva por WhatsApp, renovación de suscripciones y hosting de aliados.

## Cómo trabaja el dueño (preferencias)
- Habla en español informal y escribe rápido, con errores de tipeo: interpreta la intención. Responde en español sencillo, sin jerga técnica.
- Quiere que el asistente **lo haga todo**: programar, probar, unir a `main` y publicar, no solo explicar. Avisa con claridad qué quedó listo y qué falta.
- **No quiere que se rompa nada** de lo que ya funciona. Prueba antes de publicar y di qué se probó y qué no.
- Le gusta el diseño premium, limpio y con vida: animaciones suaves, números en vivo, modo noche cuidado, buen aspecto en celular y laptop.
- Prefiere que le propongan ideas y él elige. Ya **descartó**: la tarjeta "Qué hacer hoy", bots que lean grupos de Facebook, el buscador con clave de Google Places, listas de grupos y secuencias de seguimiento de prospectos.
- En el panel, los colores tienen significado: verde = cobrado, ámbar = pendiente, rojo = vencido, azul = lo demás.

## Reglas para los sitios de clientes
- Diseño premium basado en el logo del cliente, **sin emojis** (solo íconos SVG), mobile first, SEO básico, botón de WhatsApp.
- Pie de página: "Diseñado por DGP Global Group" con enlace a https://dgpglobalgroup.com
- Al terminar se crea la página `/entrega` para mostrarle al cliente lo que se le entregó.
- El detalle de cada sitio está en su `AGENTS.md`.

## Cuidado en pruebas
- No dispares correos, WhatsApp, cobros ni tareas programadas reales al probar.
- No escribas claves ni datos de clientes en archivos del repositorio.
