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

Equipo: Kevin Bermudez, Angel Rosales, Paul Espina.

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

Puntos clave:
→ Diseño personalizado, no plantillas genéricas.
→ Adaptado a celular y computadora.
→ SEO incluido para aparecer en Google.
→ Entrega rápida con soporte posterior para ajustes.
→ Habla solo de beneficios. No menciones limitaciones técnicas.

🎨 DISEÑO & IDENTIDAD VISUAL
• Identidad Visual (logo + manual de marca: paleta, tipografías y usos)  →  $185
• Tarjeta de Presentación                         →  $20
• Post / Flyer para redes sociales                →  $10 por pieza
• Paquete Básico (logo, manual de marca, revisión de redes, 1,000 seguidores, tarjeta; 48h)  →  $320
• Paquete Intermedio (lo del Básico + 3,000 seguidores + 10 posts; 72h)                    →  $480
• Paquete Avanzado (5,000 seguidores, 10 posts, factura y business card, web One Page, panel admin con CRM; 72h)  →  $840

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
    else if (event.cron === '0 12 * * SUN') {
      ctx.waitUntil(enviarRespaldo(env).catch(e => avisoError(env, 'Respaldo semanal', e)));
      ctx.waitUntil(resumenSemanal(env).catch(e => avisoError(env, 'Resumen semanal', e)));
    }
    else ctx.waitUntil(enviarResumenMensual(env));
  },

  async fetch(request, env, ctx) {
    const ruta = new URL(request.url).pathname;
    if (ruta === TG_RUTA) return handleTgNotif(request, env, ctx);
    if (ruta === '/contacto') return handleContacto(request, env);
    if (ruta === '/verificar') return handleVerificar(request, env, firebaseLogin);
    if (ruta === '/diagnostico') return handleDiagnostico(request, env, firebaseLogin);
    if (ruta === '/tarea') return handleTarea(request, env);
    if (ruta === '/email') return handleEmail(request, env);
    if (ruta === '/resena') return handleResena(request, env);
    if (ruta === '/encuesta') return handleEncuesta(request, env);
    if (ruta === '/resenas-web') return handleResenasWeb(request, env, ctx);
    if (ruta === '/meta-ads') return handleMetaAds(request, env);
    if (ruta === '/web-stats') return handleWebStats(request, env);
    if (ruta === '/chat-web') return handleChatWeb(request, env);
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
        `\n${ev.mensaje}\n\nRevisa que el dinero llegó y confirma con los botones.`,
        reply_markup: botonesPago(fsId, ev) })
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
const WORKER_VERSION = '2026-10-09b';
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
const RESPALDO_COLS = ['documentos', 'clientes', 'suscripciones', 'cotizaciones', 'portal', 'encuestas', 'plantillas', 'cuentasPago', 'catalogo', 'config', 'accesos', 'actividadLog', 'ventas'];

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
  await asegurarWebhook(env).catch(e => console.warn('Webhook', e));
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
    if (s.fechaFin && s.proximoPago > s.fechaFin) continue; // el contrato ya terminó
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

  // 2) Recordatorio por correo para dejar reseña en Google (clientes felices que no hicieron clic)
  const resenas = await recordarResenas(env, token, docs, correoDe).catch(e => { console.warn('Reseñas', e); return []; });
  const automaticos = await correosAutomaticos(env, token, docs, clientes, correoDe).catch(e => { console.warn('Correos automáticos', e); return []; });

  // 3) Resumen de cobros
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
  if (automaticos.length) {
    L.push('', `📧 <b>Correos automáticos enviados (${automaticos.length})</b>`);
    automaticos.forEach(r => L.push(`• ${escHtml(r.tipo)}: ${escHtml(r.cliente)} → ${escHtml(r.correo)}`));
  }
  if (resenas.length) {
    L.push('', `⭐ <b>Recordatorio de reseña en Google enviado (${resenas.length})</b>`);
    resenas.forEach(r => L.push(`• ${escHtml(r.cliente)} → ${escHtml(r.correo)}`));
  }
  const meta = await lineaMeta(env, token, docs).catch(() => '');
  if (meta) L.push('', meta);
  if (L.length === 1 || (meta && L.length === 3)) L.push('', '✅ Todo al día: sin facturas atrasadas, comprobantes por revisar ni suscripciones por vencer.');
  L.push('', `<a href="${SITIO}/">Abrir el panel</a>`);
  await tgEnviar(env, L.join('\n'));
  return { creadas: creadas.length, resenas: resenas.length, atrasadas: atrasadas.length, porRevisar: porRevisar.length, suscripciones: subsAtrasadas.length + subsPronto.length };
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
    if (tarea === 'telegram') {
      const r = await asegurarWebhook(env);
      if (!r.ok) return json(request, { error: r.error || 'No se pudo conectar el bot' }, 502);
      if (r.nuevo) await tgEnviar(env, '🤖 ¡Listo! Ahora puedes hablarme: mándame una nota de voz para crear facturas, y te pondré botones en los avisos de pago.\n\nEscribe /ayuda para ver ejemplos.');
      return json(request, { ok: true, mensaje: r.nuevo ? 'Bot de Telegram conectado ✅ (te escribió un mensaje)' : 'El bot de Telegram ya estaba conectado ✅' });
    }
    if (tarea === 'semanal') { await resumenSemanal(env); return json(request, { ok: true, mensaje: 'Resumen semanal con análisis enviado a Telegram ✅' }); }
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
    if (!['documentos', 'cotizaciones', 'campanas'].includes(b.coleccion) || !/^[A-Za-z0-9_-]{1,64}$/.test(b.id || '')) return json(request, { error: 'Documento no válido' }, 400);
    const res = await fetch(env.EMAIL_WEBHOOK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'follow',
      body: JSON.stringify({ clave: env.EMAIL_CLAVE, para, asunto: String(b.asunto || '').slice(0, 200), html: String(b.html || ''), texto: String(b.texto || ''), nombre: 'DGP Group USA', responderA: 'dgpgroup.usa@gmail.com' })
    });
    const r = await res.json().catch(() => ({ ok: false, error: 'Google respondió algo inesperado (revisa que la URL termine en /exec y que el acceso sea "Cualquier usuario")' }));
    if (!r.ok) return json(request, { error: 'Gmail: ' + (r.error || 'no se pudo enviar') }, 502);
    // Registrar el envío en el documento (las pruebas de campaña no se registran)
    if (b.coleccion === 'campanas' && b.id === 'prueba') return json(request, { ok: true, restantes: r.restantes ?? null });
    const base = `projects/${env.FIREBASE_PROJECT || PROJECT_DEFAULT}/databases/(default)/documents`;
    await fetch(`https://firestore.googleapis.com/v1/${base}:commit`, {
      method: 'POST', headers: { Authorization: `Bearer ${v.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: [{ transform: { document: `${base}/${b.coleccion}/${b.id}`, fieldTransforms: [{ fieldPath: 'correos', appendMissingElements: { values: [toValue({ para, fecha: new Date().toISOString(), por: v.email, asunto: String(b.asunto || '').slice(0, 200) })] } }] } }] })
    }).catch(() => {});
    return json(request, { ok: true, restantes: r.restantes ?? null });
  } catch (e) { return json(request, { error: e.message || 'Error' }, 500); }
}

/* ══════════════════════════════════════════════════════════════
   Reseñas en Google
   GET  /resena?e=<encuestaId>  → registra el clic y abre la reseña de Google
   POST /encuesta { id }        → aviso por Telegram de cada encuesta nueva
   Tarea diaria                 → recordatorio por correo a los 2 días
══════════════════════════════════════════════════════════════ */
const BOT_URL = 'https://ayudante-dgp-bot.dgpgroupusa-llc.workers.dev';
const GOOGLE_RESENA = 'https://g.page/r/CbcyuFX7hqvuEAI/review';
const escHtmlR = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const promedioEnc = e => Number(e.promedio) || ((Number(e.estrellas_calidad) || 0) + (Number(e.estrellas_comunicacion) || 0)) / 2;

async function handleResena(request, env) {
  const id = new URL(request.url).searchParams.get('e') || '';
  if (/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    try {
      const token = await firebaseLogin(env);
      await fsUpdate(env, `encuestas/${id}`, { googleClick: true, googleClickAt: new Date() }, ['googleClick', 'googleClickAt'], token);
    } catch (e) { console.warn('Reseña clic', e); }
  }
  return Response.redirect(GOOGLE_RESENA, 302);
}

async function handleEncuesta(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  if (request.method !== 'POST') return json(request, { error: 'Método no permitido' }, 405);
  try {
    const { id } = await request.json().catch(() => ({}));
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(id || '')) return json(request, { error: 'id no válido' }, 400);
    const token = await firebaseLogin(env);
    const e = await fsGet(env, `encuestas/${id}`, token);
    if (!e) return json(request, { error: 'No existe' }, 404);
    if (e.avisoTG) return json(request, { ok: true });
    const prom = promedioEnc(e);
    const estrellas = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
    const L = [];
    if (prom <= 3) L.push(`⚠️ <b>Cliente insatisfecho</b> — contáctalo antes de que deje una mala reseña`);
    else L.push(`⭐ <b>Nueva encuesta</b>${prom >= 4 ? ' · se le invitó a dejar reseña en Google' : ''}`);
    L.push('', `👤 ${escHtmlR(e.cliente || '—')}`,
      `Calidad: ${estrellas(Number(e.estrellas_calidad) || 0)} · Comunicación: ${estrellas(Number(e.estrellas_comunicacion) || 0)}`,
      `Recomienda: ${e.recomienda ? 'Sí' : 'No'}${e.testimonioAprobado ? ' · autorizó testimonio' : ''}`);
    if (e.comentario) L.push('', `💬 “${escHtmlR(String(e.comentario).slice(0, 600))}”`);
    L.push('', `<a href="${SITIO}/">Abrir el panel → Encuestas</a>`);
    await tgEnviar(env, L.join('\n'));
    await fsUpdate(env, `encuestas/${id}`, { avisoTG: true }, ['avisoTG'], token).catch(() => {});
    return json(request, { ok: true });
  } catch (e) { return json(request, { error: e.message || 'Error' }, 500); }
}

/* Plantilla de los correos automáticos del bot (misma línea que los del panel) */
function correoResenaHTML(nombre, link) {
  return correoBotHTML({ icono: 'estrellas', titulo: `¡Gracias por confiar en nosotros, ${nombre}!`,
    texto: 'Nos alegró mucho saber que tu experiencia con DGP Group USA fue excelente. ¿Nos regalas 30 segundos para contarlo en Google? Tu reseña ayuda a que más negocios nos conozcan.',
    boton: 'Dejar mi reseña en Google', link, nota: 'Solo toma un momento. ¡Gracias de corazón!' });
}
function correoBotHTML({ icono = 'estrellas', titulo, texto, boton, link, nota = '', oferta = '' }) {
  const f = "font-family:'Poppins','Segoe UI',Roboto,Arial,sans-serif;";
  const grad = 'background-color:#166baf;background-image:linear-gradient(135deg,#172b5e 0%,#166baf 58%,#3eaedd 100%);';
  const blanco = h => `<div class="gm-s"><div class="gm-d">${h}</div></div>`;
  const estrella = '<img src="' + SITIO + '/correo/iconos/estrella.png" width="26" height="26" alt="★" style="display:inline-block;border:0;margin:0 2px;">';
  const cabeza = icono === 'estrellas' ? estrella.repeat(5)
    : `<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr><td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;border-radius:36px;background-color:#e6f4fb;"><img src="${SITIO}/correo/iconos/${icono}-b.png" width="38" height="38" alt="" style="display:block;border:0;"></td></tr></table>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">
<style>
  :root { color-scheme: light dark; }
  u + .body .gm-s { background:#000; mix-blend-mode:screen; }
  u + .body .gm-d { background:#000; mix-blend-mode:difference; }
  @media (prefers-color-scheme: dark) {
    .pg { background-color:#070f22 !important; } .card { background-color:#0f1b38 !important; border-color:#1d2d52 !important; }
    .tx { color:#eaf3ff !important; } .tx2 { color:#a9bedb !important; } .lk { color:#5cc3ec !important; } .lb { color:#5cc3ec !important; } .soft { background-color:#132349 !important; }
  }
  [data-ogsc] .tx { color:#eaf3ff !important; } [data-ogsc] .tx2 { color:#a9bedb !important; } [data-ogsb] .pg { background-color:#070f22 !important; } [data-ogsb] .card { background-color:#0f1b38 !important; }
</style></head>
<body class="body pg" style="margin:0;padding:0;background-color:#eef4fa;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="pg" bgcolor="#eef4fa" style="background-color:#eef4fa;font-family:'Inter','Segoe UI',Roboto,Arial,sans-serif;">
<tr><td align="center" style="padding:30px 12px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
  <tr><td align="center" style="border-radius:24px 24px 0 0;padding:26px 20px;background-color:#172b5e;background-image:linear-gradient(150deg,#0b1633 0%,#172b5e 42%,#166baf 82%,#3eaedd 122%);">
    <img src="${SITIO}/logo-white.png" width="42" height="42" alt="DGP" style="display:block;border:0;margin:0 auto;">
    ${blanco(`<div style="${f}color:#ffffff;font-size:13px;font-weight:700;letter-spacing:2.5px;margin-top:10px;">DGP GROUP USA</div>`)}
  </td></tr>
  <tr><td class="card" bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid #e1ecf5;border-top:0;border-radius:0 0 24px 24px;padding:34px 30px;text-align:center;">
    <div>${cabeza}</div>
    <div class="tx" style="${f}font-size:25px;font-weight:700;color:#1e293b;margin-top:18px;line-height:1.25;">${escHtmlR(titulo)}</div>
    <div class="tx2" style="font-size:15px;line-height:1.7;color:#475569;margin-top:14px;">${escHtmlR(texto).replace(/\n/g, '<br>')}</div>
    ${oferta ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr><td class="soft" style="border:1.5px dashed #3eaedd;border-radius:16px;padding:16px 18px;background-color:#f3f8fc;text-align:center;">
      <div class="lb" style="${f}font-size:10.5px;font-weight:600;letter-spacing:2px;color:#1f8fc0;">TU REGALO</div>
      <div class="tx" style="${f}font-size:17px;font-weight:700;color:#1e293b;margin-top:6px;line-height:1.35;">${escHtmlR(oferta)}</div></td></tr></table>` : ''}
    <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin-top:28px;"><tr><td style="border-radius:40px;${grad}">
      <a href="${link}" style="display:inline-block;padding:16px 38px;text-decoration:none;">${blanco(`<span style="${f}color:#ffffff;font-size:15px;font-weight:600;">${escHtmlR(boton)} &nbsp;→</span>`)}</a>
    </td></tr></table>
    ${nota ? `<div class="tx2" style="font-size:12px;color:#94a3b8;margin-top:16px;">${escHtmlR(nota)}</div>` : ''}
  </td></tr>
  <tr><td align="center" class="tx2" style="padding-top:24px;font-size:12px;color:#64748b;line-height:1.7;">
    <a href="https://dgpglobalgroup.com" class="lk" style="color:#166baf;text-decoration:none;font-weight:600;">dgpglobalgroup.com</a> · <a href="https://wa.me/12398231738" class="lk" style="color:#166baf;text-decoration:none;font-weight:600;">WhatsApp +1 (239) 823-1738</a><br>
    <span style="${f}font-size:10.5px;letter-spacing:2.5px;color:#94a3b8;font-weight:600;">DGP GROUP USA</span>
  </td></tr>
</table></td></tr></table></body></html>`;
}

async function recordarResenas(env, token, docs, correoDe) {
  if (!env.EMAIL_WEBHOOK || !env.EMAIL_CLAVE) return [];
  const encuestas = await fsList(env, 'encuestas', token);
  const limite = Date.now() - 2 * 86400000;
  const enviados = [];
  for (const e of encuestas) {
    if (e.googleClick || e.resenaRecordada || promedioEnc(e) < 4) continue;
    if (!e.fecha || new Date(e.fecha).getTime() > limite) continue;
    const doc = docs.find(d => d._id === e.docId);
    const correo = doc?.clienteCorreo || correoDe(e.cliente || doc?.cli || '');
    if (!correo) continue;
    const nombre = String(e.cliente || doc?.cli || '').split(' ')[0] || 'hola';
    const res = await fetch(env.EMAIL_WEBHOOK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'follow',
      body: JSON.stringify({ clave: env.EMAIL_CLAVE, para: correo, asunto: `${nombre}, ¿nos ayudas con una reseña en Google?`, nombre: 'DGP Group USA', responderA: 'dgpgroup.usa@gmail.com',
        html: correoResenaHTML(nombre, `${BOT_URL}/resena?e=${e._id}`),
        texto: `¡Gracias por confiar en nosotros, ${nombre}! ¿Nos regalas 30 segundos para dejar tu reseña en Google?\n${GOOGLE_RESENA}\n\nDGP Group USA · dgpglobalgroup.com` })
    });
    const r = await res.json().catch(() => ({}));
    if (!r.ok) { console.warn('Reseña correo', correo, r.error); continue; }
    await fsUpdate(env, `encuestas/${e._id}`, { resenaRecordada: true, resenaRecordadaAt: new Date() }, ['resenaRecordada', 'resenaRecordadaAt'], token).catch(() => {});
    enviados.push({ cliente: e.cliente || doc?.cli || '—', correo });
    if (enviados.length >= 20) break;
  }
  return enviados;
}

/* ══════════════════════════════════════════════════════════════
   Bot de avisos interactivo — webhook POST /tg-notif
   · Botones en los avisos de comprobantes: confirmar, abono, rechazar
   · Nota de voz o texto ("factura para Pedro de 200 por página web")
     → borrador con botones Crear / Cancelar
   Solo atiende el chat del dueño (TG_CHAT) y exige el token secreto de Telegram.
══════════════════════════════════════════════════════════════ */
const TG_RUTA = '/tg-notif';
const MODELOS_TEXTO = ['@cf/qwen/qwen3.8-27b', '@cf/meta/llama-3.3-70b-instruct-fp8-fast', '@cf/meta/llama-4-scout-17b-16e-instruct'];

async function tgApi(env, metodo, body) {
  const r = await fetch(`https://api.telegram.org/bot${tgToken(env)}/${metodo}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {})
  });
  return r.json().catch(() => ({}));
}
async function tgSecreto(env) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('dgp-notif:' + tgToken(env)));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 48);
}
/* Apunta el bot de avisos a este Worker (idempotente) */
async function asegurarWebhook(env) {
  const url = BOT_URL + TG_RUTA;
  const info = await tgApi(env, 'getWebhookInfo');
  const actual = info.result?.url || '';
  if (actual === url) return { ok: true, url, nuevo: false, pendientes: info.result.pending_update_count || 0, error: info.result.last_error_message || null };
  // Si este token es el del asistente de ventas (webhook en la raíz), no se toca
  if (actual && actual.replace(/\/$/, '') === BOT_URL) return { ok: false, url: actual, error: 'Este bot es el mismo del asistente de ventas; usa un bot distinto para los avisos (TG_TOKEN_NOTIF).' };
  const r = await tgApi(env, 'setWebhook', { url, secret_token: await tgSecreto(env), allowed_updates: ['message', 'callback_query'] });
  if (r.ok) await tgApi(env, 'setMyCommands', { commands: [
    { command: 'factura', description: 'Crear una factura: /factura Pedro 200 página web' },
    { command: 'cotizacion', description: 'Crear una cotización' },
    { command: 'meta', description: 'Cómo vas con la meta del mes' },
    { command: 'ayuda', description: 'Qué puedo hacer' }
  ] }).catch(() => {});
  return { ok: !!r.ok, url, nuevo: true, error: r.ok ? null : (r.description || 'No se pudo conectar') };
}

async function handleTgNotif(request, env, ctx) {
  if (request.method !== 'POST') return new Response('ok');
  if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== await tgSecreto(env)) return new Response('forbidden', { status: 403 });
  const up = await request.json().catch(() => null);
  if (!up) return new Response('ok');
  const tarea = (async () => {
    try {
      if (up.callback_query) await tgCallback(env, up.callback_query);
      else if (up.message) await tgMensaje(env, up.message);
    } catch (e) {
      console.error('tg-notif', e);
      await tgEnviar(env, `⚠️ No pude completar eso: ${escHtml(e.message || e)}`).catch(() => {});
    }
  })();
  if (ctx?.waitUntil) ctx.waitUntil(tarea); else await tarea;
  return new Response('ok');
}

/* ── Botones ── */
function botonesPago(fsId, ev) {
  const rechazar = { text: '❌ Rechazar', callback_data: `r:${fsId}` };
  if (ev.estado === 'menor' && ev.monto > 0) return { inline_keyboard: [
    [{ text: `💰 Registrar abono de ${dinero(ev.monto)}`, callback_data: `a:${fsId}:${ev.monto}` }],
    [{ text: '✅ Pagado completo', callback_data: `p:${fsId}` }, rechazar]] };
  return { inline_keyboard: [[{ text: ev.estado === 'coincide' ? '✅ Confirmar pago' : '✅ Marcar pagado', callback_data: `p:${fsId}` }, rechazar]] };
}

async function tgCallback(env, cq) {
  const chat = String(cq.message?.chat?.id || '');
  if (chat !== TG_CHAT) return tgApi(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'No autorizado' });
  const [acc, id, extra] = String(cq.data || '').split(':');
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id || '')) return tgApi(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'Botón no válido' });
  const token = await firebaseLogin(env);
  const acciones = {
    p: () => botMarcarPagado(env, token, id),
    a: () => botAbono(env, token, id, Number(extra)),
    r: () => botRechazar(env, token, id),
    c: () => botCrearDesdeBorrador(env, token, id),
    x: () => botCancelarBorrador(env, token, id),
    wa: () => botResenaWeb(env, token, id, 'aprobada'),
    wr: () => botResenaWeb(env, token, id, 'rechazada')
  };
  const res = acciones[acc] ? await acciones[acc]() : { aviso: 'Acción desconocida' };
  await tgApi(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: String(res.aviso || 'Listo').slice(0, 190) });
  // Quita los botones para no repetir la acción
  await tgApi(env, 'editMessageReplyMarkup', { chat_id: chat, message_id: cq.message.message_id, reply_markup: { inline_keyboard: [] } });
  if (res.html) await tgApi(env, 'sendMessage', { chat_id: chat, text: res.html, parse_mode: 'HTML', disable_web_page_preview: true,
    reply_to_message_id: cq.message.message_id, ...(res.markup ? { reply_markup: res.markup } : {}) });
}

/* Igual que "Marcar pagado" del panel (guarda la foto para poder deshacer y renueva la suscripción) */
async function botMarcarPagado(env, token, fsId, pagoNuevo) {
  const doc = await fsGet(env, `documentos/${fsId}`, token);
  if (!doc) return { aviso: 'Esa factura ya no existe' };
  if (doc.pagado || doc.type === 'recibo') return { aviso: 'Ya estaba pagada', html: `ℹ️ ${escHtml(doc.docId || fsId)} ya estaba marcada como pagada.` };
  const hoy = hoyVE();
  const sub = doc.suscripcionId ? await fsGet(env, `suscripciones/${doc.suscripcionId}`, token).catch(() => null) : null;
  const estadoAnterior = {
    type: doc.type || 'factura', pagadoParcial: !!doc.pagadoParcial, montoPagado: Number(doc.montoPagado) || 0,
    fechaPago: doc.fechaPago || null, docId: doc.docId || '', ref: doc.ref ?? '', pagosN: (doc.pagos || []).length,
    sus: sub ? { id: doc.suscripcionId, proximoPago: sub.proximoPago || '', ultimoPago: sub.ultimoPago || '' } : null,
    fecha: new Date().toISOString(), por: 'telegram'
  };
  const nuevoId = 'REC-' + String(doc.docId || '').replace(/^FAC-/, '');
  const campos = { type: 'recibo', pagado: true, pagadoParcial: false, fechaPago: isoADmy(hoy), docId: nuevoId,
    ref: doc.ref && doc.ref !== '—' ? doc.ref : 'Pago confirmado', estadoAnterior, pagoRechazado: null };
  if (pagoNuevo) { campos.pagos = [...(doc.pagos || []), pagoNuevo]; campos.montoPagado = r2((Number(doc.montoPagado) || 0) + pagoNuevo.monto); }
  await fsUpdate(env, `documentos/${fsId}`, campos, Object.keys(campos), token);
  let extra = '';
  if (sub && sub.estado === 'activa' && sub.proximoPago && (!doc.periodo || doc.periodo === sub.proximoPago)) {
    const nueva = sumarCiclo(sub.proximoPago, sub.ciclo);
    await fsUpdate(env, `suscripciones/${doc.suscripcionId}`, { proximoPago: nueva, ultimoPago: hoy }, ['proximoPago', 'ultimoPago'], token);
    if (sub.portalCodigo) await fsUpdate(env, `portal/${sub.portalCodigo}/suscripciones/${doc.suscripcionId}`, { proximoPago: nueva }, ['proximoPago'], token).catch(() => {});
    extra = `\n🔁 Suscripción renovada · próximo pago ${escHtml(fechaCorta(nueva))}`;
  }
  return { aviso: 'Pago confirmado ✅', html: `✅ <b>Pago confirmado</b> · ${escHtml(nuevoId)}\n👤 ${escHtml(doc.cli || '—')} · ${dinero(doc.total)}${extra}\n\n<a href="${SITIO}/factura-publica.html?id=${fsId}">Ver recibo</a>\n<i>Si fue un error: ábrelo en el panel → "Volver a pendiente de pago".</i>` };
}
async function botAbono(env, token, fsId, monto) {
  if (!(monto > 0)) return { aviso: 'Monto no válido' };
  const doc = await fsGet(env, `documentos/${fsId}`, token);
  if (!doc) return { aviso: 'Esa factura ya no existe' };
  if (doc.pagado || doc.type === 'recibo') return { aviso: 'Ya estaba pagada' };
  const pago = { monto: r2(monto), ref: 'Confirmado por Telegram', fecha: isoADmy(hoyVE()) };
  const nuevo = r2((Number(doc.montoPagado) || 0) + pago.monto);
  if (nuevo >= (Number(doc.total) || 0) - 0.009) return botMarcarPagado(env, token, fsId, pago);
  await fsUpdate(env, `documentos/${fsId}`, { pagos: [...(doc.pagos || []), pago], montoPagado: nuevo, pagadoParcial: true, pagoRechazado: null },
    ['pagos', 'montoPagado', 'pagadoParcial', 'pagoRechazado'], token);
  return { aviso: 'Abono registrado 💰', html: `💰 <b>Abono registrado</b> · ${escHtml(doc.docId || fsId)}\n👤 ${escHtml(doc.cli || '—')}\nRecibido: ${dinero(pago.monto)} · Pagado: ${dinero(nuevo)} de ${dinero(doc.total)}\nPendiente: <b>${dinero((Number(doc.total) || 0) - nuevo)}</b>` };
}
async function botRechazar(env, token, fsId) {
  const doc = await fsGet(env, `documentos/${fsId}`, token);
  if (!doc) return { aviso: 'Esa factura ya no existe' };
  const comps = listaComprobantes(doc);
  const ult = comps[comps.length - 1];
  await fsUpdate(env, `documentos/${fsId}`, { pagoRechazado: { url: ult?.url || '', fecha: new Date().toISOString() } }, ['pagoRechazado'], token);
  return { aviso: 'Comprobante rechazado', html: `❌ <b>Comprobante rechazado</b> · ${escHtml(doc.docId || fsId)}\n👤 ${escHtml(doc.cli || '—')}\nEn su factura el cliente verá que no pudimos confirmar el pago y que puede subir otro comprobante o escribirte.\n\n<a href="${SITIO}/factura-publica.html?id=${fsId}">Ver factura</a>` };
}

/* ── Mensajes: voz o texto → factura / cotización ── */
async function tgMensaje(env, msg) {
  const chat = String(msg.chat?.id || '');
  if (chat !== TG_CHAT) return tgApi(env, 'sendMessage', { chat_id: chat, text: 'Este bot es privado de DGP Group USA.' });
  const texto = String(msg.text || msg.caption || '').trim();
  if (/^\/(start|ayuda|help)\b/i.test(texto)) return tgEnviar(env, AYUDA_BOT);
  if (/^\/meta\b/i.test(texto)) { const token = await firebaseLogin(env); return tgEnviar(env, (await lineaMeta(env, token)) || '🎯 Aún no tienes una meta del mes. Ponla en el panel → Dashboard.'); }
  if (msg.voice || msg.audio) {
    await tgApi(env, 'sendChatAction', { chat_id: chat, action: 'typing' });
    const dicho = await transcribir(env, (msg.voice || msg.audio).file_id);
    if (!dicho) return tgEnviar(env, '🎧 No logré entender el audio. Intenta de nuevo hablando un poco más despacio.');
    return prepararDocumento(env, dicho, true);
  }
  if (texto) {
    const cmd = texto.match(/^\/(factura|cotizacion|cotización)(@\w+)?\s*/i);
    if (cmd || /\b(factura|cotiza|cobrar|cóbrale|cobrale)\w*/i.test(texto)) {
      const t = cmd ? (/^cotiz/i.test(cmd[1]) ? 'cotización ' : 'factura ') + texto.slice(cmd[0].length) : texto;
      if (t.trim().split(/\s+/).length < 3) return tgEnviar(env, '✍️ Dime para quién y de cuánto. Ejemplo:\n<code>/factura Pedro Ruiz 200 página web</code>');
      await tgApi(env, 'sendChatAction', { chat_id: chat, action: 'typing' });
      return prepararDocumento(env, t, false);
    }
  }
  return tgEnviar(env, AYUDA_BOT);
}
const AYUDA_BOT = `🤖 <b>Asistente de DGP Group USA</b>

🎙 <b>Mándame una nota de voz</b> como:
<i>"Crea una factura para Pedro Ruiz de 200 dólares por una página web"</i>
<i>"Cotización para Ana: hosting anual 120 y dominio 20"</i>

✍️ O escríbelo: <code>/factura Pedro 200 página web</code>

Te muestro el borrador y lo creas con un toque.

💳 Cuando un cliente suba un comprobante te llegan botones para <b>confirmar</b>, <b>registrar abono</b> o <b>rechazar</b>.
🎯 /meta — cómo vas con la meta del mes`;

async function transcribir(env, fileId) {
  if (!env.AI) throw new Error('Workers AI no está conectado');
  const f = await tgApi(env, 'getFile', { file_id: fileId });
  if (!f.ok) throw new Error('No pude descargar el audio de Telegram');
  const buf = await (await fetch(`https://api.telegram.org/file/bot${tgToken(env)}/${f.result.file_path}`)).arrayBuffer();
  let error = null;
  try {
    const out = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: aBase64(buf), language: 'es' });
    if (out?.text?.trim()) return out.text.trim();
  } catch (e) { error = e; }
  try {
    const out = await env.AI.run('@cf/openai/whisper', { audio: [...new Uint8Array(buf)] });
    if (out?.text?.trim()) return out.text.trim();
  } catch (e) { error = e; }
  if (error) throw new Error('No pude transcribir el audio: ' + (error.message || error));
  return '';
}

async function aiTexto(env, system, user, maxTokens = 900) {
  if (!env.AI) throw new Error('Workers AI no está conectado');
  let ultimo = null;
  for (const modelo of MODELOS_TEXTO) {
    try {
      const out = await env.AI.run(modelo, { messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: maxTokens, temperature: 0.2 });
      const t = textoDeRespuestaAI(out).replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      if (t) return t;
    } catch (e) { ultimo = e.message || String(e); }
  }
  throw new Error('IA: ' + (ultimo || 'sin respuesta'));
}

const PROMPT_DOC = `Conviertes pedidos de un dueño de agencia (en español, a veces transcritos de voz) en un documento de cobro.
Responde SOLO un objeto JSON válido, sin texto extra:
{"tipo":"factura"|"cotizacion","cliente":"nombre","items":[{"s":"descripción del servicio","p":precio unitario en dólares (número),"c":cantidad (entero)}],"nota":"texto o null","entendido":true|false}
Reglas:
- "tipo" es "cotizacion" solo si pide una cotización, presupuesto o propuesta; si no, "factura".
- Si el nombre del cliente se parece a uno de la lista de CLIENTES, usa EXACTAMENTE ese nombre.
- Si un servicio se parece a uno del CATÁLOGO y no dicen precio, usa el precio del catálogo y su nombre.
- "doscientos" = 200, "ciento veinte" = 120, "mil quinientos" = 1500. Cantidad por defecto 1.
- Escribe los servicios con la primera letra en mayúscula (ej. "Página web", "Hosting anual").
- Si no hay cliente o ningún precio, "entendido": false.`;

async function prepararDocumento(env, texto, desdeVoz) {
  const token = await firebaseLogin(env);
  const [clientes, portales, catalogo] = await Promise.all([
    fsList(env, 'clientes', token).catch(() => []), fsList(env, 'portal', token).catch(() => []), fsList(env, 'catalogo', token).catch(() => [])
  ]);
  const nombres = [...new Set([...clientes.map(c => [c.nombre, c.apellido].filter(Boolean).join(' ')), ...portales.map(p => p.nombre)].filter(Boolean))].slice(0, 400);
  const cat = catalogo.filter(x => x.activo !== false).map(x => `${x.nombre}: $${x.precio}`).slice(0, 120);
  const resp = await aiTexto(env, PROMPT_DOC, `CLIENTES: ${nombres.join(' | ') || '(ninguno)'}\nCATÁLOGO: ${cat.join(' | ') || '(vacío)'}\n\nPEDIDO: ${texto}`);
  const d = extraerJSON(resp) || {};
  const items = (Array.isArray(d.items) ? d.items : []).map(i => ({ s: String(i.s || '').trim().slice(0, 140), p: r2(Number(i.p) || 0), c: Math.max(1, parseInt(i.c) || 1) }))
    .filter(i => i.s && i.p > 0).map(i => ({ ...i, t: r2(i.p * i.c) }));
  const cliente = String(d.cliente || '').trim().replace(/\s+/g, ' ').slice(0, 120);
  const oido = desdeVoz ? `\n\n🎙 <i>"${escHtml(texto)}"</i>` : '';
  if (!cliente || !items.length || d.entendido === false) return tgEnviar(env, `🤔 No logré armar el documento: me falta ${!cliente ? 'el cliente' : 'el precio de al menos un servicio'}.${oido}\n\nEjemplo: <i>"Factura para Pedro Ruiz de 200 dólares por página web"</i>`);
  const tipo = d.tipo === 'cotizacion' ? 'cotizacion' : 'factura';
  const existe = nombres.find(n => normNombre(n) === normNombre(cliente));
  const total = r2(items.reduce((a, i) => a + i.t, 0));
  const borradorId = await fsCreate(env, 'borradoresBot', { tipo, cliente: existe || cliente, items, total, nota: d.nota ? String(d.nota).slice(0, 300) : '', texto: texto.slice(0, 600), creadoAt: new Date() }, token);
  const html = `${tipo === 'cotizacion' ? '📋' : '🧾'} <b>Borrador de ${tipo === 'cotizacion' ? 'cotización' : 'factura'}</b>
👤 ${escHtml(existe || cliente)} ${existe ? '<i>(cliente registrado)</i>' : '<i>(cliente nuevo)</i>'}

${items.map(i => `• ${escHtml(i.s)}${i.c > 1 ? ` × ${i.c}` : ''} — ${dinero(i.t)}`).join('\n')}
<b>Total: ${dinero(total)}</b>${d.nota ? `\n📝 ${escHtml(d.nota)}` : ''}${oido}`;
  return tgApi(env, 'sendMessage', { chat_id: TG_CHAT, text: html, parse_mode: 'HTML', reply_markup: { inline_keyboard: [[
    { text: `✅ Crear ${tipo === 'cotizacion' ? 'cotización' : 'factura'}`, callback_data: `c:${borradorId}` }, { text: '❌ Cancelar', callback_data: `x:${borradorId}` }]] } });
}

async function fsBorrar(env, path, token) {
  await fetch(docUrl(env, path), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}
/* Últimos documentos creados (para copiar los datos de pago de tu factura más reciente) */
async function fsUltimos(env, coleccion, n, token) {
  const base = `projects/${env.FIREBASE_PROJECT || PROJECT_DEFAULT}/databases/(default)/documents`;
  const res = await fetch(`https://firestore.googleapis.com/v1/${base}:runQuery`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId: coleccion }], orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }], limit: n } })
  });
  const data = await res.json().catch(() => []);
  return (Array.isArray(data) ? data : []).filter(x => x.document).map(x => ({ _id: x.document.name.split('/').pop(), ...fromFields(x.document.fields || {}) }));
}
async function botCancelarBorrador(env, token, id) {
  await fsBorrar(env, `borradoresBot/${id}`, token);
  return { aviso: 'Cancelado', html: '🗑 Borrador descartado.' };
}
async function botCrearDesdeBorrador(env, token, id) {
  const b = await fsGet(env, `borradoresBot/${id}`, token);
  if (!b) return { aviso: 'Ese borrador ya se usó' };
  const [clientes, portales, recientes] = await Promise.all([
    fsList(env, 'clientes', token).catch(() => []), fsList(env, 'portal', token).catch(() => []), fsUltimos(env, b.tipo === 'cotizacion' ? 'cotizaciones' : 'documentos', 15, token).catch(() => [])
  ]);
  const n = normNombre(b.cliente);
  const cli = clientes.find(c => normNombre([c.nombre, c.apellido].filter(Boolean).join(' ')) === n);
  const portal = portales.find(p => p.activo !== false && normNombre(p.nombre) === n);
  const conPago = recientes.find(d => d.metodoPago && d.infoPago && Object.keys(d.infoPago).length && !String(d._id).startsWith('__diag'));
  const correo = cli?.correo || portal?.correo || null;
  const tel = String(cli?.telefono || portal?.telefono || '').replace(/[^0-9]/g, '');
  const hoy = hoyVE();
  const comun = {
    cli: b.cliente, ref: '—', nota: b.nota || '', fecha: isoADmy(hoy), total: b.total, moneda: conPago?.moneda || 'usd',
    emisor: conPago?.emisor || '', metodoPago: conPago?.metodoPago || null, infoPago: conPago?.infoPago || {},
    items: b.items, clienteCorreo: correo, portalCodigo: portal?._id || null, createdBy: 'telegram', createdAt: new Date()
  };
  const sufijo = Date.now().toString(36).toUpperCase().slice(-6);
  let docId, link, nuevoId;
  if (b.tipo === 'cotizacion') {
    const vence = new Date(Date.now() + 15 * 864e5).toISOString().slice(0, 10);
    docId = 'COT-' + sufijo;
    nuevoId = await fsCreate(env, 'cotizaciones', { ...comun, docId, estado: 'enviada', venceEl: vence }, token);
    if (portal) await fsAgregarALista(env, `portal/${portal._id}`, 'cotizacionIds', nuevoId, token).catch(() => {});
    link = `${SITIO}/cotizacion.html?id=${nuevoId}`;
  } else {
    docId = 'FAC-' + sufijo;
    nuevoId = await fsCreate(env, 'documentos', { ...comun, docId, type: 'factura', contrato: false, pagado: false, fechaPago: null }, token);
    if (portal) await fsAgregarALista(env, `portal/${portal._id}`, 'facturaIds', nuevoId, token).catch(() => {});
    link = `${SITIO}/factura-publica.html?id=${nuevoId}`;
  }
  // Cliente nuevo → se agenda en Clientes
  if (!cli) {
    const partes = b.cliente.split(' ');
    const cid = n.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    if (cid && !(await fsGet(env, `clientes/${cid}`, token).catch(() => null))) {
      await fetch(`${docUrl(env, `clientes/${cid}`)}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: toValue({ nombre: partes[0], apellido: partes.slice(1).join(' '), correo: '', telefono: '', creadoPor: 'telegram', createdAt: new Date() }).mapValue.fields }) }).catch(() => {});
    }
  }
  await fsBorrar(env, `borradoresBot/${id}`, token);
  const nombre = b.cliente.split(' ')[0];
  const textoWa = `Hola ${nombre}! Te comparto tu ${b.tipo === 'cotizacion' ? 'cotización' : 'factura'} ${docId} por ${dinero(b.total)}:\n${link}\n\n${b.tipo === 'cotizacion' ? 'Desde el enlace puedes revisarla y aceptarla.' : 'Desde el enlace puedes pagar y subir tu comprobante.'} ¡Gracias!`;
  return {
    aviso: b.tipo === 'cotizacion' ? 'Cotización creada ✅' : 'Factura creada ✅',
    html: `✅ <b>${b.tipo === 'cotizacion' ? 'Cotización' : 'Factura'} creada</b> · ${escHtml(docId)}\n👤 ${escHtml(b.cliente)} · ${dinero(b.total)}${conPago?.metodoPago ? `\n💳 Datos de pago: ${escHtml(conPago.metodoPago)} (los de tu última factura)` : '\n⚠️ Sin datos de pago: agrégalos en el panel si hace falta.'}${correo ? `\n✉️ ${escHtml(correo)}` : ''}`,
    markup: { inline_keyboard: [[{ text: '🔗 Abrir', url: link }, { text: '💬 Enviar por WhatsApp', url: `https://wa.me/${tel}?text=${encodeURIComponent(textoWa)}` }]] }
  };
}

/* ══════════════════════════════════════════════════════════════
   Meta del mes y resumen semanal con IA
══════════════════════════════════════════════════════════════ */
/* Fecha (YYYY-MM-DD, hora de Venezuela) de "dd/mm/aaaa" o de un timestamp */
function fechaISO(v) {
  if (!v) return null;
  const s = String(v);
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) { const [d, m, y] = s.split('/'); return `${y}-${m}-${d}`; }
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const t = new Date(s); return isNaN(t) ? null : new Date(t.getTime() - 4 * 3600e3).toISOString().slice(0, 10);
}
/* Cada cobro con su fecha (misma lógica que el panel: abonos + saldo final al pagarse) */
function cobrosDe(docs) {
  const out = [];
  for (const d of docs) {
    if (String(d._id || '').startsWith('__diag')) continue;
    const pagos = Array.isArray(d.pagos) ? d.pagos : [];
    let suma = 0;
    pagos.forEach(p => { const f = fechaISO(p.fecha), m = Number(p.monto) || 0; if (f && m) { out.push({ f, m, d }); suma += m; } });
    if (d.pagado || d.type === 'recibo') {
      const resto = (Number(d.total) || 0) - suma;
      if (resto > 0.009) out.push({ f: fechaISO(d.fechaPago) || fechaISO(d.fecha) || fechaISO(d.createdAt), m: resto, d });
    } else if (d.pagadoParcial && (Number(d.montoPagado) || 0) > suma + 0.009) {
      out.push({ f: fechaISO(d.createdAt) || fechaISO(d.fecha), m: (Number(d.montoPagado) || 0) - suma, d });
    }
  }
  return out.filter(x => x.f);
}
async function lineaMeta(env, token, docs) {
  const cfg = await fsGet(env, 'config/meta', token).catch(() => null);
  const meta = Number(cfg?.mensual) || 0;
  if (!meta) return '';
  docs = docs || await fsList(env, 'documentos', token);
  const hoy = hoyVE(), mes = hoy.slice(0, 7);
  const llevas = cobrosDe(docs).filter(x => x.f.slice(0, 7) === mes).reduce((a, x) => a + x.m, 0);
  const [y, m] = mes.split('-').map(Number);
  const diasMes = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const quedan = diasMes - Number(hoy.slice(8, 10)) + 1;
  const pct = Math.round(llevas / meta * 100);
  const falta = Math.max(meta - llevas, 0);
  const barra = '▰'.repeat(Math.min(10, Math.round(pct / 10))) + '▱'.repeat(Math.max(0, 10 - Math.round(pct / 10)));
  if (falta <= 0) return `🎯 <b>¡Meta del mes cumplida!</b> ${dinero(llevas)} de ${dinero(meta)} (${pct}%) 🎉`;
  // ¿Va a tiempo? Compara con lo esperado a esta altura del mes
  const esperado = meta * (diasMes - quedan + 1) / diasMes;
  const ritmo = llevas >= esperado ? 'vas a buen ritmo 💪' : `necesitas ~${dinero(falta / quedan)} por día`;
  return `🎯 <b>Meta del mes:</b> ${dinero(llevas)} de ${dinero(meta)} (${pct}%)\n${barra}\nFaltan ${dinero(falta)} y quedan ${quedan} día${quedan !== 1 ? 's' : ''}: ${ritmo}`;
}

async function resumenSemanal(env) {
  const token = await firebaseLogin(env);
  const [docs, subs, clientes, encuestas] = await Promise.all(['documentos', 'suscripciones', 'clientes', 'encuestas'].map(c => fsList(env, c, token).catch(() => [])));
  const hoy = hoyVE();
  const menos = n => { const d = new Date(hoy + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().slice(0, 10); };
  const ini = menos(6), iniAnt = menos(13), finAnt = menos(7);
  const cobros = cobrosDe(docs);
  const semana = cobros.filter(x => x.f >= ini && x.f <= hoy), anterior = cobros.filter(x => x.f >= iniAnt && x.f <= finAnt);
  const cobrado = semana.reduce((a, x) => a + x.m, 0), cobradoAnt = anterior.reduce((a, x) => a + x.m, 0);
  const cambio = cobradoAnt > 0 ? Math.round((cobrado - cobradoAnt) / cobradoAnt * 100) : null;
  const reales = docs.filter(d => !String(d._id).startsWith('__diag'));
  const nuevas = reales.filter(d => { const f = fechaISO(d.createdAt) || fechaISO(d.fecha); return f && f >= ini && f <= hoy; });
  // Servicios más vendidos (cobrados en la semana)
  const porServicio = {};
  semana.forEach(x => { const s = (x.d.items || [])[0]?.s || 'Otro'; const k = s.replace(/\s*\(.*\)$/, '').trim(); porServicio[k] = (porServicio[k] || 0) + x.m; });
  const top = Object.entries(porServicio).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const pendientes = reales.filter(d => saldoDoc(d) > 0.009);
  const deuda = pendientes.reduce((a, d) => a + saldoDoc(d), 0);
  const viejas = pendientes.filter(d => { const f = fechaDoc(d); return f && diasEntre(f, hoy) > 30; });
  const activas = subs.filter(s => s.estado === 'activa' && s.proximoPago);
  const prox30 = activas.filter(s => { const d = diasEntre(hoy, s.proximoPago); return d >= 0 && d <= 30; });
  const anualesPorMes = {};
  activas.filter(s => s.ciclo === 'anual').forEach(s => { const k = s.proximoPago.slice(0, 7); (anualesPorMes[k] = anualesPorMes[k] || []).push(s.cliente); });
  const mesesCargados = Object.entries(anualesPorMes).filter(([, v]) => v.length >= 3).map(([k, v]) => ({ mes: k, clientes: v.length }));
  const nuevosClientes = clientes.filter(c => { const f = fechaISO(c.createdAt); return f && f >= ini; }).length;
  const encSemana = encuestas.filter(e => { const f = fechaISO(e.fecha); return f && f >= ini; });
  const prom = encSemana.length ? encSemana.reduce((a, e) => a + (Number(e.promedio) || 0), 0) / encSemana.length : null;
  const meta = await lineaMeta(env, token, docs);

  const datos = {
    semana: `${ini} a ${hoy}`, cobrado: r2(cobrado), cobradoSemanaAnterior: r2(cobradoAnt), cambioPorcentaje: cambio,
    pagosRecibidos: semana.length, facturasNuevas: nuevas.length, montoFacturado: r2(nuevas.reduce((a, d) => a + (Number(d.total) || 0), 0)),
    serviciosMasCobrados: top.map(([s, m]) => ({ servicio: s, monto: r2(m) })),
    porCobrarTotal: r2(deuda), facturasPendientes: pendientes.length, pendientesDeMasDe30Dias: viejas.length,
    suscripcionesQueVencenEn30Dias: prox30.length, montoSuscripciones30Dias: r2(prox30.reduce((a, s) => a + (Number(s.precio) || 0), 0)),
    mesesConVariasRenovacionesAnuales: mesesCargados, clientesNuevos: nuevosClientes,
    encuestasSemana: encSemana.length, promedioEstrellas: prom ? r2(prom) : null, metaDelMes: meta.replace(/<[^>]+>/g, '') || null
  };
  let analisis = '';
  try {
    analisis = await aiTexto(env, `Eres el analista de negocio de una agencia digital pequeña (DGP Group USA). Con los DATOS de la semana escribe entre 3 y 5 viñetas en español, muy concretas, cada una de una o dos líneas.
Incluye: cómo le fue comparado con la semana anterior, qué se vendió más, riesgos (cobros atrasados, meses con muchas renovaciones) y UNA recomendación accionable para la próxima semana.
Usa los números exactos de los DATOS, no inventes nada. Sin títulos ni introducción. Cada línea empieza con "• ".`, JSON.stringify(datos), 600);
    analisis = analisis.split('\n').map(l => l.trim()).filter(l => l.startsWith('•')).slice(0, 6).map(escHtml).join('\n');
  } catch (e) { console.warn('Análisis IA', e); }

  const L = [`📊 <b>Resumen de la semana</b> · ${escHtml(fechaCorta(ini))} – ${escHtml(fechaCorta(hoy))}`, '',
    `💵 Cobrado: <b>${dinero(cobrado)}</b>${cambio !== null ? ` (${cambio >= 0 ? '▲' : '▼'} ${Math.abs(cambio)}% vs semana anterior)` : ''} · ${semana.length} pago${semana.length !== 1 ? 's' : ''}`,
    `🧾 Facturas nuevas: ${nuevas.length} por ${dinero(datos.montoFacturado)}`,
    top.length ? `🏆 Más vendido: ${top.map(([s, m]) => `${escHtml(s)} (${dinero(m)})`).join(', ')}` : '',
    `⏳ Por cobrar: ${dinero(deuda)} en ${pendientes.length} factura${pendientes.length !== 1 ? 's' : ''}${viejas.length ? ` · ${viejas.length} con más de 30 días` : ''}`,
    prox30.length ? `🔁 Suscripciones en los próximos 30 días: ${prox30.length} (${dinero(datos.montoSuscripciones30Dias)})` : '',
    nuevosClientes ? `👥 Clientes nuevos: ${nuevosClientes}` : '',
    prom ? `⭐ Encuestas: ${encSemana.length} · promedio ${prom.toFixed(1)}/5` : '',
    meta ? '\n' + meta : '',
    analisis ? `\n🧠 <b>Análisis</b>\n${analisis}` : '',
    `\n<a href="${SITIO}/">Abrir el panel</a>`].filter(Boolean);
  await tgEnviar(env, L.join('\n'));
  return { cobrado };
}

/* ══════════════════════════════════════════════════════════════
   Correos automáticos del día: encuesta tras completar un proyecto,
   aniversario del lanzamiento y cumpleaños del cliente.
══════════════════════════════════════════════════════════════ */
const OFERTA_ANIVERSARIO = '15% de descuento en tu próximo servicio este mes. Responde este correo para usarlo.';
const OFERTA_CUMPLE = '20% de descuento en cualquier servicio durante los próximos 15 días. Responde este correo para usarlo.';
const DIAS_ENCUESTA = 3;

async function enviarCorreoBot(env, para, asunto, html, texto) {
  if (!env.EMAIL_WEBHOOK || !env.EMAIL_CLAVE || !para) return false;
  const res = await fetch(env.EMAIL_WEBHOOK, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'follow',
    body: JSON.stringify({ clave: env.EMAIL_CLAVE, para, asunto, html, texto, nombre: 'DGP Group USA', responderA: 'dgpgroup.usa@gmail.com' })
  });
  const r = await res.json().catch(() => ({}));
  if (!r.ok) console.warn('Correo automático', para, r.error);
  return !!r.ok;
}
/* Marca de "ya enviado" (una vez por cliente y año) */
async function yaEnviado(env, token, clave) { return !!(await fsGet(env, `enviosAuto/${clave}`, token).catch(() => null)); }
async function marcarEnviado(env, token, clave, datos) {
  await fetch(docUrl(env, `enviosAuto/${clave}`), { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toValue({ ...datos, fecha: new Date() }).mapValue.fields }) }).catch(() => {});
}

