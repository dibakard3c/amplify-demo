import React from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import { BusinessReviewItem } from '@estia/components/item-views/business-review-item';
import { useFetchMerchantUserAccountInfoQuery } from '@estia/networking/endpoints/user';
import { useSelector } from 'react-redux';
import { selectMerchantUser } from '@estia/store/selector';

export default function ReviewUserDetails({
  onMoveToNextStep,
}: RegistrationForm) {
  const merchantInfo = useSelector(selectMerchantUser);

  useFetchMerchantUserAccountInfoQuery();

  return (
    <div className='mt-4'>
      <h1 className='mb-8 text-2xl font-bold sm:text-3xl'>
        Review business details
      </h1>
      <BusinessReviewItem
        title='BUSINESS NAME'
        value={merchantInfo?.companyName || 'N/A'}
      />
      <BusinessReviewItem
        title='BUSINESS USER FIRST NAME *'
        value={merchantInfo?.firstName}
      />
      <BusinessReviewItem
        title='BUSINESS USER LAST NAME *'
        value={merchantInfo?.lastName}
      />
      <BusinessReviewItem
        title='BUSINESS USER EMAIL'
        value={merchantInfo?.email}
      />
      <BusinessReviewItem
        title='BUSINESS USER MOBILE NUMBER *'
        value={`${merchantInfo?.mobileCountryCode}  ${merchantInfo?.mobileNumber}`}
      />
      <div className='max-w-[60%]'>
        <Button
          onClick={() => {
            onMoveToNextStep();
          }}
          size='lg'
          className='mt-4 w-full px-8 text-base font-bold'
        >
          Complete user registration
        </Button>
        <p className='text-neutral-2 mt-6 mb-24 text-base leading-relaxed font-medium'>
          If any of your information is incorrect, please contact your
          administrator.
        </p>
      </div>
    </div>
  );
}
