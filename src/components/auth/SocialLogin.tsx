'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}
import { useAuth } from '@/app/providers';
import authApi from '@/lib/auth';

export default function SocialLogin() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
          try {
            window.google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleGoogleResponse,
              auto_select: false,
              context: 'signin'
            });

            window.google.accounts.id.renderButton(
              document.getElementById('googleButton')!,
              { 
                type: 'standard',
                theme: 'outline',
                size: 'large',
                width: 240,
                text: 'signin_with',
                shape: 'rectangular',
              }
            );
          } catch (error) {
            console.error('Google Sign-In initialization error:', error);
            setError('Failed to initialize Google Sign-In');
          }
        } else {
          console.error('Google client ID not configured');
          setError('Google Sign-In is not properly configured');
        }
      };

      script.onerror = () => {
        console.error('Failed to load Google Sign-In script');
        setError('Failed to load Google Sign-In');
      };

      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };

    loadGoogleScript();
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      const result = await authApi.post('/auth/google', {
        token: response.credential
      });
      
      if (!result.data.user || !result.data.tokens) {
        throw new Error('Invalid response from server');
      }

      login(result.data.user, result.data.tokens);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Google login failed';
      console.error('Google login error:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!githubClientId) {
      setError('GitHub authentication is not configured');
      return;
    }

    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:email`;
    window.location.href = githubUrl;
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div 
          id="googleButton"
          className="flex justify-center"
        />

        <button
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          Continue with GitHub
        </button>
      </div>

      {error && (
        <div className="mt-3 text-red-500 text-sm text-center">{error}</div>
      )}

      {isLoading && (
        <div className="mt-3 text-blue-500 text-sm text-center">
          Processing login...
        </div>
      )}
    </div>
  );
}