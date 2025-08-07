export interface ApiResponse {
  error: boolean;
  message: string;
  data: any;
}

export interface LoginResponse {
  tokensContext: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
}
