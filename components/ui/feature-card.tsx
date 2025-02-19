import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  className?: string;
}

export function FeatureCard({ title, description, icon, delay = 0, className = "" }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c83fe]/20 to-[#0c83fe]/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-[#0c83fe]/50 transition-colors duration-300">
        {icon && (
          <div className="w-12 h-12 mb-4 text-[#0c83fe] group-hover:text-[#0c83fe]/80 transition-colors duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#0c83fe] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
