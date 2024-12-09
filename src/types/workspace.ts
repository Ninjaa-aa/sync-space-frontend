// src/types/workspace.ts
import { Plan } from '@/data/plan';

// Enums for Workspace and Channel
export enum WorkspaceStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ChannelType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  GENERAL = 'GENERAL'
}

// Interfaces for Channels, Workspace Creation, and Response
export interface Channel {
  name: string; // Required, unique identifier for the channel
  type: ChannelType; // 'PUBLIC' or 'PRIVATE'
  description?: string; // Optional, additional details about the channel
}

export interface PlanDto {
  id: string; // Plan ID
  name: string; // Plan name
  billingPeriod: 'monthly' | 'yearly'; // Billing cycle
}

export interface CreateWorkspaceDto {
  name: string; // Required workspace name
  adminName: string; // Required admin name
  status?: WorkspaceStatus; // Optional, defaults to 'draft'
  adminPhoto?: File; // Optional, admin's photo file
  channels?: Channel[]; // Optional, array of channels
  pendingInvites?: string[]; // Optional, list of email invites
  plan?: PlanDto; // Optional, selected plan details
}

export interface WorkspaceResponse {
  workspaceId: string; // Unique ID for the workspace
  name: string; // Workspace name
  slug: string; // URL-friendly identifier
  status: WorkspaceStatus; // Workspace status
  photoUrl?: string; // Optional, URL for admin photo
}

// Form Data Interfaces for UI Components
export interface WorkspaceFormData {
  name: string; // Workspace name input
  adminName: string; // Admin name input
  adminPhoto: File | null; // Admin photo file input
  photoPreview: string; // Preview of the photo
  pendingInvites: string[]; // Email invites array
  channels: Channel[]; // Array of channels
  selectedPlan: Plan | null; // Selected plan (if any)
  setupComplete: boolean; // Indicates if setup is complete
  status: WorkspaceStatus; // Current status of the workspace
}

// Interface for a Workspace Member
export interface Member {
  userId: string; // Unique user ID
  name: string; // Member's name
  role: string; // Role within the workspace (e.g., admin, member)
}

// Props for Step Components (Used in Forms or Wizards)
export interface StepProps {
  formData: {
    name: string; // Workspace name
    adminName: string | number | readonly string[] | undefined; // Admin name input
    photoPreview: string | File; // Photo preview (file or URL)
  };
  onChange: (field: string, value: string) => void; // Function to handle field changes
  onNext: () => void; // Callback for proceeding to the next step
  error?: string; // Optional error mesage
}

