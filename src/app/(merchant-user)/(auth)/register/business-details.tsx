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
import { isEmpty, lowerCase, startCase } from 'lodash';
import {
  useCheckEmailAndValidateMutation,
  useValidateMobileMutation,
} from '@estia/networking/endpoints/auth';

const revenueRange = [
  'Less than €100K',
  '€100K – €250K',
  '€250K – €500K',
  '€500K – €1M',
  '€1M – €5M',
  '€5M – €10M',
  'More than €10M',
];

export default function BusinessDetails({
  onMoveToNextStep,
}: RegistrationForm) {
  const form = useFormContext<BusinessDetailsForm>();
  const [checkMobile] = useValidateMobileMutation();
  const [checkEmail] = useCheckEmailAndValidateMutation();

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
            label='BUSINESS NAME (as it appears in the Nation Business Registry) *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your business name'
            description='Must be 2–150 characters long. Alphabetic characters only.'
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
            label='BUSINESS LOGO *'
            className='mt-6 max-w-96'
            description='Disclaimer: Logo file size up to 2MB. Image size: 120x120px'
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
            label='MERCHANT CATEGORY *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your merchant category'
            items={merchantCategories
              ?.sort()
              ?.concat('Other')
              ?.map((item) => ({
                title: startCase(lowerCase(item)),
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
            label='VAT IDENTIFICATION NUMBER *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your VAT identification number'
            className='mt-6'
            description='Minimum of 2 up to 40 characters in length'
            aria-invalid={!isEmpty(formState?.errors?.vat_identification_no)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='revenue_range'
        render={({ field, formState }) => (
          <FormSelectField
            label='REVENUE RANGE *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your company revenue range'
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
        label='BUSINESS PHONE NUMBER *'
        placeholder='Your contact mobile number'
        error={form?.formState?.errors?.business_phone?.message}
      />
      <FormField
        control={form?.control}
        name='business_email'
        render={({ field, formState }) => (
          <FormInputField
            label='BUSINESS EMAIL *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your email'
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
            label='CONTACT FIRST NAME *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your contact first name'
            className='mt-6'
            description='Minimum of 2 up to 40 characters in length'
            aria-invalid={!isEmpty(formState?.errors?.contact_firstname)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='contact_lastname'
        render={({ field, formState }) => (
          <FormInputField
            label='CONTACT LAST NAME *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your contact last name'
            className='mt-6'
            description='Minimum of 2 up to 40 characters in length'
            aria-invalid={!isEmpty(formState?.errors?.contact_lastname)}
          />
        )}
      />
      <FormField
        control={form?.control}
        name='contact_email'
        render={({ field, formState }) => (
          <FormInputField
            label='CONTACT EMAIL *'
            value={field?.value}
            onChange={field.onChange}
            placeholder='Your email'
            className='mt-6'
            description='This email address is associated with your username and will also be used to send you important information.'
            aria-invalid={!isEmpty(formState?.errors?.contact_email)}
          />
        )}
      />
      <MobileInput
        control={form?.control}
        countryCodeName='contact_phone.country_code'
        numberName='contact_phone.number'
        label='CONTACT PHONE NUMBER *'
        placeholder='Your contact mobile number'
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
        Continue
      </Button>
    </div>
  );
}
