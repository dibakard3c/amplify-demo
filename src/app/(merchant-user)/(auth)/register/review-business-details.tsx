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

export default function ReviewBusinessDetails({
  onMoveToNextStep,
  businessDetails,
  country,
  password,
}: RegistrationForm) {
  const [registerMerchant] = useRegisterMerchantMutation();
  const [getUploadUrl] = useFetchMerchantUploadUrlMutation();
  const [uploadLogo] = useUploadMerchantLogoMutation();
  const [saveLogo] = useSaveMerchantLogoMutation();

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
    })
      .unwrap()
      .then(() => {
        getUploadUrl()
          .unwrap()
          .then((res) => {
            uploadLogo({
              signedUrl: res?.url,
              file: businessDetails?.business_logo,
            }).then(() => {
              saveLogo();
            });
          });
        onMoveToNextStep();
      });
  }

  return (
    <div className='mt-4'>
      <h1 className='mb-8 text-2xl font-bold sm:text-3xl'>
        Review business details
      </h1>
      <BusinessReviewItem
        title='BUSINESS NAME (as it appears in the Nation Business Registry)'
        value={businessDetails?.business_name}
      />
      <BusinessReviewItem
        title='BUSINESS LOGO'
        image={businessDetails?.business_logo}
      />
      <BusinessReviewItem
        title='MERCHANT CATEGORY'
        value={businessDetails?.merchant_category}
      />
      <BusinessReviewItem
        title='VAT IDENTIFICATION NUMBER'
        value={businessDetails?.vat_identification_no}
      />
      <BusinessReviewItem
        title='REVENUE RANGE'
        value={businessDetails?.revenue_range}
      />
      <BusinessReviewItem title='COUNTRY' value={country?.countryName} />
      <BusinessReviewItem
        title='BUSINESS PHONE NUMBER'
        value={`${businessDetails?.business_phone?.country_code?.mobileCode}  ${businessDetails?.business_phone?.number}`}
      />
      <BusinessReviewItem
        title='BUSINESS EMAIL'
        value={businessDetails?.business_email}
      />
      <BusinessReviewItem
        title='CONTACT FIRST NAME *'
        value={businessDetails?.contact_firstname}
      />
      <BusinessReviewItem
        title='CONTACT LAST NAME *'
        value={businessDetails?.contact_lastname}
      />
      <BusinessReviewItem
        title='CONTACT MOBILE NUMBER *'
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
          Complete merchant registration
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            onMoveToNextStep(1);
          }}
          size='lg'
          className='text-primary mt-6 mb-12 w-full px-8 text-base font-bold'
        >
          Change business details
        </Button>
      </div>
    </div>
  );
}
