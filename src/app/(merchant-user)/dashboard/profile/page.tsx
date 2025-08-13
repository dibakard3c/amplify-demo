'use client';

import React from 'react';
import { BusinessReviewItem } from '@estia/components/item-views/business-review-item';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { useForm } from 'react-hook-form';
import { ProfileForm } from '@estia/typings/login-form';
import { profileResolver } from '@estia/helpers/resolvers';
import { Button } from '@estia/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@estia/components/ui/form';
import { FormSelectField } from '@estia/components/form/form-select';
import { GreeceFlag, UkFlag } from '@estia/assets';
import { Switch } from '@estia/components/ui/switch';
import { countries } from '@estia/helpers/countries';
import { maskEmail, maskPhoneNo } from '@estia/utils/general';

export default function Page() {
  const user = useSelector(selectUser);
  // const { theme, setTheme } = useTheme();

  const form = useForm<ProfileForm>({
    resolver: profileResolver,
    mode: 'onChange',
    defaultValues: { currency: 'eur', language: 'en', theme: false },
    delayError: 500,
  });

  function onSubmit(values: any) {
    // console.log(values);
    // setTheme(values?.theme ? 'dark' : 'light');
  }

  return (
    <div className='md:p-4'>
      <BusinessReviewItem
        title='BUSINESS NAME (as it appears in the Nation Business Registry)'
        value={user?.companyName}
        className='lg:max-w-[70%]'
      />
      <BusinessReviewItem
        title='BUSINESS LOGO'
        image={user?.merchantLogo}
        value={'N/A'}
        className='lg:max-w-[70%]'
      />
      <BusinessReviewItem
        title='MERCHANT CATEGORY'
        value={user?.merchantType}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='VAT IDENTIFICATION NUMBER'
        value={user?.registrationNumber}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='REVENUE RANGE'
        value={user?.revenueRange || 'N/A'}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='ADDRESS'
        value={user?.addressLine}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='POSTAL CODE'
        value={user?.addressPostalCode}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='COUNTRY'
        value={
          countries?.find(
            (item) => item?.countryAbbreviation === user?.addressCountry
          )?.countryName
        }
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='BUSINESS PHONE NUMBER'
        value={
          user?.businessPhone
            ? user?.businessPhoneCountryCode + '  ' + user?.businessPhone
            : 'N/A'
        }
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='BUSINESS EMAIL'
        value={user?.businessEmailAddress}
        className='border-border border-b pb-4 lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='CONTACT FIRST NAME'
        value={user?.primaryUserFirstName}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='CONTACT LAST NAME'
        value={user?.primaryUserLastName}
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='CONTACT MOBILE NUMBER'
        value={
          user?.primaryUserMobileCountryCode +
          '  ' +
          maskPhoneNo(user?.primaryUserMobileNumber)
        }
        className='lg:max-w-[40%]'
      />
      <BusinessReviewItem
        title='CONTACT EMAIL'
        value={maskEmail(user?.email)}
        className='border-border border-b pb-4 lg:max-w-[40%]'
      />
      <div className='lg:max-w-[40%]'>
        <Form {...form}>
          <FormField
            control={form.control}
            name='currency'
            render={({ field }) => (
              <FormSelectField
                label='CURRENCY'
                value={field.value}
                onChange={field.onChange}
                placeholder='Your currency'
                items={[{ title: 'EUR', value: 'eur' }]}
                className='mt-4'
                inputClassName='max-w-auto'
              />
            )}
          />
          <FormField
            control={form.control}
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
                className='mt-4'
                inputClassName='max-w-auto'
              />
            )}
          />
          <FormField
            control={form.control}
            name='theme'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg py-6'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-light text-sm'>
                    DARK THEME
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          size='lg'
          className='mt-8 w-full md:mt-0 md:mb-12'
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
