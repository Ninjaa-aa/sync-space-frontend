// src/services/profileService.ts
import { authApi } from "@/lib/auth";

export interface ProfileUpdateDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  startDate?: string;
  pronunciation?: {
    name?: string;
    recording?: string;
  };
}

export const profileService = {
  async updateProfile(data: Partial<ProfileUpdateDto>) {
    try {
      const response = await authApi.patch('/users/profile', data);
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  async updatePhoneNumber(phoneNumber: string) {
    try {
      const response = await authApi.patch('/users/profile', { phoneNumber });
      return response.data;
    } catch (error) {
      console.error('Phone number update error:', error);
      throw error;
    }
  },

  async updateStartDate(startDate: string) {
    try {
      const response = await authApi.patch('/users/profile', { startDate });
      return response.data;
    } catch (error) {
      console.error('Start date update error:', error);
      throw error;
    }
  }
};