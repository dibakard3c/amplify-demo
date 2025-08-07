'use client';

import React, { useState } from 'react';
import { AddIcon } from '@estia/assets';
import { Button } from '@estia/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@estia/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@estia/components/ui/form';
import { FormInputField } from '@estia/components/form/form-input';
import { isEmpty } from 'lodash';
import MobileInput from '@estia/components/form/mobile-input';
import { FormSelectField } from '@estia/components/form/form-select';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import { useCreateMerchantUserMutation } from '@estia/networking/endpoints/user';
import { createMerchantUserResolver } from '@estia/helpers/resolvers';
import {
  useCheckEmailAndValidateMutation,
  useValidateMobileMutation,
} from '@estia/networking/endpoints/auth';
import { phoneCountryCodeDefault } from '@estia/helpers/defaults';
import { Toast } from '@estia/helpers/toast';

export function AddUserDialog() {
  const [isVisible, setVisible] = useState(false);
  const form = useForm({
    resolver: createMerchantUserResolver,
    defaultValues: {
      phone: phoneCountryCodeDefault,
    },
    mode: 'onChange',
    delayError: 500,
  });

  const [checkMobile] = useValidateMobileMutation();
  const [checkEmail] = useCheckEmailAndValidateMutation();
  const [createMerchantUser] = useCreateMerchantUserMutation();

  async function onSubmit(formValues: any) {
    setVisible(false);

    const email = form.getValues('email');
    const phone = form.getValues('phone');

    const [emailResult, mobileResult] = await Promise.allSettled([
      checkEmail(email).unwrap(),
      checkMobile({
        number: `${phone?.country_code?.mobileCode}${phone?.number}`,
        countryCode: phone?.country_code?.countryAbbreviation,
      }).unwrap(),
    ]);

    if (emailResult.status === 'rejected') {
      form.setError('email', {
        message: emailResult?.reason?.data?.detail,
      });
    }

    if (mobileResult.status === 'rejected') {
      form.setError('phone.number', {
        message: mobileResult?.reason?.data?.detail,
      });
    }

    if (
      emailResult.status === 'fulfilled' &&
      mobileResult.status === 'fulfilled'
    ) {
      form.clearErrors();
      createMerchantUser({
        email: formValues?.email,
        firstName: formValues?.firstname,
        lastName: formValues?.lastname,
        mobileCountryCode: formValues?.phone?.country_code?.mobileCode,
        mobileNumber: formValues?.phone?.number,
        supportRole: formValues?.role,
      })
        .unwrap()
        .then(() => {
          form.reset();
          Toast.showSuccess({
            message: 'User added successfully',
          });
        });
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className='border-primary-1 h-11 w-36 self-end hover:border-white'
        >
          <div className='flex items-center'>
            <AddIcon className='mr-2 size-6' />
            <span className='mr-1 text-base font-bold'>Add User</span>
          </div>
        </Button>
      </DialogTrigger>
      <ScrollArea type='always'>
        <DialogContent className='max-h-[95vh] overflow-y-scroll px-8 sm:max-w-[450px] 2xl:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='mt-10 mb-0 text-center text-2xl font-bold'>
              Add User
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <FormField
                control={form?.control}
                name='firstname'
                render={({ field, formState }) => (
                  <FormInputField
                    label='FIRST NAME'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter first name'
                    inputClassName='max-w-auto'
                    description='Minimum of 2 up to 40 characters in length'
                    aria-invalid={!isEmpty(formState?.errors?.firstname)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='lastname'
                render={({ field, formState }) => (
                  <FormInputField
                    label='LAST NAME'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter last name'
                    className='mt-2'
                    inputClassName='max-w-auto'
                    description='Minimum of 2 up to 40 characters in length'
                    aria-invalid={!isEmpty(formState?.errors?.lastname)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='email'
                render={({ field, formState }) => (
                  <FormInputField
                    label='COMPANY EMAIL'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter company email'
                    description='If the user already uses Estia Payments on the mobile app or desktop, they should enter a different email address here'
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.email)}
                  />
                )}
              />
              <MobileInput
                control={form?.control}
                countryCodeName='phone.country_code'
                numberName='phone.number'
                label='MOBILE NUMBER'
                placeholder='Enter mobile number'
                className='mt-2'
                inputContainerClassName='max-w-auto'
                error={form?.formState?.errors?.phone?.number?.message}
              />
              <FormField
                control={form?.control}
                name='role'
                render={({ field, formState }) => (
                  <FormSelectField
                    label='ROLE'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter role'
                    items={[
                      {
                        title: 'Manager',
                        value: 'MANAGER',
                      },
                      {
                        title: 'Staff',
                        value: 'STAFF',
                      },
                      {
                        title: 'Viewer',
                        value: 'VIEWER',
                      },
                    ]}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.role)}
                  />
                )}
              />
            </Form>
          </div>
          <DialogFooter className='block'>
            <Button
              disabled={!form?.formState?.isValid}
              size='lg'
              className='w-full'
              onClick={form.handleSubmit(onSubmit)}
            >
              Add User
            </Button>
            <DialogClose asChild>
              <Button size='lg' className='my-4 w-full' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
