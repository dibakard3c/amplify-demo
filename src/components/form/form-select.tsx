import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@estia/components/ui/form';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@estia/components/ui/select';
import ReactCountryFlag from 'react-country-flag';
import { cn } from '@estia/lib/utils';

interface FormSelectItems {
  flag?: string;
  icon?: React.FC<any>;
  title: string;
  value: any;
}

interface FormSelectFieldProps {
  label?: string;
  value?: any;
  placeholder?: string;
  onChange: (value: string) => void;
  items: FormSelectItems[] | undefined;
  className?: string;
  inputClassName?: string;
  description?: string;
  error?: string;
  isObjectValue?: boolean;
}

export function FormSelectField({
  label,
  onChange,
  value,
  placeholder,
  items,
  className,
  inputClassName,
  description,
  isObjectValue,
}: FormSelectFieldProps) {
  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Select
        onValueChange={(value) => {
          if (isObjectValue) {
            onChange(JSON.parse(value));
          } else {
            onChange(value);
          }
        }}
        defaultValue={isObjectValue ? JSON.stringify(value) : value}
      >
        <FormControl>
          <SelectTrigger className={cn('w-auto max-w-96 py-6', inputClassName)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items?.map((item, index) => (
            <SelectItem
              key={index}
              value={isObjectValue ? JSON.stringify(item?.value) : item?.value}
              className='py-3'
            >
              {item?.icon ? <item.icon className='ml-1 size-6' /> : null}
              {item?.flag ? (
                <ReactCountryFlag
                  countryCode={item?.flag}
                  className='ml-1 size-6 text-xl'
                  svg
                />
              ) : null}
              <p className='ml-1 text-base font-bold'>{item?.title}</p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
      <FormDescription className='w-auto max-w-74 leading-relaxed'>
        {description}
      </FormDescription>
    </FormItem>
  );
}
