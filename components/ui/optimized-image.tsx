import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  mobileSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  lowQualitySrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  mobileSrc,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  lowQualitySrc,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // Detectar dispositivo móvel
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    // Detectar conexão lenta
    const checkConnection = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        const isLow = conn.saveData || 
                     conn.effectiveType === 'slow-2g' || 
                     conn.effectiveType === '2g' || 
                     conn.effectiveType === '3g';
        setIsLowBandwidth(isLow);
      }
    };

    checkMobile();
    checkConnection();

    // Adicionar event listeners
    window.addEventListener('resize', checkMobile);
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', checkConnection);
    }

    // Determinar qual fonte de imagem usar
    if (isLowBandwidth && lowQualitySrc) {
      setImageSrc(lowQualitySrc);
    } else if (isMobile && mobileSrc) {
      setImageSrc(mobileSrc);
    } else {
      setImageSrc(src);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', checkConnection);
      }
    };
  }, [isMobile, isLowBandwidth, src, mobileSrc, lowQualitySrc]);

  // Ajustar qualidade para conexões lentas
  const imageQuality = isLowBandwidth ? Math.min(quality, 60) : quality;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={imageQuality}
      loading={priority ? 'eager' : 'lazy'}
      placeholder={lowQualitySrc ? 'blur' : 'empty'}
      blurDataURL={lowQualitySrc}
    />
  );
};

export default OptimizedImage;
