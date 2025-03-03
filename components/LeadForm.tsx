'use client';

export function LeadForm() {
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

        <div className="text-xs text-gray-400 mt-2 mb-4">
          <p>Esses dados serão utilizados para entrarmos em contato com você e disponibilizarmos mais conteúdos e ofertas. Caso você não queira mais receber os nosso emails, cada email que você receber, incluirá ao final, um link que poderá ser usado para remover o seu email da nossa lista de distribuição.</p>
          <p className="mt-2">Para mais informações, acesse: <a href="https://hotmart.com/pt-br/legal/privacidade-de-dados/" target="_blank" rel="noopener noreferrer" className="text-[#0c83fe] hover:underline">Política de Privacidade</a></p>
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
}
