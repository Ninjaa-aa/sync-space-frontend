// src/app/reset-password/page.tsx
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter your new password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            go back to login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
