import { differenceInSeconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';

import { createAction } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Stomp, { Client, Versions } from '@stomp/stompjs';
import { apiHandler, QUERY_TAGS } from '@estia/networking/api-handler';
import { Toast } from '@estia/helpers/toast';
import { buildMessage } from '@estia/helpers/notification';

const STAGING_BASE_URL = 'https://staging.api.estiapayments.io/estia/api/ws';

export const connectSocket = createAction('connect');
export const disconnectSocket = createAction('disconnect');

export const stompMiddleware = ({ dispatch, getState }: any) => {
  let client: Stomp.Client;
  let lastMessage: string | undefined;
  let lastUpdateTime: any = null;

  return (next: any) => (action: any) => {
    const state = getState();

    switch (action.type) {
      case 'connect':
        if (state?.auth?.user?.id) {
          client = new Client({
            brokerURL: STAGING_BASE_URL,
            connectHeaders: {
              Authorization: 'Bearer ' + state?.auth?.tokens?.accessToken,
            },
            debug: function (str) {
              if (process.env.NODE_ENV === 'development') {
                console.log(str);
              }
            },
            reconnectDelay: 10000,
            heartbeatIncoming: 60000,
            heartbeatOutgoing: 60000,
            appendMissingNULLonIncoming: true,
            logRawCommunication: true,
            forceBinaryWSFrames: true,
            stompVersions: new Versions([Versions.V1_2]),
            onConnect: () => {
              console.log('connected');
            },
            onDisconnect: () => {
              console.log('disconnect');
            },
            onStompError: (e) => {
              console.log('error', e);
            },
            onWebSocketError: (e) => {
              console.log('error', e);
            },
          });

          client.onConnect = function (_frame: any) {
            client.subscribe(
              `/user/${state?.auth?.user?.id}/topic/notifications`,
              (message: any) => {
                try {
                  // Handle the message here.
                  const result = JSON.parse(message?.body);
                  const notificationMessage = buildMessage(result);
                  console.log('test log ----', notificationMessage);
                  if (
                    !isEqual(lastMessage, notificationMessage) &&
                    (differenceInSeconds(new Date(), lastUpdateTime) > 5 ||
                      isEmpty(lastUpdateTime))
                  ) {
                    Toast.showNotification({
                      message: result?.title || result?.type,
                      description: result?.message || notificationMessage,
                    });
                    dispatch(
                      apiHandler.util.invalidateTags([
                        QUERY_TAGS.LIST_TRANSACTIONS,
                        QUERY_TAGS.LIST_NOTIFICATIONS,
                      ])
                    );
                    lastMessage = notificationMessage;
                    lastUpdateTime = new Date();
                  }
                } catch (e) {
                  console.log('err', e);
                }
              }
            );
          };

          client.activate();
        }
        break;
      case 'disconnect':
        if (client && client.active) {
          client.deactivate();
        }
        break;
      default:
        return next(action);
    }
  };
};
