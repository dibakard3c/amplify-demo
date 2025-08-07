'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { supportTicketResolver } from '@estia/helpers/resolvers';
import { SupportForm } from '@estia/typings/support-form';
import { FormInputField } from '@estia/components/form/form-input';
import { Form, FormField } from '@estia/components/ui/form';
import { FormTextAreaField } from '@estia/components/form/form-textarea';
import { FormSelectField } from '@estia/components/form/form-select';
import { AttachmentUpload } from '@estia/components/form/attachment-upload';
import { Button } from '@estia/components/ui/button';
import { useSelector } from 'react-redux';
import { selectUser } from '@estia/store/selector';
import { useSubmitTicketMutation } from '@estia/networking/endpoints/general';
import { Toast } from '@estia/helpers/toast';

export default function Page() {
  const user = useSelector(selectUser);

  const form = useForm<SupportForm>({
    resolver: supportTicketResolver,
    defaultValues: {
      full_name: `${user?.primaryUserFirstName} ${user?.primaryUserLastName}`,
      email: user?.email,
      // subject: '',
      // description: '',
      // issue_type: '',
      // attachment: '',
    },
    mode: 'onChange',
    delayError: 500,
  });

  const [submitTicket, { status }] = useSubmitTicketMutation();

  const handleSubmit = (_formData: any) => {
    Toast.showError({ message: 'API Unavailable' });
    // const formData = new FormData();
    // formData.append('name', `${user?.firstName} ${user?.lastName}`);
    // formData.append('email', user?.email);
    // formData.append('unique_external_id', user?.id);
    // formData.append('phone', user?.mobileCountryCode + user?.mobileNumber);
    // formData.append('subject', _formData?.subject);
    // formData.append('description', _formData?.description);
    // formData.append('type', _formData?.issue_type);
    // formData.append('source', '2');
    // formData.append('status', '2');
    // formData.append('priority', '3');
    // formData.append('group_id', '156000995024');
    // formData.append('tags[]', 'mobile_simple_user');
    //
    // if (_formData?.attachment) {
    //   // Append the file
    //   formData.append('attachments[]', _formData?.attachment);
    // }
    //
    // submitTicket(formData);
  };

  return (
    <div className='bg-card-bg mt-8 rounded-2xl p-8'>
      <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
        <div className='w-full px-3'>
          <h1 className='text-left text-3xl font-bold'>Support</h1>
          <h2 className='my-5 text-left text-2xl font-bold'>Ticket Form</h2>
          <p className='mb-5 text-base leading-relaxed'>
            Here, you can open a support ticket to report any issues about our
            application and services.
            <br />
            Our team is dedicated to providing prompt and effective solutions,
            and we&#39;re here to help you every step of the way.
            <br />
            To ensure we can assist you efficiently, please provide as much
            detail as possible when submitting your ticket.
            <br />
            After submitting your ticket, you will receive a confirmation email
            with a unique link to track the status of your ticket.
            <br />
            From there, you can follow its progress, view updates, and respond
            to any inquiries from our support team.
          </p>
          <Form {...form}>
            <form>
              <FormField
                control={form?.control}
                name='full_name'
                render={({ field }) => (
                  <FormInputField
                    label='FULL NAME'
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-6'
                    inputClassName='max-w-none'
                    disabled={true}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='email'
                render={({ field }) => (
                  <FormInputField
                    label='EMAIL ADDRESS'
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-4'
                    inputClassName='max-w-none'
                    disabled={true}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='subject'
                render={({ field }) => (
                  <FormInputField
                    label='TICKET SUBJECT'
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-4'
                    inputClassName='max-w-none'
                    description='Briefly describe the issue or request'
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='description'
                render={({ field }) => (
                  <FormTextAreaField
                    label='DETAILED DESCRIPTION'
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-4'
                    inputClassName='max-w-none'
                    description='Describe the issue or request in detail'
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='issue_type'
                render={({ field }) => (
                  <FormSelectField
                    label='ISSUE TYPE'
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder='Select type'
                    items={[
                      { title: 'Technical', value: 'Technical' },
                      { title: 'Account', value: 'Account' },
                      { title: 'Billing', value: 'Billing' },
                      { title: 'Payments', value: 'Payments' },
                      { title: 'Transfer', value: 'Transfer' },
                      { title: 'Conversion', value: 'Conversion' },
                    ]}
                    inputClassName='max-w-none'
                    className='mt-6'
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='attachment'
                render={({ field }) => (
                  <AttachmentUpload
                    previewMode
                    label='ATTACHMENT UPLOAD'
                    onChange={field.onChange}
                    className='mt-6'
                    description='Upload screenshots that could help the support team understand and diagnose the issue better'
                  />
                )}
              />
            </form>
          </Form>
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
