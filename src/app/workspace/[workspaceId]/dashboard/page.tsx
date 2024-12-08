// // src/app/workspace/[workspaceId]/dashboard/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { DashboardHeader } from '@/components/workspace/DashboardHeader';
// import { DashboardMetrics } from '@/components/workspace/DashboardMetrics';
// import { ChannelList } from '@/components/workspace/ChannelList';
// import { MemberList } from '@/components/workspace/MemberList';
// import { workspaceService } from '@/services/workspaceService';
// import type { WorkspaceData } from '@/types/workspace';

// export default function DashboardPage({ 
//   params: { workspaceId } 
// }: { 
//   params: { workspaceId: string } 
// }) {
//   const router = useRouter();
//   const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadWorkspace = async () => {
//       try {
//         const data = await workspaceService.getWorkspaceById(workspaceId);
//         setWorkspace(data);
//       } catch (err) {
//         setError('Failed to load workspace');
//         router.push('/');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadWorkspace();
//   }, [workspaceId, router]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!workspace) return null;

//   return (
//     <div className="min-h-screen bg-[#1a1d21]">
//       <DashboardHeader workspace={workspace} />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-12 gap-6">
//           {/* Main Content Area */}
//           <div className="col-span-8 space-y-6">
//             <DashboardMetrics workspace={workspace} />
//             <ChannelList 
//               channels={workspace.channels}
//               workspaceId={workspace.id}
//             />
//           </div>
          
//           {/* Sidebar */}
//           <div className="col-span-4 space-y-6">
//             <MemberList 
//               members={workspace.members}
//               pendingInvites={workspace.pendingInvites}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
