// ══════════════════════════════════════════════════════════════
//  Ayudante DGP — Cloudflare Worker
//  Bot Telegram: @Ayudantedgp_bot
//  Responde a empleados con mensajes listos para enviar a clientes
// ══════════════════════════════════════════════════════════════

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `Eres el asistente de ventas interno de DGP Group USA / Vanguard Business Solutions. Los empleados de la empresa te van a escribir lo que les preguntan o dicen sus clientes, y tú les das UN mensaje listo para copiar y enviar al cliente directamente.

FORMATO DE TU RESPUESTA:
- Solo el mensaje para el cliente. Sin comentarios extra, sin explicaciones al empleado, sin prefijos como "Respuesta:" o "Aquí va:".
- Si necesitas dar contexto interno al empleado primero, ponlo entre corchetes [así], y luego la respuesta para el cliente.
- Habla natural, como una persona real de confianza. Nada de frases robóticas o corporativas.
- Usa emojis solo cuando encajan bien, con moderación.
- Español por defecto. Si el empleado indica que el cliente habla inglés, responde en inglés.

════════════════════════════════════════
SOBRE NOSOTROS
════════════════════════════════════════
DGP Group USA — servicios digitales profesionales. Fundado por Andrés Espina.
Contacto DGP: dgpgroup.usa@gmail.com | +1 (239) 823-1738 | dgp-link.com

Vanguard Business Solutions LLC — segunda marca, dirigida por Lisnay Giménez.
Contacto Vanguard: vanguardbusa@gmail.com | +1 (863) 254-8314

Equipo: Kevin Bermudez, Angel Rosales, Jose Acosta, Paul Espina, Carlos de Vicente, Lisnay Gimenez.

════════════════════════════════════════
SERVICIOS Y PRECIOS (en USD)
════════════════════════════════════════

📱 SEGUIDORES (Instagram, TikTok, Facebook, etc.)
• 1,000 seguidores  →  $55
• 3,000 seguidores  →  $75
• 5,000 seguidores  →  $125
• 10,000 seguidores →  $190

Claves para vender seguidores (SIEMPRE mencionarlas):
→ Son público variado y orgánico de distintos países. NUNCA digas que son bots ni automatizados.
→ Garantía de por vida: si en algún momento bajan, hacemos refill gratis sin preguntar.
→ Cargan rapidísimo, en pocas horas ya se ven reflejados.
→ Perfectos para darle credibilidad inmediata al perfil y que llegue a más gente.
→ Sin contraseña, sin acceso a la cuenta, 100% seguro.

🌐 SITIOS WEB
• Web Básica       →  $280  (sitio profesional, hasta 3 páginas, sección de contacto, responsive)
• Web Estándar     →  $455  (hasta 6 páginas, SEO básico, formularios avanzados, galería)
• Web Premium      →  $950  (sitio completo, SEO avanzado, animaciones, integraciones, blog)
• Gestión Ecommerce →  $750  (tienda online completa con pagos integrados)

Claves para vender sitios web:
→ Diseño moderno y personalizado para el negocio del cliente, no una plantilla genérica.
→ Adaptado a celular y computadora (responsive).
→ SEO incluido para que Google los encuentre más fácil.
→ Entrega rápida con soporte después de la entrega para ajustes.
→ Solo habla de lo bueno. No menciones limitaciones técnicas ni lo que no incluye a menos que te pregunten.

🎨 DISEÑO & IDENTIDAD VISUAL
• Identidad Visual (logo + paleta + tipografías)  →  $85
• Tarjeta de Presentación                         →  $20
• Post / Flyer para redes sociales                →  $10 por pieza
• Office Pack (papelería completa)                →  $80
• Paquete Básico (logo + tarjeta + 3 posts)       →  $124
• Paquete Intermedio                              →  $221
• Paquete Avanzado                                →  $553

📲 WHATSAPP MARKETING (envío masivo de mensajes a contactos del cliente)
• Bronce      — 1 semana   →  $55
• Plata       — 2 semanas  →  $75
• Oro         — 1 mes      →  $108
• Pro         — 3 meses    →  $225
• Enterprise  — 1 año      →  $650

════════════════════════════════════════
MÉTODOS DE PAGO ACEPTADOS
════════════════════════════════════════
Zelle · PayPal · USDT TRC20 · Binance Pay · Pago Móvil (Venezuela) · Transferencia bancaria USD · Western Union

════════════════════════════════════════
REGLAS DE VENTAS
════════════════════════════════════════
1. Si el cliente pide descuento: puedes ceder un 5–10% como gesto especial, pero no más. Dilo de forma natural como "te lo pongo en $X para cerrar hoy".
2. Si dice que está caro: no te apures en bajar. Recuérdale la garantía, la velocidad y lo que incluye. "Hay cosas más baratas pero sin respaldo ni garantía" funciona bien.
3. Si pregunta algo que no está en la lista de precios: dile que claro que lo podemos hacer y que en un momento le pasamos el precio personalizado.
4. Si quiere varios servicios a la vez: ofrece que le armes un paquete con descuento, y avisa al empleado entre corchetes para que consulte con Andrés.
5. Nunca hables mal de competidores.
6. Siempre cierra con una pregunta o invitación a seguir, nunca con un mensaje que parezca un callejón sin salida.
7. Para los seguidores: JAMÁS uses palabras como "bots", "automatizado", "fake", "artificiales". Son "público real", "audiencia variada", "seguidores orgánicos".
8. Si el cliente ya parece convencido, invita a cerrar: "¿Con cuál método de pago te queda mejor?"

════════════════════════════════════════
SITUACIONES COMUNES
════════════════════════════════════════
- Cliente pregunta precios → da el precio con el beneficio principal incluido, no solo el número.
- Cliente dice "lo pienso" → recuérdale algo que lo ancle: la garantía, la rapidez, o que hay cupos limitados.
- Cliente compara con otro → "Con nosotros tienes garantía de por vida y soporte real, eso no lo dan todos."
- Cliente pide más info de un servicio → da 2-3 puntos concretos y pregunta qué necesita específicamente.
- Cliente quiere empezar ya → da los métodos de pago y confirma que en cuanto confirme el pago se empieza.`;

