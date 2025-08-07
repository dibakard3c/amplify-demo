import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@estia/typings/transaction';
import { transactionEndpoints } from '@estia/networking/endpoints/transaction';
import { get, has, isEmpty, toInteger } from 'lodash';
import { sortObjectByDateDesc } from '@estia/utils/general';
import { generalEndpoints } from '@estia/networking/endpoints/general';
import { InAppNotification } from '@estia/typings/notifications';
import { Merchant, MerchantGroup } from '@estia/typings/merchant';
import { MerchantUser, PosUser } from '@estia/typings/user';
import { userEndpoints } from '@estia/networking/endpoints/user';
import { logoutAction } from '@estia/store/slices/auth';
import { DashboardSummary } from '@estia/typings/dashboard-summary';

interface TempState {
  transactions: {
    page: number;
    groupedList: { [key: string]: Transaction[] };
    hasMore: boolean;
  };
  notifications: {
    page: number;
    list: InAppNotification[];
    hasMore: boolean;
  };
  merchantSubUsers: MerchantUser[];
  merchantPosUsers: PosUser[];
  allMerchants: MerchantGroup[] | null;
  selectedMerchantCategory: {
    title: string;
    page: number;
    list: Merchant[];
    hasMore: boolean;
  };
  dashboardSummary: DashboardSummary | null;
}

const initialState: TempState = {
  transactions: {
    page: 0,
    groupedList: {},
    hasMore: true,
  },
  notifications: {
    page: 0,
    list: [],
    hasMore: true,
  },
  merchantSubUsers: [],
  merchantPosUsers: [],
  allMerchants: null,
  selectedMerchantCategory: {
    title: '',
    page: 0,
    list: [],
    hasMore: true,
  },
  dashboardSummary: null,
};

export const tempSlice = createSlice({
  name: 'temporary',
  initialState,
  reducers: {
    markNotificationsAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.list?.find(
        (item) => item?.id === action?.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction, () => initialState)
      .addMatcher(
        transactionEndpoints.endpoints.fetchBalanceSummary.matchFulfilled,
        (state: TempState, action: PayloadAction<DashboardSummary>) => {
          state.dashboardSummary = action?.payload;
        }
      )
      .addMatcher(
        transactionEndpoints.endpoints.fetchTransactions.matchFulfilled,
        (state: TempState, action: PayloadAction<any[]> | any) => {
          if (action?.payload?.currentPage === 0) {
            state.transactions = {
              page: 0,
              groupedList: action?.payload?.content,
              hasMore:
                action?.payload?.currentPage < action?.payload?.totalPages,
            };
          } else {
            if (
              toInteger(state.transactions.page) <
              toInteger(action?.payload?.currentPage)
            ) {
              state.transactions.page = action?.payload?.currentPage;
              state.transactions.hasMore =
                action?.payload?.currentPage < action?.payload?.totalPages;
              Object.keys(action?.payload?.content)?.map((key) => {
                if (has(state.transactions.groupedList, key)) {
                  state.transactions.groupedList[key] = [
                    ...get(state.transactions.groupedList, key),
                    ...get(action?.payload?.content, key),
                  ];
                } else {
                  state.transactions.groupedList = {
                    ...state.transactions.groupedList,
                    [key]: get(action?.payload?.content, key),
                  };
                }
              });
            }
          }
          state.transactions.groupedList = sortObjectByDateDesc(
            state.transactions.groupedList || {}
          );
        }
      )
      .addMatcher(
        generalEndpoints.endpoints.listNotifications.matchFulfilled,
        (state: TempState, action: PayloadAction<any[]> | any) => {
          if (action?.payload?.currentPage === 0) {
            state.notifications = {
              page: 0,
              list: action?.payload?.content || [],
              hasMore:
                action?.payload?.currentPage < action?.payload?.totalPages,
            };
          } else {
            if (
              toInteger(state.notifications.page) <
              toInteger(action?.payload?.currentPage)
            ) {
              state.notifications = {
                page: action?.payload?.currentPage,
                list: state.notifications.list?.concat(
                  action?.payload?.content ?? []
                ),
                hasMore:
                  action?.payload?.currentPage < action?.payload?.totalPages,
              };
            }
          }
        }
      )
      .addMatcher(
        transactionEndpoints.endpoints.fetchMerchants.matchFulfilled,
        (state: TempState, action: PayloadAction<MerchantGroup>) => {
          state.allMerchants = Object.keys(action?.payload)?.map((key) => ({
            title: key,
            list: get(action?.payload, key),
          }));
        }
      )
      .addMatcher(
        transactionEndpoints.endpoints.fetchMerchantsByCategory.matchFulfilled,
        (state: TempState, action: PayloadAction<any[]> | any) => {
          const match =
            action?.meta?.baseQueryMeta?.request?.url.match(/[?&]page=(\d+)/);
          if (match) {
            const currentPage = parseInt(match[1], 10);
            if (currentPage === 0) {
              state.selectedMerchantCategory = {
                ...state.selectedMerchantCategory,
                page: 0,
                list: action?.payload?.content || [],
                hasMore: true,
              };
            } else {
              if (
                toInteger(state.selectedMerchantCategory.page) <
                toInteger(currentPage)
              ) {
                state.selectedMerchantCategory = {
                  ...state.selectedMerchantCategory,
                  page: currentPage,
                  list: state.selectedMerchantCategory.list?.concat(
                    action?.payload?.content ?? []
                  ),
                  hasMore: !isEmpty(action?.payload?.content),
                };
              }
            }
          }
        }
      )
      .addMatcher(
        userEndpoints.endpoints.listMerchantSubUsers.matchFulfilled,
        (
          state: TempState,
          action: PayloadAction<{ users: MerchantUser[] }>
        ) => {
          state.merchantSubUsers = action?.payload?.users;
        }
      )
      .addMatcher(
        userEndpoints.endpoints.listPosUsers.matchFulfilled,
        (state: TempState, action: PayloadAction<{ posList: PosUser[] }>) => {
          state.merchantPosUsers = action?.payload?.posList;
        }
      );
  },
});

export const { markNotificationsAsRead } = tempSlice.actions;
