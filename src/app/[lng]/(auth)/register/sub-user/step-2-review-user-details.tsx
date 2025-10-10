import React from 'react';
import { RegistrationForm } from '@estia/typings/registration-form';
import { Button } from '@estia/components/ui/button';
import { BusinessReviewItem } from '@estia/components/item-views/business-review-item';
import { useFetchMerchantUserAccountInfoQuery } from '@estia/networking/endpoints/user';
import { useSelector } from 'react-redux';
import { selectMerchantUser } from '@estia/store/selector';
import { useTranx } from '@estia/hooks/useTranx';

export default function Step2ReviewUserDetails({
  onMoveToNextStep,
}: RegistrationForm) {
  const merchantInfo = useSelector(selectMerchantUser);
  const { t } = useTranx();

  useFetchMerchantUserAccountInfoQuery();

  return (
    <div className='mt-4'>
      <h1 className='mb-8 text-2xl font-bold sm:text-3xl'>
        {t('auth.register_sub_user_page.review_business_details')}
      </h1>
      <BusinessReviewItem
        title={t('auth.register_sub_user_page.business_name')}
        value={merchantInfo?.companyName || 'N/A'}
      />
      <BusinessReviewItem
        title={t('auth.register_sub_user_page.business_user_first_name')}
        value={merchantInfo?.firstName}
      />
      <BusinessReviewItem
        title={t('auth.register_sub_user_page.business_user_last_name')}
        value={merchantInfo?.lastName}
      />
      <BusinessReviewItem
        title={t('auth.register_sub_user_page.business_user_email')}
        value={merchantInfo?.email}
      />
      <BusinessReviewItem
        title={t('auth.register_sub_user_page.business_user_phone')}
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
          {t('auth.register_sub_user_page.complete_reg')}
        </Button>
        <p className='text-neutral-2 mt-6 mb-24 text-base leading-relaxed font-medium'>
          {t('auth.register_sub_user_page.complete_reg_info')}
        </p>
      </div>
    </div>
  );
}
