"use client";

import React, { useState, useEffect } from "react";
import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";
import WorkspaceSidebar from "@/components/workspace/WorkspaceSidebar";
import WorkspaceLeftNav from "@/components/workspace/WorkspaceLeftNav";

const CreateWorkspacePage = () => {
  const [mounted, setMounted] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<{
    email: string;
    initial: string;
    username: string;
  }[]>([]);
  const [channels, setChannels] = useState<{ name: string; id: string; }[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInvitedEmailsChange = (emails: string[]) => {
    const directMessages = emails.map(email => ({
      email,
      initial: email.split('@')[0].charAt(0).toUpperCase(),
      username: email.split('@')[0]
    }));
    setInvitedEmails(directMessages);
  };

  const handleChannelsChange = (newChannels: string[]) => {
    const channelObjects = newChannels.map(channel => ({
      name: channel,
      id: channel.replace(/\s+/g, '-')
    }));
    setChannels(channelObjects);
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-[5%] min-w-[80px]">
        <WorkspaceLeftNav workspaceName={workspaceName} />
      </div>
      <div className="w-[25%] min-w-[250px]">
        <WorkspaceSidebar
          items={[]}
          workspaceName={workspaceName}
          showCreateButton={false}
          directMessages={invitedEmails}
          channels={channels}
        />
      </div>
      <div className="flex-1">
        <main className="p-6">
          <CreateWorkspaceForm 
            onNameChange={setWorkspaceName}
            onInvitedEmailsChange={handleInvitedEmailsChange}
            onChannelsChange={handleChannelsChange}
          />
        </main>
      </div>
    </div>
  );
};

export default CreateWorkspacePage;
