// Script para otimização de CSS
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
  
  // Otimizar estilos para dispositivos móveis
  if (isMobile) {
    // Adicionar classe para estilos específicos para dispositivos móveis
    document.documentElement.classList.add('mobile-optimized');
    
    // Remover estilos não essenciais em dispositivos móveis
    const nonEssentialStyles = document.querySelectorAll('link[rel="stylesheet"][data-mobile-nonessential]');
    nonEssentialStyles.forEach(function(styleLink) {
      styleLink.setAttribute('media', 'print');
      styleLink.setAttribute('onload', "this.media='all'");
    });
  }
  
  // Otimizar estilos para conexões lentas
  if (isSlowConnection) {
    // Adicionar classe para estilos específicos para conexões lentas
    document.documentElement.classList.add('lite-mode');
    
    // Remover estilos não essenciais em conexões lentas
    const nonEssentialStyles = document.querySelectorAll('link[rel="stylesheet"][data-nonessential]');
    nonEssentialStyles.forEach(function(styleLink) {
      styleLink.disabled = true;
    });
    
    // Adicionar estilos simplificados para conexões lentas
    const liteStyle = document.createElement('style');
    liteStyle.textContent = `
      .lite-mode .bg-gradient-to-r,
      .lite-mode .bg-gradient-to-l,
      .lite-mode .bg-gradient-to-t,
      .lite-mode .bg-gradient-to-b {
        background: #111 !important;
      }
      
      .lite-mode .shadow-lg,
      .lite-mode .shadow-xl,
      .lite-mode .shadow-2xl {
        box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
      }
      
      .lite-mode .blur-lg,
      .lite-mode .blur-xl,
      .lite-mode .blur-2xl {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background-color: rgba(0,0,0,0.7) !important;
      }
      
      .lite-mode .animate-pulse,
      .lite-mode .animate-bounce,
      .lite-mode .animate-spin {
        animation: none !important;
      }
    `;
    document.head.appendChild(liteStyle);
  }
  
  // Carregar estilos críticos primeiro
  const criticalStyles = document.querySelectorAll('link[rel="stylesheet"][data-critical]');
  criticalStyles.forEach(function(styleLink) {
    styleLink.setAttribute('fetchpriority', 'high');
  });
  
  // Carregar estilos não críticos depois
  const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
  nonCriticalStyles.forEach(function(styleLink) {
    styleLink.setAttribute('media', 'print');
    styleLink.setAttribute('onload', "this.media='all'");
  });
});
