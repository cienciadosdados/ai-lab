'use client';

import { motion } from 'framer-motion';

interface SonarBadgeProps {
  text: string;
  className?: string;
}

export function SonarBadge({ text, className = "" }: SonarBadgeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative inline-flex items-center gap-2 ${className}`}
    >
      <motion.div 
        className="absolute inset-0 bg-[#0c83fe]/5 rounded-full"
        initial={{ scale: 1, opacity: 0 }}
        whileInView={{
          scale: [1, 1.2],
          opacity: [0.5, 0]
        }}
        viewport={{ once: false }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-2">
        <div className="relative">
          <div className="w-2 h-2 bg-[#0c83fe] rounded-full" />
          <motion.div
            className="absolute inset-0 bg-[#0c83fe] rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileInView={{
              scale: [1, 2.5],
              opacity: [0.8, 0]
            }}
            viewport={{ once: false }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
        <motion.span 
          className="text-sm text-gray-300"
          initial={{ opacity: 0.8 }}
          whileInView={{
            opacity: [0.8, 1]
          }}
          viewport={{ once: false }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}
