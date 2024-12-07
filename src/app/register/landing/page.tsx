// pages/landing.tsx or app/landing/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import SlackLanding from '@/components/auth/ChatSphereLanding';

export default function LandingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return <SlackLanding email={email} />;
}