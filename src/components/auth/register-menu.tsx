import React from 'react';
import { cn } from '@estia/lib/utils';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import {
  BusinessDetailsForm,
  LangAndCountryForm,
  PasswordForm,
  RegistrationForm,
} from '@estia/typings/registration-form';
import { UseFormReturn } from 'react-hook-form';

interface RegisterMenuProps {
  steps: {
    menuName: string;
    title?: string;
    Component: ({ onMoveToNextStep }: RegistrationForm) => React.JSX.Element;
    form?:
      | UseFormReturn<LangAndCountryForm, any, LangAndCountryForm>
      | UseFormReturn<BusinessDetailsForm, any, BusinessDetailsForm>
      | UseFormReturn<PasswordForm, any, PasswordForm>;
  }[];
  setActiveStep: (step: number) => void;
  isCompleted: (title: string) => boolean;
  activeStep: number;
}

export default function RegisterMenu({
  steps,
  setActiveStep,
  isCompleted,
  activeStep,
}: RegisterMenuProps) {
  return (
    <div className='max-w-max'>
      {steps?.map((item, index) => (
        <div key={index}>
          <div
            className={cn(
              'flex cursor-pointer items-center self-start rounded-full bg-white/30 px-3.5 py-3 pr-5 2xl:py-4',
              isCompleted(item?.menuName) && 'multistep-item-shadow'
            )}
            onClick={() => {
              if (process.env.NODE_ENV === 'development') {
                setActiveStep(index);
              }
            }}
          >
            {isCompleted(item?.menuName) ? (
              <div
                className={cn(
                  'bg-primary-4 border-primary-4 relative flex size-8 items-center justify-center rounded-full border-2 lg:size-10'
                )}
              >
                <Image
                  src={Icons.check}
                  fill
                  alt={`${item?.menuName} check icon`}
                  className='p-1.5'
                />
              </div>
            ) : (
              <div
                className={cn(
                  'text-neutral-4 flex size-8 items-center justify-center rounded-full border-2 lg:size-10',
                  activeStep === index ? 'border-primary-4 text-neutral-1' : ''
                )}
              >
                <span className='text-base font-bold'>{index + 1}</span>
              </div>
            )}
            <p
              className={cn(
                'text-neutral-4 ml-4 flex-1 text-base font-bold',
                isCompleted(item?.menuName) && 'text-neutral-3'
              )}
            >
              {item?.menuName}
            </p>
          </div>
          {Object.keys(steps)?.length - 1 !== index && (
            <div
              className={cn(
                'border-neutral-4 ml-8 h-6 w-1 border-l border-dashed 2xl:h-8',
                isCompleted(item?.menuName) && 'border-primary-4'
              )}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
