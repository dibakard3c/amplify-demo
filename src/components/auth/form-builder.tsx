import React from 'react';
import { Form } from '@estia/components/ui/form';

export default function FormBuilder({
  CurrentStepItem,
  setActiveStep,
  activeStep,
  applyDefaultStyles = true,
  ...rest
}: any) {
  return CurrentStepItem.form ? (
    <Form {...CurrentStepItem.form!}>
      <form
        className={
          applyDefaultStyles ? 'mt-16 p-6 sm:p-0 sm:pb-4 lg:pb-12' : ''
        }
      >
        <CurrentStepItem.Component
          {...rest}
          onMoveToNextStep={(step?: number) => {
            setActiveStep(step ? step : activeStep + 1);
          }}
          onMoveToPrevStep={(step?: number) => {
            setActiveStep(step ? step : activeStep - 1);
          }}
        />
      </form>
    </Form>
  ) : (
    <CurrentStepItem.Component
      {...rest}
      className={applyDefaultStyles ? 'p-6 pb-10 sm:p-0 sm:py-10 sm:pb-22' : ''}
      onMoveToNextStep={(step?: number) => {
        setActiveStep(step ? step : activeStep + 1);
      }}
      onMoveToPrevStep={(step?: number) => {
        setActiveStep(step ? step : activeStep - 1);
      }}
    />
  );
}
