'use client'

import { LeadForm } from "@/components/LeadForm"
import { TitleWithHighlight } from "@/components/ui/title-with-highlight"
import { FloatingGrid } from "@/components/ui/floating-grid"
import { FeatureCard } from "@/components/ui/feature-card"
import { GlowingButton } from "@/components/ui/glowing-button"
import { TechHighlight } from "@/components/ui/tech-highlight"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { SonarBadge } from "@/components/ui/sonar-badge"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <FloatingGrid />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-[#0c83fe]/20 rounded-xl blur-xl"></div>
                  <div className="relative px-6 py-3 rounded-xl bg-black/40 border border-[#0c83fe] backdrop-blur-sm">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0c83fe]">
                      AI Lab
                    </h1>
                  </div>
                </div>
                <SonarBadge text="Construa o Futuro com IA" className="mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold mobile-optimized-text">
                  <span className="inline-block" style={{color: '#ffffff'}}>Aplicações de IA Avançadas</span>
                  {/* Atualizado em 04/03/2025 para forçar novo deploy */}
                </h2>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto description-text"
              >
                Aprenda na prática a desenvolver soluções avançadas com{" "}
                <span className="text-[#0c83fe]">LLM</span>,{" "}
                <span className="text-[#0c83fe]">RAG</span> e{" "}
                <span className="text-[#0c83fe]">Agentes de IA</span> usando ferramentas como{" "}
                <span className="text-[#0c83fe]">CrewAI</span>,{" "}
                <span className="text-[#0c83fe]">LangGraph</span>,{" "}
                <span className="text-[#0c83fe]">Composio</span> e{" "}
                <span className="text-[#0c83fe]">Deep Research</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-2xl mx-auto"
                id="lead-form-container"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c83fe]/20 to-[#0c83fe]/20 rounded-2xl blur-2xl" />
                  <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Garanta Sua Vaga Agora!</h3>
                    <p className="text-gray-400 mb-8 text-center">Vagas Limitadas - Turma Exclusiva - 100% online e Gratuito</p>
                    <div className="max-w-md mx-auto">
                      <LeadForm />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cronograma Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Cronograma Title */}
          <div className="text-center mb-16 mt-24">
            <h2 className="text-4xl font-bold mb-6">Cronograma Completo</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Quatro dias intensivos de aprendizado prático, construindo projetos reais com as tecnologias mais avançadas de IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                dia: "Dia 1",
                titulo: "Introdução aos LLMs e RAG",
                descricao: "Crie uma aplicação de Q&A com LLM e RAG, aprenda sobre transformers, embeddings e vector DBs."
              },
              {
                dia: "Dia 2",
                titulo: "LLM e RAG Avançado",
                descricao: "Aplicação avançada com LLM de ponta, embeddings e vector DBs"
              },
              {
                dia: "Dia 3",
                titulo: "Aplicação Completa",
                descricao: "Integre LLM, RAG e Agentes em um projeto robusto com automação e deploy."
              },
              {
                dia: "Dia 4",
                titulo: "Projeto Avançado",
                descricao: "Demonstração de um projeto profissional e acesso especial ao AI Pro Expert."
              }
            ].map((dia, index) => (
              <FeatureCard
                key={index}
                title={dia.titulo}
                description={dia.descricao}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* O Que Você Vai Aprender */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Você Vai Aprender
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Domine as tecnologias mais avançadas de IA através de projetos práticos e hands-on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                titulo: "LLMs e RAG",
                items: [
                  "Claude, Openai, DeepSeek e muito mais",
                  "Implementação de RAG",
                  "Vector Databases",
                  "Fine-tuning e Otimização"
                ]
              },
              {
                titulo: "Agentes Autônomos",
                items: [
                  "Arquitetura de Agentes",
                  "CrewAI e langgraph",
                  "Integração de Tools",
                  "Automação de Tarefas"
                ]
              },
              {
                titulo: "Projetos Práticos",
                items: [
                  "RAG e Deep Search avançado",
                  "Agentes de Busca",
                  "Automação com IA",
                  "Deploy em Produção"
                ]
              }
            ].map((topico, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {topico.titulo}
                  </h3>
                  <ul className="space-y-3">
                    {topico.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Dizem Nossos Alunos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Histórias de sucesso de quem já participou dos treinamentos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                nome: "João Paulo",
                cargo: "Engenheiro de ML",
                empresa: "Tech Corp",
                depoimento: "A Ciência dos Dados me deu as ferramentas práticas que eu precisava para implementar soluções de IA no mundo real."
              },
              {
                nome: "Ana Costa",
                cargo: "Tech Lead",
                empresa: "Startup XYZ",
                depoimento: "A abordagem hands-on do curso do Eduardo é fantástica. Consegui implementar um agente de IA logo na primeira semana."
              },
              {
                nome: "Paulo Mazzia",
                cargo: "Head de Inteligência de Negócios",
                empresa: "Paipe",
                depoimento: "O conhecimento em RAG e LLMs que adquiri com a Ciência dos Dados transformou a maneira como construir aplicações."
              }
            ].map((depoimento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-300">
                  <p className="text-gray-300 mb-4">"{depoimento.depoimento}"</p>
                  <div className="flex items-center justify-center gap-2">
                    <div>
                      <p className="font-semibold text-white">{depoimento.nome}</p>
                      <p className="text-sm text-gray-400">
                        {depoimento.cargo} @ {depoimento.empresa}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative pb-0 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c83fe]/20 to-[#0c83fe]/20 opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c83fe]/20 to-[#0c83fe]/20 rounded-2xl blur-2xl" />
              <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-[#0c83fe]/20">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold mb-2">Garanta Sua Vaga Agora!</h2>
                  <p className="text-gray-400">Vagas Limitadas - Turma Exclusiva - 100% online e Gratuito</p>
                </div>
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}