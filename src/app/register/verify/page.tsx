'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OtpVerification from '@/components/auth/OTPVerification';

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

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Invalid Request</h2>
          <p className="text-gray-600">No email address was provided.</p>
        </div>
      </div>
    );
  }

  return <OtpVerification email={email} />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyPageContent />
    </Suspense>
  );
}