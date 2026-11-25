# Desarrollo web en DGP

- Al retomar un sitio, revisa su AGENTS.md o CLAUDE.md, PRODUCT.md, DESIGN.md, el kit de marca y las páginas relevantes. Conserva el comportamiento, idiomas, URLs, contenido y decisiones visuales existentes dentro del alcance que indique el usuario.
- Para un sitio nuevo, documenta las reglas propias del repositorio en AGENTS.md. Usa PRODUCT.md para público, objetivos y restricciones, y DESIGN.md para identidad visual, componentes, tipografía, color y movimiento cuando hagan falta. Conserva las reglas de Claude que todavía apliquen al migrar un proyecto.
- Usa Impeccable para dirección visual, crítica y pulido. Ejecuta `./.agents/skills/impeccable/scripts/impeccable context` desde la raíz del repositorio. Usa UI/UX Pro Max para investigar patrones, accesibilidad y diseño responsive, y Emil Design Engineering para decidir y ajustar interacciones y movimiento.
- Las tres skills están disponibles en `.agents/skills/`. Usa `python3 .agents/skills/ui-ux-pro-max/scripts/search.py` para consultar la base de UI/UX Pro Max. Si la sesión no muestra una skill en el selector, abre su `SKILL.md` y sigue sus referencias.
- Comprueba el resultado en navegador a tamaños móvil y escritorio. Revisa navegación por teclado, foco, contraste, estados interactivos y movimiento reducido según el alcance. Comprueba el flujo principal y ejecuta la compilación del proyecto cuando aplique.
- Para validar integraciones, usa servicios de prueba. Mantén las credenciales fuera de archivos de trabajo y evita disparar envíos, cobros o tareas programadas de producción durante pruebas locales.

# Este repositorio: panel ADV de DGP Global Group

- Lee primero `CONTEXTO-DGP.md`: resume el negocio, los sistemas y cómo prefiere trabajar el dueño. Respóndele en español sencillo.
- Decide sin darle menús de opciones al dueño; pregunta solo lo que no se puede inventar (ver "Decide sin preguntar de más" en `CONTEXTO-DGP.md`).
- **Panel** (https://adv.dgp-link.com): `index.html` es una sola página con todo el CSS y JS. No tiene paso de compilación. GitHub Pages publica la rama `main`.
- **Diseño del panel:** sigue `DESIGN.md`, que tiene los tokens, tarjetas, ventanas, avisos y animaciones que ya existen. Toda sección nueva reutiliza esas piezas; no crees estilos paralelos.
- **Páginas públicas:** `factura-publica.html`, `cotizacion.html`, `portal.html`, `encuesta.html`, `contacto.html` y `auditoria.html`. Los clientes las abren con un `?id=` en el enlace.
- **Bot:** `ayudante-bot/worker.js` es el Cloudflare Worker `ayudante-dgp-bot`. Cloudflare Workers Builds lo publica al unir a `main`.
  - Hay dos configuraciones: `ayudante-bot/wrangler.toml` y `wrangler.toml` en la raíz, que apunta al mismo worker. Si cambias una, cambia la otra igual: bindings, KV y `crons`.
  - Las claves (`TG_TOKEN`, `EMAIL_WEBHOOK`, `GH_TOKEN`…) viven solo en Cloudflare.
- **Datos:** Firebase Firestore, proyecto `dgp-group`; reglas en `firestore.rules`. El panel lee y escribe directo desde el navegador con la sesión del equipo.
- **Sitios nuevos de clientes:** `crearSitio()` e `instalarKit()` en `ayudante-bot/worker.js` crean el repositorio y le suben estas piezas:
  - `index.html`, `AGENTS.md` (brief del sitio) y `CLAUDE.md` (que importa `AGENTS.md`).
  - `CONTEXTO-DGP.md` y el kit de diseño de `kit-diseno/kit.json`, copiado en `.claude/skills/` y en `.agents/skills/`.

  Si cambias `CONTEXTO-DGP.md` o el kit, los sitios nuevos lo reciben solos porque el bot los lee desde adv.dgp-link.com.
- **Altair en vivo:** las tareas del bot se anotan con `conAltair(env, clave, texto, fn, resumen)` y los eventos sueltos con `altNota(env, texto, tipo, cuenta)` (en `altair/estado`, `altairLog` y `altairDias`). Una tarea nueva del bot debe anotarse igual, para que aparezca en la ventana de Altair del panel. Las anotaciones nunca deben frenar ni romper la tarea.
- **Barra de periodo de prueba:** `kit-diseno/dgp-trial.js` es la versión oficial. `pruebaSitio()` en el bot la copia a `assets/dgp-trial.js` del sitio y agrega o quita su `<script>`. Si la cambias, prueba que no se encime en 320–1366 px, en los dos idiomas y vencida.
- **Comprobaciones antes de publicar:**
  - `node --check ayudante-bot/worker.js`
  - Para el bot: `npx wrangler deploy --dry-run` (en la raíz y en `ayudante-bot/`).
  - Abrir en el navegador, a 390 px y 1366 px, las páginas que cambiaste, sin errores en la consola.
  - No ejecutes tareas del bot que envíen correos, WhatsApp o Telegram reales.
- **Al terminar:**
  - Commits en español que digan qué cambió para el usuario.
  - Une a `main` solo lo que hayas probado.
  - Cuéntale al dueño qué se probó y qué no.
