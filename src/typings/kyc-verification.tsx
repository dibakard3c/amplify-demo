export interface KycVerification {
  accessToken: string;
}

export interface KycStatus {
  userId: string;
  status: string;
  details: any[];
  rejectionComments: {
    autoComment: null;
    userComment: null;
  };
  currentTier: null;
  tier0: {
    eligible: boolean;
    status: string;
    outboundLimitConsumed: number;
    outboundLimitAllowed: number;
  };
  tier1: {
    eligible: boolean;
    status: string;
    inboundLimitConsumed: {
      all: number;
      va: number;
    };
    inboundLimitAllowed: {
      all: number;
      va: number;
    };
    outboundLimitConsumed: number;
    outboundLimitAllowed: number;
  };
  tier2: {
    eligible: boolean;
    status: string;
    outboundLimitConsumed: number;
    outboundLimitAllowed: number;
    verificationExpiryDate: string;
  };
  tier3: {
    eligible: boolean;
    status: string;
    outboundLimitConsumed: number;
  };
}
