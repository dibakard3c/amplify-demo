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
import { useTranx } from '@estia/hooks/useTranx';

export default function Page() {
  const user = useSelector(selectUser);
  const { t } = useTranx();

  const form = useForm<SupportForm>({
    resolver: supportTicketResolver,
    defaultValues: {
      full_name: `${user?.primaryUserFirstName} ${user?.primaryUserLastName}`,
      email: user?.email,
      subject:
        process.env.NODE_ENV === 'development' ? 'Test Merchant ticket' : '',
      description:
        process.env.NODE_ENV === 'development'
          ? 'This is a test ticket from merchant ' + Math.random()
          : '',
      issue_type: process.env.NODE_ENV === 'development' ? 'Payments' : '',
      // attachment: '',
    },
    mode: 'onChange',
    delayError: 500,
  });

  const [submitTicket] = useSubmitTicketMutation();

  const handleSubmit = (_formData: any) => {
    const formData = new FormData();
    formData.append(
      'name',
      `${user?.primaryUserFirstName} ${user?.primaryUserLastName}`
    );
    formData.append('email', user?.email);
    formData.append('unique_external_id', user?.id);
    formData.append(
      'phone',
      user?.primaryUserMobileCountryCode + user?.primaryUserMobileNumber
    );
    formData.append('subject', _formData?.subject);
    formData.append('description', _formData?.description);
    formData.append('type', _formData?.issue_type);
    formData.append('source', '2');
    formData.append('status', '2');
    formData.append('priority', '3');
    formData.append('group_id', '159000644346');
    formData.append('tags[]', 'merchant_webapp_user');

    if (_formData?.attachment) {
      // Append the file
      formData.append('attachments[]', _formData?.attachment);
    }

    submitTicket(formData)
      .unwrap()
      .then(() => {
        Toast.showSuccess({ message: t('alerts.ticket_submit_success') });
      });
  };

  return (
    <div className='bg-card-bg mt-8 rounded-2xl p-4 md:p-8'>
      <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
        <div className='w-full px-3'>
          <h1 className='text-left text-3xl font-bold'>
            {t('dashboard.support.ticket_page.page_title')}
          </h1>
          <h2 className='my-5 text-left text-2xl font-bold'>
            {t('dashboard.support.ticket_page.page_sub_title')}
          </h2>
          <p className='mb-5 text-base leading-relaxed min-[140rem]:text-2xl min-[140rem]:leading-loose'>
            {t('dashboard.support.ticket_page.page_desc')
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
          <Form {...form}>
            <form>
              <FormField
                control={form?.control}
                name='full_name'
                render={({ field }) => (
                  <FormInputField
                    label={t(
                      'dashboard.support.ticket_page.form_labels.full_name'
                    )}
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
                    label={t('dashboard.support.ticket_page.form_labels.email')}
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
                    label={t(
                      'dashboard.support.ticket_page.form_labels.subject'
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-4'
                    inputClassName='max-w-none'
                    description={t(
                      'dashboard.support.ticket_page.form_labels.subject_info'
                    )}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='description'
                render={({ field }) => (
                  <FormTextAreaField
                    label={t(
                      'dashboard.support.ticket_page.form_labels.description'
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    className='mt-4'
                    inputClassName='max-w-none'
                    description={t(
                      'dashboard.support.ticket_page.form_labels.description_info'
                    )}
                  />
                )}
              />
              <FormField
                control={form?.control}
                name='issue_type'
                render={({ field }) => (
                  <FormSelectField
                    label={t(
                      'dashboard.support.ticket_page.form_labels.issue_type'
                    )}
                    value={field?.value}
                    onChange={field.onChange}
                    placeholder={t(
                      'dashboard.support.ticket_page.form_labels.issue_type_hint'
                    )}
                    items={[
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.technical'
                        ),
                        value: 'Technical',
                      },
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.account'
                        ),
                        value: 'Account',
                      },
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.billing'
                        ),
                        value: 'Billing',
                      },
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.payments'
                        ),
                        value: 'Payments',
                      },
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.transfer'
                        ),
                        value: 'Transfer',
                      },
                      {
                        title: t(
                          'dashboard.support.ticket_page.issue_types.conversion'
                        ),
                        value: 'Conversion',
                      },
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
                    label={t(
                      'dashboard.support.ticket_page.form_labels.attachment_upload'
                    )}
                    onChange={field.onChange}
                    className='mt-6'
                    containerClassName='max-w-auto w-full'
                    description={t(
                      'dashboard.support.ticket_page.form_labels.attachment_upload_info'
                    )}
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
        {t('dashboard.support.feedback_page.submit')}
      </Button>
    </div>
  );
}
