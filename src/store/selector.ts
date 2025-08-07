import { RootState } from '@estia/store/store';

export const loginPayloadSelector = (state: RootState) =>
  state.auth.loginPayload;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsRegisterToken = (state: RootState) =>
  state.auth.isRegisterToken;
export const selectIsUserLoggedIn = (state: RootState) =>
  state.auth.isLoginToken;
export const selectMerchantUser = (state: RootState) =>
  state.auth.merchantUserInfo;
export const selectAccessToken = (state: RootState) =>
  state?.auth?.tokens?.accessToken;
export const selectSpinningLoader = (state: RootState) =>
  state?.general?.showSpinningLoader;
export const selectDashboardSummary = (state: RootState) =>
  state?.temporary?.dashboardSummary;
export const selectTransactions = (state: RootState) =>
  state?.temporary?.transactions;
export const selectNotifications = (state: RootState) =>
  state?.temporary?.notifications;
export const selectAllMerchants = (state: RootState) =>
  state?.temporary?.allMerchants;
export const selectSelectedMerchantCategory = (state: RootState) =>
  state?.temporary?.selectedMerchantCategory;
export const selectMerchantSubUsers = (state: RootState) =>
  state?.temporary?.merchantSubUsers;
export const selectMerchantPosUsers = (state: RootState) =>
  state?.temporary?.merchantPosUsers;
