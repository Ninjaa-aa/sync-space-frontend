/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/SocialLogin.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { authApi } from '@/lib/auth';

export default function SocialLogin() {
  const { login } = useAuth();
  const [isLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    // This would typically open a popup window for Google OAuth
    // For demo purposes, we'll just show how to handle the token
    try {
      const token = 'google-oauth-token'; // This would come from Google OAuth
      const response = await authApi.post('/auth/google', { token });
      login(response.data.user, response.data.tokens);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to login with Google');
    }
  };

  const handleGithubLogin = async () => {
    // This would typically redirect to GitHub OAuth
    // For demo purposes, we'll just show how to handle the code
    try {
      const code = 'github-oauth-code'; // This would come from GitHub OAuth
      const response = await authApi.post('/auth/github', { code });
      login(response.data.user, response.data.tokens);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to login with GitHub');
    }
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

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Google</span>
          Google
        </button>

        <button
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with GitHub</span>
          GitHub
        </button>
      </div>

      {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}
    </div>
  );
}