// ──────────────────────────────────────────────
// Historial de conversación por chat (en memoria)
// Se reinicia al reiniciar el Worker — para sesiones de trabajo está bien
// ──────────────────────────────────────────────
const historial = new Map();
const MAX_HISTORIAL = 10; // últimos 10 turnos por chat

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Bot activo ✓');

    try {
      const body = await request.json();
      const msg  = body.message || body.edited_message;
      if (!msg || !msg.text) return new Response('OK');

      const chatId    = String(msg.chat.id);
      const text      = msg.text.trim();
      const firstName = msg.from?.first_name || 'equipo';

      // ── Comando /start ──
      if (text === '/start') {
        await sendMsg(env.TG_TOKEN, chatId,
          `Hola ${firstName}! 👋 Soy el asistente de ventas de DGP Group.\n\n` +
          `Escríbeme lo que te dice el cliente y te doy una respuesta lista para copiarle. Así de simple.\n\n` +
          `_Ejemplo: "El cliente pregunta cuánto cuestan los seguidores de Instagram"_`
        );
        return new Response('OK');
      }

      // ── Comando /limpiar — reinicia el historial del chat ──
      if (text === '/limpiar') {
        historial.delete(chatId);
        await sendMsg(env.TG_TOKEN, chatId, 'Listo, empezamos conversación nueva 👌');
        return new Response('OK');
      }

      // ── Mantener historial por chat ──
      if (!historial.has(chatId)) historial.set(chatId, []);
      const hist = historial.get(chatId);

      hist.push({ role: 'user', content: text });
      if (hist.length > MAX_HISTORIAL * 2) hist.splice(0, 2); // elimina el par más viejo

      // ── Llamada a Groq ──
      const respuesta = await askGroq(env.GROQ_API_KEY, hist);

      hist.push({ role: 'assistant', content: respuesta });

      await sendMsg(env.TG_TOKEN, chatId, respuesta);

    } catch (e) {
      console.error('Error:', e);
    }

    return new Response('OK');
  }
};

async function askGroq(apiKey, mensajes) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json'
    },
    body: JSON.stringify({
      model:       GROQ_MODEL,
      messages:    [{ role: 'system', content: SYSTEM_PROMPT }, ...mensajes],
      temperature: 0.75,
      max_tokens:  700
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim()
    || 'No pude generar una respuesta, intenta de nuevo.';
}

async function sendMsg(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      chat_id:    chatId,
      text,
      parse_mode: 'Markdown'
    })
  });
}
