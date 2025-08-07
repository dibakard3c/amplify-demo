import * as React from 'react';
import { cn } from '@estia/lib/utils';
import { ChangeEvent } from 'react';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@estia/components/ui/form';

interface FormTextAreaFieldProps extends React.ComponentProps<'textarea'> {
  label?: string;
  value?: string;
  placeholder?: string;
  description?: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  inputClassName?: string;
}

export function FormTextAreaField({
  className,
  label,
  description,
  inputClassName,
  ...props
}: FormTextAreaFieldProps) {
  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <textarea
        data-slot='input'
        className={cn(
          'min-h-60 w-full max-w-96 py-5 font-bold',
          'file:text-foreground placeholder:text-neutral-4 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-neutral-4 flex h-12 w-full min-w-0 rounded-lg border-2 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          inputClassName
        )}
        {...props}
      />
      <FormMessage />
      <FormDescription className='max-w-96 leading-relaxed'>
        {description}
      </FormDescription>
    </FormItem>
  );
}
