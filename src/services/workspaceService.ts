// src/services/workspaceService.ts
import { authApi } from '@/lib/auth';
import { 
  CreateWorkspaceDto, 
  WorkspaceResponse, 
  Channel,
  ChannelVisibility 
} from '@/types/workspace';

class WorkspaceService {
  async createWorkspace(data: CreateWorkspaceDto): Promise<WorkspaceResponse> {
    try {
      // Create FormData object
      const formData = new FormData();

      // Format the channels data properly
      const formattedChannels: Channel[] = (data.channels || []).map(channel => ({
        name: typeof channel === 'string' 
          ? (channel as string).toLowerCase().trim().replace(/\s+/g, '-')
          : channel.name,
        visibility: ChannelVisibility.PUBLIC,
        description: typeof channel === 'string' 
          ? `Channel for ${channel}`
          : channel.description
      }));

      // Add basic workspace data
      formData.append('name', data.name.trim());
      formData.append('adminName', data.adminName.trim());
      formData.append('channels', JSON.stringify(formattedChannels));
      
      if (data.pendingInvites?.length) {
        formData.append('pendingInvites', JSON.stringify(data.pendingInvites));
      }

      if (data.adminPhoto instanceof File) {
        formData.append('adminPhoto', data.adminPhoto);
      }

      if (data.plan) {
        formData.append('plan', JSON.stringify(data.plan));
      }

      const response = await authApi.post<WorkspaceResponse>('/workspaces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('Workspace creation error:', { 
        error: error.response?.data || error,
        message: error.message
      });
      throw new Error(error.response?.data?.message || 'Failed to create workspace');
    }
  }

  async createChannels(workspaceId: string, channels: string[]): Promise<void> {
    try {
      const formattedChannels: Channel[] = channels.map(channel => ({
        name: channel.toLowerCase().trim().replace(/\s+/g, '-'),
        visibility: ChannelVisibility.PUBLIC,
        description: `Channel for ${channel}`
      }));

      await authApi.post(`/workspaces/${workspaceId}/channels`, {
        channels: formattedChannels
      });
    } catch (error: any) {
      console.error('Channel creation error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create channels');
    }
  }

  async sendInvites(workspaceId: string, emails: string[]): Promise<void> {
    try {
      await authApi.post(`/workspaces/${workspaceId}/invites`, {
        emails: emails.map(email => email.trim())
      });
    } catch (error: any) {
      console.error('Invite sending error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to send invites');
    }
  }
}

export const workspaceService = new WorkspaceService();