// src/app/register/verify/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import OtpVerification from '@/components/auth/OTPVerification';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return <div>Invalid request</div>;
  }

  return <OtpVerification email={email} />;
}