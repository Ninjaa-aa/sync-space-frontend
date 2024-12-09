// src/app/auth/google/callback/page.tsx
'use client';

import { Suspense } from 'react';
import { OAuthCallback } from '@/components/auth/OAuthCallback';
import { googleProvider } from '@/app/auth/providers';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we process your authentication...</p>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OAuthCallback provider={googleProvider} />
    </Suspense>
  );
}