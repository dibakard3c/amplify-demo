export interface InAppNotification {
  id: string;
  estiaUserId: string;
  estiaTransactionId: string;
  title: string;
  message: string;
  data: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  isDeleted: boolean;

  amountSent: number;
  amountReceived: number;
  currencySent: string;
  currencyReceived: string;
  status: string;
}

export interface PendingNotification {
  hasPending: boolean;
  count: number;
}
