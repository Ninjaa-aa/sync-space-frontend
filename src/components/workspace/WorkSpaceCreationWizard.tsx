import React, { useState, useEffect } from 'react';
import { Home, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WorkspaceNameStep } from '@/components/workspace/steps/WorkspaceNameStep';
import { AdminProfileStep } from '@/components/workspace/steps/AdminProfileStep';
import { TeamInviteStep } from '@/components/workspace/steps/TeamInviteStep';
import { ChannelStep } from '@/components/workspace/steps/ChannelStep';
import { Avatar } from '@/components/ui/Avatar';
import { Plan } from '@/data/plan';
import { PlanStep } from '@/components/workspace/steps/PlanStep';

// Helper to generate workspace ID
const generateUniqueId = () => 'ws-' + Math.random().toString(36).substring(2, 15);

const WorkspaceCreationWizard = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceId, setWorkspaceId] = useState('');
  
  interface FormData {
  name: string;
  adminName: string;
  adminPhoto: File | null ;
  photoPreview: string;
  pendingInvites: string[];
  channels: string[];
  selectedPlan: Plan | null;
  setupComplete: boolean;
}
  
  const [formData, setFormData] = useState<FormData>({
    name: localStorage.getItem('workspaceName') || '',
    adminName: localStorage.getItem('adminName') || '',
    adminPhoto: null,
    photoPreview: '',
    pendingInvites: [],
    channels: [],
    selectedPlan: null,
    setupComplete: false
  });
  const [, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate workspace ID when step 3 is reached
  useEffect(() => {
    if (currentStep === 3 && !workspaceId) {
      setWorkspaceId(generateUniqueId());
    }
  }, [currentStep, workspaceId]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name') {
      localStorage.setItem('workspaceName', value);
    } else if (name === 'adminName') {
      localStorage.setItem('adminName', value);
    }
    setError('');
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        adminPhoto: file,
        photoPreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateWorkspaceName = (name: string): boolean => {
    if (!name.trim()) {
      setError('Workspace name is required');
      return false;
    }

    if (name.trim().length < 3) {
      setError('Workspace name must be at least 3 characters long');
      return false;
    }

    if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
      setError('Workspace name can only contain letters, numbers, spaces, and hyphens');
      return false;
    }

    return true;
  };

  const handlePlanSelect = (plan: Plan) => {
    setFormData(prev => ({
        ...prev,
        selectedPlan: plan
    }));
    handleNext();
    };

  const validateAdminName = (name: string): boolean => {
    if (!name.trim()) {
      setError('Your name is required');
      return false;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    setError('');

    if (currentStep === 1 && validateWorkspaceName(formData.name)) {
        setCurrentStep(2);
    } else if (currentStep === 2 && validateAdminName(formData.adminName)) {
        setCurrentStep(3);
    } else if (currentStep === 3) {
        setCurrentStep(4);
    } else if (currentStep === 4) {
        setCurrentStep(5); // Changed from handleWorkspaceSetup to going to step 5
    } else if (currentStep === 5) {
        handleWorkspaceSetup(); // Now call handleWorkspaceSetup in step 5
    }
    };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleInvite = (emails: string[]) => {
    setFormData(prev => ({
      ...prev,
      pendingInvites: emails
    }));
    handleNext();
  };

  const handleChannelAdd = (channel: string) => {
    if (!formData.channels.includes(channel)) {
      setFormData(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    }
  };

  const handleWorkspaceSetup = async () => {
    try {
      setIsLoading(true);
      
      // Mark setup as complete
      setFormData(prev => ({
        ...prev,
        setupComplete: true
      }));

      // Save workspace data
      const workspaceData = {
        id: workspaceId,
        name: formData.name,
        adminName: formData.adminName,
        adminPhoto: formData.photoPreview,
        channels: formData.channels,
        members: formData.pendingInvites,
        setupComplete: true
      };
      localStorage.setItem('workspaceData', JSON.stringify(workspaceData));

      // Send invites now that setup is complete
      if (formData.pendingInvites.length > 0) {
        // API call to send invites would go here
        console.log('Sending invites to:', formData.pendingInvites);
      }
      
      router.push('/workspace/dashboard');
    } catch  {
      setError('Failed to complete workspace setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInviteLink = () => {
    if (!workspaceId) return '';
    return `${window.location.origin}/workspace/invite/${workspaceId}`;
  };

  const renderSidebarContent = () => {
    return (
      <div className="space-y-6 p-4">
        {formData.name && (
          <div className="flex items-center space-x-2 text-gray-300 px-2 py-1 rounded hover:bg-[#27242C] cursor-pointer">
            <Home size={18} />
            <span>Home</span>
          </div>
        )}
        
        {currentStep >= 3 && (
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Direct messages</h3>
            {formData.pendingInvites.map((email, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md">
                <Avatar className="w-6 h-6 bg-gray-600">
                  <span className="text-xs">{email[0].toUpperCase()}</span>
                </Avatar>
                <span className="text-gray-300 text-sm">{email.split('@')[0]}</span>
              </div>
            ))}
          </div>
        )}
        
        {currentStep >= 4 && (
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Channels</h3>
            {formData.channels.map((channel, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-md">
                <Hash size={18} className="text-gray-400" />
                <span className="text-gray-300 text-sm">{channel}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Icon Sidebar - 5% */}
      <div className="w-[5%] bg-[#19171D] border-r border-gray-700 p-4">
        <Home size={24} className="text-gray-400 hover:text-white cursor-pointer mb-4" />
        {formData.name && (
          <Avatar className="w-8 h-8 bg-purple-600">
            <span className="text-sm font-semibold">
              {formData.name[0].toUpperCase()}
            </span>
          </Avatar>
        )}
      </div>

      {/* Navigation Sidebar - 25% */}
      <div className="w-[25%] bg-[#19171D] border-r border-gray-700">
        {formData.name && (
          <div className="p-4">
            <span className="text-white font-medium text-lg block mb-4">
              {formData.name}
            </span>
            {renderSidebarContent()}
          </div>
        )}
      </div>

      {/* Main Content - 70% */}
      <div className="w-[70%] bg-[#1a1d21] p-8">
        <div className="flex justify-between items-center mb-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white"
            >
              Back
            </button>
          )}
          <div className="text-gray-400 text-sm">
            Step {currentStep} of 5
          </div>
        </div>

        {(() => {
          const stepProps = {
            formData,
            onChange: handleInputChange,
            onNext: handleNext,
            onBack: handleBack,
            error,
            workspaceId,
            getInviteLink
          };

          switch (currentStep) {
            case 1:
              return <WorkspaceNameStep {...stepProps} />;
            case 2:
              return <AdminProfileStep {...stepProps} onPhotoUpload={handlePhotoUpload} />;
            case 3:
              return (
                <TeamInviteStep
                  {...stepProps}
                  onInvite={handleInvite}
                  workspaceName={formData.name}
                />
              );
                case 4:
                return (
                    <ChannelStep
                    {...stepProps}
                    onChannelAdd={handleChannelAdd}
                    channels={formData.channels}
                    workspaceName={formData.name}
                    onNext={() => setCurrentStep(5)} // Explicitly pass onNext
                    />
                );
                case 5:
                return (
                    <PlanStep
                    workspaceName={formData.name}
                    adminName={formData.adminName}
                    adminPhoto={formData.adminPhoto}
                    channels={formData.channels}
                    pendingInvites={formData.pendingInvites}
                    onSelectPlan={handlePlanSelect}
                    error={error}
                    />
                );
            default:
              return null;
          }
        })()}

        {error && (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceCreationWizard;