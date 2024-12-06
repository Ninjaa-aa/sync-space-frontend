"use client";

import React from "react";
import WorkspaceLayout from "@/components/workspace/WorkspaceLayout";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";

const WorkspacePage = () => {
  return (
    <WorkspaceLayout>
      <WorkspaceHeader
        title="Workspace Dashboard"
        description="Welcome to your workspace dashboard"
      />
      <div className="mt-6">
        <div className="bg-white/30 p-8 rounded-lg shadow-lg">
          <p>Welcome to your workspace!</p>
          {/* Add more dashboard content here */}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspacePage;
