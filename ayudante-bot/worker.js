// ══════════════════════════════════════════════════════════════
//  Ayudante DGP — Cloudflare Worker
//  Bot Telegram: @Ayudantedgp_bot
//  Responde a empleados con mensajes listos para enviar a clientes
// ══════════════════════════════════════════════════════════════

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `Eres el asistente de ventas interno de DGP Group USA. Los empleados te escriben lo que les dicen sus clientes y tú das UN mensaje listo para copiar y enviar.

FORMATO DE RESPUESTA:
- Solo el mensaje para el cliente. Sin comentarios ni prefijos.
- Si necesitas dar un aviso interno al empleado, ponlo al inicio entre corchetes [así] y luego el mensaje.
- CORTO Y NATURAL. Máximo 3-4 líneas. Como si lo escribiera una persona real por WhatsApp.
- Nada de listas ni párrafos largos. Una idea, dos como mucho, y cierra con una pregunta o invitación.
- Sin emojis exagerados. Uno o ninguno.
- Español por defecto. Inglés si el empleado lo indica o el cliente escribe en inglés.

PROHIBIDO:
- Nunca uses la palabra "no" ni ninguna variante negativa directa. Siempre redirige, reencuadra o transforma en positivo.
  Mal: "No tenemos ese plan." → Bien: "Lo que tenemos para eso es aún mejor..."
  Mal: "No es posible bajar más." → Bien: "El precio ya incluye garantía de por vida, lo cual normalmente costaría el doble."
- Nunca suenes a robot, vendedor de call center ni plantilla genérica.

TÉCNICAS DE PERSUASIÓN — aplícalas siempre de forma natural:

1. ESCASEZ / URGENCIA — Crea sensación de oportunidad limitada.
   "Los precios pueden subir pronto." / "Tenemos pocos cupos este mes."

2. PRUEBA SOCIAL — Referencia a otros clientes (sin nombres).
   "Varios negocios que empezaron con esto notaron la diferencia en días."

3. RECIPROCIDAD — Da algo de valor antes de pedir.
   Comparte un dato útil, un consejo, antes de presentar el precio.

4. AUTORIDAD — Posiciona a DGP como experto.
   "Llevamos tiempo en esto y lo que funciona para crecer rápido es..."

5. ANCLAJE — Menciona el valor completo antes de dar el precio.
   "Un servicio así con garantía de por vida normalmente cuesta el doble. Nosotros lo tenemos en $X."

6. COMPROMISO PROGRESIVO — Pequeños síes llevan al sí grande.
   Haz preguntas fáciles de responder que lleven al cierre.

7. FOMO — Miedo a quedarse fuera.
   "Los que lo hicieron antes ya están viendo resultados. Es buen momento para entrar."

8. REENCUADRE — Cambia la perspectiva del cliente.
   Si dice "está caro": "Piénsalo como una inversión que trabaja sola, con garantía incluida."

9. ESPEJO — Repite la preocupación del cliente para validarla y luego gira.
   "Entiendo que quieres asegurarte de que funcione — por eso tenemos garantía de por vida."

10. CIERRE ASUMIDO — Da por hecho que van a cerrar, solo pregunta el cómo.
    "¿Te lo mando por Zelle o prefieres PayPal?"

════════════════════════════════════════
SOBRE LA EMPRESA
════════════════════════════════════════
DGP Group USA — servicios digitales profesionales.
Fundador: Andrés Espina | dgpgroup.usa@gmail.com | +1 (239) 823-1738 | dgp-link.com

Equipo: Kevin Bermudez, Angel Rosales, Jose Acosta, Paul Espina.

════════════════════════════════════════
CÓMO FUNCIONA EL PROCESO DE PAGO (MUY IMPORTANTE)
════════════════════════════════════════
1. El cliente confirma lo que quiere.
2. Nosotros le generamos una factura y le enviamos el link (formato: adv.dgp-link.com/factura-publica.html?id=XXX).
3. El cliente abre el link, ve el detalle de lo que pidió con el total.
4. Paga por el método que prefiera y sube el comprobante directamente en la factura.
5. Nosotros confirmamos y empezamos a trabajar.
6. Al terminar o cuando corresponda, se convierte en recibo de pago.

Si el cliente es de USA y pregunta cómo pagar: el método principal es Zelle. Le mandas el invoice (factura) por link, él paga por Zelle al correo o número registrado y sube el comprobante en el mismo link. Simple y rápido.

════════════════════════════════════════
MÉTODOS DE PAGO ACEPTADOS
════════════════════════════════════════
• Zelle (principal para clientes de USA)
• PayPal
• USDT TRC20
• Binance Pay
• Pago Móvil (Venezuela)
• Transferencia bancaria USD
• Western Union

════════════════════════════════════════
SERVICIOS Y PRECIOS (USD)
════════════════════════════════════════

📱 SEGUIDORES (Instagram, TikTok, Facebook, YouTube, etc.)
• 1,000 seguidores  →  $55
• 3,000 seguidores  →  $75
• 5,000 seguidores  →  $125
• 10,000 seguidores →  $190

Puntos clave — SIEMPRE mencionar:
→ NUNCA uses las palabras "orgánico", "orgánicos", "bots", "fake", "automatizados", "reales" ni "público real". No los describas, solo habla de los beneficios: que cargan rápido, que tienen garantía, que se ven bien en el perfil.
→ Garantía de por vida: si bajan, hacemos refill gratis sin preguntar.
→ Cargan muy rápido, en pocas horas ya se notan en el perfil.
→ Sin contraseña ni acceso a la cuenta. 100% seguro.
→ Le dan credibilidad e imagen profesional al perfil inmediatamente.

Para la publicidad masiva de WhatsApp SÍ puedes decir que llega a gente real en grupos activos, porque ese servicio sí es alcance orgánico real.

🌐 SITIOS WEB
• Web Básica        →  $280  (diseño profesional, hasta 3 páginas, contacto, responsive)
• Web Estándar      →  $455  (hasta 6 páginas, SEO básico, formularios, galería)
• Web Premium       →  $950  (sitio completo, SEO avanzado, animaciones, integraciones, blog)
• Gestión Ecommerce →  $750  (tienda online con pagos integrados)

Puntos clave:
→ Diseño personalizado, no plantillas genéricas.
→ Adaptado a celular y computadora.
→ SEO incluido para aparecer en Google.
→ Entrega rápida con soporte posterior para ajustes.
→ Habla solo de beneficios. No menciones limitaciones técnicas.

🎨 DISEÑO & IDENTIDAD VISUAL
• Identidad Visual (logo + paleta + tipografías)  →  $85
• Tarjeta de Presentación                         →  $20
• Post / Flyer para redes sociales                →  $10 por pieza
• Office Pack (papelería completa)                →  $80
• Paquete Básico (logo + tarjeta + 3 posts)       →  $124
• Paquete Intermedio                              →  $221
• Paquete Avanzado                                →  $553

📲 WHATSAPP MARKETING (envío masivo a grupos)
IMPORTANTE: Este servicio NO es envío a contactos personales del cliente.
Es la difusión masiva de publicidad en más de 450 grupos de WhatsApp activos distribuidos en todo el país. Ideal para negocios que quieren llegar a miles de personas rápidamente con promociones, ofertas o anuncios. El cliente nos da su anuncio/imagen y nosotros lo enviamos.

• Bronce     — 1 semana   →  $55
• Plata      — 2 semanas  →  $75
• Oro        — 1 mes      →  $108
• Pro        — 3 meses    →  $225
• Enterprise — 1 año      →  $650

════════════════════════════════════════
CONDICIONES DE PAGO
════════════════════════════════════════
WhatsApp Marketing (publicidad masiva en grupos):
→ 100% PREPAGO sin excepción. El servicio inicia solo cuando se confirma el pago completo.

Todos los demás servicios (sitios web, diseño, seguidores, etc.):
→ 60% antes de empezar + 40% al entregar el trabajo.
→ El primer pago reserva el trabajo y cubre el inicio del proyecto.
→ El segundo pago se hace cuando el cliente ya vio y aprobó el resultado final.
→ Esto da tranquilidad a ambas partes: nosotros arrancamos con compromiso y el cliente paga el resto cuando está satisfecho.

Garantías por servicio:
→ Seguidores: garantía de por vida. Si en algún momento bajan, hacemos refill gratis sin preguntar, sin fecha límite.
→ Sitios web: soporte post-entrega incluido para ajustes menores. El cliente no queda solo después de recibir su sitio.
→ Diseño: revisiones incluidas hasta que el cliente quede conforme antes de entrega final.
→ WhatsApp Marketing: se le reporta el alcance del envío al cliente.

════════════════════════════════════════
REGLAS DE VENTAS
════════════════════════════════════════
1. Descuento: máximo 5–10%, dilo natural: "te lo dejo en $X para cerrar hoy".
2. Si dice que está caro: no te apures en bajar. Recuérdale la garantía, el esquema 60/40 y la calidad.
3. Si pregunta algo fuera de lista: "claro, eso lo manejamos, ahora te paso el precio".
4. Si quiere varios servicios: ofrece armarlo en un paquete. [Avisa al empleado entre corchetes para que consulte con Andrés].
5. Nunca hables mal de competencia.
6. Siempre cierra con una pregunta o invitación. Nunca con callejón sin salida.
7. Seguidores: NUNCA uses bots, fake, artificiales, automatizados.
8. Cliente convencido: "¿Cómo te queda mejor el pago, por Zelle o PayPal?"
9. Cuando el cliente confirme: dile que le mandas el invoice por link para que vea el detalle y pueda pagar ahí mismo.
10. Si el cliente pregunta por la seguridad del pago: el invoice es una página oficial nuestra donde ve exactamente lo que pidió antes de pagar.
11. El esquema 60/40 es un argumento de venta fuerte: el cliente no paga todo de entrada, paga el resto solo cuando está satisfecho con el resultado.

════════════════════════════════════════
SITUACIONES COMUNES
════════════════════════════════════════
- Pide precios → da el precio + el beneficio principal, no solo el número.
- "Lo pienso" → ancla con garantía, rapidez, o "los precios pueden cambiar, hoy lo puedo dejar así".
- Compara con otro → "Con nosotros tienes garantía de por vida y soporte real".
- Quiere empezar ya → explica el proceso: le mandas el invoice, paga, subes comprobante, se empieza.
- Cliente de USA pregunta cómo pagar → Zelle es lo más fácil, le mandas el invoice y ahí mismo puede subir el comprobante.`;


