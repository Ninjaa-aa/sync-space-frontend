// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleType: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface TokenData {
  code?: string;
  id_token?: string;
  [key: string]: unknown;
}

export interface OAuthProviderConfig {
  name: string;
  stateKey: string;
  tokenExchange?: (code: string) => Promise<TokenData>;
  processToken: (tokenData: TokenData) => Promise<AuthResponse>;
}