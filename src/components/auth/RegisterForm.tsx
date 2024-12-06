/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { authApi } from '@/lib/auth';

export default function RegisterForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.post('/auth/register', formData);
      login(response.data.user, response.data.tokens);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          id="firstName"
          type="text"
          required
          placeholder="Enter your first name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          id="lastName"
          type="text"
          required
          placeholder="Enter your last name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          required
          placeholder="Enter your password"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}