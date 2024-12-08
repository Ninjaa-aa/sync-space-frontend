// src/components/profile/ProfileSidebar.tsx
import React, { useState } from 'react';
import { useAuth } from '@/app/auth/context/AuthContext';
import { ChevronDown, Edit, Plus, Mail, Phone, Calendar } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { EditFieldModal } from './EditFieldModal';

interface FieldEdit {
  type: 'phone' | 'date' | 'text';
  field: 'phoneNumber' | 'startDate' | 'pronunciation';
  title: string;
  placeholder: string;
}

interface ProfileSidebarProps {
  onClose: () => void;
  status: { emoji: string; text: string } | null;
  onEditStatus: () => void;
}

export function ProfileSidebar({ onClose }: ProfileSidebarProps) {
  const { user } = useAuth();
  const [editField, setEditField] = useState<FieldEdit | null>(null);

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEditField = (field: FieldEdit) => {
    setEditField(field);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[calc(100vw-5rem)] max-w-md bg-[#1a1d21] shadow-xl border-l border-gray-700 overflow-y-auto z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Profile</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <ChevronDown className="h-6 w-6 transform rotate-90" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="p-6 space-y-8">
        {/* Profile Picture & Name */}
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="h-24 w-24 bg-purple-600 text-2xl">
              {user?.firstName?.[0] || 'U'}
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
              <Edit className="h-4 w-4 text-white" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {user?.firstName} {user?.lastName}
          </h1>
          <button 
            onClick={() => handleEditField({
              type: 'text',
              field: 'pronunciation',
              title: 'Add name pronunciation',
              placeholder: 'Enter name pronunciation'
            })}
            className="text-blue-400 hover:text-blue-300"
          >
            + Add name pronunciation
          </button>
        </div>

        {/* Status Section */}
        <div className="space-y-2">
          {/* Status content */}
        </div>

        {/* Contact Information */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">Contact information</h3>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <a href={`mailto:${user?.email}`} className="text-blue-400 hover:text-blue-300">
                {user?.email}
              </a>
            </div>

            {/* Phone */}
            {user?.phoneNumber ? (
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-white">{user.phoneNumber}</span>
                <button 
                  onClick={() => handleEditField({
                    type: 'phone',
                    field: 'phoneNumber',
                    title: 'Edit Phone Number',
                    placeholder: 'Enter phone number'
                  })}
                  className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300"
                >
                  <Edit size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEditField({
                  type: 'phone',
                  field: 'phoneNumber',
                  title: 'Add Phone Number',
                  placeholder: 'Enter phone number'
                })}
                className="flex items-center text-blue-400 hover:text-blue-300 space-x-2"
              >
                <Plus size={16} />
                <span>Add Phone</span>
              </button>
            )}
          </div>
        </div>

        {/* About Me */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">About me</h3>
          </div>

          {user?.startDate ? (
            <div className="flex items-center space-x-3 group">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-white">Started on {formatDate(user.startDate)}</span>
              <button 
                onClick={() => handleEditField({
                  type: 'date',
                  field: 'startDate',
                  title: 'Edit Start Date',
                  placeholder: 'Select start date'
                })}
                className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300"
              >
                <Edit size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEditField({
                type: 'date',
                field: 'startDate',
                title: 'Add Start Date',
                placeholder: 'Select start date'
              })}
              className="flex items-center text-blue-400 hover:text-blue-300 space-x-2"
            >
              <Plus size={16} />
              <span>Add Start Date</span>
            </button>
          )}
        </div>
      </div>

      {/* Edit Field Modal */}
      {editField && (
        <EditFieldModal
          title={editField.title}
          isOpen={true}
          onClose={() => setEditField(null)}
          type={editField.type}
          placeholder={editField.placeholder}
          initialValue={user?.[editField.field] as string || ''}
          fieldName={editField.field}
        />
      )}
    </div>
  );
}