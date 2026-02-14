import React from 'react';
import { FormInputField } from '@estia/components/form/form-input';
import { FormSelectField } from '@estia/components/form/form-select';
import { FormField } from '@estia/components/ui/form';
import { Button } from '@estia/components/ui/button';
import { merchantCategories } from '@estia/helpers/merchat-categories';
import {
  BusinessDetailsForm,
  RegistrationForm,
} from '@estia/typings/registration-form';
import { useFormContext } from 'react-hook-form';
import FormUpload from '@estia/components/form/form-upload';
import MobileInput from '@estia/components/form/mobile-input';
import { isEmpty } from 'lodash';
import {
  useCheckEmailAndValidateMutation,
  useValidateMobileMutation,
} from '@estia/networking/endpoints/auth';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step2BusinessDetails({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<BusinessDetailsForm>();
  const [checkMobile] = useValidateMobileMutation();
  const [checkEmail] = useCheckEmailAndValidateMutation();

  const { t } = useTranx();

  const revenueRange = [
    t('auth.register_page.business_details_step.revenue_range_less_than', {
      amount: '€100K',
    }),
    '€100K – €250K',
    '€250K – €500K',
    '€500K – €1M',
    '€1M – €5M',
    '€5M – €10M',
    t('auth.register_page.business_details_step.revenue_range_more_than', {
      amount: '€10M',
    }),
  ];

  async function validateEmailAndMobile() {
    const businessPhone = form.getValues('business_phone');
    const contactPhone = form.getValues('contact_phone');
    const businessEmail = form.getValues('business_email');
    const contactEmail = form.getValues('contact_email');

    const [
      businessPhoneResult,
      contactPhoneResult,
      businessEmailResult,
      contactEmailResult,
    ] = await Promise.allSettled([
      checkMobile({
        number: `${businessPhone?.country_code?.mobileCode}${businessPhone?.number}`,
        countryCode: businessPhone?.country_code?.countryAbbreviation,
      }).unwrap(),
      checkMobile({
        number: `${contactPhone?.country_code?.mobileCode}${contactPhone?.number}`,
        countryCode: contactPhone?.country_code?.countryAbbreviation,
      }).unwrap(),
      checkEmail(businessEmail).unwrap(),
      checkEmail(contactEmail).unwrap(),
    ]);

    if (businessPhoneResult.status === 'rejected') {
      form.setError('business_phone', {
        message: businessPhoneResult?.reason?.data?.detail,
      });
    }

    if (contactPhoneResult.status === 'rejected') {
      form.setError('contact_phone', {
        message: contactPhoneResult?.reason?.data?.detail,
      });
    }

    if (businessEmailResult.status === 'rejected') {
      form.setError('business_email', {
        message: businessEmailResult?.reason?.data?.detail,
      });
    }

    if (contactEmailResult.status === 'rejected') {
      form.setError('contact_email', {
        message: contactEmailResult?.reason?.data?.detail,
      });
    }

    if (
      businessPhoneResult.status === 'fulfilled' &&
      contactPhoneResult.status === 'fulfilled' &&
      businessEmailResult.status === 'fulfilled' &&
      contactEmailResult.status === 'fulfilled'
    ) {
      form.clearErrors();
      onMoveToNextStep();
    }
  }

  return (
    <div className='w-full pl-2 sm:pb-24'>
      <FormField
        control={form?.control}
        name='business_name'
        render={({ field, formState }) => (
          <FormInputField
            label={t('auth.register_page.form_labels.business_name')}
            value={field?.value}
            onChange={field.onChange}
            placeholder={t('auth.register_page.form_labels.business_name_hint')}
            description={t('auth.register_page.form_labels.business_name_info')}
            className='mt-4'
            aria-invalid={!isEmpty(formState?.errors?.business_name)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='business_logo'
        render={({ field }) => (
          <FormUpload
            label={`${t('auth.register_page.form_labels.business_logo')} *`}
            className='mt-6 max-w-96'
            description={t('auth.register_page.form_labels.business_logo_info')}
            value={field?.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='merchant_category'
        render={({ field, formState }) => (
          <FormSelectField
            label={`${t('auth.register_page.form_labels.merchant_category')} *`}
            value={field?.value}
            onChange={field.onChange}
            placeholder={t(
              'auth.register_page.form_labels.merchant_category_hint'
            )}
            items={merchantCategories
              ?.sort()
              // eslint-disable-next-line i18next/no-literal-string
              ?.concat('Other')
              ?.map((item) => ({
                title: t(`merchant_categories.${item}` as any),
                value: item,
              }))}
            className='mt-6'
            aria-invalid={!isEmpty(formState?.errors?.merchant_category)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='vat_identification_no'
        render={({ field, formState }) => (
          <FormInputField
            label={`${t('auth.register_page.form_labels.vat_id')} *`}
            value={field?.value}
            onChange={field.onChange}
            placeholder={t('auth.register_page.form_labels.vat_hint')}
            className='mt-6'
            description={t('auth.register_page.form_labels.vat_info')}
            aria-invalid={!isEmpty(formState?.errors?.vat_identification_no)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='revenue_range'
        render={({ field, formState }) => (
          <FormSelectField
            label={`${t('auth.register_page.form_labels.revenue_range')} *`}
            value={field?.value}
            onChange={field.onChange}
            placeholder={t('auth.register_page.form_labels.revenue_range_hint')}
            items={revenueRange?.map((item) => ({
              title: item,
              value: item,
            }))}
            className='mt-6'
            aria-invalid={!isEmpty(formState?.errors?.revenue_range)}
          />
        )}
      />
      <MobileInput
        control={form?.control}
        countryCodeName='business_phone.country_code'
        numberName='business_phone.number'
        label={`${t('auth.register_page.form_labels.business_phone')} *`}
        placeholder={t('auth.register_page.form_labels.business_phone_hint')}
        error={form?.formState?.errors?.business_phone?.message}
      />
      <FormField
        control={form?.control}
        name='business_email'
        render={({ field, formState }) => (
          <FormInputField
            label={`${t('auth.register_page.form_labels.business_email')} *`}
            placeholder={t(
              'auth.register_page.form_labels.business_email_hint'
            )}
            value={field?.value}
            onChange={field.onChange}
            className='mt-6'
            aria-invalid={!isEmpty(formState?.errors?.business_email)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='contact_firstname'
        render={({ field, formState }) => (
          <FormInputField
            label={`${t('auth.register_page.form_labels.contact_first_name')} *`}
            placeholder={t(
              'auth.register_page.form_labels.contact_first_name_hint'
            )}
            value={field?.value}
            onChange={field.onChange}
            className='mt-6'
            description={t(
              'auth.register_page.form_labels.contact_first_name_info'
            )}
            aria-invalid={!isEmpty(formState?.errors?.contact_firstname)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='contact_lastname'
        render={({ field, formState }) => (
          <FormInputField
            label={`${t('auth.register_page.form_labels.contact_last_name')} *`}
            placeholder={t(
              'auth.register_page.form_labels.contact_last_name_hint'
            )}
            value={field?.value}
            onChange={field.onChange}
            className='mt-6'
            description={t(
              'auth.register_page.form_labels.contact_last_name_info'
            )}
            aria-invalid={!isEmpty(formState?.errors?.contact_lastname)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='contact_email'
        render={({ field, formState }) => (
          <FormInputField
            label={`${t('auth.register_page.form_labels.contact_email')} *`}
            placeholder={t('auth.register_page.form_labels.contact_email_hint')}
            value={field?.value}
            onChange={field.onChange}
            className='mt-6'
            description={t('auth.register_page.form_labels.contact_email_info')}
            aria-invalid={!isEmpty(formState?.errors?.contact_email)}
          />
        )}
      />
      <MobileInput
        control={form?.control}
        countryCodeName='contact_phone.country_code'
        numberName='contact_phone.number'
        label={`${t('auth.register_page.form_labels.contact_phone')} *`}
        placeholder={t('auth.register_page.form_labels.contact_phone_hint')}
        error={form?.formState?.errors?.contact_phone?.message}
      />
      <Button
        disabled={!form?.formState?.isValid}
        onClick={(e) => {
          e.preventDefault();
          validateEmailAndMobile();
        }}
        size='lg'
        className='mt-8 w-full max-w-96'
      >
        {t('common.continue')}
      </Button>
    </div>
  );
}
