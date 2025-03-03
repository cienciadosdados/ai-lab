// Script para otimização de imagens em tempo de execução
document.addEventListener('DOMContentLoaded', function() {
  // Otimizar imagens carregadas tardiamente
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
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
    });
    
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
  
  // Pré-carregar imagens críticas
  const preloadImages = [
    '/images/hero-bg.webp'
  ];
  
  preloadImages.forEach(function(imgSrc) {
    const img = new Image();
    img.src = imgSrc;
  });
  
  // Otimizar imagens de fundo
  const bgElements = document.querySelectorAll('[data-bg]');
  
  if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.dataset.bg) {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.classList.add('bg-loaded');
          }
          bgObserver.unobserve(element);
        }
      });
    });
    
    bgElements.forEach(function(element) {
      bgObserver.observe(element);
    });
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    bgElements.forEach(function(element) {
      if (element.dataset.bg) {
        element.style.backgroundImage = `url(${element.dataset.bg})`;
        element.classList.add('bg-loaded');
      }
    });
  }
  
  // Detectar conexão lenta e carregar imagens de baixa qualidade
  if ('connection' in navigator && navigator.connection.saveData) {
    document.documentElement.classList.add('save-data');
    
    // Substituir imagens por versões de baixa qualidade
    document.querySelectorAll('img[data-low-src]').forEach(function(img) {
      img.src = img.dataset.lowSrc;
    });
  }
});
