// Script para forçar a limpeza de cache
(function() {
  // Versão atual do cache - altere para forçar atualização
  const CACHE_VERSION = '20250304-1';
  
  // Armazenar a versão atual no localStorage
  const storedVersion = localStorage.getItem('cacheVersion');
  
  // Se a versão armazenada for diferente da atual, limpar caches
  if (storedVersion !== CACHE_VERSION) {
    console.log('Nova versão detectada. Limpando caches...');
    
    // Limpar caches do service worker
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('Limpando cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    }
    
    // Limpar localStorage (exceto a versão do cache)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== 'cacheVersion') {
        localStorage.removeItem(key);
      }
    }
    
    // Limpar sessionStorage
    sessionStorage.clear();
    
    // Atualizar a versão armazenada
    localStorage.setItem('cacheVersion', CACHE_VERSION);
    
    // Recarregar a página após um pequeno atraso
    setTimeout(function() {
      window.location.reload(true);
    }, 1000);
  }
})();
