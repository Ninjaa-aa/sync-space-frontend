/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/auth/github/callback/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/providers';
import authApi from '@/lib/auth';

export default function GitHubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const handleGitHubCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const savedState = window.sessionStorage.getItem('github_oauth_state');
      window.sessionStorage.removeItem('github_oauth_state');

      if (!code) {
        router.replace('/login?error=github_auth_cancelled');
        return;
      }

      if (!state || state !== savedState) {
        router.replace('/login?error=invalid_oauth_state');
        return;
      }

      try {
        // Send the original authorization code to your backend
        const response = await authApi.post('/auth/github', { 
          code: code  // Send the original authorization code
        });

        if (response.data.user && response.data.tokens) {
          login(response.data.user, response.data.tokens);
          router.replace('/');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error: any) {
        console.error('GitHub auth error:', error);
        const errorMessage = error.response?.data?.message || 'GitHub authentication failed';
        router.replace(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    handleGitHubCallback();
  }, [searchParams, login, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Authentication Error</h2>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing GitHub Login</h2>
        <p className="text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  );
}