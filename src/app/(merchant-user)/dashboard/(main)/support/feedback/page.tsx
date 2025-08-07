'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { feedbackTicketResolver } from '@estia/helpers/resolvers';
import { FeedbackForm } from '@estia/typings/support-form';
import { Button } from '@estia/components/ui/button';
import { Toast } from '@estia/helpers/toast';
import { RatingsInput } from '@estia/components/form/ratings-input';

export default function Page() {
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
      title: 'overall satisfaction',
      description: 'Rate the overall experience using the application',
    },
    {
      key: 'ease_of_use',
      title: 'ease of use',
      description:
        'How easy was it to navigate and use the appShow wallet information so others can send you EST coins',
    },
    {
      key: 'design_and_aesthetics',
      title: 'design & aesthetics',
      description:
        "How satisfied are you with the app's design and layoutShow wallet information so others can send you EST coins",
    },
    {
      key: 'performance_and_speed',
      title: 'performance & speed',
      description:
        'How would you rate the app’s performance, speed, and responsivenessShow wallet information so others can send you EST coins',
    },
    {
      key: 'feature_satisfaction',
      title: 'feature satisfaction',
      description:
        'How satisfied are you with the features available in the appShow wallet information so others can send you EST coins',
    },
    {
      key: 'security_and_privacy',
      title: 'security & privacy',
      description:
        'Rate your level of confidence in the app’s security and privacy features',
    },
    {
      key: 'reliability',
      title: 'reliability',
      description:
        'How often does the app work without issues, crashes, or errorsShow wallet information so others can send you EST coins',
    },
    {
      key: 'support_experience',
      title: 'support experience',
      description:
        'Rate the helpfulness and responsiveness of our support team if you interacted with them',
    },
  ];

  function handleSubmit(_formData: any) {
    Toast.showError({ message: 'API Unavailable' });
  }

  return (
    <div className='bg-card-bg mt-8 rounded-2xl p-8'>
      <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
        <div className='w-full px-3'>
          <h1 className='text-left text-3xl font-bold'>Support</h1>
          <h2 className='my-5 text-left text-2xl font-bold'>Feedback</h2>
          <p className='mb-5 text-base leading-relaxed'>
            Your experience matters to us.
            <br />
            Please take a moment to rate your experience with our app and let us
            know how we can improve. Your feedback will help us create a better
            app for you!
            <br />
            Here, you can open a support ticket to report any issues about our
            application and services.
          </p>
          {feedbackList?.map((item, index) => (
            <div key={index} className='mt-3 mb-6'>
              <h3 className='font-bold'>{item?.title?.toUpperCase()}</h3>
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
              <p>{item?.description}</p>
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
        Send
      </Button>
    </div>
  );
}
