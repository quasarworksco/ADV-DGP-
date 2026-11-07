# Kit de diseño para los sitios de DGP Global Group

`kit.json` reúne skills de Claude Code que se instalan en `.claude/skills/` de cada sitio nuevo
(botón **Nuevo sitio web** del panel) o en uno existente (**Sitios web → Instalar kit de diseño**).

| Skill | Fuente | Licencia |
|---|---|---|
| frontend-design | github.com/anthropics/skills | Apache-2.0 |
| impeccable (23 comandos: init, critique, audit, polish, bolder…) | github.com/pbakaus/impeccable | Apache-2.0 |
| taste-skill (referencias de diseño) | github.com/Leonxlnx/taste-skill | MIT |
| ui-ux-pro-max (estilos, paletas, fuentes e íconos por tipo de negocio) | github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT |
| animate, improve-animations, review-animations, choreograph, emil-design-eng… | github.com/emilkowalski/skill | MIT |

Cada skill incluye su licencia. Para actualizar el kit se vuelve a generar `kit.json` desde esos repositorios.
