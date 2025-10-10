import React, { useMemo, useState } from 'react';
import { ExchangeIcon } from '@estia/assets/icons/exchange';
import { formatCurrency, formatNumbers } from '@estia/utils/currency';
import { parseLocalizedNumber } from '@estia/utils/currency';
import CurrencyInput from '@estia/components/form/currency-input';

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
  const [value, setValue] = useState(0);

  const exchangeRate = useMemo(() => +(rate || 0).toFixed(4), [rate]);

  const estConversion = useMemo(
    () =>
      isFromEst
        ? +(parseLocalizedNumber(value) || 0) / exchangeRate
        : +exchangeRate * +(parseLocalizedNumber(value) || 0),
    [isFromEst, value, exchangeRate]
  );

  return (
    <div className='flex max-w-96 flex-col items-center min-[140rem]:max-w-[50rem]'>
      <div className='flex max-w-max items-center'>
        {readonly ? (
          <h2 className='text-5xl font-semibold text-black outline-none min-[140rem]:text-7xl'>
            {formatCurrency(value, true, !isFromEst ? `euro` : 'EST ')}
          </h2>
        ) : (
          <CurrencyInput
            inputClassName={`currency-input placeholder-primary text-5xl font-semibold text-black text-center outline-none min-[140rem]:text-7xl w-full`}
            prefix={!isFromEst ? '€' : 'EST '}
            currency={!isFromEst ? `euro` : 'EST'}
            onValueChange={(value: number) => {
              setValue(value);
              onChangeValue(value);
            }}
          />
        )}
      </div>
      {showDetails && (
        <>
          <ExchangeIcon className='my-3 min-[140rem]:my-8 min-[140rem]:size-24' />
          {isFromEst ? (
            <h3 className='text-xl font-medium'>
              {formatCurrency(estConversion, true)}
            </h3>
          ) : (
            <h3 className='text-xl font-medium'>
              EST {formatNumbers(estConversion, true)}
            </h3>
          )}
          <h4 className='mt-2 text-lg font-medium min-[140rem]:mt-6'>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {formatCurrency(exchangeRate, true)} (EST)
          </h4>
          {infoText ? (
            <h5 className='text-primary-1 mt-6 text-base font-bold max-lg:mt-12 md:text-lg min-[140rem]:my-8'>
              {infoText}
            </h5>
          ) : null}
        </>
      )}
    </div>
  );
}
