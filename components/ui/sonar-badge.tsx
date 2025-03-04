'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SonarBadgeProps {
  text: string;
  className?: string;
}

export function SonarBadge({ text, className = "" }: SonarBadgeProps) {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start animation with reduced complexity on mobile
    controls.start({
      scale: [1, 1.2],
      opacity: [0.5, 0],
      transition: {
        duration: isMobile ? 3 : 2, // Slower on mobile
        repeat: Infinity,
        ease: "easeOut"
      }
    });

    return () => window.removeEventListener('resize', checkMobile);
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative inline-flex items-center gap-2 ${className}`}
    >
      {/* Only show outer animation on non-mobile */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 bg-[#0c83fe]/5 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={controls}
        />
      )}
      <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-2">
        <div className="relative">
          <div className="w-2 h-2 bg-[#0c83fe] rounded-full" />
          <motion.div
            className="absolute inset-0 bg-[#0c83fe] rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 2],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: isMobile ? 3 : 2, // Slower on mobile
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
        <motion.span 
          className="text-sm text-gray-300"
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: [0.8, 1]
          }}
          transition={{
            duration: isMobile ? 3 : 2, // Slower on mobile
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
