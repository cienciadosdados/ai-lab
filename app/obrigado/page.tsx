'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FloatingGrid } from '@/components/ui/floating-grid';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingGrid />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-[#0c83fe]/20 rounded-xl blur-xl"></div>
                <div className="relative px-6 py-3 rounded-xl bg-black/40 border border-[#0c83fe] backdrop-blur-sm">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#0c83fe]">
                    AI Lab
                  </h1>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Inscrição Confirmada! 🎉
              </h2>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
                <p className="text-xl mb-4">
                  Enviamos todos os detalhes para o seu e-mail: <span className="text-[#0c83fe] font-semibold">{email}</span>
                </p>
                <p className="text-gray-400">
                  (Verifique sua caixa de spam caso não encontre)
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6">3 passos que você precisa seguir agora:</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Entre no Grupo do Telegram",
                  description: "Acesse o grupo exclusivo para receber atualizações e materiais",
                  link: "https://t.me/cienciadosdadosraiz",
                  buttonText: "Entrar no Telegram"
                },
                {
                  title: "Adicione ao Calendário",
                  description: "Garanta sua presença salvando as datas do treinamento",
                  link: "#",
                  buttonText: "Adicionar ao Calendário"
                },
                {
                  title: "Siga no Instagram",
                  description: "Acompanhe conteúdos exclusivos e novidades",
                  link: "https://www.instagram.com/cienciadosdados/",
                  buttonText: "Seguir no Instagram"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c83fe]/20 to-[#0c83fe]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-[#0c83fe]/50 transition-colors duration-300 h-full flex flex-col">
                    <div className="mb-2 text-[#0c83fe] font-bold text-xl">
                      {index + 1}.
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-[#0c83fe] transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4 flex-grow">
                      {step.description}
                    </p>
                    <Link 
                      href={step.link}
                      target="_blank"
                      className="inline-block bg-[#0c83fe]/10 hover:bg-[#0c83fe]/20 text-[#0c83fe] font-medium py-2 px-4 rounded-lg border border-[#0c83fe]/30 transition-colors duration-300 w-full text-center"
                    >
                      {step.buttonText}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 mb-4">
              Tem alguma dúvida? Entre em contato pelo e-mail <a href="mailto:contato@cienciadosdados.com" className="text-[#0c83fe] hover:underline">contato@cienciadosdados.com</a>
            </p>
            
            <div className="flex justify-center space-x-4 mt-8">
              <Link href="/politicas" className="text-gray-400 hover:text-white text-sm">
                Políticas de Privacidade
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/" className="text-gray-400 hover:text-white text-sm">
                Voltar para Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
