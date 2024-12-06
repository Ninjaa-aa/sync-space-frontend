'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface WorkspaceLeftNavProps {
  workspaceName: string;
}

const WorkspaceLeftNav: React.FC<WorkspaceLeftNavProps> = ({ workspaceName }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const initial = workspaceName ? workspaceName.charAt(0).toUpperCase() : 'E';

  return (
    <div className="w-full bg-[#3F0E40] h-screen relative flex flex-col items-center text-white">
      {/* Company Initial */}
      <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center mt-3 mb-4 cursor-pointer hover:bg-white/20">
        <span className="text-lg font-semibold text-white">
          {initial}
        </span>
      </div>

      {/* Navigation Icons */}
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Home Icon */}
        <Link 
          href="/workspace" 
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-md mb-2"
          title="Home"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>

        {/* More Options */}
        <button 
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-md"
          title="More options"
          aria-label="More options"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Profile Icon */}
      <div className="mb-4">
        <button 
          className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20"
          title="Profile"
          aria-label="Profile"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceLeftNav; 