'use client';

import { useEffect } from 'react';

export function LeadForm() {
  // Função para capturar UTM params e adicionar ao formulário
  useEffect(() => {
    // Função para adicionar script do Hotmart Send
    const addHotmartFormScript = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        var pageParams = new URLSearchParams(window.location.search);
        var form = document.querySelector('form[klicksend-form-id="RxuyBWA"]');
        if (form) {
          var formActionUrl = new URL(form.action);
          var formActionSearchParams = formActionUrl.searchParams.size > 0 ? formActionUrl.searchParams.toString() + '&' : '';
          var combinedParams = formActionSearchParams + pageParams.toString();
          form.action = formActionUrl.origin + formActionUrl.pathname + '?' + combinedParams;
        }
      `;
      document.body.appendChild(script);
    };

    // Adicionar o script após o componente ser montado
    setTimeout(addHotmartFormScript, 500);
  }, []);

  return (
    <div className="hotmart-form-container">
      <form 
        klicksend-form-id='RxuyBWA' 
        autoComplete='off' 
        method="post" 
        action="//handler.send.hotmart.com/subscription/RxuyBWA"
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Digite seu melhor e-mail"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 transition-all duration-200"
          />
        </div>

        <div>
          <input
            type="text"
            autoComplete="off"
            name="first_name"
            id="first_name"
            placeholder="Digite seu nome"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 transition-all duration-200"
          />
        </div>

        <div>
          <input
            type="text"
            autoComplete="off"
            name="phone"
            id="phone"
            placeholder="Digite seu WhatsApp (somente números)"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50 transition-all duration-200"
          />
        </div>

        <div className="text-xs text-gray-400 mt-2 mb-4">
          <p>Esses dados serão utilizados para entrarmos em contato com você e disponibilizarmos mais conteúdos e ofertas. Caso você não queira mais receber os nosso emails, cada email que você receber, incluirá ao final, um link que poderá ser usado para remover o seu email da nossa lista de distribuição.</p>
          <p className="mt-2">Para mais informações, acesse: <a href="https://hotmart.com/pt-br/legal/privacidade-de-dados/" target="_blank" rel="noopener noreferrer" className="text-[#0c83fe] hover:underline">Política de Privacidade</a></p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            autoComplete="off"
            name="gdpr"
            id="gdpr"
            value="Concordo em receber os e-mails"
            required
            className="w-4 h-4 accent-[#0c83fe]"
          />
          <label htmlFor="gdpr" className="text-white text-sm">
            Concordo em receber os e-mails
          </label>
        </div>

        {/* Campo oculto para o honeypot anti-spam */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" autoComplete='new-password' name="b_RxuyBWA" tabIndex={-1} value="" />
        </div>

        {/* Campo oculto para o redirecionamento */}
        <input type="hidden" name="redirect_to" value="https://ai-lab-amber.vercel.app/obrigado?email={{email}}" />

        <button
          klicksend-form-submit-id='RxuyBWA'
          className="w-full px-8 py-4 rounded-xl bg-[#0c83fe] hover:bg-[#0c83fe]/90 text-white font-medium transition-all duration-200 relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Quero me inscrever
          </span>
        </button>
      </form>
    </div>
  );
}
