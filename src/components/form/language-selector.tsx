'use client';

import * as React from 'react';
import { Check, ChevronDownIcon } from 'lucide-react';

import { cn } from '@estia/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@estia/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@estia/components/ui/popover';
import { Button } from '@estia/components/ui/button';
import ReactCountryFlag from 'react-country-flag';
import { isEmpty, isEqual } from 'lodash';
import { FormItem, FormLabel } from '@estia/components/ui/form';

export function LanguageSelector({
  inputClassName,
  items,
  isObjectValue,
  value,
  onChange,
  placeholder,
  className,
  label,
}: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={cn('w-auto max-w-96 py-6', inputClassName)}
        >
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              "border-neutral-4 data-[placeholder]:text-neutral-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
              'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20',
              'dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50',
              'flex h-14 w-fit w-full items-center justify-between gap-2 rounded-lg border-2 bg-transparent',
              'text-sm font-bold whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
              'disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-12 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1',
              '*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none',
              "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              'hover:text-neutral-2 px-3 hover:bg-transparent',
              isEmpty(value?.countryName)
                ? 'text-neutral-4 hover:text-neutral-4'
                : ''
            )}
          >
            {isObjectValue && !isEmpty(value?.countryName) ? (
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  {value?.countryAbbreviation ? (
                    <ReactCountryFlag
                      countryCode={value?.countryAbbreviation}
                      className='ml-1 size-6 text-xl'
                      svg
                    />
                  ) : null}
                  <p
                    className={cn(
                      'ml-3 font-bold',
                      isEmpty(value?.countryName) ? 'text-sm' : 'text-base'
                    )}
                  >
                    {value?.countryName}
                  </p>
                </div>
                <div className='bg-neutral-4 flex size-5 items-center justify-center rounded'>
                  <ChevronDownIcon className='size-4 text-white' />
                </div>
              </div>
            ) : (
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  <p className='ml-1 font-bold'>{value || placeholder}</p>
                </div>
                <div className='bg-neutral-4 flex size-5 items-center justify-center rounded'>
                  <ChevronDownIcon className='size-4 text-white' />
                </div>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[330px] p-0'>
          <Command>
            <CommandInput
              className='text-base font-medium'
              placeholder='Search country...'
            />
            <CommandList>
              <CommandEmpty className='text-base font-medium'>
                No country found.
              </CommandEmpty>
              <CommandGroup>
                {items.map((item: any, index: number) => (
                  <CommandItem
                    key={index}
                    value={
                      isObjectValue ? JSON.stringify(item?.value) : item?.value
                    }
                    onSelect={(currentValue) => {
                      if (isObjectValue) {
                        onChange(JSON.parse(currentValue));
                      } else {
                        onChange(currentValue);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isEqual(value, item.value) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item?.icon ? <item.icon className='ml-1 size-6' /> : null}
                    {item?.flag ? (
                      <ReactCountryFlag
                        countryCode={item?.flag}
                        className='ml-1 size-6 text-xl'
                        svg
                      />
                    ) : null}
                    <p className='ml-1 text-base font-bold'>{item?.title}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
