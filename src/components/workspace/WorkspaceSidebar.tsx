'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface DirectMessage {
  email: string;
  initial: string;
  username?: string;
}

interface Channel {
  name: string;
  id: string;
}

interface WorkspaceSidebarProps {
  items: NavItem[];
  workspaceName?: string;
  showCreateButton?: boolean;
  directMessages?: DirectMessage[];
  channels?: Channel[];
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ 
  items, 
  workspaceName = 'Example',
  showCreateButton = true,
  directMessages = [],
  channels = []
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to extract username from email
  const getUsernameFromEmail = (email: string) => {
    return email.split('@')[0];
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="w-full bg-[#592A5B] h-screen relative border-r border-[#4A2A4A] text-white">
      <div className="p-4">
        {/* Workspace Name Display */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {workspaceName}
          </h2>
        </div>

        {/* Channels Section */}
        <div className="mb-6">
          <h3 className="px-2 text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
            Channels
          </h3>
          <nav className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className="w-full flex items-center px-2 py-1 text-gray-200 hover:bg-white/10 rounded cursor-pointer"
              >
                <span className="text-gray-400 mr-2">#</span>
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Create Workspace Button - Only show if showCreateButton is true */}
        {showCreateButton && (
          <Link
            href="/workspace/create"
            className="w-full mb-6 flex items-center justify-center px-4 py-2 text-sm font-medium bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            Create Workspace
          </Link>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-[#4A2A4A] text-white'
                  : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Direct Messages Section */}
        <div className="mt-6">
          <h3 className="px-2 text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
            Direct messages
          </h3>
          <nav className="space-y-1">
            {directMessages.map((dm, index) => (
              <button
                key={index}
                className="w-full flex items-center px-2 py-1 text-gray-200 hover:bg-white/10 rounded cursor-pointer"
                onClick={() => {/* Handle chat click */}}
              >
                <div className="w-6 h-6 rounded bg-purple-700 flex items-center justify-center mr-2 text-xs font-medium">
                  {dm.initial}
                </div>
                <span className="text-sm text-left">
                  {getUsernameFromEmail(dm.email)}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar; 