'use client';
import { useSearchParams } from 'next/navigation';
import ChatSphereLanding from '@/components/auth/ChatSphereLanding';

export default function LandingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  return <ChatSphereLanding email={email} />;
}