// src/components/workspace/steps/PlanStep.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { pricingPlans, Plan } from '@/data/plan';
import { workspaceService } from '@/services/workspaceService';
import type { 
  CreateWorkspaceDto, 
  Channel 
} from '@/types/workspace';
import { ChannelVisibility } from '@/types/workspace';

interface PlanStepProps {
  workspaceName: string;
  adminName: string;
  adminPhoto: File | null;
  channels: string[];
  pendingInvites: string[];
  onSelectPlan: (plan: Plan) => void;
  error?: string;
}

export const PlanStep = ({ 
  workspaceName, 
  adminName,
  adminPhoto,
  channels,
  pendingInvites,
  error: propError
}: PlanStepProps) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('free');
  const [billingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(propError);

  const formatChannels = (channelNames: string[]): Channel[] => {
    return channelNames.map(channel => ({
      name: channel.toLowerCase().trim().replace(/\s+/g, '-'),
      visibility: ChannelVisibility.PUBLIC,
      description: `Channel for ${channel}`
    }));
  };

  const handleContinue = async () => {
    const selectedPlan = pricingPlans.find(plan => plan.id === selectedPlanId);
    if (!selectedPlan) return;

    setIsCreating(true);
    setError('');

    try {
      // Create workspace data with proper typing
      const workspaceData: CreateWorkspaceDto = {
        name: workspaceName,
        adminName,
        channels: formatChannels(channels),
        pendingInvites,
        ...(adminPhoto && { adminPhoto }),
        plan: {
          id: selectedPlan.id,
          name: selectedPlan.name,
          billingPeriod
        }
      };

      const response = await workspaceService.createWorkspace(workspaceData);

      // Save workspace data
      const workspaceLocalData = {
        id: response.workspaceId,
        name: workspaceName,
        adminName,
        channels,
        photoUrl: response.photoUrl,
        plan: selectedPlan.name
      };

      localStorage.setItem('currentWorkspaceId', response.workspaceId);
      localStorage.setItem('workspaceData', JSON.stringify(workspaceLocalData));

      router.push(`/workspace/${response.workspaceId}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workspace');
    } finally {
      setIsCreating(false);
    }
  };

  // Rest of your component remains the same
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-8 flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {selectedPlanId === 'free' 
            ? 'Start with the basics and upgrade when you need to'
            : 'Your workspace will be set up with advanced features'
          }
        </p>
        <Button 
          onClick={handleContinue}
          disabled={isCreating}
          className="min-w-[200px]"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Your Workspace...
            </>
          ) : (
            `Get Started with ${selectedPlanId.charAt(0).toUpperCase() + selectedPlanId.slice(1)}`
          )}
        </Button>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}
    </div>
  );
};