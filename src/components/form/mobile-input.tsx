import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
} from '@estia/components/ui/form';
import { cn } from '@estia/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@estia/components/ui/select';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '@estia/helpers/countries';
import { isEmpty } from 'lodash';

interface MobileInputProps {
  className?: string;
  inputContainerClassName?: string;
  control: any;
  countryCodeName: string;
  numberName: string;
  label: string;
  description?: string;
  placeholder?: string;
  error?: string;
  currentCountryCode?: string;
  currentMobile?: string;
}

export default function MobileInput({
  className,
  control,
  countryCodeName,
  numberName,
  label,
  description,
  placeholder,
  error,
  inputContainerClassName,
  currentCountryCode,
  currentMobile,
}: MobileInputProps) {
  return (
    <div className={cn('mt-6', className)}>
      {label ? <FormLabel hasError={!isEmpty(error)}>{label}</FormLabel> : null}
      <div
        className={cn('mt-2 flex max-w-96 flex-row', inputContainerClassName)}
      >
        <FormField
          control={control}
          name={countryCodeName}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(JSON.parse(value));
              }}
              defaultValue={JSON.stringify({
                countryAbbreviation: 'GR',
                countryName: 'Greece',
                mobileCode: '+30',
              })}
            >
              <FormControl>
                <SelectTrigger
                  aria-invalid={!isEmpty(error)}
                  className={cn('mr-3 w-auto max-w-96 cursor-pointer py-6')}
                  showIcon={false}
                >
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries?.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={JSON.stringify(item)}
                    className='py-3'
                  >
                    <p className='text-base font-bold'>{item?.mobileCode}</p>
                    <ReactCountryFlag
                      countryCode={item?.countryAbbreviation}
                      className='ml-1 size-6 text-xl'
                      svg
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={control}
          name={numberName}
          render={({ field }) => (
            <input
              data-slot='input'
              placeholder={placeholder}
              className={cn(
                'max-w-96 flex-1 bg-red-500 py-5 font-bold max-sm:focus:text-[16px]',
                'file:text-foreground placeholder:text-neutral-4 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-neutral-4 flex h-12 w-full min-w-0 rounded-lg border-2 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
              )}
              aria-invalid={!isEmpty(error)}
              {...field}
            />
          )}
        />
      </div>
      <p
        data-slot='form-message'
        className={cn('text-destructive mt-2 text-sm xl:text-base')}
      >
        {error}
      </p>
      <FormDescription className='max-w-96 leading-relaxed'>
        {description}
      </FormDescription>
    </div>
  );
}
