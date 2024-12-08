// src/components/workspace/steps/WorkspaceNameStep.tsx
import { StepProps } from '@/types/workspace';
import { Button } from '@/components/ui/Button';

export const WorkspaceNameStep = ({ formData, onChange, onNext, error }: StepProps) => (
  <div className="max-w-[520px] mx-auto">
    <h1 className="text-[32px] text-white font-bold leading-tight">
      What&apos;s the name of your company or team?
    </h1>
    <p className="text-[#989a9b] text-base mt-4">
      This will be the name of your Workspace.
    </p>
    <div className="mt-8">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => onChange('name', e.target.value)}
        maxLength={48}
        className="w-full bg-transparent text-white border border-[#565856] rounded px-4 py-3 focus:outline-none focus:border-[#1264A3] focus:ring-1 focus:ring-[#1264A3] transition-all"
        placeholder="Ex: Acme Corp or Acme Team"
      />
      <div className="flex justify-between mt-2">
        <span className="text-gray-400 text-sm">
          {48 - (formData.name.length || 0)} characters remaining
        </span>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
      <div className="flex justify-end mt-8">
        <Button onClick={onNext} disabled={!formData.name.trim()}>
          Next
        </Button>
      </div>
    </div>
  </div>
);