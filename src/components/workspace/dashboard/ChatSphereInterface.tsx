'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

export function ChatSphereInterface() {
  
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatArea />
    </div>
  );
}