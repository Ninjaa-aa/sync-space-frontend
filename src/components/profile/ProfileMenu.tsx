import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/app/auth/context/AuthContext';
import {Circle, X, Smile } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileSidebar } from './ProfileSidebar';

// Status options
const STATUS_OPTIONS = [
  { emoji: '💻', text: 'Working remotely', duration: 'Today' },
  { emoji: '🤒', text: 'Out sick', duration: 'Today' },
  { emoji: '📅', text: 'In a meeting', duration: '1 hour' },
  { emoji: '🚗', text: 'Commuting', duration: '30 minutes' },
  { emoji: '🌴', text: 'Vacationing', duration: "Don't clear" },
  { emoji: '🏠', text: 'Working from home', duration: 'Today' }
];

interface Status {
  emoji: string;
  text: string;
  duration: string;
  expiresAt?: Date | null;
}

const ClearStatusDialog = ({ 
  isOpen, 
  onClose, 
  onClear,
  currentStatus 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  currentStatus: Status;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1d21] rounded-lg w-full max-w-md p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <span>{currentStatus.emoji}</span>
          <span className="text-white">{currentStatus.text}</span>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Clear Status
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusDialog = ({ 
  isOpen, 
  onClose, 
  onSetStatus, 
  currentStatus 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSetStatus: (status: Status) => void;
  currentStatus: Status | null;
}) => {
  const [statusText, setStatusText] = useState(currentStatus?.text || '');
  const [selectedDuration, setSelectedDuration] = useState('Today');
  const [selectedEmoji, setSelectedEmoji] = useState(currentStatus?.emoji || '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1d21] rounded-lg w-full max-w-md p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Set a status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 bg-[#222529] p-2 rounded">
            <span className="text-xl">{selectedEmoji}</span>
            <input
              type="text"
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="What's your status?"
              className="bg-transparent text-white w-full focus:outline-none"
            />
            <button className="text-gray-400 hover:text-white">
              <Smile size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.text}
              onClick={() => {
                setStatusText(option.text);
                setSelectedEmoji(option.emoji);
                setSelectedDuration(option.duration);
              }}
              className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded text-left text-gray-200"
            >
              <span>{option.emoji}</span>
              <span>{option.text}</span>
              <span className="ml-auto text-sm text-gray-400">{option.duration}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSetStatus({
                emoji: selectedEmoji,
                text: statusText,
                duration: selectedDuration,
                expiresAt: selectedDuration === "Don't clear" ? null : new Date(Date.now() + 24 * 60 * 60 * 1000)
              });
              onClose();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleSetStatus = (newStatus: Status) => {
    setStatus(newStatus);
    setShowDropdown(false);
    setShowStatusDialog(false);
  };

  const handleClearStatus = () => {
    setStatus(null);
    setShowClearDialog(false);
    setShowDropdown(false);
  };

  const handleStatusClick = () => {
    if (status) {
      setShowClearDialog(true);
    } else {
      setShowStatusDialog(true);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700/50 transition-colors"
        >
          <Avatar className="h-8 w-8 bg-purple-600">
            {user?.firstName?.[0] || 'U'}
          </Avatar>
        </button>

        {showDropdown && (
          <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#1a1d21] rounded-lg shadow-lg border border-gray-700 py-2">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10 bg-purple-600">
                  {user?.firstName?.[0] || 'U'}
                </Avatar>
                <div>
                  <div className="text-white font-medium">{user?.firstName} {user?.lastName}</div>
                  <div className="text-sm text-gray-400">Active</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 my-2" />

            <button 
              onClick={handleStatusClick}
              className="w-full px-4 py-2 text-left hover:bg-gray-700/50 text-gray-300"
            >
              {status ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{status.emoji}</span>
                    <span>{status.text}</span>
                  </div>
                  <span className="text-sm text-gray-400">Clear status</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-green-500" />
                  <span>Update your status</span>
                </div>
              )}
            </button>

            <button onClick={() => setShowProfileSidebar(true)} className="w-full px-4 py-2 text-left hover:bg-gray-700/50 text-gray-300">
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-700/50 text-gray-300">
              Preferences
            </button>

            <div className="border-t border-gray-700 my-2" />

            <button onClick={logout} className="w-full px-4 py-2 text-left hover:bg-gray-700/50 text-gray-300">
              Sign out
            </button>
          </div>
        )}
      </div>

        {status && showClearDialog && (
                <ClearStatusDialog
                isOpen={showClearDialog}
                onClose={() => setShowClearDialog(false)}
                onClear={handleClearStatus}
                currentStatus={status}
                />
            )}

            {!status && showStatusDialog && (
                <StatusDialog
                isOpen={showStatusDialog}
                onClose={() => setShowStatusDialog(false)}
                onSetStatus={handleSetStatus}
                currentStatus={status}
                />
            )}

        {showProfileSidebar && (
        <ProfileSidebar
            onClose={() => setShowProfileSidebar(false)}
            status={status}
            onEditStatus={() => {
            setShowProfileSidebar(false);
            setShowStatusDialog(true);
            }}
        />
        )}
    </>
  );
}