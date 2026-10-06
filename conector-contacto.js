/*
 * DGP Group USA — Conector de formularios
 * Pega esta línea en tu web (antes de </body>):
 *   <script src="https://adv.dgp-link.com/conector-contacto.js" defer></script>
 *
 * No cambia tu formulario: cuando alguien lo envía, manda una COPIA al sistema
 * (CRM + aviso por Telegram) y tu formulario sigue funcionando igual que siempre.
 * Solo copia formularios que tengan un correo o un teléfono.
 * Para que ignore un formulario, ponle el atributo data-dgp-ignorar.
 */
(function () {
  var BOT = 'https://ayudante-dgp-bot.dgpgroupusa-llc.workers.dev/contacto';
  var enviados = typeof WeakSet === 'function' ? new WeakSet() : null;
  var EXCLUIR = /^(_|password|pass|clave|g-recaptcha|recaptcha|nonce|token|cf-turnstile|wpcf7|_wp)/i;

  function etiqueta(el) {
    if (el.id) { var l = document.querySelector('label[for="' + el.id + '"]'); if (l && l.textContent.trim()) return l.textContent.trim(); }
    var p = el.closest && el.closest('label'); if (p && p.textContent.trim()) return p.textContent.trim();
    return el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.name || el.id || '';
  }
  function leer(form) {
    var datos = {}, hayContacto = false;
    var campos = form.querySelectorAll('input, textarea, select');
    for (var i = 0; i < campos.length; i++) {
      var el = campos[i], tipo = (el.type || '').toLowerCase();
      if (['password', 'hidden', 'submit', 'button', 'file', 'reset', 'image'].indexOf(tipo) >= 0) continue;
      if ((tipo === 'checkbox' || tipo === 'radio') && !el.checked) continue;
      var clave = el.name || el.id || etiqueta(el);
      if (!clave || EXCLUIR.test(clave)) continue;
      var valor = (el.value || '').trim();
      if (!valor) continue;
      // Usa la etiqueta visible si el nombre técnico no dice nada (ej. "form_fields[field_3]")
      var nombreUtil = /field|input|item|^\d+$|wpforms|\[\d+\]/i.test(clave) ? (etiqueta(el) || clave) : clave;
      datos[nombreUtil] = datos[nombreUtil] ? datos[nombreUtil] + ', ' + valor : valor;
      if (tipo === 'email' || tipo === 'tel' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor) || /(mail|correo|tel|phone|whats)/i.test(nombreUtil)) hayContacto = true;
    }
    return hayContacto ? datos : null;
  }
  function enviar(form) {
    if (!form || form.hasAttribute('data-dgp-ignorar')) return;
    if (enviados && enviados.has(form)) return;
    var datos = leer(form);
    if (!datos) return;
    if (enviados) { enviados.add(form); setTimeout(function () { enviados.delete(form); }, 8000); }
    datos.pagina = location.href;
    var cuerpo = JSON.stringify(datos);
    try {
      // sendBeacon no frena tu formulario y llega aunque la página cambie
      if (navigator.sendBeacon && navigator.sendBeacon(BOT, new Blob([cuerpo], { type: 'text/plain' }))) return;
    } catch (e) {}
    try { fetch(BOT, { method: 'POST', body: cuerpo, headers: { 'Content-Type': 'text/plain' }, keepalive: true, mode: 'no-cors' }); } catch (e) {}
  }
  // "capture" = se entera aunque el formulario envíe por su cuenta (Wix, Elementor, WPForms...)
  document.addEventListener('submit', function (e) { enviar(e.target); }, true);
  // Algunos constructores no disparan "submit": también escucha el clic del botón de enviar
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('button[type="submit"], input[type="submit"], .elementor-button[type="submit"], .wpforms-submit');
    if (b && b.form) setTimeout(function () { if (b.form.checkValidity ? b.form.checkValidity() : true) enviar(b.form); }, 50);
  }, true);
})();
