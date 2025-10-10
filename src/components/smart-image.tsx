import React, { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@estia/utils/utils';
//
// interface SmartImageProps {
//   src: string;
//   fallback?: string;
//   alt: string;
//   sizeClassName: string;
//   placeholder: string;
// }
//
// export default function SmartImage({
//   src,
//   fallback,
//   alt,
//   sizeClassName,
//   placeholder,
//   ...props
// }: SmartImageProps) {
//   const [validSrc, setValidSrc] = useState<string | null>(null);
//
//   useEffect(() => {
//     const img = new window.Image();
//     img.src = src;
//     img.onload = () => setValidSrc(src);
//     if (fallback) {
//       img.onerror = () => setValidSrc(fallback);
//     }
//   }, [src, fallback]);
//
//   if (!validSrc) {
//     return (
//       <div
//         className={cn(
//           'bg-neutral-6 flex size-14 items-center justify-center rounded-[12px]',
//           sizeClassName
//         )}
//       >
//         <h6 className='text-3xl font-bold'>{placeholder}</h6>
//       </div>
//     );
//   }
//
//   return (
//     <div
//       className={cn(
//         'relative size-20 overflow-hidden rounded-[12px]',
//         sizeClassName
//       )}
//     >
//       <Image key={src} fill src={validSrc} alt={alt} {...props} />
//     </div>
//   );
// }

interface SmartImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  fallback?: string;
  alt: string;
  placeholder?: string | any;
  sizeClassName?: string;
}

export default function SmartImage({
  src,
  fallback,
  alt,
  sizeClassName,
  placeholder,
  ...props
}: SmartImageProps) {
  const [validSrc, setValidSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.src = src;
    img.onload = () => active && setValidSrc(src);
    img.onerror = () => {
      if (active) {
        if (fallback) {
          setValidSrc(fallback);
        } else {
          setValidSrc(null);
        }
      }
    };
    return () => {
      active = false; // cleanup
    };
  }, [src, fallback]);

  if (!validSrc) {
    return (
      <div
        className={cn(
          'bg-neutral-6 flex size-14 items-center justify-center rounded-[12px]',
          sizeClassName
        )}
      >
        {placeholder && <h6 className='text-3xl font-bold'>{placeholder}</h6>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative size-14 overflow-hidden rounded-[12px]',
        sizeClassName
      )}
    >
      <Image
        key={validSrc}
        src={validSrc}
        alt={alt}
        fill
        loading='lazy'
        style={{ objectFit: 'contain' }}
        {...props}
      />
    </div>
  );
}