async function correosAutomaticos(env, token, docs, clientes, correoDe) {
  if (!env.EMAIL_WEBHOOK || !env.EMAIL_CLAVE) return [];
  const hoy = hoyVE(), mmdd = hoy.slice(5), anio = hoy.slice(0, 4);
  const enviados = [];
  const nombreCli = c => [c.nombre, c.apellido].filter(Boolean).join(' ');
  const bajas = new Set(clientes.filter(c => c.noCorreos).map(c => normNombre(nombreCli(c))));
  const reales = docs.filter(d => !String(d._id).startsWith('__diag'));

  // 1) Encuesta unos días después de completar el proyecto
  for (const d of reales) {
    if (!d.proyectoCompletadoAt || d.encuestaCompletada || d.encuestaEnviadaAt) continue;
    const f = fechaISO(d.proyectoCompletadoAt);
    if (!f || diasEntre(f, hoy) < DIAS_ENCUESTA || diasEntre(f, hoy) > 45) continue;
    const correo = d.clienteCorreo || correoDe(d.cli);
    if (!correo) continue;
    const nombre = String(d.cli || '').split(' ')[0] || 'hola';
    const servicio = (d.items || [])[0]?.s || 'tu proyecto';
    const ok = await enviarCorreoBot(env, correo, `${nombre}, ¿cómo te fue con ${servicio}?`,
      correoBotHTML({ icono: 'encuesta', titulo: `¿Cómo te fue, ${nombre}?`, texto: `Hace unos días terminamos ${servicio} y queremos saber cómo fue tu experiencia con nosotros. Son solo 3 preguntas y nos ayudan muchísimo a mejorar.`, boton: 'Responder la encuesta', link: `${SITIO}/encuesta.html?id=${d._id}`, nota: 'Toma menos de un minuto.' }),
      `¿Cómo te fue, ${nombre}? Cuéntanos tu experiencia (menos de un minuto): ${SITIO}/encuesta.html?id=${d._id}`);
    if (ok) {
      await fsUpdate(env, `documentos/${d._id}`, { encuestaEnviadaAt: new Date() }, ['encuestaEnviadaAt'], token).catch(() => {});
      enviados.push({ tipo: 'Encuesta', cliente: d.cli, correo });
    }
  }

  // 2) Aniversario del lanzamiento (proyecto completado, o primera página web pagada)
  const lanzamientos = {};
  for (const d of reales) {
    const esWeb = (d.items || []).some(i => /web|p[aá]gina|sitio|tienda|landing|e-?commerce/i.test(i.s || ''));
    const f = fechaISO(d.proyectoCompletadoAt) || (esWeb && (d.pagado || d.type === 'recibo') ? (fechaISO(d.fechaPago) || fechaISO(d.fecha)) : null);
    if (!f || !d.cli) continue;
    const k = normNombre(d.cli);
    if (!lanzamientos[k] || f < lanzamientos[k].f) lanzamientos[k] = { f, d };
  }
  for (const [k, { f, d }] of Object.entries(lanzamientos)) {
    if (f.slice(5) !== mmdd || f.slice(0, 4) >= anio || bajas.has(k)) continue;
    const anios = Number(anio) - Number(f.slice(0, 4));
    const clave = `aniv_${k.replace(/[^a-z0-9]+/g, '_')}_${anio}`;
    const correo = d.clienteCorreo || correoDe(d.cli);
    if (!correo || await yaEnviado(env, token, clave)) continue;
    const nombre = String(d.cli).split(' ')[0];
    const ok = await enviarCorreoBot(env, correo, `${nombre}, ¡hoy cumplimos ${anios} año${anios > 1 ? 's' : ''} juntos!`,
      correoBotHTML({ icono: 'cohete', titulo: `¡Hace ${anios} año${anios > 1 ? 's' : ''} lanzamos tu proyecto, ${nombre}!`, texto: `Un día como hoy pusimos en marcha ${(d.items || [])[0]?.s || 'tu proyecto'}. Gracias por crecer con DGP Group USA. Para celebrarlo te tenemos un regalo:`, oferta: OFERTA_ANIVERSARIO, boton: 'Ver nuestros servicios', link: 'https://dgpglobalgroup.com', nota: '¿Una idea nueva para tu negocio? Responde este correo y la hacemos realidad.' }),
      `¡Hace ${anios} año(s) lanzamos tu proyecto, ${nombre}! Tu regalo: ${OFERTA_ANIVERSARIO}`);
    if (ok) { await marcarEnviado(env, token, clave, { tipo: 'aniversario', cliente: d.cli, correo }); enviados.push({ tipo: 'Aniversario', cliente: d.cli, correo }); }
  }

  // 3) Cumpleaños (campo "Cumpleaños" en la ficha del cliente)
  for (const c of clientes) {
    const cum = String(c.cumpleanos || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cum) || cum.slice(5) !== mmdd || c.noCorreos) continue;
    const nombre = c.nombre || nombreCli(c).split(' ')[0];
    const correo = c.correo || correoDe(nombreCli(c));
    const clave = `cumple_${c._id}_${anio}`;
    if (!correo || await yaEnviado(env, token, clave)) continue;
    const ok = await enviarCorreoBot(env, correo, `¡Feliz cumpleaños, ${nombre}!`,
      correoBotHTML({ icono: 'regalo', titulo: `¡Feliz cumpleaños, ${nombre}!`, texto: 'Todo el equipo de DGP Group USA te desea un día increíble y un año lleno de éxitos para ti y tu negocio. Como regalo:', oferta: OFERTA_CUMPLE, boton: 'Ver nuestros servicios', link: 'https://dgpglobalgroup.com', nota: '¡Que lo disfrutes mucho!' }),
      `¡Feliz cumpleaños, ${nombre}! Tu regalo: ${OFERTA_CUMPLE}`);
    if (ok) { await marcarEnviado(env, token, clave, { tipo: 'cumpleanos', cliente: nombreCli(c), correo }); enviados.push({ tipo: 'Cumpleaños', cliente: nombreCli(c), correo }); }
  }
  return enviados;
}

