import React from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import { BusinessReviewItem } from '@estia/components/item-views/business-review-item';
import {
  useFetchMerchantUploadUrlMutation,
  useRegisterMerchantMutation,
  useSaveMerchantLogoMutation,
  useUploadMerchantLogoMutation,
} from '@estia/networking/endpoints/auth';
import { lowerCase } from 'lodash';
import { QueryStatus } from '@reduxjs/toolkit/query';
import ErrorView from '@estia/components/general/ErrorView';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step4ReviewBusinessDetails({
  onMoveToNextStep,
  businessDetails,
  country,
  password,
}: RegistrationForm) {
  const [registerMerchant, { status: regStatus, error }] =
    useRegisterMerchantMutation();
  const [getUploadUrl] = useFetchMerchantUploadUrlMutation();
  const [uploadLogo] = useUploadMerchantLogoMutation();
  const [saveLogo] = useSaveMerchantLogoMutation();

  const { t } = useTranx();

  function register() {
    registerMerchant({
      companyName: businessDetails?.business_name,
      registrationCountry: country?.countryAbbreviation,
      registrationNumber: businessDetails?.vat_identification_no,
      primaryUser: {
        firstName: businessDetails?.contact_firstname,
        lastName: businessDetails?.contact_lastname,
        email: businessDetails?.contact_email,
        mobile: {
          countryCode: businessDetails?.contact_phone?.country_code?.mobileCode,
          number: businessDetails?.contact_phone?.number,
        },
      },
      businessEmail: businessDetails?.business_email,
      businessMobile: {
        countryCode: businessDetails?.business_phone?.country_code?.mobileCode,
        number: businessDetails?.business_phone?.number,
      },
      password: password,
      currency: 'EUR',
      merchantType: businessDetails?.merchant_category,
      merchantTypeLogo: lowerCase(businessDetails?.merchant_category)?.replace(
        ' ',
        '_'
      ),
      revenueRange: businessDetails?.revenue_range,
      entityType: 'LIMITED_LIABILITY',
      legalAddress: {
        addressLine1: '123 Main St',
        city: 'Athens',
        postalCode: '12345',
        country: 'GR',
      },
      hideErrorMsg: true,
    })
      .unwrap()
      .then(() => {
        getUploadUrl()
          .unwrap()
          .then((res) => {
            uploadLogo({
              signedUrl: res?.url,
              file: businessDetails?.business_logo,
            })
              .unwrap()
              .then(() => {
                saveLogo();
              });
          });
        onMoveToNextStep();
      });
  }

  if (regStatus === QueryStatus.rejected) {
    return (
      <ErrorView
        title={t(
          'auth.register_page.review_business_details_step.error_msg_title'
        )}
        btnTitle={t(
          'auth.register_page.review_business_details_step.error_msg_btn'
        )}
        errorMsg={(error as any)?.data?.detail}
        onProceed={() => {
          onMoveToNextStep(1);
        }}
        className='md:mt-0'
      />
    );
  }

  return (
    <div className='mt-4'>
      <h1 className='mb-8 text-2xl font-bold sm:text-3xl'>
        {t('auth.register_page.review_business_details_step.step_title')}
      </h1>
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.business_name')}
        value={businessDetails?.business_name}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.business_logo')}
        image={businessDetails?.business_logo}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.merchant_category')}
        value={businessDetails?.merchant_category}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.vat_id')}
        value={businessDetails?.vat_identification_no}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.revenue_range')}
        value={businessDetails?.revenue_range}
      />
      <BusinessReviewItem title='COUNTRY' value={country?.countryName} />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.business_phone')}
        value={`${businessDetails?.business_phone?.country_code?.mobileCode}  ${businessDetails?.business_phone?.number}`}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.business_email')}
        value={businessDetails?.business_email}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.contact_first_name')}
        value={businessDetails?.contact_firstname}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.contact_last_name')}
        value={businessDetails?.contact_lastname}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.contact_email')}
        value={businessDetails?.contact_email}
      />
      <BusinessReviewItem
        title={t('auth.register_page.form_labels.contact_phone')}
        value={`${businessDetails?.contact_phone?.country_code?.mobileCode}  ${businessDetails?.contact_phone?.number}`}
      />
      <div className='max-w-[60%]'>
        <Button
          onClick={() => {
            register();
          }}
          size='lg'
          className='mt-4 w-full px-8 text-base font-bold'
        >
          {t('auth.register_page.review_business_details_step.proceed_btn')}
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            onMoveToNextStep(1);
          }}
          size='lg'
          className='text-primary mt-6 mb-12 w-full px-8 text-base font-bold'
        >
          {t('auth.register_page.review_business_details_step.revert_btn')}
        </Button>
      </div>
    </div>
  );
}
