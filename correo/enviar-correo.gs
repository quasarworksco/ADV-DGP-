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
 */

const CLAVE = 'CAMBIA-ESTA-CLAVE-POR-UNA-LARGA';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.clave !== CLAVE) return responder({ ok: false, error: 'Clave incorrecta' });
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

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
