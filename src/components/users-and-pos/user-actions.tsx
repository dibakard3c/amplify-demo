import React from 'react';
import { Button } from '@estia/components/ui/button';
import { cn } from '@estia/utils/utils';
import { Toast } from '@estia/helpers/toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@estia/components/ui/alert-dialog';
import {
  useDeleteMerchantUserMutation,
  useResendMerchantUserInvitationMutation,
} from '@estia/networking/endpoints/user';
import { MerchantUser } from '@estia/typings/user';
import { useTranx } from '@estia/hooks/useTranx';

interface UserActionsProps {
  user: MerchantUser;
}

export default function UserActions({ user }: UserActionsProps) {
  const [resendMerchantUser] = useResendMerchantUserInvitationMutation();
  const [deleteMerchantUser] = useDeleteMerchantUserMutation();

  const { t } = useTranx();

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'border-primary-1 my-1 mr-3 h-10 min-w-24 border py-2 text-center font-bold hover:border-none'
        )}
        onClick={() => {
          resendMerchantUser(user?.id)
            .unwrap()
            .then(() => {
              Toast.showSuccess({
                message: t('alerts.invite_sub_user_success'),
              });
            });
        }}
      >
        {t('dialogs.user_and_pos_actions.send_invitation')}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'border-primary-1 my-1 h-10 min-w-24 border py-2 text-center font-bold hover:border-none'
            )}
          >
            {t('dialogs.user_and_pos_actions.delete')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl font-bold'>
              {t('dialogs.user_and_pos_actions.are_you_sure')}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-base'>
              {t('dialogs.user_and_pos_actions.are_you_sure_user_desc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='mt-3'>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  deleteMerchantUser(user?.id)
                    .unwrap()
                    .then(() => {
                      Toast.showSuccess({
                        message: t('alerts.delete_sub_user_success'),
                      });
                    });
                }}
              >
                {t('common.continue')}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
