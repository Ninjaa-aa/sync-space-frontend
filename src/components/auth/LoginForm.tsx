/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/app/auth/context/AuthContext';
import { authApi } from '@/lib/auth';
import Link from 'next/link';
import { SocialLogin } from './Register/SocialLogin';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.post('/auth/login', formData);
      if (response.data.access_token) {
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        login(response.data.user, {
          access_token: response.data.access_token
        });
      } else {
        throw new Error('No access token received');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="mb-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-[#5B2C5E] tracking-tight hover:text-[#3F0B3F] transition-colors cursor-pointer">
            ChatSphere
          </h1>
        </Link>
      </div>

      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Sign in to ChatSphere
          </h1>
          <p className="text-lg text-gray-600">
            We suggest using the email address that you use at work.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <input
            type="email"
            required
            placeholder="name@work-email.com"
            className="block w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#3F0B3F] focus:border-[#3F0B3F] transition-colors text-base"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#3F0B3F] text-white font-medium rounded hover:bg-[#5B2C5E] focus:outline-none focus:ring-2 focus:ring-[#3F0B3F] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Sign in with email'
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <SocialLogin />

          <div className="text-center text-sm text-gray-600">
            <p>
              New to ChatSphere?{' '}
              <Link href="/register" className="text-[#3F0B3F] hover:text-[#5B2C5E] font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 space-x-4">
        <Link href="/privacy" className="hover:text-gray-700">Privacy & terms</Link>
        <Link href="/contact" className="hover:text-gray-700">Contact us</Link>
        <button className="hover:text-gray-700">
          <span className="flex items-center">
            <span>Change region</span>
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}