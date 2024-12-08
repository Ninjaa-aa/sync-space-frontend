// src/app/workspace/create/page.tsx
'use client';

import WorkspaceCreationWizard from '@/components/workspace/WorkSpaceCreationWizard';
import { useAuth } from '@/app/auth/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateWorkspacePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1d21]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <WorkspaceCreationWizard />;
}