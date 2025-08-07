import React from 'react';
import { Button } from '@estia/components/ui/button';
import { cn } from '@estia/lib/utils';
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

interface UserActionsProps {
  user: MerchantUser;
}

export default function UserActions({ user }: UserActionsProps) {
  const [resendMerchantUser] = useResendMerchantUserInvitationMutation();
  const [deleteMerchantUser] = useDeleteMerchantUserMutation();

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
              Toast.showSuccess({ message: 'Invitation sent successfully' });
            });
        }}
      >
        Send Invitation
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'border-primary-1 my-1 h-10 min-w-24 border py-2 text-center font-bold hover:border-none'
            )}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl font-bold'>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-base'>
              This action cannot be undone. This will permanently delete this
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='mt-3'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  deleteMerchantUser(user?.id)
                    .unwrap()
                    .then(() => {
                      Toast.showSuccess({
                        message: 'User deleted successfully',
                      });
                    });
                }}
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
