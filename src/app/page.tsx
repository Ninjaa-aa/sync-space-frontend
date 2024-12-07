// src/app/page.tsx
'use client';

import { useAuth } from '@/app/auth/context/AuthContext';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/Loading';
import authApi from '@/lib/auth';

export default function Home() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await authApi.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold hover:text-gray-700 transition-colors">
                Auth Demo
              </Link>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <span className="mr-4 text-gray-700">
                    Welcome, {user.firstName} {user.lastName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 mx-4 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Role:</span>
                <span className="capitalize">{user.roleType.toLowerCase()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to the Authentication Demo
            </h2>
            <p className="text-gray-600">Please login or register to continue.</p>
          </div>
        )}
      </main>
    </div>
  );
}