// ──────────────────────────────────────────────
// Historial de conversación por chat (en memoria)
// Se reinicia al reiniciar el Worker — para sesiones de trabajo está bien
// ──────────────────────────────────────────────
const historial = new Map();
const MAX_HISTORIAL = 10; // últimos 10 turnos por chat

export default {
  async scheduled(event, env, ctx) {
    // Cron (UTC): mensual el día 1 · diario 11:00 (7:00 Venezuela) · domingo 12:00 (8:00 Venezuela)
    if (event.cron === '0 11 * * *') ctx.waitUntil(tareaDiaria(env).catch(e => avisoError(env, 'Resumen diario', e)));
    else if (event.cron === '0 12 * * 0') ctx.waitUntil(enviarRespaldo(env).catch(e => avisoError(env, 'Respaldo semanal', e)));
    else ctx.waitUntil(enviarResumenMensual(env));
  },

  async fetch(request, env) {
    const ruta = new URL(request.url).pathname;
    if (ruta === '/verificar') return handleVerificar(request, env, firebaseLogin);
    if (ruta === '/diagnostico') return handleDiagnostico(request, env, firebaseLogin);
    if (ruta === '/tarea') return handleTarea(request, env);
    if (ruta === '/email') return handleEmail(request, env);
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
          `Hola ${firstName}! Soy el asistente de ventas de DGP Group 👋\n\n` +
          `Escríbeme lo que te dice el cliente y te doy la respuesta lista.\n\n` +
          `Cuando termines con un cliente y pases al siguiente, escribe /nuevo para limpiar el historial y que no se mezclen las conversaciones.`
        );
        return new Response('OK');
      }

      // ── Comandos /nuevo y /limpiar — reinicia historial ──
      if (text === '/nuevo' || text === '/limpiar') {
        historial.delete(chatId);
        await sendMsg(env.TG_TOKEN, chatId, 'Listo ✓ Conversación nueva. ¿Con qué cliente seguimos?');
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

async function enviarResumenMensual(env) {
  const TG_TOKEN = '8938228745:AAHXuxCaO6EZlC-vafwTGvUCT6ILHGOnQuk';
  const TG_CHAT  = '8446165096';
  const PROJECT  = env.FIREBASE_PROJECT || 'dgp-group';

  const now     = new Date();
  const mes     = now.getMonth();
  const año     = now.getFullYear();
  const mesPrev = mes === 0 ? 11 : mes - 1;
  const añoPrev = mes === 0 ? año - 1 : año;

  const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  let docs = [];
  try {
    const idToken = await firebaseLogin(env);
    const url  = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/documentos?pageSize=300`;
    const res  = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
    docs = (data.documents || []).map(d => {
      const f = d.fields || {};
      return {
        total:     parseFloat(f.total?.doubleValue || f.total?.integerValue || 0),
        pagado:    f.pagado?.booleanValue === true,
        cliente:   f.cli?.stringValue || f.cliente?.stringValue || '',
        createdAt: f.createdAt?.timestampValue || null,
      };
    });
  } catch (e) {
    console.error('Firestore REST error:', e);
    return;
  }

  const docsDelMes = docs.filter(d => {
    if (!d.createdAt) return false;
    const dt = new Date(d.createdAt);
    return dt.getMonth() === mesPrev && dt.getFullYear() === añoPrev;
  });

  const totalFacturas  = docsDelMes.length;
  const totalCobrado   = docsDelMes.filter(d => d.pagado).reduce((a, d) => a + d.total, 0);
  const totalPendiente = docsDelMes.filter(d => !d.pagado).reduce((a, d) => a + d.total, 0);
  const pagadas        = docsDelMes.filter(d => d.pagado).length;

  const texto = `📊 *RESUMEN MENSUAL — ${MESES[mesPrev]} ${añoPrev}*\n\n` +
    `📋 Facturas generadas: *${totalFacturas}*\n` +
    `✅ Facturas cobradas: *${pagadas}*\n` +
    `💰 Total cobrado: *$${totalCobrado.toFixed(2)}*\n` +
    `⏳ Pendiente de cobro: *$${totalPendiente.toFixed(2)}*\n\n` +
    `_Resumen automático · DGP Group_`;

  await sendMsg(TG_TOKEN, TG_CHAT, texto);
}

// Las reglas de Firestore solo dejan listar facturas al equipo: el bot inicia
// sesión con una cuenta del equipo (registrada en /accesos).
// Secretos en Cloudflare: FB_EMAIL y FB_PASSWORD.
async function firebaseLogin(env) {
  if (!env.FB_EMAIL || !env.FB_PASSWORD) throw new Error('Faltan los secretos FB_EMAIL / FB_PASSWORD');
  const apiKey = env.FB_API_KEY || 'AIzaSyAFI1WRnS5VvFKp8sAuYiIsiT_wXdnNMKc';
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: env.FB_EMAIL, password: env.FB_PASSWORD, returnSecureToken: true })
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Login Firebase: ' + (data.error?.message || res.status));
  return data.idToken;
}

// ══════════════════════════════════════════════════════════════
//  Verificación de comprobantes con IA (Groq visión)
//  POST /verificar  { fsId, url }
//  Lee el monto de la captura, lo compara con el saldo de la factura,
//  guarda el resultado en documentos/{fsId}.verificacionIA y avisa por Telegram.
//  La IA NO confirma que el dinero llegó: es una pre-verificación.
// ══════════════════════════════════════════════════════════════

const PROJECT_DEFAULT = 'dgp-group';
const CLOUDINARY_PREFIX = 'https://res.cloudinary.com/dgden7fws/';
const MODELOS_DEFAULT = ['qwen/qwen3.8-27b', 'qwen/qwen3.6-27b'];
const ORIGENES = ['https://adv.dgp-link.com', 'http://localhost:8765'];
const TG_CHAT = '8446165096';

const PROMPT = `Eres un verificador de comprobantes de pago (Zelle, PayPal, Binance, USDT, transferencias bancarias, Pago Móvil, Western Union, etc.).
Analiza la imagen y responde SOLO con un objeto JSON válido, sin texto adicional, con esta forma exacta:
{"es_comprobante": true|false, "legible": true|false, "monto": número o null, "moneda": "USD"|"USDT"|"EUR"|"VES"|otra o null, "fecha": "YYYY-MM-DD" o null, "referencia": texto o null, "remitente": texto o null, "destinatario": texto o null, "plataforma": texto o null, "estado_pago": "completado"|"pendiente"|"fallido"|null, "confianza": número de 0 a 1}
Reglas:
- "monto" es el monto enviado o transferido en esta operación. No uses saldos de cuenta, comisiones ni límites.
- Usa punto decimal (ej. 1250.50). Si ves "Bs" o "Bs.S" la moneda es "VES". "$" sin más contexto es "USD".
- Si la imagen no es un comprobante de pago, "es_comprobante": false.
- Si no puedes leer el monto con seguridad, "monto": null y "legible": false.
- No inventes datos: usa null cuando algo no aparezca.`;

/* ── Respuesta con CORS ── */
function cors(request) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ORIGENES.includes(origin) ? origin : ORIGENES[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin'
  };
}
function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...cors(request) } });
}

/* ── Firestore REST ── */
function fromValue(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('timestampValue' in v) return v.timestampValue;
  if ('mapValue' in v) return fromFields(v.mapValue.fields || {});
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromValue);
  return null;
}
function fromFields(fields) {
  const o = {};
  for (const k in fields) o[k] = fromValue(fields[k]);
  return o;
}
function toValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  if (typeof v === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toValue(x)])) } };
  return { stringValue: String(v) };
}
function docUrl(env, path) {
  return `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT || PROJECT_DEFAULT}/databases/(default)/documents/${path}`;
}
async function fsGet(env, path, token) {
  const res = await fetch(docUrl(env, path), { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 404) return null;
  const data = await res.json();
  if (!res.ok) throw new Error('Firestore: ' + (data.error?.message || res.status));
  return fromFields(data.fields || {});
}
// fields: objeto anidado con los valores; mask: rutas a actualizar (ej. 'verificaciones.kabc')
async function fsUpdate(env, path, fields, mask, token) {
  const qs = mask.map(m => 'updateMask.fieldPaths=' + encodeURIComponent(m)).join('&');
  const res = await fetch(`${docUrl(env, path)}?${qs}&currentDocument.exists=true`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toValue(fields).mapValue.fields })
  });
  if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error('Firestore: ' + (d.error?.message || res.status)); }
}

/* ── Groq visión ── */
function extraerJSON(texto) {
  const limpio = String(texto || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  try { return JSON.parse(limpio); } catch (e) {}
  const m = limpio.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return null;
}
/* ── Workers AI (IA de Cloudflare): no bloquea países, se usa primero ── */
const MODELOS_CF = ['@cf/qwen/qwen3.8-27b', '@cf/meta/llama-4-scout-17b-16e-instruct', '@cf/meta/llama-3.2-11b-vision-instruct'];
function aBase64(buf) {
  const bytes = new Uint8Array(buf); let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
async function imagenComoDataUrl(url) {
  // Cloudinary: pedir una versión más liviana (1400px, JPG) para la IA
  const u = url.includes('res.cloudinary.com/') && url.includes('/upload/') ? url.replace('/upload/', '/upload/w_1400,c_limit,q_80,f_jpg/') : url;
  const res = await fetch(u);
  if (!res.ok) throw new Error('No se pudo descargar la imagen (HTTP ' + res.status + ')');
  const tipo = (res.headers.get('content-type') || 'image/jpeg').split(';')[0];
  return `data:${tipo};base64,${aBase64(await res.arrayBuffer())}`;
}
function textoDeRespuestaAI(out) {
  if (!out) return '';
  if (typeof out === 'string') return out;
  if (typeof out.response === 'string') return out.response;
  if (out.response && typeof out.response === 'object') return JSON.stringify(out.response);
  const c = out.choices?.[0]?.message?.content;
  if (typeof c === 'string') return c;
  return JSON.stringify(out);
}
async function leerConWorkersAI(env, imageUrl) {
  if (!env.AI) throw new Error('Workers AI no está conectado (binding AI)');
  const dataUrl = await imagenComoDataUrl(imageUrl);
  let ultimo = null;
  for (const modelo of MODELOS_CF) {
    for (let intento = 0; intento < 2; intento++) {
      try {
        const out = await env.AI.run(modelo, {
          messages: [{ role: 'user', content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: dataUrl } }
          ] }],
          max_tokens: 1200, temperature: 0
        });
        const lectura = extraerJSON(textoDeRespuestaAI(out));
        if (lectura) return { lectura, modelo };
        ultimo = 'respuesta sin JSON';
        break;
      } catch (e) {
        ultimo = e.message || String(e);
        // Algunos modelos de Meta piden aceptar su licencia una vez
        if (/agree/i.test(ultimo) && intento === 0) { try { await env.AI.run(modelo, { prompt: 'agree' }); } catch (x) {} continue; }
        break;
      }
    }
  }
  throw new Error('Workers AI: ' + ultimo);
}

async function leerComprobante(env, imageUrl) {
  let errorCF = null;
  try { return await leerConWorkersAI(env, imageUrl); } catch (e) { errorCF = e.message; }
  try { return await leerConGroq(env, imageUrl); }
  catch (e) { throw new Error(`${errorCF} · ${e.message}`); }
}

async function leerConGroq(env, imageUrl) {
  const modelos = env.GROQ_VISION_MODEL ? [env.GROQ_VISION_MODEL, ...MODELOS_DEFAULT] : MODELOS_DEFAULT;
  let ultimoError = null;
  for (const modelo of [...new Set(modelos)]) {
    // Primero con JSON mode + razonamiento oculto; si el modelo no acepta esos parámetros, sin ellos.
    for (const extra of [{ response_format: { type: 'json_object' }, reasoning_format: 'hidden' }, {}]) {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelo,
          temperature: 0,
          max_completion_tokens: 1200,
          messages: [{ role: 'user', content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: imageUrl } }
          ] }],
          ...extra
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const lectura = extraerJSON(data.choices?.[0]?.message?.content);
        if (lectura) return { lectura, modelo };
        ultimoError = 'respuesta sin JSON';
        continue;
      }
      ultimoError = data.error?.message || `HTTP ${res.status}`;
      if (res.status !== 400) break; // modelo no disponible / límite → probar el siguiente modelo
    }
  }
  throw new Error('IA: ' + ultimoError);
}

/* ── Clave estable por imagen (la misma función existe en las páginas) ── */
function iaKey(url) {
  let h = 5381;
  for (let i = 0; i < url.length; i++) h = ((h << 5) + h + url.charCodeAt(i)) >>> 0;
  return 'k' + h.toString(36);
}
function listaComprobantes(doc) {
  const out = [], vistos = new Set();
  (Array.isArray(doc.comprobantes) ? doc.comprobantes : []).forEach(c => { if (c && c.url && !vistos.has(c.url)) { vistos.add(c.url); out.push(c); } });
  if (doc.comprobante_url && !vistos.has(doc.comprobante_url)) out.unshift({ url: doc.comprobante_url });
  return out;
}

/* ── Comparación con la factura (suma todos los comprobantes leídos) ── */
const r2 = n => Math.round(n * 100) / 100;
function evaluar(doc, lectura, url) {
  const total = Number(doc.total) || 0;
  const monto = typeof lectura.monto === 'number' && isFinite(lectura.monto) ? r2(lectura.monto) : null;
  const moneda = String(lectura.moneda || '').toUpperCase().trim();
  const monedaFactura = doc.moneda === 'eur' ? 'EUR' : 'USD';
  const equivalentes = monedaFactura === 'USD' ? ['USD', 'USDT', 'US$', ''] : ['EUR', '€', ''];
  const leidos = ['coincide', 'menor', 'mayor'];

  // Otros comprobantes de esta factura ya leídos por la IA
  const verifs = doc.verificaciones || {};
  const otros = listaComprobantes(doc).filter(c => c.url !== url)
    .map(c => verifs[iaKey(c.url)] || (doc.verificacionIA && doc.verificacionIA.url === c.url ? doc.verificacionIA : null))
    .filter(v => v && leidos.includes(v.estado) && typeof v.monto === 'number');
  const sumaOtros = r2(otros.reduce((a, v) => a + v.monto, 0));
  // Si registraste pagos sin comprobante (efectivo, etc.), se toman en cuenta
  const previo = Math.max(sumaOtros, Number(doc.montoPagado) || 0);

  let estado, mensaje, acumulado = null, saldo = r2(Math.max(total - previo, 0)), diferencia = null;
  if (!lectura.es_comprobante && lectura.es_comprobante !== undefined) {
    estado = 'no_es_comprobante'; mensaje = 'La imagen no parece un comprobante de pago.';
  } else if (monto === null || lectura.legible === false) {
    estado = 'ilegible'; mensaje = 'No se pudo leer el monto con claridad. Lo revisaremos manualmente.';
  } else if (!equivalentes.includes(moneda)) {
    estado = 'otra_moneda'; mensaje = `El comprobante está en ${moneda}. Lo revisaremos manualmente para aplicar la tasa de cambio.`;
  } else {
    acumulado = r2(previo + monto);
    diferencia = r2(acumulado - total);
    const conOtros = previo > 0 ? ` Con tus pagos anteriores llevas $${acumulado.toFixed(2)} de $${total.toFixed(2)}.` : '';
    if (Math.abs(diferencia) <= Math.max(0.5, total * 0.01)) {
      estado = 'coincide';
      mensaje = previo > 0 ? `Recibimos $${monto.toFixed(2)}.${conOtros} Con este pago completas el total.` : `El monto del comprobante ($${monto.toFixed(2)}) coincide con el total de la factura.`;
    } else if (diferencia < 0) {
      estado = 'menor';
      mensaje = `Recibimos $${monto.toFixed(2)}.${conOtros} Quedan pendientes $${Math.abs(diferencia).toFixed(2)}.`;
    } else {
      estado = 'mayor';
      mensaje = `Recibimos $${monto.toFixed(2)}.${conOtros || ''} Es $${diferencia.toFixed(2)} más que el total de la factura.`;
    }
  }
  if (lectura.estado_pago === 'pendiente' || lectura.estado_pago === 'fallido') {
    mensaje += ` Ojo: la captura indica que el pago está "${lectura.estado_pago}".`;
  }
  return { estado, mensaje, saldo, monto, acumulado, total, diferencia };
}

/* ── Handler ── */
async function handleVerificar(request, env, firebaseLogin) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  if (request.method !== 'POST') return json(request, { error: 'Método no permitido' }, 405);

  let body;
  try { body = await request.json(); } catch (e) { return json(request, { error: 'JSON inválido' }, 400); }
  const fsId = String(body.fsId || '');
  const url = String(body.url || '');
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(fsId)) return json(request, { error: 'Factura inválida' }, 400);
  if (!url.startsWith(CLOUDINARY_PREFIX)) return json(request, { error: 'Imagen no permitida' }, 400);
  if (!env.GROQ_API_KEY) return json(request, { error: 'Falta GROQ_API_KEY' }, 500);

  try {
    const token = await firebaseLogin(env);
    const doc = await fsGet(env, `documentos/${fsId}`, token);
    if (!doc) return json(request, { error: 'Factura no encontrada' }, 404);
    // Solo se analiza una imagen que realmente está adjunta a esa factura
    if (!listaComprobantes(doc).some(c => c.url === url)) return json(request, { error: 'El comprobante no corresponde a esta factura' }, 409);
    const key = iaKey(url);
    const previa = (doc.verificaciones || {})[key] || (doc.verificacionIA && doc.verificacionIA.url === url ? doc.verificacionIA : null);
    if (previa) return json(request, previa);

    const { lectura, modelo } = await leerComprobante(env, url);
    const ev = evaluar(doc, lectura, url);
    const verificacion = {
      ...ev,
      moneda: lectura.moneda || null,
      fecha: lectura.fecha || null,
      referencia: lectura.referencia || null,
      remitente: lectura.remitente || null,
      destinatario: lectura.destinatario || null,
      plataforma: lectura.plataforma || null,
      estadoPago: lectura.estado_pago || null,
      confianza: typeof lectura.confianza === 'number' ? lectura.confianza : null,
      url, modelo,
      analizadoAt: new Date().toISOString()
    };
    await fsUpdate(env, `documentos/${fsId}`, { verificacionIA: verificacion, verificaciones: { [key]: verificacion } },
      ['verificacionIA', `verificaciones.${key}`], token);

    const icono = { coincide: '✅', menor: '⚠️', mayor: '⚠️', otra_moneda: '💱', ilegible: '❓', no_es_comprobante: '🚫' }[ev.estado] || '🤖';
    const tgToken = env.TG_TOKEN_NOTIF || '8938228745:AAHXuxCaO6EZlC-vafwTGvUCT6ILHGOnQuk';
    await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, disable_web_page_preview: true, text:
        `${icono} Verificación IA · ${doc.docId || fsId}\n👤 ${doc.cli || '—'}\n\n` +
        `Leído: ${ev.monto !== null ? '$' + ev.monto.toFixed(2) : '—'} ${lectura.moneda || ''}\n` +
        `Total factura: $${ev.total.toFixed(2)}${ev.acumulado !== null ? ` · Pagado según comprobantes: $${ev.acumulado.toFixed(2)}` : ''}\n` +
        `${lectura.plataforma ? 'Plataforma: ' + lectura.plataforma + '\n' : ''}` +
        `${lectura.referencia ? 'Ref: ' + lectura.referencia + '\n' : ''}` +
        `${lectura.remitente ? 'De: ' + lectura.remitente + '\n' : ''}` +
        `\n${ev.mensaje}\n\nConfirma el pago manualmente antes de marcarlo como pagado.` })
    }).catch(() => {});

    return json(request, verificacion);
  } catch (e) {
    console.error('verificar:', e);
    return json(request, { error: e.message || 'Error' }, 502);
  }
}

// ══════════════════════════════════════════════════════════════
//  Diagnóstico: GET /diagnostico[?ia=1][&telegram=1]
//  Lo usa el botón "Probar sistema". No devuelve secretos, solo si funcionan.
// ══════════════════════════════════════════════════════════════
const WORKER_VERSION = '2026-09-29c';
const IMG_PRUEBA = 'https://adv.dgp-link.com/diagnostico-comprobante.png';

async function handleDiagnostico(request, env, firebaseLogin) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors(request), 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' } });
  const q = new URL(request.url).searchParams;
  const out = { version: WORKER_VERSION, region: request.cf ? `${request.cf.colo || ''} (${request.cf.country || ''})` : null, checks: {} };

  const faltan = ['GROQ_API_KEY', 'TG_TOKEN', 'FB_EMAIL', 'FB_PASSWORD'].filter(k => !env[k]);
  out.checks.secretos = { ok: faltan.length === 0, faltan };

  // Firebase: iniciar sesión con la cuenta del bot y leer una factura
  try {
    const token = await firebaseLogin(env);
    const res = await fetch(docUrl(env, 'documentos') + '?pageSize=1', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json().catch(() => ({}));
    out.checks.firebase = res.ok ? { ok: true }
      : { ok: false, error: res.status === 403 ? 'La cuenta del bot no está en la colección accesos (o las reglas no están publicadas)' : (data.error?.message || 'HTTP ' + res.status) };
  } catch (e) {
    const m = e.message || '';
    out.checks.firebase = { ok: false, error:
      /Faltan/.test(m) ? 'Faltan los secretos FB_EMAIL / FB_PASSWORD' :
      /INVALID_LOGIN_CREDENTIALS|INVALID_PASSWORD|EMAIL_NOT_FOUND/.test(m) ? 'Correo o contraseña del bot incorrectos (revisa FB_EMAIL / FB_PASSWORD y que el usuario exista en Authentication)' :
      /OPERATION_NOT_ALLOWED|PASSWORD_LOGIN_DISABLED/.test(m) ? 'Activa "Correo/contraseña" en Firebase → Authentication → Sign-in method' : m };
  }

  // Groq: la clave funciona y hay modelo de visión disponible
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: `Bearer ${env.GROQ_API_KEY}` } });
    const data = await res.json().catch(() => ({}));
    if (res.status === 403) out.checks.groq = { ok: false, bloqueoRegion: true, error: 'Groq rechazó la conexión (Forbidden): bloquea la región desde donde corrió el Worker' };
    else if (!res.ok) out.checks.groq = { ok: false, error: data.error?.message || 'HTTP ' + res.status };
    else {
      const ids = (data.data || []).map(m => m.id);
      const candidatos = env.GROQ_VISION_MODEL ? [env.GROQ_VISION_MODEL, ...MODELOS_DEFAULT] : MODELOS_DEFAULT;
      const vision = candidatos.filter(m => ids.includes(m));
      out.checks.groq = vision.length ? { ok: true, modelo: vision[0] } : { ok: false, error: 'La clave funciona, pero no hay modelo de visión disponible (' + candidatos.join(', ') + ')' };
    }
  } catch (e) { out.checks.groq = { ok: false, error: e.message }; }

  // IA: leer el comprobante de prueba ($123.45)
  out.checks.correo = (env.EMAIL_WEBHOOK && env.EMAIL_CLAVE) ? { ok: true } : { ok: false, error: 'Faltan EMAIL_WEBHOOK y EMAIL_CLAVE (ver correo/enviar-correo.gs)' };
  out.checks.workersai = env.AI ? { ok: true } : { ok: false, error: 'Falta la conexión a Workers AI (binding AI en wrangler.toml)' };
  if (q.get('ia')) {
    try {
      const { lectura, modelo } = await leerComprobante(env, IMG_PRUEBA);
      const ok = typeof lectura.monto === 'number' && Math.abs(lectura.monto - 123.45) < 0.01;
      out.checks.ia = { ok, monto: lectura.monto, modelo, error: ok ? null : `Leyó ${lectura.monto} en vez de 123.45` };
    } catch (e) { out.checks.ia = { ok: false, error: e.message }; }
  }

  // Si Groq está bloqueado por país pero la IA de Cloudflare funciona, no es un problema
  if (out.checks.groq?.bloqueoRegion && (q.get('ia') ? out.checks.ia?.ok : out.checks.workersai?.ok)) {
    out.checks.groq = { ok: true, aviso: 'Groq bloquea tu país; se usa la IA de Cloudflare (Workers AI)' };
  }

  // Telegram: mensaje de prueba al chat de notificaciones
  if (q.get('telegram')) {
    try {
      const tgToken = env.TG_TOKEN_NOTIF || '8938228745:AAHXuxCaO6EZlC-vafwTGvUCT6ILHGOnQuk';
      const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT, text: '✅ Prueba del sistema DGP Group: las notificaciones llegan correctamente.' })
      });
      const data = await res.json().catch(() => ({}));
      out.checks.telegram = data.ok ? { ok: true } : { ok: false, error: data.description || 'HTTP ' + res.status };
    } catch (e) { out.checks.telegram = { ok: false, error: e.message }; }
  }

  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(request) } });
}

// ══════════════════════════════════════════════════════════════
//  TAREAS AUTOMÁTICAS
//  · Diaria: facturas de suscripciones + resumen de cobros a Telegram
//  · Semanal: respaldo de toda la base de datos a Telegram
//  · POST /tarea {tarea:'diaria'|'respaldo'} (solo equipo, con token de Firebase)
// ══════════════════════════════════════════════════════════════
const TG_NOTIF_DEFAULT = '8938228745:AAHXuxCaO6EZlC-vafwTGvUCT6ILHGOnQuk';
const SITIO = 'https://adv.dgp-link.com';
const CICLO_MESES = { mensual: 1, trimestral: 3, semestral: 6, anual: 12 };
const CICLO_TXT = { semanal: 'semanal', mensual: 'mensual', trimestral: 'trimestral', semestral: 'semestral', anual: 'anual' };
const RESPALDO_COLS = ['documentos', 'clientes', 'suscripciones', 'cotizaciones', 'portal', 'encuestas', 'plantillas', 'cuentasPago', 'accesos', 'actividadLog', 'ventas'];

const tgToken = env => env.TG_TOKEN_NOTIF || TG_NOTIF_DEFAULT;
const hoyVE = () => new Date(Date.now() - 4 * 3600e3).toISOString().slice(0, 10);   // fecha en Venezuela (UTC-4)
const isoADmy = iso => { const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}`; };
const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
const fechaCorta = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
const escHtml = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dinero = n => '$' + (Number(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const normNombre = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
function sumarCiclo(iso, ciclo) {
  const d = new Date(iso + 'T12:00:00Z');
  if (ciclo === 'semanal') d.setUTCDate(d.getUTCDate() + 7); else d.setUTCMonth(d.getUTCMonth() + (CICLO_MESES[ciclo] || 1));
  return d.toISOString().slice(0, 10);
}
function fechaDoc(d) {
  if (d.createdAt) return String(d.createdAt).slice(0, 10);
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(d.fecha || '')) { const [dd, mm, yy] = d.fecha.split('/'); return `${yy}-${mm}-${dd}`; }
  return null;
}
const saldoDoc = d => (d.pagado || d.type === 'recibo') ? 0 : Math.max((Number(d.total) || 0) - (Number(d.montoPagado) || 0), 0);

/* ── Firestore REST: listar, crear, agregar a lista ── */
async function fsList(env, path, token) {
  const out = []; let pageToken = '';
  do {
    const res = await fetch(`${docUrl(env, path)}?pageSize=300${pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : ''}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(`Firestore (${path}): ` + (data.error?.message || res.status));
    (data.documents || []).forEach(d => out.push({ _id: d.name.split('/').pop(), ...fromFields(d.fields || {}) }));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return out;
}
async function fsCreate(env, path, obj, token) {
  const res = await fetch(docUrl(env, path), {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toValue(obj).mapValue.fields })
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Firestore (crear): ' + (data.error?.message || res.status));
  return data.name.split('/').pop();
}
async function fsAgregarALista(env, docPath, campo, valor, token) {
  const base = `projects/${env.FIREBASE_PROJECT || PROJECT_DEFAULT}/databases/(default)/documents`;
  const res = await fetch(`https://firestore.googleapis.com/v1/${base}:commit`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes: [{ transform: { document: `${base}/${docPath}`, fieldTransforms: [{ fieldPath: campo, appendMissingElements: { values: [toValue(valor)] } }] } }] })
  });
  if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error('Firestore (lista): ' + (d.error?.message || res.status)); }
}

/* ── Telegram (HTML, dividido si es largo) ── */
async function tgEnviar(env, html) {
  const partes = []; let actual = '';
  for (const linea of html.split('\n')) {
    if ((actual + '\n' + linea).length > 3800) { partes.push(actual); actual = linea; } else actual = actual ? actual + '\n' + linea : linea;
  }
  if (actual) partes.push(actual);
  for (const texto of partes) {
    await fetch(`https://api.telegram.org/bot${tgToken(env)}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text: texto, parse_mode: 'HTML', disable_web_page_preview: true })
    });
  }
}
async function avisoError(env, que, e) {
  console.error(que, e);
  await tgEnviar(env, `⚠️ <b>${escHtml(que)}</b> no se pudo completar:\n${escHtml(e.message || e)}\n\nRevisa "Probar sistema" en el panel.`).catch(() => {});
}

/* ── Tarea diaria ── */
async function tareaDiaria(env) {
  const token = await firebaseLogin(env);
  const [docs, subs, clientes, portales] = await Promise.all(['documentos', 'suscripciones', 'clientes', 'portal'].map(c => fsList(env, c, token)));
  const hoy = hoyVE();
  const telDe = nombre => {
    const n = normNombre(nombre);
    const c = clientes.find(x => normNombre([x.nombre, x.apellido].filter(Boolean).join(' ')) === n);
    const p = portales.find(x => normNombre(x.nombre) === n);
    return String(c?.telefono || p?.telefono || '').replace(/[^0-9]/g, '');
  };
  const correoDe = nombre => {
    const n = normNombre(nombre);
    const c = clientes.find(x => normNombre([x.nombre, x.apellido].filter(Boolean).join(' ')) === n);
    const p = portales.find(x => normNombre(x.nombre) === n);
    const d = docs.find(x => x.clienteCorreo && normNombre(x.cli) === n);
    return c?.correo || p?.correo || d?.clienteCorreo || null;
  };
  const wa = (nombre, texto) => `https://wa.me/${telDe(nombre)}?text=${encodeURIComponent(texto)}`;
  const linkFac = id => `${SITIO}/factura-publica.html?id=${id}`;

  // 1) Facturas automáticas de suscripciones
  const creadas = [];
  for (const s of subs) {
    if (s.estado !== 'activa' || s.autoFactura === false || !s.proximoPago) continue;
    if (diasEntre(hoy, s.proximoPago) > (Number.isFinite(Number(s.diasAntes)) ? Number(s.diasAntes) : 5)) continue;
    if (s.ultimaFacturaPeriodo === s.proximoPago) continue;
    const precio = Number(s.precio) || 0;
    const nombre = [s.servicio, s.dominio].filter(Boolean).join(' · ') || 'Suscripción';
    const periodoTxt = `${fechaCorta(s.proximoPago)} – ${fechaCorta(sumarCiclo(s.proximoPago, s.ciclo))}`;
    const docData = {
      docId: 'FAC-' + (Date.now().toString(36) + Math.random().toString(36).slice(2, 4)).toUpperCase().slice(-7),
      type: 'factura', cli: s.cliente || '', ref: '—',
      nota: `Suscripción ${CICLO_TXT[s.ciclo] || ''} · período ${periodoTxt}`,
      fecha: isoADmy(hoy), total: precio, moneda: s.moneda || 'usd', emisor: s.emisor || '',
      metodoPago: null, infoPago: {}, contrato: false,
      items: [{ s: `${nombre} (${periodoTxt})`, p: precio, c: 1, t: precio }],
      pagado: false, fechaPago: null, suscripcionId: s._id, periodo: s.proximoPago,
      clienteCorreo: correoDe(s.cliente),
      portalCodigo: s.portalCodigo || null, createdBy: 'bot', createdAt: new Date()
    };
    const id = await fsCreate(env, 'documentos', docData, token);
    if (s.portalCodigo) await fsAgregarALista(env, `portal/${s.portalCodigo}`, 'facturaIds', id, token).catch(e => console.warn(e));
    await fsUpdate(env, `suscripciones/${s._id}`, { ultimaFacturaId: id, ultimaFacturaPeriodo: s.proximoPago }, ['ultimaFacturaId', 'ultimaFacturaPeriodo'], token);
    s.ultimaFacturaPeriodo = s.proximoPago;
    creadas.push({ s, id, docData });
  }

  // 2) Resumen de cobros
  const pendientes = docs.filter(d => saldoDoc(d) > 0.009).map(d => ({ d, dias: fechaDoc(d) ? diasEntre(fechaDoc(d), hoy) : 0 }));
  const atrasadas = pendientes.filter(x => x.dias >= 7).sort((a, b) => b.dias - a.dias);
  const porRevisar = pendientes.filter(x => (Array.isArray(x.d.comprobantes) && x.d.comprobantes.length) || x.d.comprobante_url);
  const activas = subs.filter(s => s.estado === 'activa' && s.proximoPago);
  const subsAtrasadas = activas.filter(s => diasEntre(hoy, s.proximoPago) < 0);
  const subsPronto = activas.filter(s => { const d = diasEntre(hoy, s.proximoPago); return d >= 0 && d <= 7; });

  const L = [];
  L.push(`☀️ <b>Resumen de cobros</b> · ${escHtml(fechaCorta(hoy))}`);
  if (creadas.length) {
    L.push('', `🧾 <b>Facturas de suscripción creadas (${creadas.length})</b>`);
    creadas.forEach(({ s, id, docData }) => L.push(`• ${escHtml(s.cliente)} — ${escHtml(docData.items[0].s)} · ${dinero(docData.total)} · <a href="${linkFac(id)}">ver</a> · <a href="${wa(s.cliente, `Hola ${String(s.cliente).split(' ')[0]}! Te comparto la factura de tu ${[s.servicio, s.dominio].filter(Boolean).join(' ')} (${dinero(docData.total)}):\n${linkFac(id)}\n\nDesde el enlace puedes pagar y subir tu comprobante. ¡Gracias!`)}">enviar por WhatsApp</a>`));
  }
  if (porRevisar.length) {
    L.push('', `📎 <b>Comprobantes por revisar (${porRevisar.length})</b>`);
    porRevisar.slice(0, 10).forEach(({ d }) => L.push(`• ${escHtml(d.cli)} · ${escHtml(d.docId || '')} · debe ${dinero(saldoDoc(d))} · <a href="${linkFac(d._id)}">ver</a>`));
  }
  if (atrasadas.length) {
    const total = atrasadas.reduce((a, x) => a + saldoDoc(x.d), 0);
    L.push('', `⏰ <b>Facturas atrasadas (${atrasadas.length} · ${dinero(total)})</b>`);
    atrasadas.slice(0, 12).forEach(({ d, dias }) => L.push(`• ${dias >= 30 ? '🔴' : dias >= 15 ? '🟠' : '🟡'} ${escHtml(d.cli)} · ${escHtml(d.docId || '')} · ${dinero(saldoDoc(d))} · ${dias} días · <a href="${wa(d.cli, `Hola ${String(d.cli).split(' ')[0]}! Te recordamos que tienes pendiente la factura ${d.docId || ''} por ${dinero(saldoDoc(d))}:\n${linkFac(d._id)}\n\nDesde el enlace puedes pagar y subir tu comprobante. ¡Gracias!`)}">recordar</a>`));
    if (atrasadas.length > 12) L.push(`…y ${atrasadas.length - 12} más (ver Dashboard → Cobranza)`);
  }
  if (subsAtrasadas.length || subsPronto.length) {
    L.push('', `🔁 <b>Suscripciones</b>`);
    subsAtrasadas.forEach(s => L.push(`• 🔴 ${escHtml(s.cliente)} — ${escHtml([s.servicio, s.dominio].filter(Boolean).join(' · '))} · ${dinero(s.precio)} · atrasada ${-diasEntre(hoy, s.proximoPago)} días`));
    subsPronto.forEach(s => L.push(`• 🟡 ${escHtml(s.cliente)} — ${escHtml([s.servicio, s.dominio].filter(Boolean).join(' · '))} · ${dinero(s.precio)} · vence ${escHtml(fechaCorta(s.proximoPago))}${s.ultimaFacturaPeriodo === s.proximoPago ? ' (factura enviada)' : ''}`));
  }
  if (L.length === 1) L.push('', '✅ Todo al día: sin facturas atrasadas, comprobantes por revisar ni suscripciones por vencer.');
  L.push('', `<a href="${SITIO}/">Abrir el panel</a>`);
  await tgEnviar(env, L.join('\n'));
  return { creadas: creadas.length, atrasadas: atrasadas.length, porRevisar: porRevisar.length, suscripciones: subsAtrasadas.length + subsPronto.length };
}

/* ── Respaldo semanal ── */
async function enviarRespaldo(env) {
  const token = await firebaseLogin(env);
  const out = { generado: new Date().toISOString(), proyecto: env.FIREBASE_PROJECT || PROJECT_DEFAULT, colecciones: {} };
  for (const col of RESPALDO_COLS) {
    out.colecciones[col] = await fsList(env, col, token).catch(() => []);
    if (col === 'portal') for (const p of out.colecciones.portal) for (const sub of ['proyectos', 'suscripciones', 'archivos']) {
      out.colecciones[`portal/${p._id}/${sub}`] = await fsList(env, `portal/${p._id}/${sub}`, token).catch(() => []);
    }
  }
  const total = Object.values(out.colecciones).reduce((a, x) => a + x.length, 0);
  const fd = new FormData();
  fd.append('chat_id', TG_CHAT);
  fd.append('caption', `🗄 Respaldo semanal de DGP Group · ${total} registros (${out.colecciones.documentos.length} facturas, ${out.colecciones.clientes.length} clientes).\nGuárdalo: si algo se borra, se restaura desde este archivo.`);
  fd.append('document', new Blob([JSON.stringify(out)], { type: 'application/json' }), `respaldo-dgp-${hoyVE()}.json`);
  const res = await fetch(`https://api.telegram.org/bot${tgToken(env)}/sendDocument`, { method: 'POST', body: fd });
  const d = await res.json().catch(() => ({}));
  if (!d.ok) throw new Error('Telegram: ' + (d.description || res.status));
  return { registros: total };
}

/* ── POST /tarea (solo equipo) ── */
async function handleTarea(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  if (request.method !== 'POST') return json(request, { error: 'Método no permitido' }, 405);
  try {
    const v = await verificarEquipo(request, env);
    if (v.error) return json(request, { error: v.error }, v.status);
    const { tarea } = await request.json().catch(() => ({}));
    if (tarea === 'respaldo') { const r = await enviarRespaldo(env); return json(request, { ok: true, mensaje: `Respaldo enviado a Telegram (${r.registros} registros) ✅` }); }
    if (tarea === 'diaria') {
      const r = await tareaDiaria(env);
      return json(request, { ok: true, mensaje: `Resumen enviado a Telegram · ${r.creadas} factura(s) de suscripción creada(s) ✅` });
    }
    return json(request, { error: 'Tarea desconocida' }, 400);
  } catch (e) { return json(request, { error: e.message || 'Error' }, 500); }
}

/* Comprueba que la llamada viene de alguien del equipo (sesión de Firebase + correo en /accesos) */
async function verificarEquipo(request, env) {
  const idToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!idToken) return { error: 'Falta la sesión', status: 401 };
  const apiKey = env.FB_API_KEY || 'AIzaSyAFI1WRnS5VvFKp8sAuYiIsiT_wXdnNMKc';
  const look = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken })
  }).then(r => r.json()).catch(() => ({}));
  const email = look.users?.[0]?.email;
  if (!email) return { error: 'Sesión no válida', status: 401 };
  const token = await firebaseLogin(env);
  const acceso = await fsGet(env, `accesos/${email}`, token);
  if (!acceso) return { error: 'Sin acceso', status: 403 };
  return { email, token };
}

