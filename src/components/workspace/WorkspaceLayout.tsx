'use client';

import React, { ReactNode } from 'react';

import WorkspaceSidebar from './WorkspaceSidebar';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const navItems = [
    { label: 'Dashboard', href: '/workspace' },
    { label: 'Projects', href: '/workspace/projects' },
    { label: 'Tasks', href: '/workspace/tasks' },
    { label: 'Settings', href: '/workspace/settings' },
  ];

  return (
    <div className="flex h-screen bg-white">
      <WorkspaceSidebar items={navItems} />
      <div className="flex-1 ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout; 