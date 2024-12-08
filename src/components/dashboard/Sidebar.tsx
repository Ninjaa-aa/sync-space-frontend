'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hash, ChevronDown, Plus, MessageSquare, Bell, Search } from 'lucide-react';
import { useAuth } from '@/app/auth/context/AuthContext';

interface SidebarProps {
  workspaceId: string;
}

export function Sidebar({ workspaceId }: SidebarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);

  return (
    <div className="w-60 bg-[#19171D] flex flex-col h-full">
      {/* Workspace Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-gray-700">
        <h1 className="text-white font-semibold truncate">ChatSphere</h1>
        <button className="text-gray-400 hover:text-white">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Sidebar Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="px-3 py-2">
          <button className="w-full text-left text-gray-300 hover:bg-gray-700 rounded p-1 flex items-center">
            <MessageSquare size={16} className="mr-2" />
            Threads
          </button>
          <button className="w-full text-left text-gray-300 hover:bg-gray-700 rounded p-1 flex items-center">
            <Bell size={16} className="mr-2" />
            Activity
          </button>
        </div>

        {/* Channels Section */}
        <div className="mt-4">
          <button 
            onClick={() => setIsChannelsOpen(!isChannelsOpen)}
            className="flex items-center px-3 py-1 w-full text-gray-300 hover:bg-gray-700"
          >
            <ChevronDown size={16} className={`mr-1 transition-transform ${isChannelsOpen ? '' : '-rotate-90'}`} />
            <span className="font-semibold">Channels</span>
          </button>
          
          {isChannelsOpen && (
            <div className="mt-1">
              <button className="w-full text-left text-gray-400 hover:bg-gray-700 px-3 py-1 flex items-center">
                <Hash size={16} className="mr-2" />
                general
              </button>
              <button className="w-full text-left text-gray-400 hover:bg-gray-700 px-3 py-1 flex items-center">
                <Hash size={16} className="mr-2" />
                random
              </button>
              <button className="w-full text-left text-gray-400 hover:bg-gray-700 px-3 py-1 flex items-center group">
                <Plus size={16} className="mr-2 opacity-0 group-hover:opacity-100" />
                Add channels
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Section */}
      <div className="h-14 border-t border-gray-700 px-3 flex items-center">
        <div className="flex items-center text-gray-300 w-full">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
            {user?.firstName?.[0] || 'U'}
          </div>
          <span className="text-sm font-medium truncate">{user?.firstName || 'User'}</span>
        </div>
      </div>
    </div>
  );
} 