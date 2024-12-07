// src/app/auth/providers.ts
import { authApi } from '@/lib/auth';
import type { OAuthProviderConfig, AuthResponse, TokenData } from '@/types/auth';

export const googleProvider: OAuthProviderConfig = {
  name: 'Google',
  stateKey: 'google_oauth_state',
  async tokenExchange(code: string): Promise<TokenData> {
    const response = await fetch(`/api/auth/google/token?code=${encodeURIComponent(code)}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange code for token');
    }
    return response.json();
  },
  async processToken(tokenData: TokenData): Promise<AuthResponse> {
    if (!tokenData.id_token) {
      throw new Error('No ID token received');
    }
    const response = await authApi.post('/auth/google', { token: tokenData.id_token });
    
    // Ensure response matches AuthResponse type
    if (!response.data?.user?.roleType) {
      // Add default role if not provided by backend
      response.data.user = {
        ...response.data.user,
        roleType: 'user'
      };
    }
    
    return response as AuthResponse;
  }
};

export const githubProvider: OAuthProviderConfig = {
  name: 'GitHub',
  stateKey: 'github_oauth_state',
  async processToken(tokenData: TokenData): Promise<AuthResponse> {
    if (!tokenData.code) {
      throw new Error('No code provided');
    }
    const response = await authApi.post('/auth/github', { code: tokenData.code });
    
    // Ensure response matches AuthResponse type
    if (!response.data?.user?.roleType) {
      // Add default role if not provided by backend
      response.data.user = {
        ...response.data.user,
        roleType: 'user'
      };
    }
    
    return response as AuthResponse;
  }
};