// This is a very basic service worker for caching the app shell.
// It allows the app to load offline after the first visit.

const CACHE_NAME = 'da-tracker-cache-v1';
const urlsToCache = [
  '/',
  '/index.html'
  // Note: We don't cache external scripts from Google or Tailwind here.
  // The browser handles caching for those.
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
