
// This is the service worker for the PWA
const CACHE_NAME = 'beach-players-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/logo.png',
  '/lovable-uploads/kleber.png',
  '/lovable-uploads/letycia.png',
  '/lovable-uploads/ronaldinho.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('thebeachplayers-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        // Adicione outros recursos que você deseja armazenar em cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});