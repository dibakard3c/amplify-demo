import React from 'react';
import { Form } from '@estia/components/ui/form';
import { isEmpty } from 'lodash';

export default function MobileFormBuilder({
  CurrentStepItem,
  setActiveStep,
  activeStep,
  containerRef,
  ...rest
}: any) {
  return (
    <>
      {!isEmpty(CurrentStepItem?.title) ? (
        <div className='p-6'>
          <h1 className='text-xl font-bold'>{CurrentStepItem?.title}</h1>
        </div>
      ) : null}
      {CurrentStepItem.form ? (
        <Form {...CurrentStepItem.form!}>
          <form
            // onSubmit={CurrentStepItem.form.handleSubmit(onSubmit)}
            className='h-full p-6 pt-0'
          >
            <CurrentStepItem.Component
              {...rest}
              onMoveToNextStep={(step?: number) => {
                setActiveStep(step ? step : activeStep + 1);
                containerRef.current?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          </form>
        </Form>
      ) : (
        <CurrentStepItem.Component
          {...rest}
          className='p-6 sm:p-0 sm:py-10 sm:pb-22'
          onMoveToNextStep={(step?: number) => {
            setActiveStep(step ? step : activeStep + 1);
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
}
