// src/components/workspace/steps/AdminProfileStep.tsx
import { StepProps } from '@/types/workspace';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';
import Image from 'next/image';

interface AdminProfileStepProps extends StepProps {
  onPhotoUpload: (file: File) => void;
}

export const AdminProfileStep = ({ formData, onChange, onPhotoUpload, onNext, error }: AdminProfileStepProps) => (
  <div className="max-w-[520px] mx-auto">
    <h1 className="text-[32px] text-white font-bold leading-tight">
      What&apos;s your name?
    </h1>
    <p className="text-[#989a9b] text-base mt-4">
      Help your teammates recognize you.
    </p>
    <div className="mt-8 space-y-6">
      <input
        type="text"
        value={formData.adminName}
        onChange={(e) => onChange('adminName', e.target.value)}
        className="w-full bg-transparent text-white border border-[#565856] rounded px-4 py-3 focus:outline-none focus:border-[#1264A3] focus:ring-1 focus:ring-[#1264A3] transition-all"
        placeholder="Hammad"
        maxLength={50}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <div>
        <label className="block text-white mb-2">Profile photo (optional)</label>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {formData.photoPreview ? (
              <Image src={formData.photoPreview} alt="Preview" layout="fill" objectFit="cover" />
            ) : (
              <span className="text-gray-400">{typeof formData.adminName === 'string' ? formData.adminName[0]?.toUpperCase() : ''}</span>
            )}
          </div>
          <label className="cursor-pointer bg-transparent hover:bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 transition-colors">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onPhotoUpload(file);
              }}
            />
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload Photo
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={typeof formData.adminName !== 'string' || !formData.adminName.trim()}>
          Next
        </Button>
      </div>
    </div>
  </div>
);