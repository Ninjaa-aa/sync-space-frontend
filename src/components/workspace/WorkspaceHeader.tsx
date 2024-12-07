'use client';

import React from 'react';

interface WorkspaceHeaderProps {
  title: string;
  description?: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ title, description }) => {
  return (
    <div className="w-full border-b border-gray-200 pb-5">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader; 