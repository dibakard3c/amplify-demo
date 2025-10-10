export interface DefiWallet {
  id: string;
  walletAddress: string;
  currency: string;
  amount: number;
  fiatAmount: number;
  rate: number;
}

export interface DefaultWallet {
  iban: 'string';
  bic: 'string';
  bankCountry: 'string';
  bankAddress: 'string';
  bankName: 'string';
  bankAccountHolderName: 'string';
}

export interface DefiFriendlyWallet {
  id: string;
  userId: string;
  alias: string;
  createdAt: string;
  publicAddress: string;
}

export interface CreateDefiFriendlyWallet {
  publicAddress: string;
  alias: string;
}

export interface FiatFriendlyWallet {
  id: string;
  userId: string;
  alias: string;
  createdAt: string;
  iban: string;
  bic: string;
}

export interface CreateFiatFriendlyWallet {
  iban: string;
  alias: string;
}
