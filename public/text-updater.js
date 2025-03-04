// Script para forçar a atualização de textos
// Versão 1.1 - Atualizado em 04/03/2025 para forçar novo deploy
document.addEventListener('DOMContentLoaded', function() {
  // Função para substituir texto em todos os elementos
  function replaceTextInElements() {
    const oldText = "Criando Aplicações de IA de Forma Profissional";
    const newText = "Aplicações de IA Avançadas";
    
    // Função recursiva para percorrer todos os nós de texto
    function walkTextNodes(node) {
      if (node.nodeType === 3) { // Nó de texto
        if (node.nodeValue.includes(oldText)) {
          node.nodeValue = node.nodeValue.replace(oldText, newText);
        }
      } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        // Elemento, percorrer filhos
        for (let i = 0; i < node.childNodes.length; i++) {
          walkTextNodes(node.childNodes[i]);
        }
      }
    }
    
    // Iniciar a recursão a partir do body
    walkTextNodes(document.body);
    
    // Também atualizar elementos específicos
    document.querySelectorAll('h1, h2, h3, p, span, div').forEach(function(el) {
      if (el.innerText && el.innerText.includes(oldText)) {
        el.innerText = el.innerText.replace(oldText, newText);
      }
      if (el.textContent && el.textContent.includes(oldText)) {
        el.textContent = el.textContent.replace(oldText, newText);
      }
    });
  }
  
  // Executar imediatamente
  replaceTextInElements();
  
  // E também após um pequeno atraso para garantir que elementos dinâmicos sejam atualizados
  setTimeout(replaceTextInElements, 500);
  setTimeout(replaceTextInElements, 1500);
  
  // Observar mudanças no DOM
  const observer = new MutationObserver(function(mutations) {
    replaceTextInElements();
  });
  
  // Observar todo o body para mudanças
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
});
