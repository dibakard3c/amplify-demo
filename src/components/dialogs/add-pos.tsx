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
import { FormSelectField } from '@estia/components/form/form-select';
import { ScrollArea } from '@estia/components/ui/scroll-area';
import { useCreatePosUserMutation } from '@estia/networking/endpoints/user';
import { createPosUserResolver } from '@estia/helpers/resolvers';
import { Toast } from '@estia/helpers/toast';

export function AddPosDialog() {
  const [isVisible, setVisible] = useState(false);
  const form = useForm({
    resolver: createPosUserResolver,
    mode: 'onChange',
    delayError: 500,
  });

  const [createPosUser] = useCreatePosUserMutation();

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
          message: 'POS added successfully',
        });
      });
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
            <span className='mr-1 text-base font-bold'>Add POS</span>
          </div>
        </Button>
      </DialogTrigger>
      <ScrollArea type='always'>
        <DialogContent className='max-h-[95vh] overflow-y-scroll px-8 sm:max-w-[450px] 2xl:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='mt-10 mb-0 text-center text-2xl font-bold'>
              Add POS
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <FormField
                control={form?.control}
                name='name'
                render={({ field, formState }) => (
                  <FormInputField
                    label='NAME (MUST BE UNIQUE)'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter name'
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
                    label='POS MACID'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter POS MACID'
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
                    label='LOGIN TOKEN'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter login token'
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
                    label='REGISTER TOKEN'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter register token'
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
                    label='POS MODEL'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Enter model'
                    items={[
                      {
                        title: 'Estia',
                        value: 'ESTIA',
                      },
                      {
                        title: 'Others',
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
              Add POS
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
