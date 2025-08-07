import {
  apiHandler,
  invalidateOnSuccess,
  QUERY_TAGS,
} from '@estia/networking/api-handler';
import { API_ROUTES } from '../api-routes';
import { MerchantUser, PosUser } from '@estia/typings/user';

export const userEndpoints = apiHandler.injectEndpoints({
  endpoints: (builder) => ({
    // Merchant User
    listMerchantSubUsers: builder.query<{ users: MerchantUser[] }, void>({
      providesTags: [QUERY_TAGS.LIST_MERCHANT_USER],
      query: () => ({
        url: API_ROUTES.LIST_MERCHANT_USERS,
        method: 'GET',
      }),
    }),
    createMerchantUser: builder.mutation<void, object>({
      query: (params) => ({
        url: API_ROUTES.CREATE_MERCHANT_USER,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_MERCHANT_USER]),
    }),
    registerMerchantUser: builder.mutation<void, object>({
      query: (params) => ({
        url: API_ROUTES.REGISTER_MERCHANT_USER,
        method: 'POST',
        body: params,
      }),
    }),
    resendMerchantUserInvitation: builder.mutation<void, string>({
      query: (userId) => ({
        url: API_ROUTES.RESEND_MERCHANT_USER_REG_EMAIL,
        method: 'POST',
        body: { userId },
      }),
    }),
    deleteMerchantUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${API_ROUTES.DELETE_MERCHANT_USER}/${userId}`,
        method: 'DELETE',
        params: { userId },
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_MERCHANT_USER]),
    }),
    fetchMerchantUserAccountInfo: builder.query<MerchantUser, void>({
      query: () => ({
        url: API_ROUTES.MERCHANT_USER_ACCOUNT_INFO,
        method: 'GET',
      }),
    }),
    // POS User
    listPosUsers: builder.query<{ posList: PosUser[] }, void>({
      providesTags: [QUERY_TAGS.LIST_POS_USER],
      query: () => ({
        url: API_ROUTES.LIST_POS_USERS,
        method: 'GET',
      }),
    }),
    createPosUser: builder.mutation<void, object>({
      query: (params) => ({
        url: API_ROUTES.CREATE_POS_USER,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_POS_USER]),
    }),
    deletePosUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ROUTES.DELETE_POS_USER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateOnSuccess([QUERY_TAGS.LIST_POS_USER]),
    }),
  }),
  overrideExisting: false,
});

export const {
  // MERCHANT
  useListMerchantSubUsersQuery,
  useCreateMerchantUserMutation,
  useRegisterMerchantUserMutation,
  useResendMerchantUserInvitationMutation,
  useDeleteMerchantUserMutation,
  useFetchMerchantUserAccountInfoQuery,
  // POS
  useListPosUsersQuery,
  useCreatePosUserMutation,
  useDeletePosUserMutation,
} = userEndpoints;
