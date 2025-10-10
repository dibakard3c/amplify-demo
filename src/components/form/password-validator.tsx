import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { useTranx } from '@estia/hooks/useTranx';

interface PasswordValidatorProps {
  password?: string;
  confirmPassword?: string;
}

export default function PasswordValidator({
  password,
  confirmPassword,
}: PasswordValidatorProps) {
  const { t } = useTranx();

  const requirements = useMemo(
    () => [
      {
        title: 'validations.password_checker.password_length',
        isValid: /^.{8,32}$/.test(password || ''), // Matches passwords between 8 and 32 characters long
      },
      {
        title: 'validations.password_checker.one_lowercase',
        isValid: /[a-z]/.test(password || ''), // Matches at least one lowercase letter
      },
      {
        title: 'validations.password_checker.one_uppercase',
        isValid: /[A-Z]/.test(password || ''), // Matches at least one uppercase letter
      },
      {
        title: 'validations.password_checker.one_number',
        isValid: /\d/.test(password || ''), // Matches at least one digit
      },
      {
        title: 'validations.password_checker.one_special_char',
        isValid: /[!@#$%^&*(),.?":{}|<>_\-[\]\\`~'/+;=]/.test(password || ''), // Matches at least one special character
      },
      {
        title: 'validations.password_checker.match',
        isValid: isEmpty(password) ? false : password === confirmPassword, // Matches at least one special character
      },
    ],
    [password, confirmPassword]
  );

  return (
    <div className='w-full sm:w-auto'>
      <p className='mb-2 text-base'>
        {t('validations.password_checker.title')}
      </p>
      {requirements?.map((item, index) => (
        <div key={index} className='realtive mb-1 flex flex-row items-center'>
          <div className='relative h-6 w-6'>
            {item?.isValid ? (
              <Image
                src={Icons.roundCheck}
                fill
                alt={`${item?.title} checked`}
              />
            ) : (
              <Image
                src={Icons.squareCancel}
                fill
                alt={`${item?.title} is invalid`}
              />
            )}
          </div>
          <p className='ml-2 text-base'>{t(item?.title as any)}</p>
        </div>
      ))}
    </div>
  );
}
