'use client';

import React from 'react';
import { Button } from '@estia/components/ui/button';
import { useTranx } from '@estia/hooks/useTranx';
import { Trans } from 'react-i18next';
import AdaptiveLayout from '@estia/components/layout/adaptive-layout';

export default function Page() {
  const { t } = useTranx();

  const privacyPolicySections = t('privacy_policy.sections', {
    returnObjects: true,
  });

  return (
    <AdaptiveLayout>
      <div className='bg-card-bg mt-8 min-h-[80vh] rounded-2xl p-8 text-2xl'>
        <h1 className='text-xl font-bold md:text-3xl'>
          {t('privacy_policy.page_title')}
        </h1>
        <div className='dashboard-shadow mt-5 w-full rounded-2xl p-6'>
          <h3 className='py-4 text-center text-lg md:text-3xl'>
            {t('privacy_policy.page_sub_title')}
          </h3>
          <div className='terms-and-conditions mx-auto max-w-3xl'>
            <h6 className='mt-6 text-2xl font-bold'>
              Estia {t('privacy_policy.payment_gateway')}
            </h6>
            <h6 className='mt-3 text-lg font-bold'>
              Estia {t('privacy_policy.payment_gateway')}
            </h6>
            <p className='mt-1 text-lg'>
              <span className='text-lg font-bold'>
                {t('privacy_policy.effective_date')}:
              </span>{' '}
              17-02-2025
            </p>
            {Object.values(privacyPolicySections)?.map((item: any, index) => (
              <section key={index}>
                <h6 className='mt-6 mb-2 text-2xl font-bold'>
                  {index + 1}. {item?.title}
                </h6>
                {item?.paragraphs?.map((paragraph: any, index: number) => (
                  <p key={index} className='mt-3'>
                    <Trans
                      i18nKey={paragraph}
                      components={{ bold: <span className='font-bold' /> }}
                    />
                  </p>
                ))}
                {item?.list ? (
                  <ul className='mt-3 ml-4 list-disc'>
                    {item?.list?.map((paragraph: any, index: number) => (
                      <li key={index}>
                        <Trans
                          i18nKey={paragraph}
                          components={{ bold: <span className='font-bold' /> }}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {(item?.footer || [])?.map((paragraph: any, index: number) => (
                  <p key={index} className='mt-3'>
                    <Trans
                      i18nKey={paragraph}
                      components={{ bold: <span className='font-bold' /> }}
                    />
                  </p>
                ))}
                {item?.info ? (
                  <h6 className='mt-6 mb-2 text-2xl font-bold'>{item?.info}</h6>
                ) : null}
                {item?.info_desc ? (
                  <p className='mb-4'>
                    <Trans
                      i18nKey={item?.info_desc}
                      components={{ bold: <span className='font-bold' /> }}
                    />
                  </p>
                ) : null}
              </section>
            ))}
          </div>
          <div className='mt-12 mb-6 flex w-full items-center justify-center'>
            <Button
              size='md'
              className='button-shadow'
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              {t('common.back_to_top')}
            </Button>
          </div>
        </div>
        <p className='pt-8 text-center text-base'>
          {t('common.rights_reserved', {
            app_name: 'Estia',
          })}
        </p>
      </div>
    </AdaptiveLayout>
  );
}
