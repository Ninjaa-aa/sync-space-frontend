'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatSphereLanding from '@/components/auth/ChatSphereLanding';

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Loading</h2>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  );
}

function LandingPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  return <ChatSphereLanding email={email} />;
}

export default function LandingPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LandingPageContent />
    </Suspense>
  );
}