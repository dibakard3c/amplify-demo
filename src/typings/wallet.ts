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
