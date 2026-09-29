/**
 * DGP Group — Envío de correos desde tu Gmail (Google Apps Script)
 * ─────────────────────────────────────────────────────────────────
 * El panel le pide al bot (Cloudflare) que envíe un correo; el bot llama
 * a este script, que lo manda desde TU Gmail. Así los correos salen de
 * dgpgroup.usa@gmail.com y las respuestas te llegan a tu bandeja.
 *
 * INSTALACIÓN (una sola vez, con la cuenta dgpgroup.usa@gmail.com):
 *  1. Entra a https://script.google.com → "Nuevo proyecto".
 *  2. Borra lo que aparece y pega TODO este archivo.
 *  3. Cambia CLAVE (abajo) por una clave larga inventada. La misma irá en
 *     Cloudflare como secreto EMAIL_CLAVE.
 *  4. Guarda (ícono de disco) y ponle de nombre "DGP Correo".
 *  5. Botón azul "Implementar" → "Nueva implementación" → engranaje →
 *     "Aplicación web":
 *       - Ejecutar como: Yo (dgpgroup.usa@gmail.com)
 *       - Quién tiene acceso: Cualquier usuario
 *     → "Implementar". Google pedirá permisos: "Autorizar acceso" → elige
 *     tu cuenta → "Configuración avanzada" → "Ir a DGP Correo" → "Permitir".
 *  6. Copia la "URL de la aplicación web" (termina en /exec). Esa URL va en
 *     Cloudflare como secreto EMAIL_WEBHOOK.
 *
 * Límite de Gmail: unos 100 destinatarios por día en cuentas gratuitas.
 */

const CLAVE = 'CAMBIA-ESTA-CLAVE-POR-UNA-LARGA';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.clave !== CLAVE) return responder({ ok: false, error: 'Clave incorrecta' });
    if (!d.para || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.para)) return responder({ ok: false, error: 'Correo del cliente no válido' });
    GmailApp.sendEmail(d.para, d.asunto || 'DGP Group USA', d.texto || '', {
      htmlBody: d.html || '',
      name: d.nombre || 'DGP Group USA',
      replyTo: d.responderA || Session.getActiveUser().getEmail()
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
