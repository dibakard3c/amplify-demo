export interface Transaction {
  estiaTransactionId: string;
  sendTo: string;
  receivedBy: string;
  eurAmountSend: number;
  estiaAmountSend: number;
  estiaAmountReceived: number;
  eurAmountReceived: number;
  createdAt: string;
  walletTransactionType: string;
  walletTransactionState: string;
  estiaTransactionResponseType: string;
  merchantLogo: string;
}

export interface SalesTransaction {
  shop_id: string;
  date: string;
  trans_id: string;
  amount: number;
  status: string;
}

export interface PaginatedTransaction {
  content: Transaction[];
  totalPages: number;
  pageSize: number;
}
