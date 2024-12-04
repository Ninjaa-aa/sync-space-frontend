/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/providers';
import authApi from '@/lib/auth';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [] = useState<string | null>(null);
  
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const savedState = window.sessionStorage.getItem('google_oauth_state');
      window.sessionStorage.removeItem('google_oauth_state');
      
      if (!code) {
        router.replace('/login?error=google_auth_cancelled');
        return;
      }

      if (!state || state !== savedState) {
        router.replace('/login?error=invalid_oauth_state');
        return;
      }

      try {
        // First, exchange code for credentials
        const tokenResponse = await fetch(`/api/auth/google/token?code=${code}`, {
          method: 'GET'
        });
        
        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const { id_token } = await tokenResponse.json();

        // Then send the ID token to your backend
        const response = await authApi.post('/auth/google', { 
          token: id_token
        });
        
        if (response.data.user && response.data.tokens) {
          login(response.data.user, response.data.tokens);
          router.replace('/');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error: any) {
        console.error('Google auth error:', error);
        const errorMessage = error.message || 'Google authentication failed';
        router.replace(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    handleGoogleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing Google Login</h2>
        <p className="text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  );
}