'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { useParams } from 'next/navigation';

export function ChatSphereInterface() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar workspaceId={workspaceId} />
      <ChatArea />
    </div>
  );
}