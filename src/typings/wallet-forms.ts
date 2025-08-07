import { Iban } from '@estia/typings/Iban';

export interface SendEstForm {
  amount: number;
  address: string;
  friendly_wallet_name?: string;
}

export interface SendEurForm {
  amount: number;
  iban: Iban;
}
