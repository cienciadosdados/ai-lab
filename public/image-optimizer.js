// Script para otimização de imagens em tempo de execução
document.addEventListener('DOMContentLoaded', function() {
  // Detectar se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Otimizar imagens carregadas tardiamente com IntersectionObserver
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserverOptions = {
      rootMargin: isMobile ? '50px' : '200px', // Margem menor em dispositivos móveis
      threshold: 0.01
    };
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    }, imageObserverOptions);
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    lazyImages.forEach(function(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.add('loaded');
      }
    });
  }
  
  // Pré-carregar imagens críticas apenas em conexões rápidas
  if (!document.documentElement.classList.contains('save-data') && 
      !document.documentElement.classList.contains('slow-connection')) {
    const preloadImages = [
      '/images/hero-bg.webp'
    ];
    
    // Limitar o número de pré-carregamentos em dispositivos móveis
    const imagesToPreload = isMobile ? preloadImages.slice(0, 1) : preloadImages;
    
    imagesToPreload.forEach(function(imgSrc) {
      const img = new Image();
      img.src = imgSrc;
    });
  }
  
  // Otimizar imagens de fundo com IntersectionObserver
  const bgElements = document.querySelectorAll('[data-bg]');
  
  if ('IntersectionObserver' in window) {
    const bgObserverOptions = {
      rootMargin: isMobile ? '50px' : '200px', // Margem menor em dispositivos móveis
      threshold: 0.01
    };
    
    const bgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.dataset.bg) {
            // Em dispositivos móveis, usar versão de qualidade menor se disponível
            if (isMobile && element.dataset.bgMobile) {
              element.style.backgroundImage = `url(${element.dataset.bgMobile})`;
            } else {
              element.style.backgroundImage = `url(${element.dataset.bg})`;
            }
            element.classList.add('bg-loaded');
          }
          bgObserver.unobserve(element);
        }
      });
    }, bgObserverOptions);
    
    bgElements.forEach(function(element) {
      bgObserver.observe(element);
    });
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    bgElements.forEach(function(element) {
      if (element.dataset.bg) {
        // Em dispositivos móveis, usar versão de qualidade menor se disponível
        if (isMobile && element.dataset.bgMobile) {
          element.style.backgroundImage = `url(${element.dataset.bgMobile})`;
        } else {
          element.style.backgroundImage = `url(${element.dataset.bg})`;
        }
        element.classList.add('bg-loaded');
      }
    });
  }
  
  // Detectar conexão lenta e carregar imagens de baixa qualidade
  if ('connection' in navigator && 
      (navigator.connection.saveData || 
       navigator.connection.effectiveType === 'slow-2g' || 
       navigator.connection.effectiveType === '2g' || 
       navigator.connection.effectiveType === '3g')) {
    
    document.documentElement.classList.add('save-data');
    
    // Substituir imagens por versões de baixa qualidade
    document.querySelectorAll('img[data-low-src]').forEach(function(img) {
      img.src = img.dataset.lowSrc;
    });
    
    // Desativar animações pesadas
    document.documentElement.classList.add('reduce-motion');
  }
});