/* ══════════════════════════════════════════════════════════════
   Formulario de contacto de la web → CRM (POST /contacto)
   Crea el cliente con la etiqueta "Prospecto" (o suma el mensaje si ya existe)
   y avisa por Telegram con un botón para responder por WhatsApp.
══════════════════════════════════════════════════════════════ */
/* Acepta JSON, texto JSON (sendBeacon) o formularios normales, y reconoce los campos
   aunque se llamen distinto (Name, Email, your-email, Teléfono, Message, fields[name][value]...) */
async function leerFormularioContacto(request) {
  const tipo = (request.headers.get('Content-Type') || '').toLowerCase();
  let crudo = {};
  try {
    if (tipo.includes('multipart/form-data') || tipo.includes('application/x-www-form-urlencoded')) {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) if (typeof v === 'string') crudo[k] = crudo[k] ? crudo[k] + ', ' + v : v;
    } else {
      const t = await request.text();
      try { crudo = JSON.parse(t); } catch (e) { crudo = Object.fromEntries(new URLSearchParams(t)); }
    }
  } catch (e) { crudo = {}; }
  const planos = {};
  const aplanar = (o, pref) => {
    if (Array.isArray(o)) { o.forEach((x, i) => (x && typeof x === 'object' && (x.value !== undefined)) ? (planos[x.label || x.name || x.id || pref + i] = String(x.value)) : aplanar(x, pref + i + '.')); return; }
    for (const [k, v] of Object.entries(o || {})) {
      if (v && typeof v === 'object') { if (v.value !== undefined && typeof v.value !== 'object') planos[v.title || v.label || k] = String(v.value); else aplanar(v, k + '.'); }
      else if (v !== undefined && v !== null && v !== '') planos[pref + k] = String(v);
    }
  };
  aplanar(crudo, '');
  const norm = k => String(k).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/^fields?[\[.]|\]?\[?value\]?$|\]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const out = {}, usados = new Set();
  const reglas = [
    ['_hp_dgp', /^hp dgp$/], ['t', /^t$/],
    ['apellido', /(apellido|last ?name|surname)/],
    ['nombre', /^(nombre|name|your name|full ?name|nombre completo|first ?name|tu nombre|nombres?)( |$)/],
    ['correo', /(e ?mail|correo)/],
    ['telefono', /(tel|phone|whatsapp|celular|movil|numero)/],
    ['negocio', /(empresa|negocio|company|business|organizacion)/],
    ['servicio', /(servicio|service|interes|plan|producto|asunto|subject)/],
    ['mensaje', /(mensaje|message|comentario|consulta|detalle|descripcion|your message|texto|pregunta|cuentanos|cuentame|necesitas|proyecto)/]
  ];
  for (const [k, v] of Object.entries(planos)) {
    const n = norm(k);
    const r = reglas.find(([campo, re]) => !out[campo] && re.test(n));
    if (r) { out[r[0]] = v; usados.add(k); }
  }
  // Si no hubo campo de correo, busca un valor que lo parezca
  if (!out.correo) { const e = Object.entries(planos).find(([k, v]) => !usados.has(k) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim())); if (e) { out.correo = e[1]; usados.add(e[0]); } }
  if (out.apellido && out.nombre) out.nombre = out.nombre + ' ' + out.apellido;
  else if (out.apellido && !out.nombre) out.nombre = out.apellido;
  // Lo que no se reconoció se agrega al mensaje (sin datos técnicos del formulario)
  const tecnico = /^(form|action|nonce|wp|token|g recaptcha|recaptcha|referer|referrer|post id|page|queried|submit|cf |honeypot|hp |pagina$|origen$|utm )/;
  const extra = Object.entries(planos).filter(([k, v]) => !usados.has(k) && !tecnico.test(norm(k)) && String(v).length < 500).map(([k, v]) => `${k}: ${v}`);
  if (extra.length) out.mensaje = [out.mensaje, ...extra].filter(Boolean).join('\n');
  out.pagina = planos.pagina || planos.page_url || '';
  return out;
}
const ORIGENES_CONTACTO = ['https://dgpglobalgroup.com', 'https://www.dgpglobalgroup.com', 'https://adv.dgp-link.com', 'http://localhost:8765'];
function corsContacto(request) {
  const o = request.headers.get('Origin') || '';
  return { 'Access-Control-Allow-Origin': ORIGENES_CONTACTO.includes(o) ? o : ORIGENES_CONTACTO[0], 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Vary': 'Origin' };
}
async function handleContacto(request, env) {
  const h = corsContacto(request);
  const resp = (d, st = 200) => new Response(JSON.stringify(d), { status: st, headers: { 'Content-Type': 'application/json', ...h } });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
  if (request.method !== 'POST') return resp({ error: 'Método no permitido' }, 405);
  const b = await leerFormularioContacto(request);
  // Anti-spam: campo trampa invisible y tiempo mínimo llenando el formulario
  if (b._hp_dgp || (Number(b.t) && Number(b.t) < 2500)) return resp({ ok: true });
  const limpiar = (v, n) => String(v || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
  const nombre = limpiar(b.nombre, 80), correo = limpiar(b.correo, 120).toLowerCase(), telefono = limpiar(b.telefono, 40);
  const servicio = limpiar(b.servicio, 80), negocio = limpiar(b.negocio, 100);
  const mensaje = String(b.mensaje || '').replace(/[<>]/g, '').trim().slice(0, 1500);
  if (nombre.length < 2) return resp({ error: 'Escribe tu nombre.' }, 400);
  if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return resp({ error: 'El correo no es válido.' }, 400);
  if (!correo && telefono.replace(/\D/g, '').length < 7) return resp({ error: 'Déjanos tu correo o tu WhatsApp para responderte.' }, 400);
  if (/https?:\/\/\S+.*https?:\/\//i.test(mensaje)) return resp({ ok: true }); // varios enlaces = spam
  try {
    const token = await firebaseLogin(env);
    const clientes = await fsList(env, 'clientes', token);
    const tel = telefono.replace(/\D/g, '');
    const existe = clientes.find(c => (correo && String(c.correo || '').toLowerCase() === correo) || (tel.length >= 7 && String(c.telefono || '').replace(/\D/g, '').endsWith(tel.slice(-9))))
      || clientes.find(c => normNombre([c.nombre, c.apellido].filter(Boolean).join(' ')) === normNombre(nombre));
    const entrada = { fecha: new Date().toISOString(), servicio, negocio, mensaje: mensaje.slice(0, 600) };
    const hoy = isoADmy(hoyVE());
    if (existe) {
      const upd = { mensajesWeb: [...(Array.isArray(existe.mensajesWeb) ? existe.mensajesWeb : []), entrada].slice(-20), ultimoContactoWeb: new Date() };
      const mask = ['mensajesWeb', 'ultimoContactoWeb'];
      if (!existe.correo && correo) { upd.correo = correo; mask.push('correo'); }
      if (!existe.telefono && telefono) { upd.telefono = telefono; mask.push('telefono'); }
      await fsUpdate(env, `clientes/${existe._id}`, upd, mask, token);
    } else {
      const partes = nombre.split(' ');
      await fsCreate(env, 'clientes', {
        nombre: partes[0], apellido: partes.slice(1).join(' '), correo, telefono, empresa: negocio,
        notas: `Escribió desde la web el ${hoy}${servicio ? ` · Le interesa: ${servicio}` : ''}${mensaje ? `\n"${mensaje.slice(0, 600)}"` : ''}`,
        tags: ['Prospecto', ...(servicio ? [servicio.slice(0, 24)] : [])], origen: 'web', mensajesWeb: [entrada],
        creadoPor: 'web', createdAt: new Date()
      }, token);
    }
    const primer = nombre.split(' ')[0];
    const wa = tel.length >= 7 ? `https://wa.me/${tel}?text=${encodeURIComponent(`Hola ${primer}! Te escribo de DGP Group USA por tu mensaje en nuestra web${servicio ? ` sobre ${servicio}` : ''}. ¿Cuándo podemos conversar?`)}` : null;
    await tgApi(env, 'sendMessage', { chat_id: TG_CHAT, parse_mode: 'HTML', disable_web_page_preview: true,
      text: `📩 <b>${existe ? 'Cliente escribió de nuevo' : 'Nuevo posible cliente'}</b> desde la web\n\n👤 ${escHtml(nombre)}${negocio ? ` · ${escHtml(negocio)}` : ''}${servicio ? `\n🎯 Le interesa: <b>${escHtml(servicio)}</b>` : ''}${correo ? `\n✉️ ${escHtml(correo)}` : ''}${telefono ? `\n📱 ${escHtml(telefono)}` : ''}${mensaje ? `\n\n💬 “${escHtml(mensaje.slice(0, 800))}”` : ''}\n\n${existe ? 'Se agregó el mensaje a su ficha en Clientes.' : 'Quedó en Clientes con la etiqueta <b>Prospecto</b>.'}`,
      reply_markup: { inline_keyboard: [[...(wa ? [{ text: '💬 Responder por WhatsApp', url: wa }] : [])]].filter(f => f.length) }
    }).catch(() => {});
    return resp({ ok: true });
  } catch (e) {
    console.error('contacto', e);
    await tgEnviar(env, `📩 Alguien escribió en la web pero no se pudo guardar:\n${escHtml(nombre)} · ${escHtml(correo || telefono)}\n${escHtml(mensaje.slice(0, 500))}`).catch(() => {});
    return resp({ ok: true });
  }
}

// ══════════════════════════════════════════════════════════════
//  RESEÑAS DE LA WEB (dgpglobalgroup.com) con aprobación desde el panel
//  POST /resenas-web  {nombre, correo, valoracion, comentario, idioma, _hp_dgp, t}
//       → se guarda en resenasWeb con estado "pendiente" y avisa por Telegram
//  GET  /resenas-web  → reseñas "aprobada" para mostrar en la web (sin correos)
//  La primera vez importa las reseñas que estaban en el Google Sheet.
// ══════════════════════════════════════════════════════════════
const RESENAS_SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPpmwX4hdgbUsrtTk9_-jDaWpqjB-ixIrHfPqDj5y0HqvJ-fEdbj-0B78jgxQ3lXRji9Z9teaRl9O6/pub?output=csv';
const RESENAS_CACHE = 'https://cache.dgp/resenas-web-v1';

function parseCSV(txt) {
  const out = []; let row = [], f = '', q = false;
  for (let i = 0; i < txt.length; i++) {
    const ch = txt[i];
    if (q) { if (ch === '"') { if (txt[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(f); f = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && txt[i + 1] === '\n') i++; row.push(f); out.push(row); row = []; f = ''; }
    else f += ch;
  }
  if (f || row.length) { row.push(f); out.push(row); }
  return out;
}
// Crea un documento con ID fijo; si ya existe no hace nada (evita duplicados)
async function fsCrearConId(env, coleccion, id, obj, token) {
  const res = await fetch(`${docUrl(env, coleccion)}?documentId=${encodeURIComponent(id)}`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toValue(obj).mapValue.fields })
  });
  if (res.status === 409) return false;
  if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error('Firestore (crear): ' + (d.error?.message || res.status)); }
  return true;
}
async function fsGuardar(env, path, obj, token) {
  const res = await fetch(docUrl(env, path), {
    method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toValue(obj).mapValue.fields })
  });
  if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error('Firestore (guardar): ' + (d.error?.message || res.status)); }
}
// "8/3/2026 13:44:54" (día/mes/año del Sheet) → Date
function fechaSheet(s) {
  const m = String(s || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m) return new Date();
  return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], (+m[4] || 0) + 4, +m[5] || 0, +m[6] || 0));
}
async function migrarResenasSheet(env, token) {
  const cfg = await fsGet(env, 'config/resenasWeb', token).catch(() => null);
  if (cfg?.migrado) return;
  const txt = await fetch(RESENAS_SHEET_CSV).then(r => r.ok ? r.text() : '').catch(() => '');
  const filas = parseCSV(txt).slice(1).filter(r => r.length >= 5 && r[1].trim() && r[4].trim());
  for (const r of filas) {
    const nombre = r[1].trim().slice(0, 80), comentario = r[4].trim().slice(0, 1500);
    // Lo que no parece una reseña (nombres larguísimos, teléfonos) entra como pendiente para revisarlo
    const sospechosa = nombre.length > 40 || /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(comentario);
    const id = 'sheet-' + r[0].replace(/\D/g, '').slice(0, 20) + '-' + normNombre(nombre).replace(/[^a-z0-9]/g, '').slice(0, 20);
    await fsCrearConId(env, 'resenasWeb', id, {
      nombre, correo: r[2].trim().slice(0, 120), valoracion: Math.min(5, Math.max(1, parseInt(r[3]) || 5)), comentario,
      estado: sospechosa ? 'pendiente' : 'aprobada', origen: 'sheet', fecha: fechaSheet(r[0])
    }, token);
  }
  await fsGuardar(env, 'config/resenasWeb', { migrado: true, migradoEl: new Date(), importadas: filas.length }, token);
}
async function handleResenasWeb(request, env, ctx) {
  const h = { ...corsContacto(request), 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' };
  const resp = (d, st = 200, extra = {}) => new Response(JSON.stringify(d), { status: st, headers: { 'Content-Type': 'application/json', ...h, ...extra } });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const cache = caches.default, clave = new Request(RESENAS_CACHE);
    if (!url.searchParams.has('fresco')) {
      const hit = await cache.match(clave);
      if (hit) return resp(await hit.json(), 200, { 'Cache-Control': 'public, max-age=60' });
    }
    try {
      const token = await firebaseLogin(env);
      await migrarResenasSheet(env, token);
      const todas = await fsList(env, 'resenasWeb', token);
      const resenas = todas.filter(r => r.estado === 'aprobada')
        .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
        .map(r => ({ nombre: r.nombre, valoracion: r.valoracion, comentario: r.comentario, fecha: r.fecha }));
      const datos = { resenas, total: resenas.length };
      ctx.waitUntil(cache.put(clave, new Response(JSON.stringify(datos), { headers: { 'Cache-Control': 'max-age=120' } })));
      return resp(datos, 200, { 'Cache-Control': 'public, max-age=60' });
    } catch (e) {
      console.error('resenas-web', e);
      return resp({ resenas: [], total: 0, error: 'No disponible' }, 503);
    }
  }

  if (request.method !== 'POST') return resp({ error: 'Método no permitido' }, 405);
  const b = await request.json().catch(() => ({}));
  if (b._hp_dgp || (Number(b.t) && Number(b.t) < 3000)) return resp({ ok: true });
  const limpiar = (v, n) => String(v || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
  const nombre = limpiar(b.nombre, 80), correo = limpiar(b.correo, 120).toLowerCase();
  const comentario = String(b.comentario || '').replace(/[<>]/g, '').trim().slice(0, 1500);
  const valoracion = Math.min(5, Math.max(1, parseInt(b.valoracion) || 0));
  if (nombre.length < 2 || !comentario || !parseInt(b.valoracion)) return resp({ error: 'Completa todos los campos.' }, 400);
  if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return resp({ error: 'El correo no es válido.' }, 400);
  if (/https?:\/\//i.test(comentario)) return resp({ ok: true }); // las reseñas con enlaces son spam
  try {
    const token = await firebaseLogin(env);
    const id = await fsCreate(env, 'resenasWeb', {
      nombre, correo, valoracion, comentario, estado: 'pendiente', origen: 'web', idioma: b.idioma === 'en' ? 'en' : 'es', fecha: new Date()
    }, token);
    await tgApi(env, 'sendMessage', { chat_id: TG_CHAT, parse_mode: 'HTML', disable_web_page_preview: true,
      text: `⭐ <b>Nueva reseña en la web</b> (pendiente)\n\n${'★'.repeat(valoracion)}${'☆'.repeat(5 - valoracion)}\n👤 ${escHtml(nombre)}${correo ? ` · ${escHtml(correo)}` : ''}\n\n💬 “${escHtml(comentario.slice(0, 900))}”\n\nNo se publica hasta que la apruebes (aquí o en el panel → Reseñas web).`,
      reply_markup: { inline_keyboard: [[{ text: '✅ Publicar', callback_data: `wa:${id}` }, { text: '🗑 Rechazar', callback_data: `wr:${id}` }]] }
    }).catch(() => {});
    return resp({ ok: true });
  } catch (e) {
    console.error('resenas-web POST', e);
    await tgEnviar(env, `⭐ Llegó una reseña de la web pero no se pudo guardar:\n${escHtml(nombre)} (${valoracion}★)\n${escHtml(comentario.slice(0, 500))}`).catch(() => {});
    return resp({ ok: true });
  }
}
async function botResenaWeb(env, token, id, estado) {
  const r = await fsGet(env, `resenasWeb/${id}`, token);
  if (!r) return { aviso: 'Esa reseña ya no existe' };
  await fsUpdate(env, `resenasWeb/${id}`, { estado, revisadaEl: new Date(), revisadaPor: 'telegram' }, ['estado', 'revisadaEl', 'revisadaPor'], token);
  await caches.default.delete(new Request(RESENAS_CACHE)).catch(() => {});
  return { aviso: estado === 'aprobada' ? 'Publicada en la web ✓' : 'Rechazada ✓',
    html: estado === 'aprobada' ? `✅ La reseña de <b>${escHtml(r.nombre)}</b> ya está publicada en dgpglobalgroup.com.` : `🗑 Reseña de <b>${escHtml(r.nombre)}</b> rechazada. No se mostrará en la web.` };
}

// ══════════════════════════════════════════════════════════════
//  META ADS: GET /meta-ads?periodo=last_30d  (solo equipo, con sesión del panel)
//  Secretos: META_TOKEN (token de usuario del sistema con permiso ads_read)
//  Opcional: META_AD_ACCOUNT (por defecto la cuenta de DGP), META_API_VERSION
// ══════════════════════════════════════════════════════════════
const META_CUENTA_DEFAULT = '2922697711266686';
const META_PERIODOS = ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month', 'last_90d', 'maximum'];
const META_ACCIONES = {
  conversaciones: ['onsite_conversion.messaging_conversation_started_7d'],
  clientes_potenciales: ['lead', 'onsite_conversion.lead_grouped', 'offsite_conversion.fb_pixel_lead'],
  clics_enlace: ['link_click'],
  visitas_web: ['landing_page_view', 'omni_landing_page_view']
};
function metaSumar(acciones, tipos) {
  return (acciones || []).filter(a => tipos.includes(a.action_type)).reduce((s, a) => Math.max(s, Number(a.value) || 0), 0);
}
function metaResumen(ins) {
  const i = ins || {};
  const o = { gastado: Number(i.spend) || 0, impresiones: Number(i.impressions) || 0, alcance: Number(i.reach) || 0, clics: Number(i.clicks) || 0, ctr: Number(i.ctr) || 0, cpc: Number(i.cpc) || 0, frecuencia: Number(i.frequency) || 0 };
  for (const [k, tipos] of Object.entries(META_ACCIONES)) o[k] = metaSumar(i.actions, tipos);
  return o;
}
async function metaGet(env, ruta, params) {
  const v = env.META_API_VERSION || 'v23.0';
  const qs = new URLSearchParams({ ...params, access_token: env.META_TOKEN });
  const res = await fetch(`https://graph.facebook.com/${v}/${ruta}?${qs}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    const e = data.error || {};
    const err = new Error(e.code === 190 ? 'El token de Meta venció o no es válido. Genera uno nuevo.' : (e.message || 'Error de Meta ' + res.status));
    err.meta = e.code; throw err;
  }
  return data;
}
async function handleMetaAds(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  // ?ping=1 solo dice si la conexión con Meta funciona (sin datos), para revisar la instalación
  if (new URL(request.url).searchParams.has('ping')) {
    if (!env.META_TOKEN) return json(request, { configurado: false });
    try {
      const c = await metaGet(env, 'act_' + String(env.META_AD_ACCOUNT || META_CUENTA_DEFAULT).replace(/^act_/, ''), { fields: 'account_status' });
      return json(request, { configurado: true, ok: true, estadoCuenta: c.account_status });
    } catch (e) { return json(request, { configurado: true, ok: false, detalle: String(e.message).slice(0, 200) }); }
  }
  const quien = await verificarEquipo(request, env).catch(e => ({ error: e.message, status: 500 }));
  if (quien.error) return json(request, { error: quien.error }, quien.status);
  if (!env.META_TOKEN) return json(request, { configurado: false });
  const url = new URL(request.url);
  const periodo = META_PERIODOS.includes(url.searchParams.get('periodo')) ? url.searchParams.get('periodo') : 'last_30d';
  const cuenta = 'act_' + String(env.META_AD_ACCOUNT || META_CUENTA_DEFAULT).replace(/^act_/, '');
  const camposIns = 'spend,impressions,reach,clicks,ctr,cpc,frequency,actions';
  try {
    const [info, total, diario, campanas] = await Promise.all([
      metaGet(env, cuenta, { fields: 'name,currency,account_status,amount_spent,balance,spend_cap' }),
      metaGet(env, `${cuenta}/insights`, { fields: camposIns, date_preset: periodo }),
      metaGet(env, `${cuenta}/insights`, { fields: 'spend,actions', date_preset: periodo === 'maximum' ? 'last_90d' : periodo, time_increment: '1', limit: '100' }),
      metaGet(env, `${cuenta}/campaigns`, { fields: `name,status,effective_status,objective,daily_budget,lifetime_budget,start_time,stop_time,insights.date_preset(${periodo}){${camposIns}}`, limit: '50' })
    ]);
    const lista = (campanas.data || []).map(c => ({
      id: c.id, nombre: c.name, estado: c.effective_status || c.status, objetivo: c.objective,
      presupuestoDiario: c.daily_budget ? Number(c.daily_budget) / 100 : null, presupuestoTotal: c.lifetime_budget ? Number(c.lifetime_budget) / 100 : null,
      inicio: c.start_time || null, fin: c.stop_time || null, ...metaResumen(c.insights?.data?.[0])
    })).filter(c => c.gastado > 0 || c.estado === 'ACTIVE')
      .sort((a, b) => (b.estado === 'ACTIVE') - (a.estado === 'ACTIVE') || b.gastado - a.gastado);
    return json(request, {
      configurado: true, periodo, cuenta: { id: cuenta, nombre: info.name, moneda: info.currency, estado: info.account_status, gastadoHistorico: Number(info.amount_spent || 0) / 100 },
      total: metaResumen(total.data?.[0]),
      diario: (diario.data || []).map(d => ({ fecha: d.date_start, gastado: Number(d.spend) || 0, conversaciones: metaSumar(d.actions, META_ACCIONES.conversaciones) })),
      campanas: lista, actualizado: new Date().toISOString()
    });
  } catch (e) {
    console.error('meta-ads', e);
    return json(request, { configurado: true, error: e.message, tokenInvalido: e.meta === 190 }, 502);
  }
}

// ══════════════════════════════════════════════════════════════
//  ANALÍTICA DE LA WEB (Databuddy): GET /web-stats?periodo=last_30d  (solo equipo)
//  Secreto: DATABUDDY_API_KEY (clave con permiso read:data)
//  Opcional: DATABUDDY_WEBSITE_ID (por defecto el de dgpglobalgroup.com)
// ══════════════════════════════════════════════════════════════
const DATABUDDY_SITIO_DEFAULT = 'f3a183a0-2636-4c00-afbe-7e7670e99704';
const DB_PERIODOS = ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'last_90d', 'this_month', 'last_month', 'this_year'];
async function handleWebStats(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
  // ?ping=1 solo dice si la conexión con Databuddy funciona (sin datos), para revisar la instalación
  if (new URL(request.url).searchParams.has('ping')) {
    if (!env.DATABUDDY_API_KEY) return json(request, { configurado: false });
    const r = await fetch(`https://api.databuddy.cc/v1/query?website_id=${encodeURIComponent(env.DATABUDDY_WEBSITE_ID || DATABUDDY_SITIO_DEFAULT)}`, {
      method: 'POST', headers: { 'x-api-key': env.DATABUDDY_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'ping', preset: 'last_7d', parameters: ['summary_metrics'] })
    }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    const ok = !!r && r.ok && Array.isArray(d.data) && d.data.every(x => x.success !== false);
    return json(request, { configurado: true, ok, status: r ? r.status : 0, detalle: ok ? '' : String(d.error || d.message || d.data?.[0]?.error || '').slice(0, 200) });
  }
  const quien = await verificarEquipo(request, env).catch(e => ({ error: e.message, status: 500 }));
  if (quien.error) return json(request, { error: quien.error }, quien.status);
  if (!env.DATABUDDY_API_KEY) return json(request, { configurado: false });
  const url = new URL(request.url);
  const periodo = DB_PERIODOS.includes(url.searchParams.get('periodo')) ? url.searchParams.get('periodo') : 'last_30d';
  const sitio = env.DATABUDDY_WEBSITE_ID || DATABUDDY_SITIO_DEFAULT;
  try {
    const res = await fetch(`https://api.databuddy.cc/v1/query?website_id=${encodeURIComponent(sitio)}`, {
      method: 'POST',
      headers: { 'x-api-key': env.DATABUDDY_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'panel', preset: periodo, timeZone: 'America/New_York', limit: 8, granularity: 'daily',
        parameters: ['summary_metrics', 'events_by_date', 'top_pages', 'top_referrers', 'country', 'device_types']
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = res.status === 401 || res.status === 403 ? 'La clave de Databuddy no es válida o no tiene permiso read:data para este sitio.' : (data.error || data.message || 'Databuddy respondió ' + res.status);
      return json(request, { configurado: true, error: msg }, 502);
    }
    const lista = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
    const de = p => (lista.find(x => x.parameter === p)?.data) || [];
    const fila = r => ({ nombre: String(r.name ?? ''), visitas: Number(r.pageviews) || 0, visitantes: Number(r.visitors) || 0, porcentaje: Number(r.percentage) || 0 });
    const s = de('summary_metrics')[0] || {};
    return json(request, {
      configurado: true, periodo,
      resumen: { visitas: Number(s.pageviews) || 0, visitantes: Number(s.unique_visitors) || 0, sesiones: Number(s.sessions) || 0, rebote: Number(s.bounce_rate) || 0, duracion: Number(s.median_session_duration) || 0 },
      diario: de('events_by_date').map(r => ({ fecha: String(r.date || '').slice(0, 10), visitas: Number(r.pageviews) || 0, visitantes: Number(r.visitors) || 0 })),
      paginas: de('top_pages').map(fila), origenes: de('top_referrers').map(fila), paises: de('country').map(fila), dispositivos: de('device_types').map(fila),
      actualizado: new Date().toISOString()
    });
  } catch (e) {
    console.error('web-stats', e);
    return json(request, { configurado: true, error: e.message }, 502);
  }
}

// ══════════════════════════════════════════════════════════════
//  CHAT DE LA WEB (Altair): POST /chat-web {mensajes:[{rol:'user'|'assistant', texto}], cerrado}
//  Manda la conversación a Telegram desde aquí (la web ya no guarda la llave de Telegram)
// ══════════════════════════════════════════════════════════════
async function handleChatWeb(request, env) {
  const h = corsContacto(request);
  const resp = (d, st = 200) => new Response(JSON.stringify(d), { status: st, headers: { 'Content-Type': 'application/json', ...h } });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
  if (request.method !== 'POST') return resp({ error: 'Método no permitido' }, 405);
  if (!ORIGENES_CONTACTO.includes(request.headers.get('Origin') || '')) return resp({ ok: true });
  const b = await request.json().catch(() => ({}));
  const msgs = (Array.isArray(b.mensajes) ? b.mensajes : []).slice(-30)
    .map(m => ({ rol: m.rol === 'user' ? 'user' : 'assistant', texto: String(m.texto || '').slice(0, 1500).trim() })).filter(m => m.texto);
  if (!msgs.some(m => m.rol === 'user')) return resp({ ok: true });
  const ahora = new Date().toLocaleString('es-US', { timeZone: 'America/New_York', dateStyle: 'short', timeStyle: 'short' });
  const cuerpo = msgs.map(m => m.rol === 'user' ? `👤 <b>Cliente:</b> ${escHtml(m.texto)}` : `🔵 <b>Altair:</b> ${escHtml(m.texto)}`).join('\n\n');
  await tgEnviar(env, `🤖 <b>Altair — Conversación en la web</b>\n📅 ${ahora}\n\n${cuerpo}\n\n${b.cerrado ? '🔚 <i>Conversación cerrada</i>\n' : ''}🌐 dgpglobalgroup.com`).catch(() => {});
  return resp({ ok: true });
}
