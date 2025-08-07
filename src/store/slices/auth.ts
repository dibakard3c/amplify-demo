import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MerchantUser, User } from '@estia/typings/user';
import { authEndpoints } from '@estia/networking/endpoints/auth';
import { deleteAuthCookie } from '@estia/helpers/cookies';
import { userEndpoints } from '@estia/networking/endpoints/user';
import { DashboardSummary } from '@estia/typings/dashboard-summary';

interface AuthSliceState {
  user: any;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
  } | null;
  isLoginToken: boolean;
  isRegisterToken: boolean;
  loginPayload: {
    otpMode?: string;
    email?: string;
    countryCode: string;
    mobileNumber: string;
  } | null;
  merchantUserInfo: MerchantUser | null;
}

const initialState: AuthSliceState = {
  user: null,
  tokens: null,
  isLoginToken: false,
  isRegisterToken: false,
  loginPayload: null,
  merchantUserInfo: null,
};

export const logoutAction = createAction('clear');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenRefreshed: (state, action: PayloadAction<any>) => {
      state.tokens = action?.payload?.tokensContext;
    },
    setLoginPayload: (state, action: PayloadAction<any>) => {
      state.loginPayload = {
        ...state.loginPayload,
        ...action?.payload,
      };
    },
    setUserLoggedIn: (state) => {
      state.isLoginToken = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction, () => {
        // deleteAuthCookie('access_token');
        // deleteAuthCookie('id_token');
        // deleteAuthCookie('refresh_token');
        return initialState;
      })
      .addMatcher(
        authEndpoints.endpoints.login.matchFulfilled,
        (state: AuthSliceState, action) => {
          state.tokens = action?.payload?.tokensContext;
          state.isRegisterToken = false;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<any> =>
          authEndpoints.endpoints.registerMerchant.matchFulfilled(action) ||
          userEndpoints.endpoints.registerMerchantUser.matchFulfilled(action),
        (state: AuthSliceState, action: any) => {
          state.tokens = action?.payload?.tokensContext;
          state.isRegisterToken = true;
          state.isLoginToken = false;
        }
      )
      .addMatcher(
        authEndpoints.endpoints.accountInfo.matchFulfilled,
        (state: AuthSliceState, action: PayloadAction<User>) => {
          state.user = action?.payload;
        }
      )
      .addMatcher(
        userEndpoints.endpoints.fetchMerchantUserAccountInfo.matchFulfilled,
        (state: AuthSliceState, action: PayloadAction<MerchantUser>) => {
          state.merchantUserInfo = action?.payload;
        }
      )
      .addMatcher(
        authEndpoints.endpoints.refreshAccountInfo.matchFulfilled,
        (state: AuthSliceState, action: PayloadAction<User>) => {
          state.user = action?.payload;
        }
      );
  },
});

export const { tokenRefreshed, setLoginPayload, setUserLoggedIn } =
  authSlice.actions;
