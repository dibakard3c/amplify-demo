import { Mutex } from 'async-mutex';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { compareIgnoreCase } from '@estia/utils/general';
import { API_ROUTES } from './api-routes';
import { logoutAction, tokenRefreshed } from '@estia/store/slices/auth';
import { Toast } from '@estia/helpers/toast';
import { includes, isEmpty } from 'lodash';
import { RootState } from '@estia/store/store';
import { toggleLoader } from '@estia/store/slices/general';

export const QUERY_TAGS: any = {
  ACCOUNT_INFO: 'ACCOUNT_INFO',
  COUNTRY_CODES: 'COUNTRY_CODES',
  KYC_STATUS: 'KYC_STATUS',
  LIST_IBANS: 'LIST_IBANS',
  FIAT_WALLET: 'FIAT_WALLET',
  DEFI_WALLET: 'DEFI_WALLET',
  LIST_NOTIFICATIONS: 'LIST_NOTIFICATIONS',
  PENDING_NOTIFICATIONS_STATUS: 'PENDING_NOTIFICATIONS_STATUS',
  BALANCE_SUMMARY: 'BALANCE_SUMMARY',
  LIST_TRANSACTIONS: 'LIST_TRANSACTIONS',
  LIST_RECENT_TRANSACTIONS: 'LIST_RECENT_TRANSACTIONS',
  LIST_SPENDING_TREND: 'LIST_SPENDING_TREND',
  LIST_MERCHANT_USER: 'LIST_MERCHANT_USER',
  LIST_POS_USER: 'LIST_POS_USER',
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  prepareHeaders: (headers, { getState, arg, endpoint }: any) => {
    if (endpoint === 'submitTicket') {
      const encodedCredentials = btoa(
        `${process.env.NEXT_PUBLIC_FRESH_DESK_TICKET_API_KEY}:X`
      ); // Base64 encode API key
      headers.set('Authorization', `Basic ${encodedCredentials}`);
      headers.set('Content-Type', 'multipart/form-data');
    } else {
      const accessToken = (getState() as RootState)?.auth?.tokens?.accessToken;
      if (accessToken && !(arg?.params?.noAuth || arg?.body?.noAuth)) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      headers.set('Content-Type', 'application/json');
    }
    console.log('endpoint', endpoint);
    return headers;
  },
});

// create a new mutex
const mutex = new Mutex();

const errorResponse = (message: string, status = 400) => {
  return {
    error: {
      status: status,
      data: {
        detail: message,
      },
    },
  };
};

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api, extraOptions, ...rest) => {
  if (
    (!compareIgnoreCase(args?.method, 'get') &&
      !(args?.params?.hideLoader || args?.body?.hideLoader)) ||
    args?.params?.showLoader
  ) {
    api.dispatch(toggleLoader(true));
  }

  console.log(args, 'params');

  await mutex.waitForUnlock(); // Wait for the mutex to be available

  const state = api.getState() as RootState;
  const accessToken = state?.auth?.tokens?.accessToken;
  const refreshToken = state?.auth?.tokens?.refreshToken;

  let result: any = null;

  const refreshAccessToken = async () => {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      return null;
    }

    const release = await mutex.acquire();

    try {
      const refreshResult = await baseQuery(
        {
          url: API_ROUTES.REFRESH_TOKEN,
          method: 'POST',
          body: {
            hideLoader: true,
            noAuth: true,
            refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(tokenRefreshed(refreshResult.data));
        return refreshResult.data;
      } else if (refreshResult?.error?.status?.toString() === '401') {
        Toast.showError({
          message: 'Your session has expired. Please login again.',
        });
        api.dispatch(logoutAction());
      }
    } finally {
      release();
    }
  };

  // Check if the token is expired and refresh it
  if (!isEmpty(accessToken) && isTokenExpired(accessToken)) {
    const newTokens = await refreshAccessToken();
    if (newTokens) {
      result = await baseQuery(args, api, extraOptions, ...rest);
    } else {
      return errorResponse('Session expired', 401);
    }
  } else {
    result = await baseQuery(args, api, extraOptions, ...rest);
  }

  api.dispatch(toggleLoader(false));

  // Handle other errors
  if (
    includes(result?.error?.error?.toString()?.toLowerCase(), 'network') &&
    result?.error?.status === 'FETCH_ERROR'
  ) {
    Toast.showError({
      message: 'Unable to connect. Please check your internet.',
    });
    return errorResponse('Unable to connect. Please check your internet.');
  } else if (result?.error?.status === 'TIMEOUT_ERROR') {
    Toast.showError({
      message:
        'Oops! The server seems to be unreachable right now. Please try again shortly.',
    });
    return errorResponse(
      'Oops! The server seems to be unreachable right now. Please try again shortly.'
    );
  } else if (
    result?.error &&
    !(args?.params?.hideErrorMsg || args?.body?.hideErrorMsg)
  ) {
    Toast.showError({
      message:
        result?.error?.data?.detail ||
        'Encountered an issue processing your request. Please try again',
    });
    return errorResponse(
      result?.error?.data?.detail ||
        'Encountered an issue processing your request. Please try again'
    );
  } else if (result?.error?.status === 401) {
    Toast.showError({
      message: 'Session expired, Please login again',
    });
    api.dispatch(logoutAction());
  }

  return result;
};

export const apiHandler = createApi({
  reducerPath: 'apiReducer',
  tagTypes: Object.values(QUERY_TAGS) as any,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  invalidationBehavior: 'immediately',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});

export function invalidateOnSuccess<T>(success: T[] = []) {
  return (_: unknown, hasError: any) => {
    return hasError ? [] : success;
  };
}

export const isTokenExpired = (token?: any) => {
  if (!token) return true;
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));

    if (!decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000); // Convert to seconds
    return decoded.exp < now;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true; // Treat invalid tokens as expired
  }
};

export const {} = apiHandler;
