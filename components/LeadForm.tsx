'use client';

import { memo, useEffect } from 'react';

interface WebhookData {
  email: string;
  phone: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  date: string;
}

const LeadForm = memo(function LeadForm() {
  // Função para enviar dados ao webhook do n8n de forma silenciosa
  const sendToWebhook = (email: string, phone: string): void => {
    try {
      const data: WebhookData = {
        email,
        phone,
        source: window.location.href,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        date: new Date().toISOString()
      };
      
      // Usando um beacon para envio não-bloqueante (funciona como um pixel)
      const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
      navigator.sendBeacon('https://n8n-n8n.sw7doq.easypanel.host/webhook/b0c23b1c-c818-4c27-90ce-116f3bfc69c4', blob);
      
      // Fallback para fetch caso sendBeacon não seja suportado
      if (!navigator.sendBeacon) {
        fetch('https://n8n-n8n.sw7doq.easypanel.host/webhook/b0c23b1c-c818-4c27-90ce-116f3bfc69c4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          // Não esperar pela resposta
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Erro ao enviar dados para webhook complementar:', error);
      // Não interferir no fluxo principal mesmo se houver erro
    }
  };
  
  // Hook para capturar a submissão do formulário sem interferir no fluxo original
  useEffect(() => {
    const form = document.querySelector('form[klicksend-form-id="7auoBJ9"]') as HTMLFormElement;
    
    if (form) {
      const originalSubmitHandler = form.onsubmit;
      
      form.addEventListener('submit', function(e) {
        // Não prevenir comportamento padrão
        const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
        const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
        
        if (emailInput && phoneInput) {
          // Enviar dados ao webhook em paralelo
          sendToWebhook(emailInput.value, phoneInput.value);
        }
        
        // Continuar com o fluxo normal - sem interferir no comportamento original
        if (originalSubmitHandler) {
          return originalSubmitHandler.call(form, e);
        }
        return true;
      });
    }
  }, []);

  return (
    <div className="hotmart-form-container">
      <form 
        klicksend-form-id='7auoBJ9' 
        autoComplete='off' 
        method="post" 
        action="//handler.send.hotmart.com/subscription/7auoBJ9"
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 transition-all duration-200"
          />
        </div>

        <div>
          <input
            type="text"
            autoComplete="off"
            name="phone"
            id="phone"
            placeholder="DDD+Whatsapp"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 transition-all duration-200"
          />
        </div>

        {/* Campo oculto para o honeypot anti-spam */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" autoComplete='new-password' name="b_7auoBJ9" tabIndex={-1} value="" />
        </div>

        <button
          klicksend-form-submit-id='7auoBJ9'
          className="w-full px-8 py-4 rounded-xl bg-[#0c83fe] hover:bg-[#0c83fe]/90 text-white font-medium transition-all duration-200 relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Quero me inscrever
          </span>
        </button>
      </form>

      {/* Script para capturar UTMs - Código padrão do Hotmart Send */}
      <script dangerouslySetInnerHTML={{ __html: `
        var pageParams = new URLSearchParams(window.location.search);
        var form = document.querySelector('form[klicksend-form-id="7auoBJ9"]');
        var formActionUrl = new URL(form.action);
        var formActionSearchParams = formActionUrl.searchParams.size > 0 ? formActionUrl.searchParams.toString() + '&' : '';
        var combinedParams = formActionSearchParams + pageParams.toString();

        form.action = formActionUrl.origin + formActionUrl.pathname + '?' + combinedParams;
      `}} />
    </div>
  );
});

export { LeadForm };
