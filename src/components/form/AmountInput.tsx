import React, { useMemo, useRef, useState } from 'react';
import { ExchangeIcon } from '@estia/assets/icons/exchange';
import { formatCurrency, formatNumbers } from '@estia/utils/currency';
import { parseLocalizedNumber } from '@estia/utils/currency';
import CurrencyInput from 'react-currency-input-field';
import AutosizeInput from 'react-input-autosize';

interface AmountInputProps {
  isFromEst?: boolean;
  rate?: number;
  infoText?: string;
  showDetails?: boolean;
  onChangeValue: (output: number) => void;
  readonly?: boolean;
}

export default function AmountInput({
  isFromEst,
  rate = 1.99,
  infoText,
  showDetails = true,
  onChangeValue,
  readonly,
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const exchangeRate = useMemo(() => +(rate || 0).toFixed(4), [rate]);

  const estConversion = useMemo(
    () =>
      isFromEst
        ? +(parseLocalizedNumber(value) || 0) / exchangeRate
        : +exchangeRate * +(parseLocalizedNumber(value) || 0),
    [isFromEst, value, exchangeRate]
  );

  return (
    <div className='flex max-w-96 flex-col items-center'>
      <div className='flex max-w-max items-center'>
        <h1 className='text-primary-1 pr-2 text-5xl font-semibold'>
          {!isFromEst ? '€' : 'EST'}
        </h1>
        {readonly ? (
          <h2 className='text-5xl font-semibold text-black outline-none'>
            {formatNumbers(value)}
          </h2>
        ) : (
          <CurrencyInput
            autoFocus
            ref={inputRef}
            placeholder='0.00'
            className='currency-input placeholder-primary text-5xl font-semibold text-black outline-none'
            decimalsLimit={2}
            groupSeparator=','
            decimalSeparator='.'
            onValueChange={(value, name, values) => {
              setValue(value || '');
              onChangeValue(+(values?.float || 0));
            }}
            maxLength={10}
            customInput={AutosizeInput}
          />
        )}
      </div>
      {showDetails && (
        <>
          <ExchangeIcon className='my-3' />
          {isFromEst ? (
            <h3 className='text-xl font-medium'>
              {formatCurrency(estConversion, true)}
            </h3>
          ) : (
            <h3 className='text-xl font-medium'>
              EST {formatNumbers(estConversion, true)}
            </h3>
          )}
          <h4 className='mt-2 text-lg font-medium'>
            {formatCurrency(exchangeRate, true)} (EST)
          </h4>
          {infoText ? (
            <h5 className='text-primary-1 mt-6 text-lg font-bold'>
              {infoText}
            </h5>
          ) : null}
        </>
      )}
    </div>
  );
}
