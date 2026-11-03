const CACHE_NAME = 'dgp-v2';
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(OFFLINE_ASSETS).catch(() => {})
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/contenido/')) return;
  if (e.request.url.includes('firestore') || e.request.url.includes('googleapis.com/identitytoolkit')) return;
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(r => r || caches.match('/index.html'))
    )
  );
});

/* Notificaciones del panel (las manda el bot: pagos, correos, webs caídas…) */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { titulo: 'DGP Global Group', cuerpo: e.data ? e.data.text() : '' }; }
  e.waitUntil(Promise.all([sumarBadge(), self.registration.showNotification(d.titulo || 'DGP Global Group', {
    body: d.cuerpo || '', icon: '/icon-192.png', badge: '/icon-192.png', tag: d.tag || undefined,
    data: { pagina: d.pagina || '' }, vibrate: [120, 60, 120]
  })]));
});
// Número en el ícono de la app: el panel guarda lo pendiente; cada aviso nuevo suma 1 hasta que abras el panel
async function sumarBadge() {
  try {
    const c = await caches.open('dgp-badge');
    const r = await c.match('/__badge');
    const n = (r ? Number(await r.text()) || 0 : 0) + 1;
    await c.put('/__badge', new Response(String(n)));
    if (self.navigator.setAppBadge) await self.navigator.setAppBadge(n);
  } catch (e) {}
}
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const pagina = (e.notification.data && e.notification.data.pagina) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if ('focus' in c) { c.postMessage({ irA: pagina }); return c.focus(); }
    return self.clients.openWindow('/' + (pagina ? '#' + pagina : ''));
  }));
});
