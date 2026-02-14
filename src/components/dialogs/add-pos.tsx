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
import { FormSelectField } from '@estia/components/form/form-select';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import { useCreatePosUserMutation } from '@estia/networking/endpoints/user';
import { createPosUserResolver } from '@estia/helpers/resolvers';
import { Toast } from '@estia/helpers/toast';
import { cn } from '@estia/utils/utils';
import { useTranx } from '@estia/hooks/useTranx';

export function AddPosDialog({ className }: any) {
  const [isVisible, setVisible] = useState(false);
  const form = useForm({
    resolver: createPosUserResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const [createPosUser] = useCreatePosUserMutation();

  const { t } = useTranx();

  async function onSubmit(formValues: any) {
    setVisible(false);
    form.clearErrors();
    createPosUser({
      name: formValues?.name,
      macId: formValues?.pos_mac_id,
      model: formValues?.pos_model,
      loginToken: formValues?.login_token,
      registerToken: formValues?.register_token,
    })
      .unwrap()
      .then(() => {
        form.reset();
        Toast.showSuccess({
          message: t('alerts.pos_added_success'),
        });
      });
  }

  return (
    <Dialog open={isVisible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className={cn(
            'border-primary-1 h-11 w-auto self-end hover:border-white min-[140rem]:h-14 min-[140rem]:w-44',
            className
          )}
        >
          <div className='flex items-center'>
            <AddIcon className='mr-2 size-6 min-[140rem]:size-8' />
            <span className='mr-1 text-base font-bold min-[140rem]:text-lg'>
              {t('dashboard.users_and_pos.add_pos_dialog.dialog_title')}
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <ScrollArea type='always'>
        <DialogContent className='max-h-[85vh] max-w-sm overflow-y-scroll rounded-2xl px-8 sm:max-w-[450px] md:max-h-[95vh] 2xl:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='mt-10 mb-0 text-center text-2xl font-bold'>
              {t('dashboard.users_and_pos.add_pos_dialog.dialog_title')}
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <FormField
                control={form?.control}
                name='name'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_pos_dialog.form_labels.name'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_pos_dialog.form_labels.name_hint'
                    )}
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.name)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='pos_mac_id'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_pos_dialog.form_labels.pos_mac_id'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_pos_dialog.form_labels.pos_mac_id_hint'
                    )}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.pos_mac_id)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='login_token'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_pos_dialog.form_labels.login_token'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_pos_dialog.form_labels.login_token_hint'
                    )}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.login_token)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='register_token'
                render={({ field, formState }) => (
                  <FormInputField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_pos_dialog.form_labels.register_token'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_pos_dialog.form_labels.register_token_hint'
                    )}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.login_token)}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='pos_model'
                render={({ field, formState }) => (
                  <FormSelectField
                    label={upperCase(
                      t(
                        'dashboard.users_and_pos.add_pos_dialog.form_labels.pos_model'
                      )
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.users_and_pos.add_pos_dialog.form_labels.pos_model_hint'
                    )}
                    items={[
                      {
                        title: 'Estia',
                        value: 'ESTIA',
                      },
                      {
                        title: t(
                          'dashboard.users_and_pos.add_pos_dialog.form_labels.others_pos_model'
                        ),
                        value: 'OTHERS',
                      },
                    ]}
                    className='mt-2'
                    inputClassName='max-w-auto'
                    aria-invalid={!isEmpty(formState?.errors?.pos_model)}
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
              {t('dashboard.users_and_pos.add_pos_dialog.submit')}
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
