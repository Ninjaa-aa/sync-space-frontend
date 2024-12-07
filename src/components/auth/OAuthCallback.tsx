// src/components/auth/OAuthCallback.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/auth/context/AuthContext';
import type { OAuthProviderConfig, TokenData } from '@/types/auth';

interface AuthState {
  state: string;
  timestamp: number;
}

interface AuthError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface Status {
  loading: boolean;
  error: string | null;
}

export function OAuthCallback({ provider }: { provider: OAuthProviderConfig }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const stateValidated = useRef(false);
  const [status, setStatus] = useState<Status>({
    loading: true,
    error: null
  });

  useEffect(() => {
    const handleCallback = async () => {
      if (stateValidated.current) return;
      stateValidated.current = true;

      try {
        const code = searchParams.get('code');
        const returnedState = searchParams.get('state');
        const savedStateJson = sessionStorage.getItem(provider.stateKey);

        console.log(`${provider.name} Auth Debug:`, {
          returnedState,
          savedStateJson,
          hasCode: !!code,
          storageKeys: Object.keys(sessionStorage)
        });

        // Validate state presence
        if (!savedStateJson || !returnedState) {
          throw new Error('Missing authentication state');
        }

        // Parse and validate stored state
        let savedStateData: AuthState;
        try {
          savedStateData = JSON.parse(savedStateJson);
        } catch (e) {
          console.error('Failed to parse saved state:', e);
          throw new Error('Invalid state format');
        }

        // Validate state match
        if (savedStateData.state !== returnedState) {
          throw new Error('State mismatch - possible CSRF attack');
        }

        // Check state expiration (5 minutes)
        const stateAge = Date.now() - savedStateData.timestamp;
        if (stateAge > 5 * 60 * 1000) {
          throw new Error('Authentication state expired');
        }

        // Validate code presence
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Clear state after validation
        sessionStorage.removeItem(provider.stateKey);

         // Exchange code for tokens if needed
        let tokenData: TokenData = { code: code || undefined };
        if (provider.tokenExchange) {
          tokenData = await provider.tokenExchange(code!);
        }

        // Process token and complete authentication
        const response = await provider.processToken(tokenData);

        // Validate response matches expected type
        if (!response.data?.user?.roleType) {
          throw new Error('Invalid user data received');
        }

        // Success - login and redirect
        login(response.data.user, response.data.tokens);
        router.replace(`/register/landing?email=${encodeURIComponent(response.data.user.email)}`);

      } catch (err) {
        const error = err as AuthError;
        console.log('[Auth Error]:', {
          provider: provider.name,
          message: error.message || 'Authentication error',
          type: error.constructor.name,
          response: error.response
        });
        
        const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
        setStatus(prev => ({ ...prev, error: errorMessage }));
        router.replace(`/register?error=${encodeURIComponent(errorMessage)}`);
      } finally {
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    handleCallback();
  }, [searchParams, login, router, provider]);

  if (status.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
          <p className="text-gray-600">{status.error}</p>
          <button 
            onClick={() => router.push('/register')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Processing {provider.name} Authentication</h2>
        <p className="text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  );
}