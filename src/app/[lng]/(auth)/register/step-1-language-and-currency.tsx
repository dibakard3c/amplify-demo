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
import { useTranx } from '@estia/hooks/useTranx';
import { usePathname } from 'next/navigation';
import { switchLanguage } from '@estia/translations/i18next';

export default function Step1LanguageAndCurrency({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<LangAndCountryForm>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [verifyRecaptcha] = useVerifyRecaptchaMutation();

  const { t } = useTranx();
  const pathname = usePathname();

  async function onContinue() {
    if (!executeRecaptcha) {
      Toast.showError({
        message: t('auth.recaptcha_error'),
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
            message: t('auth.recaptcha_error'),
          });
        }
      })
      .catch(() => {
        Toast.showError({
          message: t('auth.recaptcha_error'),
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
            label={t('auth.register_page.language_step.country_label')}
            value={field.value}
            onChange={field.onChange}
            placeholder={t('auth.register_page.language_step.country_hint')}
            items={countries?.map((item) => ({
              flag: item?.countryAbbreviation,
              title: t(`countries.${item?.countryName}` as any),
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
            label={t('auth.register_page.language_step.language_label')}
            value={field.value}
            onChange={(lang) => {
              field.onChange(lang);
              switchLanguage(pathname, lang);
            }}
            placeholder={t('auth.register_page.language_step.language_hint')}
            items={[
              { icon: UkFlag, title: t('common.english'), value: 'en' },
              { icon: GreeceFlag, title: t('common.greek'), value: 'el' },
            ]}
            className='mt-6'
          />
        )}
      />
      <div className='my-8'>
        <CurrencyRadioSelector
          className='mb-8'
          title='EUR'
          subTitle={t('auth.register_page.language_step.euro')}
        />
        <CurrencyRadioSelector
          disabled
          title='USD'
          subTitle={t('auth.register_page.language_step.usd')}
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
                <Image
                  src={Icons.checkBox}
                  fill
                  alt={t(
                    'auth.register_page.language_step.agreement_checkbox_alt'
                  )}
                />
              ) : (
                <div className='border-primary h-full w-full rounded border'></div>
              )}
            </div>
            <p className='text-neutral-4 -mt-0.5 ml-2 flex-1 text-sm leading-relaxed font-medium'>
              {t('auth.register_page.language_step.terms_pre')}{' '}
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
        {t('auth.register_page.language_step.continue_btn')}
      </Button>
    </div>
  );
}
