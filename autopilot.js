/*
 * DGP Global Group — Social Media Autopilot
 * Sección "Redes" para el panel de la web de cada cliente.
 * Instalación (una línea, donde quieras que aparezca):
 *   <div id="dgp-autopilot" data-cliente="ID" data-clave="CLAVE" data-lang="es"></div><script src="https://adv.dgp-link.com/autopilot.js" defer></script>
 * Solo muestra el calendario y lo publicado; las claves de Facebook e Instagram nunca llegan a la web del cliente.
 */
(function () {
  var API = 'https://ayudante-dgp-bot.dgpgroupusa-llc.workers.dev/autopilot';
  var T = {
    es: { titulo: 'Redes sociales', sub: 'Social Media Autopilot · publicaciones automáticas en Facebook e Instagram', activo: 'Activo', pausado: 'Pausado',
      de: 'de', publicados: 'publicados', cada: { 1: 'todos los días', 2: 'cada 2 días', 3: 'cada 3 días' }, a: 'a las', proxima: 'Próxima publicación',
      proximos: 'Próximas publicaciones', hechos: 'Ya publicado', vacio: 'Aún no hay publicaciones programadas. Tu equipo de DGP está preparando el contenido del mes.',
      fin: 'Se publicó todo el contenido del mes. El nuevo plan llegará pronto.', texto: 'Ver texto', ocultar: 'Ocultar texto',
      pausar: 'Pausar publicaciones', reanudar: 'Reanudar publicaciones', seguro: '¿Pausar las publicaciones automáticas? Puedes reanudarlas cuando quieras.', si: 'Sí, pausar', no: 'Cancelar',
      error: 'No se pudo cargar la sección de redes. Intenta más tarde.', por: 'Gestionado por', carrusel: 'Carrusel', fb: 'Facebook', ig: 'Instagram', hoy: 'Hoy' },
    en: { titulo: 'Social media', sub: 'Social Media Autopilot · automatic posts on Facebook and Instagram', activo: 'Active', pausado: 'Paused',
      de: 'of', publicados: 'published', cada: { 1: 'every day', 2: 'every 2 days', 3: 'every 3 days' }, a: 'at', proxima: 'Next post',
      proximos: 'Upcoming posts', hechos: 'Already published', vacio: 'No posts scheduled yet. Your DGP team is preparing this month’s content.',
      fin: 'All of this month’s content has been published. The new plan is coming soon.', texto: 'Show caption', ocultar: 'Hide caption',
      pausar: 'Pause posts', reanudar: 'Resume posts', seguro: 'Pause automatic posts? You can resume them anytime.', si: 'Yes, pause', no: 'Cancel',
      error: 'Could not load the social media section. Please try again later.', por: 'Managed by', carrusel: 'Carousel', fb: 'Facebook', ig: 'Instagram', hoy: 'Today' }
  };
  var CSS = ':host{all:initial;display:block;font-family:"Plus Jakarta Sans","DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;' +
    '--bg:#ffffff;--fg:#0f172a;--soft:#64748b;--line:#e2e8f0;--off:#f8fafc;--acc:#1438cc;--ok:#059669;--warn:#b45309;color:var(--fg)}' +
    '@media (prefers-color-scheme:dark){:host(:not([data-tema=claro])){--bg:#121b2f;--fg:#e6ebf5;--soft:#94a3b8;--line:#263352;--off:#0b1221;--acc:#8fb0ff;--ok:#34d399;--warn:#fbbf24}}' +
    ':host([data-tema=oscuro]){--bg:#121b2f;--fg:#e6ebf5;--soft:#94a3b8;--line:#263352;--off:#0b1221;--acc:#8fb0ff;--ok:#34d399;--warn:#fbbf24}' +
    '*{box-sizing:border-box;margin:0}.box{background:var(--bg);border:1px solid var(--line);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:16px}' +
    '.head{display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap}.head .t{flex:1;min-width:200px}.h{font-size:18px;font-weight:800}.s{font-size:12.5px;color:var(--soft);margin-top:2px}' +
    '.pill{font-size:11.5px;font-weight:700;border-radius:999px;padding:5px 11px;white-space:nowrap}.pill.on{background:color-mix(in srgb,var(--ok) 14%,transparent);color:var(--ok)}.pill.off{background:color-mix(in srgb,var(--warn) 14%,transparent);color:var(--warn)}' +
    '.cuentas{display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;color:var(--soft)}.cuentas b{color:var(--fg)}' +
    '.res{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;background:var(--off);border:1px solid var(--line);border-radius:14px;padding:14px}' +
    '.num{font-size:28px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1}.num small{font-size:13px;color:var(--soft);font-weight:600}.bar{height:6px;background:var(--line);border-radius:6px;overflow:hidden;margin-top:8px}.bar i{display:block;height:100%;background:var(--acc)}' +
    '.prox{font-size:13px;line-height:1.5}.prox b{display:block;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:var(--soft);font-weight:700}' +
    '.sec{font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:var(--soft);font-weight:700}' +
    '.fila{display:grid;grid-template-columns:44px 52px 1fr;gap:12px;align-items:start;padding:10px 0;border-top:1px solid var(--line)}.fila:first-of-type{border-top:none}' +
    '.dia{text-align:center;line-height:1}.dia b{display:block;font-size:20px;font-weight:800;font-variant-numeric:tabular-nums}.dia span{font-size:10px;font-weight:700;text-transform:uppercase;color:var(--soft);letter-spacing:.8px}' +
    '.img{width:52px;height:65px;object-fit:cover;border-radius:8px;border:1px solid var(--line);background:var(--off)}.fila.hecho .img{opacity:.75}' +
    '.ti{font-size:13.5px;font-weight:700;min-width:0}.mt{font-size:11.5px;color:var(--soft);margin-top:2px}.ok{color:var(--ok);font-weight:700}' +
    '.lnk{background:none;border:none;color:var(--acc);font:inherit;font-size:12px;font-weight:700;cursor:pointer;padding:4px 0}.cap{white-space:pre-line;font-size:12.5px;line-height:1.55;color:var(--fg);background:var(--off);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-top:6px;overflow-wrap:anywhere}' +
    '.btn{border:1.5px solid var(--line);background:var(--bg);color:var(--fg);border-radius:10px;padding:9px 14px;font:inherit;font-size:13px;font-weight:700;cursor:pointer}.btn.pri{background:var(--acc);border-color:var(--acc);color:#fff}' +
    '.btn:focus-visible,.lnk:focus-visible{outline:2px solid var(--acc);outline-offset:2px}.conf{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px;background:var(--off);border:1px solid var(--line);border-radius:12px;padding:10px 12px}' +
    '.vac{font-size:13px;color:var(--soft);background:var(--off);border:1px dashed var(--line);border-radius:12px;padding:14px}.pie{font-size:11px;color:var(--soft)}.pie a{color:var(--soft)}' +
    '@media (max-width:480px){.box{padding:14px}.res{grid-template-columns:1fr}}';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hoyNY() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })); }
  // Fechas estimadas de los posts pendientes (misma regla que el bot: última publicación + frecuencia, a la hora elegida)
  function fechas(d) {
    var out = [], cada = d.cadaDias || 2, dias = d.dias && d.dias.length ? d.dias : null, hoy = hoyNY(), f;
    // Avanza a la siguiente fecha válida: cada X días o solo ciertos días de la semana
    function sig(x, primera) { if (dias) { if (!primera) x.setDate(x.getDate() + 1); while (dias.indexOf(x.getDay()) < 0) x.setDate(x.getDate() + 1); } else if (!primera) x.setDate(x.getDate() + cada); }
    if (d.ultimaFecha) { f = new Date(d.ultimaFecha + 'T12:00:00'); sig(f, false); }
    else { f = new Date(hoy); if (hoy.getHours() >= d.hora) f.setDate(f.getDate() + 1); }
    var hoy0 = new Date(hoy.toDateString());
    while (f < hoy0) f.setDate(f.getDate() + 1);
    sig(f, true);
    for (var k = d.indice; k < d.cola.length; k++) { out[k] = new Date(f); sig(f, false); }
    return out;
  }
  function frecuencia(d, t, L) {
    if (d.dias && d.dias.length) { var n = L === 'es' ? ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; return d.dias.map(function (x) { return n[x]; }).join(', '); }
    return t.cada[d.cadaDias] || t.cada[2];
  }
  function hora(h, L) { var x = ((h + 11) % 12) + 1; return L === 'es' ? x + ':00 ' + (h < 12 ? 'a. m.' : 'p. m.') : x + ':00 ' + (h < 12 ? 'AM' : 'PM'); }

  function montar(el) {
    var L = el.getAttribute('data-lang') === 'en' ? 'en' : 'es', t = T[L], loc = L === 'es' ? 'es-US' : 'en-US';
    var c = el.getAttribute('data-cliente'), k = el.getAttribute('data-clave');
    var root = el.attachShadow ? el.attachShadow({ mode: 'open' }) : el;
    var estado = { d: null, abiertos: {}, confirmar: false };
    function fd(f, o) { return f.toLocaleDateString(loc, o); }
    function pintar() {
      var d = estado.d, h = '<style>' + CSS + '</style><div class="box">';
      if (!d) { root.innerHTML = h + '<div class="vac">' + (estado.err ? t.error : '…') + '</div></div>'; return; }
      var total = d.cola.length, hechos = Math.min(d.indice, total), fs = fechas(d);
      h += '<div class="head"><div class="t"><div class="h">' + t.titulo + '</div><div class="s">' + t.sub + '</div></div><span class="pill ' + (d.activo ? 'on' : 'off') + '">' + (d.activo ? t.activo : t.pausado) + '</span></div>';
      if (d.pagina || d.ig) h += '<div class="cuentas">' + (d.pagina ? '<span>' + t.fb + ': <b>' + esc(d.pagina) + '</b></span>' : '') + (d.ig ? '<span>' + t.ig + ': <b>@' + esc(d.ig) + '</b></span>' : '') + '</div>';
      if (!total) { root.innerHTML = h + '<div class="vac">' + t.vacio + '</div></div>'; return; }
      var sig = d.cola[d.indice];
      h += '<div class="res"><div><div class="num">' + hechos + ' <small>' + t.de + ' ' + total + ' ' + t.publicados + '</small></div><div class="bar"><i style="width:' + Math.round(hechos / total * 100) + '%"></i></div></div>' +
        '<div class="prox">' + (sig ? '<b>' + t.proxima + '</b>' + esc(fd(fs[d.indice], { weekday: 'long', day: 'numeric', month: 'long' })) + ', ' + hora(d.hora, L) + ' · ' + esc(sig.titulo) + '<br><span style="color:var(--soft)">' + frecuencia(d, t, L) + ' ' + t.a + ' ' + hora(d.hora, L) + '</span>' : t.fin) + '</div></div>';
      var fila = function (it, f, idx, hecho) {
        var ab = estado.abiertos[idx];
        return '<div class="fila' + (hecho ? ' hecho' : '') + '"><div class="dia"><b>' + f.getDate() + '</b><span>' + esc(fd(f, { month: 'short' })) + '</span></div>' +
          '<img class="img" src="' + esc(it.imagen) + '" alt="" loading="lazy">' +
          '<div style="min-width:0"><div class="ti">' + esc(it.titulo) + '</div><div class="mt">' + (it.formato === 'carrusel' ? t.carrusel + ' · ' : '') +
          (hecho ? '<span class="ok">' + (hecho.facebook === 'publicado' ? '✓ ' + t.fb : '') + (hecho.instagram === 'publicado' ? ' ✓ ' + t.ig : '') + '</span>' : esc(fd(f, { weekday: 'long' }))) + '</div>' +
          (it.texto ? '<button class="lnk" data-tx="' + idx + '">' + (ab ? t.ocultar : t.texto) + '</button>' + (ab ? '<div class="cap">' + esc(it.texto) + '</div>' : '') : '') + '</div></div>';
      };
      var prox = '';
      for (var i = d.indice; i < total; i++) prox += fila(d.cola[i], fs[i], i, null);
      if (prox) h += '<div><div class="sec">' + t.proximos + '</div>' + prox + '</div>';
      var hist = (d.historial || []).slice().reverse(), ph = '';
      hist.forEach(function (x) {
        var idx = -1; for (var j = 0; j < total; j++) if (d.cola[j] && (d.cola[j].imagen || '').indexOf(x.archivo) >= 0) { idx = j; break; }
        var it = idx >= 0 ? d.cola[idx] : { titulo: x.titulo, imagen: '', texto: '' };
        ph += fila(it, new Date(x.fecha + 'T12:00:00'), 'h' + idx + x.fecha, x);
      });
      if (ph) h += '<div><div class="sec">' + t.hechos + '</div>' + ph + '</div>';
      h += estado.confirmar
        ? '<div class="conf"><span style="flex:1;min-width:180px">' + t.seguro + '</span><button class="btn" data-acc="no">' + t.no + '</button><button class="btn pri" data-acc="pausa">' + t.si + '</button></div>'
        : '<div><button class="btn' + (d.activo ? '' : ' pri') + '" data-acc="' + (d.activo ? 'pedir' : 'reanudar') + '">' + (d.activo ? t.pausar : t.reanudar) + '</button></div>';
      h += '<div class="pie">' + t.por + ' <a href="https://dgpglobalgroup.com" target="_blank" rel="noopener">DGP Global Group</a></div></div>';
      root.innerHTML = h;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-tx')) { var x = b.getAttribute('data-tx'); estado.abiertos[x] = !estado.abiertos[x]; pintar(); return; }
      var acc = b.getAttribute('data-acc');
      if (acc === 'pedir') { estado.confirmar = true; pintar(); return; }
      if (acc === 'no') { estado.confirmar = false; pintar(); return; }
      if (acc === 'pausa' || acc === 'reanudar') {
        b.disabled = true;
        fetch(API + '/pausa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ c: c, k: k, activo: acc === 'reanudar' }) })
          .then(function (r) { return r.json(); }).then(function (r) { if (r.ok) { estado.d.activo = r.activo; estado.confirmar = false; } pintar(); })
          .catch(function () { b.disabled = false; });
      }
    });
    pintar();
    fetch(API + '/estado?c=' + encodeURIComponent(c) + '&k=' + encodeURIComponent(k))
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d.error) throw new Error(d.error); estado.d = d; pintar(); })
      .catch(function () { estado.err = true; pintar(); });
  }
  function iniciar() { var els = document.querySelectorAll('#dgp-autopilot,[data-dgp-autopilot]'); for (var i = 0; i < els.length; i++) if (!els[i].__dgp) { els[i].__dgp = 1; montar(els[i]); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.DGPAutopilot = { montar: iniciar };
})();
