import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  ImageOff, 
  RefreshCw 
} from 'lucide-react';
import { resolvePublicAssetUrl } from '../utils/assetUrl';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

// Global fallback if an image link fails or is not found
const DEFAULT_FALLBACK_IMAGE = '/assets/images/mc_launchers_hero_1794042691092.jpg';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIcon,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const normalizedSrc = resolvePublicAssetUrl(currentSrc);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try local fallback image
      setCurrentSrc(DEFAULT_FALLBACK_IMAGE);
    }
  };

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
