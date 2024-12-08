// src/components/workspace/MemberList.tsx
import { Avatar } from '@/components/ui/Avatar';
import type { Member } from '@/types/workspace';

interface MemberListProps {
  members: Member[];
  pendingInvites: string[];
}

export function MemberList({ members, pendingInvites }: MemberListProps) {
  return (
    <div className="bg-[#222529] rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Members</h2>
      
      <div className="space-y-4">
        {members.map((member) => (
          <div 
            key={member.userId}
            className="flex items-center space-x-3"
          >
            <Avatar className="h-8 w-8">
              {member.name[0].toUpperCase()}
            </Avatar>
            <div>
              <p className="text-white text-sm">{member.name}</p>
              <p className="text-gray-400 text-xs">{member.role}</p>
            </div>
          </div>
        ))}
        
        {pendingInvites.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Pending Invites
            </h3>
            {pendingInvites.map((email) => (
              <div 
                key={email}
                className="flex items-center space-x-3 py-2"
              >
                <Avatar className="h-8 w-8 bg-gray-700">
                  {email[0].toUpperCase()}
                </Avatar>
                <p className="text-gray-300 text-sm">{email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}