import React from 'react';
import { cn } from '@estia/lib/utils';
import { motion } from 'framer-motion';

interface WelcomeCarouselIndicatorProps {
  totalCount: number;
  current: number;
}

export default function WelcomeCarouselIndicator({
  totalCount,
  current,
}: WelcomeCarouselIndicatorProps) {
  return (
    <div className='flex w-full flex-row items-center justify-center py-1'>
      {new Array(totalCount).fill(null).map((_, index) => {
        const isPast = current > index;
        const isActive = current - 1 === index;

        return (
          <motion.div
            key={index}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
              'bg-primary-2 ml-2 h-2 w-2 rounded-full',
              isPast && 'bg-white',
              isActive && 'w-6 bg-white'
            )}
          />
        );
      })}
    </div>
  );
}
