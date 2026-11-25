const CACHE_NAME = 'dgp-v3';
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/altair-orbe.webp',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(OFFLINE_ASSETS.map(url => cache.add(new Request(url, { cache: 'reload' }))))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => /^dgp-v\d+$/.test(k) && k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/contenido/')) return;
  if (e.request.url.includes('firestore') || e.request.url.includes('googleapis.com/identitytoolkit')) return;
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin && e.request.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(async response => {
      if (response.ok) {
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(url.pathname, response.clone());
        } catch (e) { /* La navegación sigue disponible si falla el caché. */ }
      }
      return response;
    }).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      return (await cache.match(url.pathname)) || (await cache.match('/index.html')) || Response.error();
    }));
    return;
  }
  if (url.origin === self.location.origin && url.pathname === '/altair-orbe.webp') {
    e.respondWith(fetch(e.request).catch(async () => (await caches.match(url.pathname)) || Response.error()));
    return;
  }
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
