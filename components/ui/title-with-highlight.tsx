import { motion } from 'framer-motion';

interface TitleWithHighlightProps {
  className?: string;
}

export function TitleWithHighlight({ className = "" }: TitleWithHighlightProps) {
  return (
    <h1 className={`${className} flex flex-wrap items-center gap-2`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#0c83fe] whitespace-nowrap"
      >
        AI Lab:
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="whitespace-pre-wrap"
      >
        Criando Aplicações de IA de Forma Profissional
      </motion.span>
    </h1>
  );
}
