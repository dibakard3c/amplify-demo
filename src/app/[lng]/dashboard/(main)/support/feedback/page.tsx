'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { feedbackTicketResolver } from '@estia/helpers/resolvers';
import { FeedbackForm } from '@estia/typings/support-form';
import { Button } from '@estia/components/ui/button';
import { Toast } from '@estia/helpers/toast';
import { RatingsInput } from '@estia/components/form/ratings-input';
import { useTranx } from '@estia/hooks/useTranx';
import { upperCase } from 'lodash';

export default function Page() {
  const { t } = useTranx();

  const form = useForm<FeedbackForm>({
    resolver: feedbackTicketResolver,
    defaultValues: {
      overall_satisfaction: 0,
      ease_of_use: 0,
      design_and_aesthetics: 0,
      performance_and_speed: 0,
      feature_satisfaction: 0,
      security_and_privacy: 0,
      reliability: 0,
      support_experience: 0,
    },
    mode: 'onChange',
    delayError: 500,
  });

  const feedbackList = [
    {
      key: 'overall_satisfaction',
    },
    {
      key: 'ease_of_use',
    },
    {
      key: 'design_and_aesthetics',
    },
    {
      key: 'performance_and_speed',
    },
    {
      key: 'feature_satisfaction',
    },
    {
      key: 'security_and_privacy',
    },
    {
      key: 'reliability',
    },
    {
      key: 'support_experience',
    },
  ];

  function handleSubmit() {
    // eslint-disable-next-line i18next/no-literal-string
    Toast.showError({ message: 'API Unavailable' });
  }

  return (
    <div className='bg-card-bg mt-8 rounded-2xl p-4 md:p-8'>
      <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
        <div className='w-full px-3'>
          <h1 className='text-left text-3xl font-bold'>
            {t('dashboard.support.feedback_page.page_title')}
          </h1>
          <h2 className='my-5 text-left text-2xl font-bold'>
            {t('dashboard.support.feedback_page.page_sub_title')}
          </h2>
          <p className='mb-5 text-base leading-relaxed min-[140rem]:text-2xl min-[140rem]:leading-loose'>
            {t('dashboard.support.feedback_page.page_desc')
              .split('\n')
              .map((line: string, i: number) => (
                <span
                  className='text-base leading-relaxed min-[140rem]:text-2xl min-[140rem]:leading-loose'
                  key={i}
                >
                  {line} <br />
                </span>
              ))}
          </p>
          {feedbackList?.map((item, index) => (
            <div key={index} className='mt-3 mb-6 min-[140rem]:my-8'>
              <h3 className='font-bold'>
                {upperCase(
                  t(
                    `dashboard.support.feedback_page.ratings.${item?.key}` as any
                  )
                )}
              </h3>
              <Controller
                name={item.key as any}
                control={form.control}
                render={({ field }) => (
                  <RatingsInput
                    className='py-2'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <p>
                {t(
                  `dashboard.support.feedback_page.ratings.${item?.key}_desc` as any
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Button
        disabled={!form?.formState?.isValid}
        onClick={form.handleSubmit(handleSubmit)}
        size='lg'
        className='mt-8 mb-2 w-full'
      >
        {t('dashboard.support.feedback_page.submit')}
      </Button>
    </div>
  );
}
