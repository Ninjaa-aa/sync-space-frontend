// src/app/auth/github/callback/page.tsx
'use client';

import { OAuthCallback } from '@/components/auth/OAuthCallback';
import { githubProvider } from '@/app/auth/providers';

export default function GithubCallback() {
  return <OAuthCallback provider={githubProvider} />;
}