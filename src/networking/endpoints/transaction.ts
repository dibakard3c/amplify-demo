import { apiHandler, QUERY_TAGS } from '@estia/networking/api-handler';
import { API_ROUTES } from '@estia/networking/api-routes';
import { Merchant, MerchantGroup } from '@estia/typings/merchant';
import { DashboardSummary } from '@estia/typings/dashboard-summary';
import { DefaultWallet, DefiWallet } from '@estia/typings/wallet';
import { PaginatedTransaction } from '@estia/typings/transaction';
import { CreateIbanPayload, Iban } from '@estia/typings/Iban';
import { SpendingTrends } from '@estia/typings/spending-trends';

const PAYMENT_REFRESH_INVALIDATIONS = [
  QUERY_TAGS.DEFI_WALLET,
  QUERY_TAGS.FIAT_WALLET,
  QUERY_TAGS.LIST_TRANSACTIONS,
  QUERY_TAGS.LIST_RECENT_TRANSACTIONS,
  QUERY_TAGS.BALANCE_SUMMARY,
  QUERY_TAGS.LIST_NOTIFICATIONS,
  QUERY_TAGS.PENDING_NOTIFICATIONS_STATUS,
];

function invalidateOnSuccess<T>(success: T[] = []) {
  return (_: unknown, hasError: any) => {
    return hasError ? [] : success;
  };
}

export const transactionEndpoints = apiHandler.injectEndpoints({
  endpoints: (builder) => ({
    payNow: builder.mutation<
      { CashBackAmount: number },
      { amount: number; merchantId: string } | object
    >({
      query: (params) => ({
        url: API_ROUTES.PAY_NOW,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: PAYMENT_REFRESH_INVALIDATIONS,
    }),
    fetchMerchants: builder.query<MerchantGroup, object>({
      query: (params: object) => ({
        url: API_ROUTES.LIST_MERCHANTS,
        method: 'GET',
        params: params,
      }),
    }),
    fetchMerchantsByCategory: builder.query<Merchant[], object>({
      query: (params: object) => ({
        url: API_ROUTES.LIST_MERCHANTS_BY_CATEGORY,
        method: 'GET',
        params: params,
      }),
    }),
    fetchMerchantsById: builder.query<Merchant, object>({
      query: (params: object) => ({
        url: API_ROUTES.GET_MERCHANT_BY_ID,
        method: 'GET',
        params: params,
      }),
    }),
    // DASHBOARD
    fetchBalanceSummary: builder.query<
      DashboardSummary,
      { showLoader: boolean }
    >({
      query: (params) => ({
        url: API_ROUTES.BALANCE_SUMMARY,
        method: 'GET',
        params,
      }),
      providesTags: [QUERY_TAGS.BALANCE_SUMMARY],
    }),
    checkBalance: builder.mutation<DashboardSummary, void>({
      query: () => ({
        url: API_ROUTES.BALANCE_SUMMARY,
        method: 'GET',
        params: { showLoader: true },
      }),
    }),
    fetchIbanInfo: builder.query<DefaultWallet, void>({
      query: () => ({
        url: API_ROUTES.FIAT_WALLET,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.FIAT_WALLET],
    }),
    fetchDefiWallet: builder.query<DefiWallet, void>({
      query: () => ({
        url: API_ROUTES.DEFI_WALLET,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.DEFI_WALLET],
    }),
    fetchFiatWallet: builder.query<DefaultWallet, void>({
      query: () => ({
        url: API_ROUTES.FIAT_WALLET,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.FIAT_WALLET],
    }),
    fetchTransactions: builder.query<PaginatedTransaction, object | any>({
      query: (params) => ({
        url: API_ROUTES.LIST_TRANSACTIONS,
        method: 'POST',
        body: params,
      }),
      providesTags: [QUERY_TAGS.LIST_TRANSACTIONS],
    }),
    // IBAN
    listIban: builder.query<Iban[], void>({
      query: () => ({
        url: API_ROUTES.LIST_IBAN,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.LIST_IBANS],
    }),
    createIban: builder.mutation<void, CreateIbanPayload>({
      query: (params) => ({
        url: API_ROUTES.CREATE_IBAN,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_IBANS]),
    }),
    deleteIban: builder.mutation<void, string>({
      query: (ibanId) => ({
        url: `${API_ROUTES.DELETE_IBAN}/${ibanId}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_IBANS]),
    }),
    // Wallet
    buyEST: builder.mutation<{ estiaTxId: string }, object>({
      query: (params) => ({
        url: API_ROUTES.BUY_EST,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: PAYMENT_REFRESH_INVALIDATIONS,
    }),
    sellEST: builder.mutation<{ estiaTxId: string }, object>({
      query: (params) => ({
        url: API_ROUTES.SELL_EST,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: PAYMENT_REFRESH_INVALIDATIONS,
    }),
    sendEstToWallet: builder.mutation<void, object>({
      query: (params) => ({
        url: API_ROUTES.SEND_EST_TO_WALLET,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: PAYMENT_REFRESH_INVALIDATIONS,
    }),
    sendEuroToOtherIban: builder.mutation<
      {
        feeCurrency: string;
        feeAmount: string;
        estiaTxId: string;
      },
      object
    >({
      query: (params) => ({
        url: API_ROUTES.SEND_EURO_TO_IBAN,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: PAYMENT_REFRESH_INVALIDATIONS,
    }),
    fetchEstimate: builder.mutation<
      { feeCurrency: string; feeAmount: string },
      { amount: number; feeType: string }
    >({
      query: (params) => ({
        url: API_ROUTES.ESTIMATE_FEE,
        method: 'POST',
        body: params,
      }),
    }),
    // Analytics
    fetchSpendingTrends: builder.query<SpendingTrends, void>({
      query: () => ({
        url: API_ROUTES.SPENDING_TRENDS,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.LIST_SPENDING_TREND],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePayNowMutation,
  useFetchMerchantsQuery,
  useFetchMerchantsByCategoryQuery,
  useFetchMerchantsByIdQuery,
  // DASHBOARD
  useFetchBalanceSummaryQuery,
  useCheckBalanceMutation,
  useFetchIbanInfoQuery,
  useFetchDefiWalletQuery,
  useFetchFiatWalletQuery,
  useFetchTransactionsQuery,
  //IBAN
  useListIbanQuery,
  useCreateIbanMutation,
  useDeleteIbanMutation,
  // WALLET
  useBuyESTMutation,
  useSellESTMutation,
  useSendEstToWalletMutation,
  useSendEuroToOtherIbanMutation,
  useFetchEstimateMutation,
  // Analytics
  useFetchSpendingTrendsQuery,
} = transactionEndpoints;
