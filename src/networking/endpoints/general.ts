import { isArray } from 'lodash';
import {
  apiHandler,
  invalidateOnSuccess,
  QUERY_TAGS,
} from '@estia/networking/api-handler';
import { CountryCode } from '@estia/typings/country-code';
import { API_ROUTES } from '@estia/networking/api-routes';
import {
  InAppNotification,
  PendingNotification,
} from '@estia/typings/notifications';

export const generalEndpoints = apiHandler.injectEndpoints({
  endpoints: (builder) => ({
    countryCodes: builder.query<CountryCode[], void>({
      query: () => ({
        url: API_ROUTES.COUNTRY_CODES,
        method: 'GET',
        params: { noAuth: true },
      }),
      providesTags: [QUERY_TAGS.COUNTRY_CODES],
    }),
    listNotifications: builder.query<InAppNotification[], object | void>({
      query: (params: { page: 0; size: 10 }) => ({
        url: API_ROUTES.LIST_NOTIFICATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: [QUERY_TAGS.LIST_NOTIFICATIONS],
    }),
    markNotificationAsRead: builder.mutation<void, string | string[]>({
      query: (notification_ids) => {
        if (isArray(notification_ids)) {
          return {
            url: API_ROUTES.READ_NOTIFICATION,
            method: 'POST',
            body: notification_ids,
          };
        }
        return {
          url: `${API_ROUTES.READ_NOTIFICATION}/${notification_ids}`,
          method: 'POST',
        };
      },
      invalidatesTags: invalidateOnSuccess([
        QUERY_TAGS.PENDING_NOTIFICATIONS_STATUS,
      ]),
    }),
    markAllNotificationAsRead: builder.mutation<void, void>({
      query: () => {
        return {
          url: API_ROUTES.READ_ALL_NOTIFICATION,
          method: 'POST',
        };
      },
      invalidatesTags: invalidateOnSuccess([
        QUERY_TAGS.PENDING_NOTIFICATIONS_STATUS,
        QUERY_TAGS.LIST_NOTIFICATIONS,
      ]),
    }),
    pendingNotificationsStatus: builder.query<
      PendingNotification,
      object | void
    >({
      query: () => ({
        url: API_ROUTES.PENDING_NOTIFICATIONS_STATUS,
        method: 'GET',
      }),
      providesTags: [QUERY_TAGS.PENDING_NOTIFICATIONS_STATUS],
    }),
    submitTicket: builder.mutation({
      query: (params) => {
        return {
          url: API_ROUTES.TICKET_FORM,
          method: 'POST',
          body: params,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCountryCodesQuery,
  useListNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationAsReadMutation,
  usePendingNotificationsStatusQuery,
  useSubmitTicketMutation,
} = generalEndpoints;
