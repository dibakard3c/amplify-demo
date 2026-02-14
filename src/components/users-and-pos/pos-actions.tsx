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
import { useDeletePosUserMutation } from '@estia/networking/endpoints/user';
import { PosUser } from '@estia/typings/user';
import { useTranx } from '@estia/hooks/useTranx';

interface UserActionsProps {
  user: PosUser;
}

export default function PosActions({ user }: UserActionsProps) {
  const [deletePosUser] = useDeletePosUserMutation();

  const { t } = useTranx();

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'border-primary-1 my-1 mr-3 h-10 min-w-24 border py-2 text-center font-bold hover:border-none'
        )}
        onClick={() => {
          Toast.showError({ message: 'TODO' });
        }}
      >
        {t('dialogs.user_and_pos_actions.reset_token')}
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
              {t('dialogs.user_and_pos_actions.are_you_sure_pos_desc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='mt-3'>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  deletePosUser(user?.id)
                    .unwrap()
                    .then(() => {
                      Toast.showSuccess({
                        message: t('alerts.pos_delete_success'),
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
