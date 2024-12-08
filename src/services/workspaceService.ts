// src/services/workspaceService.ts
import { authApi } from "@/lib/auth";
import {
  CreateWorkspaceDto,
  WorkspaceResponse,
  Channel,
  ChannelType,
} from "@/types/workspace";

class WorkspaceService {
  async createWorkspace(data: CreateWorkspaceDto): Promise<WorkspaceResponse> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formattedChannels = (data.channels || []).map((channel) => ({
        name: typeof channel === "string"
          ? (channel as string).toLowerCase().trim().replace(/\s+/g, "-")
          : channel.name.toLowerCase().trim().replace(/\s+/g, "-"),
        type: ChannelType.PUBLIC,
        description: typeof channel === "string"
          ? `Channel for ${channel}`
          : channel.description || `Channel for ${channel.name}`,
      }));

      const payload = {
        name: data.name.trim(),
        adminName: data.adminName.trim(),
        channels: formattedChannels,
        pendingInvites: data.pendingInvites?.map(email => email.trim()),
        plan: {
          id: data.plan?.id || '',
          name: data.plan?.name || '',
          billingPeriod: data.plan?.billingPeriod || 'monthly'
        }
      };

      console.log('Formatted workspace payload:', payload);

      const response = await authApi.post<WorkspaceResponse>(
        "/workspaces",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Workspace creation error:', error);
      if (error instanceof Error && (error as { response?: { status?: number } }).response?.status === 401) {
        localStorage.removeItem('accessToken');
        throw new Error('Your session has expired. Please login again.');
      }
      if (error instanceof Error && 'response' in error) {
        throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create workspace');
      }
      throw new Error('Failed to create workspace');
    }
  }

  async createChannels(workspaceId: string, channels: string[]): Promise<void> {
    try {
      const formattedChannels: Channel[] = channels.map((channel) => ({
        name: channel.toLowerCase().trim().replace(/\s+/g, "-"),
        type: ChannelType.PUBLIC,
        description: `Channel for ${channel}`,
      }));

      await authApi.post(`/workspaces/${workspaceId}/channels`, {
        channels: formattedChannels,
      });
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
        console.error("Channel creation error:", (error as { response?: { data?: { message?: string } } }).response?.data || error);
      } else {
        console.error("Channel creation error:", error);
      }
      throw new Error(
        (error as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to create channels"
      );
    }
  }

  async sendInvites(workspaceId: string, emails: string[]): Promise<void> {
    try {
      await authApi.post(`/workspaces/${workspaceId}/invites`, {
        emails: emails.map((email) => email.trim()),
      });
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        console.error("Invite sending error:", (error as { response?: { data?: { message?: string } } }).response?.data || error);
        throw new Error(
          (error as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to send invites"
        );
      } else {
        console.error("Invite sending error:", error);
        throw new Error("Failed to send invites");
      }
    }
  }
}

export const workspaceService = new WorkspaceService();
