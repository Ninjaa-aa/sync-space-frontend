import React, { useState } from 'react';
import { Link2, X, Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TeamInviteStepProps {
  workspaceName: string;
  onInvite: (emails: string[]) => void;
  error?: string;
}

export const TeamInviteStep = ({ 
  workspaceName, 
  onInvite,
  error
}: TeamInviteStepProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [showInviteLinkMessage, setShowInviteLinkMessage] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailAdd = () => {
    if (!emailInput.trim()) return;

    const newEmails = emailInput
      .split(/[,\s]+/)
      .map(email => email.trim())
      .filter(email => {
        const isValid = email && validateEmail(email);
        return isValid && !emails.includes(email); // Prevent duplicates
      });

    if (newEmails.length) {
      setEmails(prev => [...prev, ...newEmails]);
      setEmailInput('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(prev => prev.filter(email => email !== emailToRemove));
  };

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/workspace/invite/${encodeURIComponent(workspaceName)}`;
    try {
      await navigator.clipboard.writeText(link);
      setShowInviteLinkMessage(true);
      setTimeout(() => setShowInviteLinkMessage(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEmailAdd();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">
        Who else is on the {workspaceName} team?
      </h1>
      <p className="text-gray-400 mb-8">
        Add coworkers by email to collaborate in your workspace.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Add coworkers by email
          </label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ex: ellis@gmail.com, maria@gmail.com"
                className="bg-transparent border-gray-700 text-white"
                aria-label="Email addresses"
              />
              <p className="mt-1 text-sm text-gray-500">
                Press Enter or add commas between email addresses
              </p>
            </div>
            <Button onClick={handleEmailAdd}>Add</Button>
          </div>
        </div>

        {emails.length > 0 && (
          <div className="flex flex-wrap gap-2" role="list" aria-label="Added emails">
            {emails.map((email) => (
              <div
                key={email}
                className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full"
              >
                <span className="text-sm">{email}</span>
                <button
                  onClick={() => removeEmail(email)}
                  className="text-gray-400 hover:text-white"
                  aria-label={`Remove ${email}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex items-center space-x-2"
          >
            <Link2 className="h-4 w-4" />
            <span>Copy Invite Link</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://contacts.google.com', '_blank', 'noopener,noreferrer')}
              className="flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Add from Google Contacts</span>
            </Button>

            <Button 
              onClick={() => onInvite(emails)}
              disabled={emails.length === 0}
            >
              Next
            </Button>
          </div>
        </div>

        {showInviteLinkMessage && (
          <div className="mt-4 p-4 bg-gray-800 rounded-md" role="alert">
            <p className="text-gray-300">Invite link copied to clipboard!</p>
            <p className="text-sm text-gray-500 mt-1">
              This link will be active once workspace setup is complete.
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm mt-4" role="alert">{error}</p>
        )}
      </div>
    </div>
  );
};