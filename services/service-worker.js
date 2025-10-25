// File: services/service-worker.js
// Handles PWA offline capabilities, caching strategy, and update lifecycle for Ji-bajeti Pro.

const CACHE_NAME = 'jibajeti-pro-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/colorSystem.css',
  '/src/main.js',
  '/public/manifest.json',
  '/public/icons/icon-72x72.png'
  // Add any additional static assets or fonts here as needed
];

// --- Install Event ---
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching core assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => console.error('[Service Worker] Asset caching failed:', err))
  );
  self.skipWaiting(); // Activate immediately
});

// --- Activate Event ---
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of open clients
});

// --- Fetch Event: Cache-First Strategy for Static Assets ---
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);

  // Only intercept GET requests for cached files
  if (event.request.method === 'GET') {
    const shouldHandle = ASSETS_TO_CACHE.some(asset => requestURL.pathname.endsWith(asset));
    if (shouldHandle) {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) return response;
            return fetch(event.request).then(networkResponse => {
              // Optionally: dynamically cache new assets
              return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            });
          })
          .catch(() => caches.match('/index.html')) // Offline fallback
      );
    }
  }
});

// --- Optional: Future Background Sync & Offline Data Support ---
self.addEventListener('sync', event => {
  console.log('[Service Worker] Sync event triggered:', event.tag);
  // Future logic for syncing offline data when back online
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
