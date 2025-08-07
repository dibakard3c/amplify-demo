import * as React from 'react';
import { cn } from '@estia/lib/utils';
import { ChangeEvent, useState } from 'react';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@estia/components/ui/form';
import { EyeClosed, EyeOpen } from '@estia/assets';

interface FormInputFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  value?: string;
  placeholder?: string;
  description?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  disableCopyPaste?: boolean;
}

export function FormInputField({
  className,
  type,
  label,
  description,
  inputClassName,
  disableCopyPaste,
  ...props
}: FormInputFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(
    type === 'password'
  );

  const passwordConstraints = disableCopyPaste
    ? {
        onCopy: (e: any) => e.preventDefault(),
        onPaste: (e: any) => e.preventDefault(),
        onCut: (e: any) => e.preventDefault(),
        onSelectStart: (e: any) => e.preventDefault(),
        autoComplete: 'off',
      }
    : {};

  return (
    <FormItem className={className}>
      {label ? <FormLabel disabled={props?.disabled}>{label}</FormLabel> : null}
      <div className='relative flex flex-row'>
        <input
          type={!passwordVisibility ? 'text' : 'password'}
          data-slot='input'
          className={cn(
            'w-full max-w-96 py-5 font-bold max-sm:focus:text-[16px]',
            'file:text-foreground placeholder:text-neutral-4 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-neutral-4 flex h-12 w-full min-w-0 rounded-lg border-2 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            inputClassName
          )}
          {...props}
          {...passwordConstraints}
        />
        {type === 'password' && (
          <div
            onClick={() => {
              setPasswordVisibility(!passwordVisibility);
            }}
            className='absolute right-0 flex h-full items-center justify-center px-4'
          >
            {passwordVisibility ? (
              <EyeOpen className='size-6' />
            ) : (
              <EyeClosed className='size-6' />
            )}
          </div>
        )}
      </div>
      <FormMessage />
      <FormDescription className='max-w-96 leading-relaxed'>
        {description}
      </FormDescription>
    </FormItem>
  );
}
