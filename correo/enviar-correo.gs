/**
 * DGP Global Group — Envío de correos desde info@dgpglobalgroup.com (Google Apps Script)
 * ─────────────────────────────────────────────────────────────────
 * El panel le pide al bot (Cloudflare) que envíe un correo; el bot llama
 * a este script, que lo manda desde el correo corporativo (Google Workspace).
 * Así los correos salen de info@dgpglobalgroup.com, con SPF, DKIM y DMARC
 * del dominio (no caen en spam), y las respuestas llegan a esa bandeja.
 *
 * INSTALACIÓN (una sola vez, con la cuenta info@dgpglobalgroup.com):
 *  1. Entra a https://script.google.com → "Nuevo proyecto".
 *  2. Borra lo que aparece y pega TODO este archivo.
 *  3. Cambia CLAVE (abajo) por una clave larga inventada. La misma irá en
 *     Cloudflare como secreto EMAIL_CLAVE.
 *  4. Guarda (ícono de disco) y ponle de nombre "DGP Correo".
 *  5. Botón azul "Implementar" → "Nueva implementación" → engranaje →
 *     "Aplicación web":
 *       - Ejecutar como: Yo (info@dgpglobalgroup.com)
 *       - Quién tiene acceso: Cualquier usuario
 *     → "Implementar". Google pedirá permisos: "Autorizar acceso" → elige
 *     tu cuenta → "Configuración avanzada" → "Ir a DGP Correo" → "Permitir".
 *  6. Copia la "URL de la aplicación web" (termina en /exec). Esa URL va en
 *     Cloudflare como secreto EMAIL_WEBHOOK.
 *
 * Límite de Google Workspace: unos 1.500 destinatarios por día.
 *
 * TAMBIÉN LEE LAS RESPUESTAS: el bot pregunta cada 2 horas por los correos
 * que los clientes respondieron (solo hilos que empezaron desde esta cuenta)
 * y los muestra en el panel → "Respuestas". Desde ahí se puede contestar.
 * Al actualizar, Google pide un permiso nuevo para leer Gmail: hay que aceptarlo.
 */

const CLAVE = 'CAMBIA-ESTA-CLAVE-POR-UNA-LARGA';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.clave !== CLAVE) return responder({ ok: false, error: 'Clave incorrecta' });
    if (d.accion === 'respuestas') return responder(leerRespuestas(d));
    if (d.accion === 'responder') return responder(responderCorreo(d));
    if (!d.para || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.para)) return responder({ ok: false, error: 'Correo del cliente no válido' });
    GmailApp.sendEmail(d.para, d.asunto || 'DGP Global Group', d.texto || '', {
      htmlBody: d.html || '',
      name: d.nombre || 'DGP Global Group',
      replyTo: d.responderA || 'info@dgpglobalgroup.com'
    });
    return responder({ ok: true, restantes: MailApp.getRemainingDailyQuota() });
  } catch (err) {
    return responder({ ok: false, error: String(err && err.message || err) });
  }
}

// Permite comprobar desde el navegador que la URL funciona
function doGet() {
  return responder({ ok: true, servicio: 'DGP Correo', restantes: MailApp.getRemainingDailyQuota() });
}

/* Respuestas de clientes a correos enviados desde esta cuenta (desde una fecha) */
function leerRespuestas(d) {
  const yo = Session.getEffectiveUser().getEmail().toLowerCase();
  const desde = d.desde ? new Date(d.desde) : new Date(Date.now() - 3 * 864e5);
  const dias = Math.min(30, Math.max(1, Math.ceil((Date.now() - desde.getTime()) / 864e5) + 1));
  const hilos = GmailApp.search('in:inbox -from:me newer_than:' + dias + 'd', 0, 50);
  const out = [];
  hilos.forEach(function (h) {
    const msgs = h.getMessages();
    let mio = false;
    msgs.forEach(function (m) {
      const de = m.getFrom(), correo = (de.match(/<([^>]+)>/) || [, de])[1].trim().toLowerCase();
      if (correo === yo) { mio = true; return; }
      if (!mio || m.getDate() <= desde) return;          // solo respuestas a algo que enviamos
      out.push({
        id: m.getId(), hilo: h.getId(), asunto: m.getSubject(), fecha: m.getDate().toISOString(),
        de: de.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || correo, correo: correo,
        texto: limpiarCita(m.getPlainBody()).slice(0, 4000), adjuntos: m.getAttachments().length, leido: !m.isUnread()
      });
    });
  });
  return { ok: true, respuestas: out };
}
// Quita la parte citada ("El lun... escribió:", "On Mon... wrote:", líneas con >)
function limpiarCita(t) {
  const lineas = String(t || '').replace(/\r/g, '').split('\n'), out = [];
  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i];
    if (/^(El|On) .{4,200}(escribió|wrote):?\s*$/.test(l) || /^-{2,}\s*(Original Message|Mensaje original)/i.test(l) || /^De: .+/.test(l) && /^(Enviado|Sent|Fecha|Date):/.test(lineas[i + 1] || '')) break;
    if (/^>/.test(l)) continue;
    out.push(l);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
/* Contestar desde el panel, en el mismo hilo */
function responderCorreo(d) {
  const m = GmailApp.getMessageById(d.id);
  if (!m) return { ok: false, error: 'No encontré ese correo' };
  m.reply(d.texto || '', { htmlBody: d.html || '', name: d.nombre || 'DGP Global Group' });
  m.markRead();
  return { ok: true };
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
