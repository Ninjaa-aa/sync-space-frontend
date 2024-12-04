// src/app/auth/google/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      window.opener?.postMessage(
        { type: 'GOOGLE_LOGIN', code },
        window.location.origin
      );
    }
    if (window.opener) {
      window.close();
    }
  }, [searchParams]);

  return <div>Processing Google login...</div>;
}