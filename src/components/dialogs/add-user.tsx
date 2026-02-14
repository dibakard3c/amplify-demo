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
import { isEmpty, upperCase } from 'lodash';
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
import { cn } from '@estia/utils/utils';
import { useTranx } from '@estia/hooks/useTranx';

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

  const { t } = useTranx();

  async function onSubmit(formValues: any) {
    const email = form.getValues('email');
    const phone = form.getValues('phone');

    const [emailResult, mobileResult] = await Promise.allSettled([
      checkEmail(email).unwrap(),
      checkMobile({
        number: `${phone?.country_code?.mobileCode}${phone?.number}`,
        countryCode: phone?.country_code?.countryAbbreviation,
        hideLoader: true,
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
      setVisible(false);
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
            message: t('alerts.create_sub_user_success'),
          });
        });
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className={cn(
            'border-primary-1 h-11 min-w-36 self-end hover:border-white min-[140rem]:h-14 min-[140rem]:w-44'
          )}
        >
          <div className='flex items-center'>
            <AddIcon className='mr-2 size-6 min-[140rem]:size-8' />
            <span className='mr-1 text-base font-bold min-[140rem]:text-lg'>
              {t('dashboard.users_and_pos.add_user_dialog.dialog_title')}
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <ScrollArea type='always'>
        <DialogContent className='max-h-[85vh] max-w-sm overflow-y-scroll rounded-2xl px-8 sm:max-w-[450px] md:max-h-[95vh] 2xl:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='mt-10 mb-0 text-center text-2xl font-bold'>
              {t('dashboard.users_and_pos.add_user_dialog.dialog_title')}
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <FormField
                control={form?.control}
                name='firstname'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_user_dialog.form_labels.first_name'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.first_name_hint'
                    )}
                    inputClassName='max-w-auto'
                    description={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.name_info'
                    )}
                    aria-invalid={!isEmpty(formState?.errors?.firstname)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='lastname'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_user_dialog.form_labels.last_name'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.last_name_hint'
                    )}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    description={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.name_info'
                    )}
                    aria-invalid={!isEmpty(formState?.errors?.lastname)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='email'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_user_dialog.form_labels.company_email'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.company_email_hint'
                    )}
                    description=''
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
                label={upperCase(
                  t(
                    'dashboard.users_and_pos.add_user_dialog.form_labels.mobile'
                  )
                )}
                placeholder={t(
                  'dashboard.users_and_pos.add_user_dialog.form_labels.mobile_hint'
                )}
                className='mt-2'
                inputContainerClassName='max-w-auto'
                error={form?.formState?.errors?.phone?.number?.message}
              />
              <FormField
                control={form?.control}
                name='role'
                render={({ field, formState }) => (
                  <FormSelectField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_user_dialog.form_labels.role'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_user_dialog.form_labels.role_hint'
                    )}
                    items={[
                      {
                        title: t(
                          'dashboard.users_and_pos.users_page.manager_role'
                        ),
                        value: 'MANAGER',
                      },
                      {
                        title: t(
                          'dashboard.users_and_pos.users_page.staff_role'
                        ),
                        value: 'STAFF',
                      },
                      {
                        title: t(
                          'dashboard.users_and_pos.users_page.viewer_role'
                        ),
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
              {t('dashboard.users_and_pos.add_user_dialog.submit')}
            </Button>
            <DialogClose asChild>
              <Button size='lg' className='my-4 w-full' variant='outline'>
                {t('common.cancel')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
