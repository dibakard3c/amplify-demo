import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getValidAuthToken } from '@estia/helpers/cookies';
import { logoutAction } from '@estia/store/slices/auth';
import { useRouter } from 'next/navigation';
import { useRefreshAccountInfoQuery } from '@estia/networking/endpoints/auth';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const token = getValidAuthToken('access_token');

  // this query will only execute if the token is valid and the user email is not already in the redux store
  const { isLoading } = useRefreshAccountInfoQuery(undefined, {
    skip: !token,
  });

  // if the user doesn't have a valid token, redirect to login page
  useEffect(() => {
    if (!token) {
      push('/login');
      // will explain this in a moment
      dispatch(logoutAction());
    }
  }, [token, push, dispatch]);

  // optional: show a loading indicator while the query is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
