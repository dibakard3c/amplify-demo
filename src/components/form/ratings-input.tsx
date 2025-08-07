import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@estia/lib/utils';

interface RatingBlockProps {
  size?: number;
  value?: number;
  onChange: (_value: number) => void;
  className?: string;
}

export const RatingsInput = ({
  onChange,
  value = 0.5,
  className,
}: RatingBlockProps) => {
  return (
    <div className={cn('relative flex', className)}>
      <div className='flex'>
        {new Array(5)?.fill(null)?.map((item, index) => (
          <div key={index} className='mr-1'>
            <Star
              className='size-7 cursor-pointer'
              onClick={() => {
                onChange(
                  value >= 5 ? 0 : index + (value === index + 0.5 ? 1 : 0.5)
                );
              }}
              fill={'rgba(54, 12, 70, 0.25)'}
              strokeWidth={0}
            />
          </div>
        ))}
      </div>
      <div className='absolute flex'>
        {new Array(Math.round(value || 0))?.fill(null)?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                onChange(
                  value >= 5 ? 0 : index + (value === index + 0.5 ? 1 : 0.5)
                );
              }}
              className='mr-1'
            >
              {index + 0.5 === value ? (
                <StarHalf
                  className='size-7 cursor-pointer'
                  fill='#DFB300'
                  strokeWidth={0}
                />
              ) : (
                <Star
                  className='size-7 cursor-pointer'
                  fill='#DFB300'
                  strokeWidth={0}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
