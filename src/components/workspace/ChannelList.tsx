// src/components/workspace/ChannelList.tsx
import { Hash, Lock } from 'lucide-react';
import type { Channel } from '@/types/workspace';

interface ChannelListProps {
  channels: Channel[];
  workspaceId: string;
}

export function ChannelList({ channels }: ChannelListProps) {
  return (
    <div className="bg-[#222529] rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Channels</h2>
      <div className="space-y-2">
        {channels.map((channel) => (
          <div
            key={channel.name}
            className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer"
          >
            {channel.visibility === 'private' ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Hash className="h-4 w-4" />
            )}
            <span>{channel.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}