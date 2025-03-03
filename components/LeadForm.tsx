'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(11, 'WhatsApp inválido').max(11, 'WhatsApp inválido')
});

type FormData = z.infer<typeof formSchema>;

export function LeadForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    whatsapp: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = formSchema.parse(formData);
      
      // Enviar dados para a Hotmart via webhook
      const webhookUrl = process.env.NEXT_PUBLIC_HOTMART_WEBHOOK_URL || '';
      
      // Capturar UTM params do localStorage
      const utmSource = localStorage.getItem('utm_source') || '';
      const utmMedium = localStorage.getItem('utm_medium') || '';
      const utmCampaign = localStorage.getItem('utm_campaign') || '';
      const utmTerm = localStorage.getItem('utm_term') || '';
      const utmContent = localStorage.getItem('utm_content') || '';
      
      // Preparar payload para o webhook
      const payload = {
        ...validatedData,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        timestamp: new Date().toISOString(),
        source: window.location.href
      };
      
      try {
        // Enviar dados para o webhook
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }
        
        // Registrar evento de conversão no Facebook Pixel
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'AI Lab Registration',
            content_category: 'Registration'
          });
        }
        
        // Registrar evento de conversão no Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXX',
            'event_category': 'Registration',
            'event_label': 'AI Lab Lead'
          });
        }
        
        // Redirecionar para a página de agradecimento
        router.push(`/obrigado?email=${encodeURIComponent(validatedData.email)}`);
        
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        // Mesmo com erro no webhook, redirecionar para não perder o lead
        router.push(`/obrigado?email=${encodeURIComponent(validatedData.email)}`);
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<FormData> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatação específica para WhatsApp
    if (name === 'whatsapp') {
      const numbers = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numbers }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Digite seu melhor e-mail"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/10
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50
            transition-all duration-200
            ${errors.email ? 'border-red-500' : ''}
          `}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          name="whatsapp"
          placeholder="Digite seu WhatsApp (somente números)"
          value={formData.whatsapp}
          onChange={handleChange}
          maxLength={11}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/10
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#0c83fe]/50
            transition-all duration-200
            ${errors.whatsapp ? 'border-red-500' : ''}
          `}
          disabled={isSubmitting}
        />
        {errors.whatsapp && (
          <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full px-8 py-4 rounded-xl
          bg-[#0c83fe] hover:bg-[#0c83fe]/90
          text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          relative overflow-hidden
          ${isSubmitting ? 'cursor-wait' : ''}
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Quero me inscrever
            </>
          )}
        </span>
      </button>
    </form>
  );
}
