// src/app/auth/google/callback/page.tsx
'use client';

import { OAuthCallback } from '@/components/auth/OAuthCallback';
import { googleProvider } from '@/app/auth/providers';

export default function GoogleCallback() {
  return <OAuthCallback provider={googleProvider} />;
}