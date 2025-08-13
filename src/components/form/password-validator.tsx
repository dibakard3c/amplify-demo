import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Icons } from '@estia/assets';

interface PasswordValidatorProps {
  password?: string;
  confirmPassword?: string;
}

export default function PasswordValidator({
  password,
  confirmPassword,
}: PasswordValidatorProps) {
  const requirements = useMemo(
    () => [
      {
        title: '8-32 characters long',
        isValid: /^.{8,32}$/.test(password || ''), // Matches passwords between 8 and 32 characters long
      },
      {
        title: '1 lowercase letter (a-z)',
        isValid: /[a-z]/.test(password || ''), // Matches at least one lowercase letter
      },
      {
        title: '1 uppercase character (A-Z)',
        isValid: /[A-Z]/.test(password || ''), // Matches at least one uppercase letter
      },
      {
        title: '1 number',
        isValid: /\d/.test(password || ''), // Matches at least one digit
      },
      {
        title: '1 special character e.g. !@#$%',
        isValid: /[!@#$%^&*(),.?":{}|<>_\-[\]\\`~'/+;=]/.test(password || ''), // Matches at least one special character
      },
      {
        title: 'Passwords do match',
        isValid: isEmpty(password) ? false : password === confirmPassword, // Matches at least one special character
      },
    ],
    [password, confirmPassword]
  );

  return (
    <div className='w-full sm:w-auto'>
      <p className='mb-2 text-base'>Your password must contain:</p>
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
          <p className='ml-2 text-base'>{item?.title}</p>
        </div>
      ))}
    </div>
  );
}