// ══════════════════════════════════════════════════════════════
//  CORREO: POST /email {coleccion, id, para, asunto, html, texto}
//  Lo envía desde tu Gmail a través de Google Apps Script
//  (secretos EMAIL_WEBHOOK y EMAIL_CLAVE; ver correo/enviar-correo.gs)
// ══════════════════════════════════════════════════════════════
async function handleEmail(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  if (request.method !== 'POST') return json(request, { error: 'Método no permitido' }, 405);
  try {
    const v = await verificarEquipo(request, env);
    if (v.error) return json(request, { error: v.error }, v.status);
    if (!env.EMAIL_WEBHOOK || !env.EMAIL_CLAVE) return json(request, { error: 'El correo no está configurado (faltan EMAIL_WEBHOOK y EMAIL_CLAVE en Cloudflare)' }, 500);
    const b = await request.json().catch(() => ({}));
    const para = String(b.para || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(para)) return json(request, { error: 'Correo del cliente no válido' }, 400);
    if (!['documentos', 'cotizaciones'].includes(b.coleccion) || !/^[A-Za-z0-9_-]{1,64}$/.test(b.id || '')) return json(request, { error: 'Documento no válido' }, 400);
    const res = await fetch(env.EMAIL_WEBHOOK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'follow',
      body: JSON.stringify({ clave: env.EMAIL_CLAVE, para, asunto: String(b.asunto || '').slice(0, 200), html: String(b.html || ''), texto: String(b.texto || ''), nombre: 'DGP Group USA', responderA: 'dgpgroup.usa@gmail.com' })
    });
    const r = await res.json().catch(() => ({ ok: false, error: 'Google respondió algo inesperado (revisa que la URL termine en /exec y que el acceso sea "Cualquier usuario")' }));
    if (!r.ok) return json(request, { error: 'Gmail: ' + (r.error || 'no se pudo enviar') }, 502);
    // Registrar el envío en el documento
    const base = `projects/${env.FIREBASE_PROJECT || PROJECT_DEFAULT}/databases/(default)/documents`;
    await fetch(`https://firestore.googleapis.com/v1/${base}:commit`, {
      method: 'POST', headers: { Authorization: `Bearer ${v.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: [{ transform: { document: `${base}/${b.coleccion}/${b.id}`, fieldTransforms: [{ fieldPath: 'correos', appendMissingElements: { values: [toValue({ para, fecha: new Date().toISOString(), por: v.email, asunto: String(b.asunto || '').slice(0, 200) })] } }] } }] })
    }).catch(() => {});
    return json(request, { ok: true, restantes: r.restantes ?? null });
  } catch (e) { return json(request, { error: e.message || 'Error' }, 500); }
}
