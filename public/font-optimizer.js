// Script para otimização de fontes
document.addEventListener('DOMContentLoaded', function() {
  // Detectar se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Detectar conexão lenta
  const isSlowConnection = 
    ('connection' in navigator && 
     (navigator.connection.saveData || 
      navigator.connection.effectiveType === 'slow-2g' || 
      navigator.connection.effectiveType === '2g' || 
      navigator.connection.effectiveType === '3g')) ||
    document.documentElement.classList.contains('slow-connection');
  
  // Fontes a serem pré-carregadas
  const fontPreloads = [
    { family: 'Inter', weight: '400', display: 'swap' },
    { family: 'Inter', weight: '500', display: 'swap' },
    { family: 'Inter', weight: '600', display: 'swap' },
    { family: 'Inter', weight: '700', display: 'swap' }
  ];
  
  // Em dispositivos móveis ou conexões lentas, carregar apenas as fontes essenciais
  const fontsToLoad = isSlowConnection || isMobile 
    ? fontPreloads.filter(font => font.weight === '400' || font.weight === '700')
    : fontPreloads;
  
  // Carregar fontes usando FontFace API se disponível
  if ('FontFace' in window) {
    fontsToLoad.forEach(function(font) {
      const fontFace = new FontFace(
        font.family, 
        `url(/fonts/${font.family.toLowerCase()}-${font.weight}.woff2) format('woff2')`,
        { weight: font.weight, display: font.display }
      );
      
      fontFace.load().then(function(loadedFace) {
        document.fonts.add(loadedFace);
      }).catch(function(error) {
        console.warn('Falha ao carregar fonte:', error);
      });
    });
  }
  
  // Adicionar classe para indicar que as fontes foram carregadas
  document.fonts.ready.then(function() {
    document.documentElement.classList.add('fonts-loaded');
  });
  
  // Adicionar fallback para fontes em conexões lentas
  if (isSlowConnection) {
    document.documentElement.classList.add('system-fonts');
    
    // Adicionar estilos inline para usar fontes do sistema
    const style = document.createElement('style');
    style.textContent = `
      .system-fonts body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
      }
    `;
    document.head.appendChild(style);
  }
});
