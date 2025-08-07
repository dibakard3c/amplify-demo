import React from 'react';
import { FormField } from '@estia/components/ui/form';
import { FormSelectField } from '@estia/components/form/form-select';
import CurrencyRadioSelector from '@estia/components/form/currency-radio-selector';
import Image from 'next/image';
import { Icons } from '@estia/assets';
import { Button } from '@estia/components/ui/button';
import {
  LangAndCountryForm,
  RegistrationForm,
} from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import { GreeceFlag, UkFlag } from '@estia/assets/icons/flags';
import { countries } from '@estia/helpers/countries';
import { TermsAndPrivacyDialog } from '@estia/components/dialogs/terms-and-privacy-dialog';
import { useVerifyRecaptchaMutation } from '@estia/networking/endpoints/auth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Toast } from '@estia/helpers/toast';
import { LanguageSelector } from '@estia/components/form/language-selector';

export default function LanguageAndCurrency({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<LangAndCountryForm>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [verifyRecaptcha] = useVerifyRecaptchaMutation();

  async function onContinue() {
    if (!executeRecaptcha) {
      Toast.showError({
        message:
          'reCAPTCHA validation failed. Please refresh this page and try again.',
      });
      return;
    }

    const reCaptchaToken = await executeRecaptcha('register');

    verifyRecaptcha(reCaptchaToken)
      .unwrap()
      .then((res) => {
        if (res) {
          onMoveToNextStep();
        } else {
          Toast.showError({
            message:
              'reCAPTCHA validation failed. Please refresh this page and try again.',
          });
        }
      })
      .catch(() => {
        Toast.showError({
          message:
            'reCAPTCHA validation failed. Please refresh this page and try again.',
        });
      });
  }

  return (
    <div className='max-w-96 pt-4 pl-2'>
      <FormField
        control={form?.control}
        name='country'
        render={({ field }) => (
          <LanguageSelector
            isObjectValue
            label='COUNTRY *'
            value={field.value}
            onChange={field.onChange}
            placeholder='Your country'
            items={countries?.map((item) => ({
              flag: item?.countryAbbreviation,
              title: item?.countryName,
              value: item,
            }))}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='language'
        render={({ field }) => (
          <FormSelectField
            label='LANGUAGE'
            value={field.value}
            onChange={field.onChange}
            placeholder='Your language'
            items={[
              { icon: UkFlag, title: 'English', value: 'en' },
              { icon: GreeceFlag, title: 'Greek', value: 'gr' },
            ]}
            className='mt-6'
          />
        )}
      />
      <div className='my-8'>
        <CurrencyRadioSelector className='mb-8' title='EUR' subTitle='Euro' />
        <CurrencyRadioSelector
          disabled
          title='USD'
          subTitle='United States dollar'
        />
      </div>
      <FormField
        control={form?.control}
        name='agreement'
        render={({ field }) => (
          <div className='flex'>
            <div
              className='relative size-5 cursor-pointer rounded-lg'
              onClick={() => {
                field.onChange(!(field.value || false));
              }}
            >
              {field.value ? (
                <Image src={Icons.checkBox} fill alt='Agreement checkbox' />
              ) : (
                <div className='border-primary h-full w-full rounded border'></div>
              )}
            </div>
            <p className='text-neutral-4 -mt-0.5 ml-2 flex-1 text-sm leading-relaxed font-medium'>
              By signing up I agree that I’m 18 years of age or older, to our{' '}
              <TermsAndPrivacyDialog />.
            </p>
          </div>
        )}
      />
      <Button
        disabled={!form?.formState?.isValid}
        onClick={(e) => {
          e.preventDefault();
          onContinue();
        }}
        size='lg'
        className='mt-8 mb-3 w-full font-bold'
      >
        Continue to details
      </Button>
    </div>
  );
}
