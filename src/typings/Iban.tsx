export interface CreateIbanPayload {
  iban: string;
  name: string;
}

export interface Iban {
  id?: string;
  iban: string;
  bic?: string;
  name: string;
  position?: number;
  beneficiaryId?: string;
  bankBeneficiaryId?: string;
}
