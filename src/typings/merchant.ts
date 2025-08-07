export interface Merchant {
  id: string;
  email: string;
  currency: string;
  companyName: string;
  addressLine: string;
  addressCity: string;
  addressPostalCode: string;
  addressCountry: string;
  merchantType: string;
  merchantDescription: string;
  cashBack: number;
  merchantLogo: string;
  merchantTypeLogo: string;
}

export interface MerchantPaymentInfo {
  merchantId: string;
  amount: number;
}

export interface MerchantItemInfo {
  logo: number;
  title: string;
  description: string;
}

export interface MerchantGroup {
  title: string;
  list: Merchant[];
  filtered?: Merchant[];
}
