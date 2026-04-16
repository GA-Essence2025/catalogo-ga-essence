const CACHE_NAME = 'ga-essence-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devolve a versão em cache se existir
        }
        return fetch(event.request); // Caso contrário, vai buscar à internet
      })
  );
});