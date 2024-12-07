'use client';

import { useState, useCallback, useEffect } from 'react';

interface SocialLoginProps {
  className?: string;
}

interface OAuthState {
  state: string;
  timestamp: number;
  provider: 'google' | 'github';
}

interface ProviderConfig {
  url: string;
  scope: string;
  extraParams?: Record<string, string>;
}

export function SocialLogin({ className = '' }: SocialLoginProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    google: false,
    github: false
  });

  // Provider configurations
  const providerConfigs: Record<'google' | 'github', ProviderConfig> = {
    google: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: 'openid email profile',
      extraParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    },
    github: {
      url: 'https://github.com/login/oauth/authorize',
      scope: 'read:user user:email'
    }
  };

  // Clear any existing OAuth states on mount
  useEffect(() => {
    const clearOldStates = () => {
      try {
        // Clear any existing states
        sessionStorage.removeItem('google_oauth_state');
        sessionStorage.removeItem('github_oauth_state');
        
        // Also clear any expired states
        const now = Date.now();
        Object.keys(sessionStorage).forEach(key => {
          if (key.endsWith('_oauth_state')) {
            try {
              const stateData = JSON.parse(sessionStorage.getItem(key) || '');
              if (now - stateData.timestamp > 5 * 60 * 1000) { // 5 minutes
                sessionStorage.removeItem(key);
              }
            } catch {
              sessionStorage.removeItem(key);
            }
          }
        });
      } catch (error) {
        console.log('Failed to clear old states:', error);
      }
    };

    clearOldStates();
  }, []);

  const handleSocialLogin = useCallback(async (provider: 'google' | 'github') => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      setError('');

      const clientId = provider === 'google'
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

      if (!clientId) {
        throw new Error(`${provider} authentication is not configured`);
      }

      // Generate and store state
      const stateValue = crypto.randomUUID();
      const stateData: OAuthState = {
        state: stateValue,
        timestamp: Date.now(),
        provider
      };

      // Store state in sessionStorage
      sessionStorage.setItem(`${provider}_oauth_state`, JSON.stringify(stateData));

      // Debug log
      console.log('Initiating OAuth:', {
        provider,
        stateValue,
        timestamp: stateData.timestamp
      });

      // Get provider config
      const config = providerConfigs[provider];

      // Construct OAuth URL
      const authUrl = new URL(config.url);

      // Add base parameters
      const baseParams = {
        client_id: clientId,
        redirect_uri: `${window.location.origin}/auth/${provider}/callback`,
        state: stateValue,
        response_type: 'code',
        scope: config.scope
      };

      // Add all parameters to URL
      Object.entries(baseParams).forEach(([key, value]) => {
        authUrl.searchParams.append(key, value);
      });

      // Add provider-specific extra parameters
      if (config.extraParams) {
        Object.entries(config.extraParams).forEach(([key, value]) => {
          authUrl.searchParams.append(key, value);
        });
      }

      // Final debug check before redirect
      console.log('OAuth Debug:', {
        provider,
        state: stateValue,
        storedState: JSON.parse(sessionStorage.getItem(`${provider}_oauth_state`) || '{}'),
        url: authUrl.toString()
      });

      // Redirect to OAuth provider
      window.location.href = authUrl.toString();
    } catch (err) {
      const error = err as Error;
      console.error('OAuth Error:', {
        provider,
        error: error.message,
        stack: error.stack
      });
      setError(error.message || `Failed to initiate ${provider} login`);
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading.google}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading.google ? (
            <div className="w-5 h-5 mr-2 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span className="text-gray-700">
            {isLoading.google ? 'Connecting...' : 'Google'}
          </span>
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          disabled={isLoading.github}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading.github ? (
            <div className="w-5 h-5 mr-2 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          )}
          <span className="text-gray-700">
            {isLoading.github ? 'Connecting...' : 'GitHub'}
          </span>
        </button>
      </div>

      {error && (
        <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}