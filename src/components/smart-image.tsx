import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  fallback?: string;
  alt: string;
  width: number;
  height: number;
}

export default function SmartImage({
  src,
  fallback,
  alt,
  ...props
}: SmartImageProps) {
  const [validSrc, setValidSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setValidSrc(src);
    if (fallback) {
      img.onerror = () => setValidSrc(fallback);
    }
  }, [src, fallback]);

  if (!validSrc) {
    return (
      <div className='bg-neutral-6 flex size-12 items-center justify-center rounded-[12px] pl-0.5'></div>
    );
  }

  return <Image src={validSrc} alt={alt} {...props} />;
}
