// File: services\service-worker.js
// Handles PWA Offline Capabilities and Caching Strategy.

const CACHE_NAME = 'jibajeti-pro-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/colorSystem.css',
    '/src/main.js',
    '/public/manifest.json',
    '/public/icons/icon-72x72.png' // Essential icon
    // Add other essential assets here (e.g., fonts, core images)
];

// --- Install Event ---
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching core assets.');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(err => console.error('[Service Worker] Failed to cache assets:', err))
    );
    self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});

// --- Activate Event ---
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    console.log('[Service Worker] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
    // Ensure that the new service worker controls the page immediately
    return self.clients.claim(); 
});

// --- Fetch Event (Cache-First Strategy for Offline Assets) ---
self.addEventListener('fetch', (event) => {
    // Only intercept requests for assets we want to cache/serve offline
    const url = new URL(event.request.url);
    const shouldHandle = ASSETS_TO_CACHE.some(asset => url.pathname.endsWith(asset));
    
    if (shouldHandle) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Cache hit - return response from cache
                    if (response) {
                        return response;
                    }
                    // Not in cache - fetch from network
                    return fetch(event.request);
                })
        );
    }
});

// Future implementation: Background Sync and Offline Data Entry (not included in this basic structure)
