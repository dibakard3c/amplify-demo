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
import SmartImage from '@estia/components/smart-image';
import { get } from 'lodash';
import FormUpload from '@estia/components/form/form-upload';
import Image from 'next/image';
import {
  useFetchMerchantUploadUrlMutation,
  useSaveMerchantLogoMutation,
  useUploadMerchantLogoMutation,
} from '@estia/networking/endpoints/auth';
import { toggleLoader } from '@estia/store/slices/general';
import { Toast } from '@estia/helpers/toast';
import { useAppDispatch } from '@estia/store/store';
import { useParams, usePathname } from 'next/navigation';
import { useTranx } from '@estia/hooks/useTranx';
import { switchLanguage } from '@estia/translations/i18next';

export default function Page() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const pathname = usePathname();
  const params = useParams();
  // const { theme, setTheme } = useTheme();
  const { t } = useTranx();

  const [getUploadUrl] = useFetchMerchantUploadUrlMutation();
  const [uploadLogo] = useUploadMerchantLogoMutation();
  const [saveLogo] = useSaveMerchantLogoMutation();

  async function processNewLogo(logo: any) {
    form.clearErrors();
    getUploadUrl({ showLoader: true })
      .unwrap()
      .then((res) => {
        dispatch(toggleLoader(true));
        uploadLogo({
          signedUrl: res?.url,
          file: logo,
          showLoader: true,
        })
          .unwrap()
          .then(() => {
            saveLogo({ showLoader: true })
              .unwrap()
              .then(() => {
                dispatch(toggleLoader(false));
                form.reset();
                Toast.showSuccess({
                  message: t('alerts.logo_upload_success'),
                });
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              });
          })
          .catch((error) => {
            dispatch(toggleLoader(false));
            Toast.showError({
              message: error?.data?.detail,
            });
          });
      });
  }

  const form = useForm<ProfileForm | any>({
    resolver: profileResolver,
    mode: 'onChange',
    defaultValues: {
      business_logo: null,
      currency: 'eur',
      language: params?.lng || 'en',
      theme: false,
    },
    delayError: 500,
  });

  function onSubmit(values: any) {
    console.log(values);
    if (values?.business_logo) {
      processNewLogo(values?.business_logo);
    }
    if (params?.lang !== values?.language) {
      switchLanguage(pathname, values?.language);
    }
    // setTheme(values?.theme ? 'dark' : 'light');
  }

  return (
    <Form {...form}>
      <div className='md:p-4'>
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.business_name'
          )}
          value={user?.companyName}
          className='lg:max-w-[70%]'
        />
        <p className='text-neutral-4 mb-2 font-bold max-[140rem]:text-sm min-[140rem]:text-xl'>
          {t('dashboard.profile_management.my_profile_page.business_logo')}
        </p>
        <div className='mb-4'>
          <FormField
            control={form?.control}
            name='business_logo'
            render={({ field }) => (
              <>
                {field?.value ? (
                  <div className='relative mb-4 ml-4 size-24 overflow-hidden rounded-2xl'>
                    <Image
                      src={URL.createObjectURL(field?.value as any)}
                      alt={``}
                      fill
                      style={{ objectFit: 'contain' }}
                      onLoad={() => {
                        URL.revokeObjectURL(field?.value as any);
                      }}
                    />
                  </div>
                ) : (
                  <SmartImage
                    sizeClassName='size-24 ml-4 mb-4'
                    src={user?.merchantLogo}
                    placeholder={get(user?.companyName, 0)}
                    alt={`${user?.companyName} logo`}
                  />
                )}
                <FormUpload
                  // containerClassName='max-w-full'
                  preview={false}
                  description={t(
                    'dashboard.profile_management.my_profile_page.business_logo_info'
                  )}
                  value={field?.value as any}
                  onChange={field.onChange}
                />
              </>
            )}
          />
        </div>
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.merchant_category'
          )}
          value={user?.merchantType}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t('dashboard.profile_management.my_profile_page.vat_id')}
          value={user?.registrationNumber}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.revenue_range'
          )}
          value={user?.revenueRange || 'N/A'}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t('dashboard.profile_management.my_profile_page.address')}
          value={user?.addressLine}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t('dashboard.profile_management.my_profile_page.postal_code')}
          value={user?.addressPostalCode}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t('dashboard.profile_management.my_profile_page.country')}
          value={
            countries?.find(
              (item) => item?.countryAbbreviation === user?.addressCountry
            )?.countryName
          }
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.business_phone'
          )}
          value={
            user?.businessPhone
              ? user?.businessPhoneCountryCode + '  ' + user?.businessPhone
              : 'N/A'
          }
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.business_email'
          )}
          value={user?.businessEmailAddress}
          className='border-border border-b pb-4 lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.contact_first_name'
          )}
          value={user?.primaryUserFirstName}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.contact_last_name'
          )}
          value={user?.primaryUserLastName}
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.contact_mobile_no'
          )}
          value={
            user?.primaryUserMobileCountryCode +
            '  ' +
            maskPhoneNo(user?.primaryUserMobileNumber)
          }
          className='lg:max-w-[40%]'
        />
        <BusinessReviewItem
          title={t(
            'dashboard.profile_management.my_profile_page.contact_email'
          )}
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
                  label={t(
                    'dashboard.profile_management.my_profile_page.currency'
                  )}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t(
                    'dashboard.profile_management.my_profile_page.currency_hint'
                  )}
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
                  label={t(
                    'dashboard.profile_management.my_profile_page.language'
                  )}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t(
                    'dashboard.profile_management.my_profile_page.language_hint'
                  )}
                  items={[
                    { icon: UkFlag, title: t('common.english'), value: 'en' },
                    { icon: GreeceFlag, title: t('common.greek'), value: 'el' },
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
                      {t(
                        'dashboard.profile_management.my_profile_page.dark_theme'
                      )}
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
            {t('dashboard.profile_management.my_profile_page.save_settings')}
          </Button>
        </div>
      </div>
    </Form>
  );
}
