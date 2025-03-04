// Service Worker para cache e melhoria de performance
const CACHE_NAME = 'ai-lab-cache-v3';
const STATIC_CACHE_NAME = 'ai-lab-static-v3';
const DYNAMIC_CACHE_NAME = 'ai-lab-dynamic-v3';

// Recursos estáticos críticos para pré-cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/obrigado/',
  '/obrigado/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/images/hero-bg.webp',
  '/images/logo.png',
  '/register-sw.js',
  '/image-optimizer.js'
];

// Recursos que devem ser cacheados com estratégia de cache-first
const CACHE_FIRST_PATTERNS = [
  /\.(jpg|jpeg|png|gif|webp|svg|ico)$/,
  /\.(css|js)$/,
  /^\/fonts\//,
  /^\/images\//,
  /^\/static\//,
  /^\/_next\/static\//,
  /^\/_next\/image\//
];

// Função para verificar se uma URL deve usar cache-first
function shouldUseCacheFirst(url) {
  return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url));
}

// Instalar o service worker e pré-cachear recursos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // Força a ativação imediata
  );
});

// Limpar caches antigos quando uma nova versão do service worker é ativada
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName.startsWith('ai-lab-') && 
            cacheName !== STATIC_CACHE_NAME && 
            cacheName !== DYNAMIC_CACHE_NAME
          )
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim()) // Controla todas as páginas imediatamente
  );
});

// Estratégia de cache para requisições
self.addEventListener('fetch', event => {
  // Ignorar requisições não GET ou para APIs
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Estratégia cache-first para recursos estáticos
  if (shouldUseCacheFirst(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - retorna a resposta do cache
          if (response) {
            return response;
          }

          // Cache miss - busca da rede e armazena no cache
          return fetch(event.request).then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clonar a resposta antes de armazenar no cache
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          });
        })
    );
  } 
  // Estratégia network-first para outros recursos
  else {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clonar a resposta antes de armazenar no cache
          const responseToCache = response.clone();
          
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // Se a rede falhar, tenta buscar do cache
          return caches.match(event.request);
        })
    );
  }
});

// Pré-cachear páginas principais quando o usuário está online
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_PAGES') {
    const pagesToCache = event.data.payload.urls || [];
    
    caches.open(STATIC_CACHE_NAME).then(cache => {
      cache.addAll(pagesToCache).then(() => {
        console.log('Pages pre-cached successfully');
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      });
    });
  }
});
