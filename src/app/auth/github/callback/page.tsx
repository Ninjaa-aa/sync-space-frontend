'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/providers';
import authApi from '@/lib/auth';

export default function GitHubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  useEffect(() => {
    const handleGithubCallback = async () => {
      const code = searchParams.get('code');
      if (code) {
        try {
          const response = await authApi.post('/auth/github', { code });
          login(response.data.user, response.data.tokens);
          router.push('/');
        } catch (error) {
          console.error('GitHub login failed:', error);
          router.push('/login?error=github_auth_failed');
        }
      } else {
        router.push('/login?error=github_auth_cancelled');
      }
    };

    handleGithubCallback();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing GitHub Login</h2>
        <p className="text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  );
}