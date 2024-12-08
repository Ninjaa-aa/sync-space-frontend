// src/components/profile/EditFieldModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/app/auth/context/AuthContext';
import { authApi } from '@/lib/auth';

interface EditFieldModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  type: 'phone' | 'date' | 'text';
  placeholder: string;
  initialValue?: string;
  fieldName: 'phoneNumber' | 'startDate' | 'pronunciation';
}

export const EditFieldModal = ({
  title,
  isOpen,
  onClose,
  type,
  placeholder,
  initialValue = '',
  fieldName
}: EditFieldModalProps) => {
  const [value, setValue] = useState<string>(String(initialValue || ''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateUserProfile } = useAuth();

  if (!isOpen) return null;

  const validatePhone = (phone: string): boolean => {
    return /^\+?[1-9]\d{1,14}$/.test(phone);
  };

  const formatValue = (val: string): string => {
    // Ensure we're working with a string and remove any extra whitespace
    return typeof val === 'string' ? val.trim() : String(val).trim();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');

      const formattedValue = formatValue(value);

      // Validate based on field type
      if (fieldName === 'phoneNumber') {
        if (!validatePhone(formattedValue)) {
          setError('Please enter a valid phone number');
          return;
        }
      }

      // Prepare update data based on field type
      let updateData: Partial<{ phoneNumber: string; startDate: string; pronunciation: { name: string } }> = {};
      
      switch (fieldName) {
        case 'phoneNumber':
          updateData = { phoneNumber: formattedValue };
          break;
        
        case 'startDate':
          const date = new Date(formattedValue);
          if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
          }
          updateData = { startDate: date.toISOString() };
          break;
        
        case 'pronunciation':
          updateData = { 
            pronunciation: { 
              name: formattedValue 
            } 
          };
          break;
        
        default:
          throw new Error('Invalid field type');
      }

      // Log update data for debugging
      console.log('Updating profile with:', updateData);

      // Make API call
      await authApi.patch('/users/profile', updateData);
      await updateUserProfile();
      onClose();
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Clear any existing errors when user types
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1d21] rounded-lg w-full max-w-md p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <input
            type={type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full bg-[#222529] text-white px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !value.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};