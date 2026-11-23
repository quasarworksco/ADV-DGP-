# Kit de diseño para los sitios de DGP Global Group

`kit.json` reúne skills de diseño que se instalan en cada sitio nuevo (botón **Nuevo sitio web** del panel)
o en uno existente (**Sitios web → Instalar kit de diseño**). Se copian en dos carpetas con el mismo contenido:
`.agents/skills/` para Codex y `.claude/skills/` para Claude Code.

Junto con el kit, el bot agrega `CONTEXTO-DGP.md` (la memoria del negocio, desde la raíz de este repositorio) y,
si el sitio solo tenía `CLAUDE.md`, crea `AGENTS.md` con el mismo brief y deja `CLAUDE.md` importándolo.

| Skill | Fuente | Licencia |
|---|---|---|
| frontend-design | github.com/anthropics/skills | Apache-2.0 |
| impeccable (23 comandos: init, critique, audit, polish, bolder…) | github.com/pbakaus/impeccable | Apache-2.0 |
| taste-skill (referencias de diseño) | github.com/Leonxlnx/taste-skill | MIT |
| ui-ux-pro-max (estilos, paletas, fuentes e íconos por tipo de negocio) | github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT |
| animate, improve-animations, review-animations, choreograph, emil-design-eng… | github.com/emilkowalski/skill | MIT |

`dgp-trial.js` es la barra de periodo de prueba que el panel pone y quita en los sitios (Sitios web → reloj de arena).

Cada skill incluye su licencia. Para actualizar el kit se vuelve a generar `kit.json` desde esos repositorios.
