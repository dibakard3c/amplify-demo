import React, { useState } from 'react';
import { formatCurrency } from '@estia/utils/currency';

interface AddSignPrefixAndSuffixProps {
  sign?: '+' | '-' | '';
  prefix?: string;
  signPosition: 'beforePrefix' | 'afterPrefix';
}

export const addSignPrefixAndSuffix = (
  value: any,
  options: AddSignPrefixAndSuffixProps
) => {
  const { prefix, sign, signPosition } = options;

  switch (signPosition) {
    case 'beforePrefix':
      return `${sign}${prefix}${value}`;
    case 'afterPrefix':
      return `${prefix}${sign}${value}`;
  }
};

export function formatNumber(input: number, options?: any) {
  const {
    precision,
    separator = ',',
    delimiter = '.',
    prefix = '',
    ignoreNegative,
    showPositiveSign,
    signPosition = 'afterPrefix',
  } = options || {};

  const negative = ignoreNegative ? false : input < 0;
  const sign = negative ? '-' : showPositiveSign ? '+' : '';

  const string = Math.abs(input).toFixed(precision);

  const parts = string.split('.');

  const number = parts[0];
  const buffer = number
    .replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
    .split(delimiter);

  let formattedNumber = '';
  formattedNumber = buffer.join(delimiter);

  const decimals = parts[1];
  if (!!precision && decimals) {
    formattedNumber += separator + decimals;
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    sign,
    signPosition,
  });
}

export default function CurrencyInput({
  prefix = '$',
  currency = '$',
  precision = 2,
  minValue = 0,
  maxValue = 999900000,
  separator = '.',
  delimiter = ',',
  onValueChange,
  inputClassName,
}: any) {
  const [value, setValue] = useState<any>(0);
  const noNegativeValues = typeof minValue === 'number' && minValue >= 0;

  const formattedValue = React.useMemo(() => {
    if (!!value || value === 0 || value === -0) {
      return formatNumber(value, {
        separator,
        prefix,
        precision,
        delimiter,
        ignoreNegative: noNegativeValues,
      });
    } else {
      return formatCurrency(0, true, currency);
    }
  }, [
    value,
    separator,
    prefix,
    precision,
    delimiter,
    noNegativeValues,
    currency,
  ]);

  const handleInput = React.useCallback(
    (text: string) => {
      let textWithoutPrefix = text;

      if (prefix) {
        textWithoutPrefix = text.replace(prefix, '');
        if (textWithoutPrefix === text) {
          textWithoutPrefix = text.replace(prefix.slice(0, -1), '');
        }
      }

      // strip out non numbers and delimiters
      const cleanedText = textWithoutPrefix.replace(/[^0-9,.]+/g, '');

      const textNumericValue = cleanedText.replace(/\D+/g, '');

      const numberValue = Number(textNumericValue);

      const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

      let newValue: number | null;

      if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
        // Allow to clean the value instead of beign 0
        newValue = null;
      } else {
        newValue = numberValue / 10 ** precision;
      }

      if (newValue && maxValue && newValue > maxValue) {
        return;
      } else if (newValue && minValue && newValue < minValue) {
        return;
      }

      setValue(newValue);
      onValueChange(+(newValue || 0));
    },
    [prefix, precision, maxValue, minValue, onValueChange]
  );

  return (
    <div className=''>
      <input
        type='text'
        className={inputClassName}
        value={formattedValue}
        onChange={(event) => {
          handleInput(event.target.value);
        }}
      />
    </div>
  );
}
