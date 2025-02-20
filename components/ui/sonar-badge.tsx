'use client';

import { motion } from 'framer-motion';

interface SonarBadgeProps {
  text: string;
  className?: string;
}

export function SonarBadge({ text, className = "" }: SonarBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 ${className}`}>
      <div className="relative">
        <div className="w-2 h-2 bg-[#0c83fe] rounded-full" />
        <motion.div
          className="absolute inset-0 bg-[#0c83fe] rounded-full"
          animate={{
            scale: [1, 2.5],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </div>
      <span className="text-sm text-gray-300">{text}</span>
    </div>
  );
}
