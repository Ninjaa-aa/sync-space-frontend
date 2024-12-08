import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ChannelStepProps {
  workspaceName: string;
  onChannelAdd: (channel: string) => void;
  onNext?: () => void;
  channels: string[];
  error: string;
}

export const ChannelStep = ({ 
  onChannelAdd,
  onNext,
  channels,
  error 
}: ChannelStepProps) => {
  const [channelInput, setChannelInput] = useState('');

  const handleAddChannel = () => {
    if (channelInput.trim()) {
      onChannelAdd(channelInput.trim().toLowerCase());
      setChannelInput('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">
        What&apos;s your team working on right now?
      </h1>
      <p className="text-gray-400 mb-8">
        This could be anything: a project, campaign, event, or the deal you&apos;re trying to close.
      </p>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              value={channelInput}
              onChange={(e) => setChannelInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddChannel();
                }
              }}
              placeholder="Ex: Q4 budget, autumn campaign"
              maxLength={80}
              className="bg-transparent border-gray-700 text-white"
            />
            <p className="mt-1 text-sm text-gray-500">
              {80 - channelInput.length} characters remaining
            </p>
          </div>
          <Button onClick={handleAddChannel}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="flex justify-start mt-8">
          <Button onClick={onNext} disabled={channels.length === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};