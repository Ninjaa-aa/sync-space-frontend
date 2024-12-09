'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SocialLogin } from './SocialLogin';

// Error message mappings
const ERROR_MESSAGES = {
  'Email already registered': 'This email address is already registered. Please try signing in instead.',
  'Invalid email format': 'Please enter a valid email address.',
  'Network error': 'Unable to connect to the server. Please check your internet connection and try again.',
  'Server error': 'Something went wrong on our end. Please try again in a few moments.',
  'OAuth configuration error': 'Social login is temporarily unavailable. Please try again later or use email registration.',
  'Google auth error': 'Unable to sign in with Google. Please try again or use a different method.',
  'Github auth error': 'Unable to sign in with GitHub. Please try again or use a different method.',
  default: 'An unexpected error occurred. Please try again.'
};

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// EmailForm Component with Enhanced Error Handling
export function EmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Please enter your email address.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validateEmail()) return;

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register/init', { // Updated endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message as keyof typeof ERROR_MESSAGES;
        setError(ERROR_MESSAGES[errorMessage] || data.message);
        return;
      }

      router.push(`/register/verify?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Registration error:', err.message);
      setError(ERROR_MESSAGES['Network error']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="mb-8">
        {/* <Image
          src="/logo.svg"
          alt="ChatSphere"
          width={124}
          height={36}
          className="cursor-pointer"
        /> */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-[#5B2C5E]  tracking-tight hover:text-[#3F0B3F] transition-colors cursor-pointer">
            ChatSphere
          </h1>
        </Link>
      </div>

      <div className="w-full max-w-md px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            First of all, enter your email address
          </h1>
          <p className="text-lg text-gray-600">
            We suggest using the email address that you use at work.
          </p>
        </div>

        {/* Error Alert */}
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

        {/* Email Form */}
        <div className="space-y-6">
          <input
            id="email"
            type="email"
            placeholder="name@work-email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
            className="block w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#3F0B3F] focus:border-[#3F0B3F] transition-colors text-base"
          />

          <button
            onClick={handleContinue}
            disabled={!email || isLoading}
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
              'Continue'
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

          {/* Keep existing SocialLogin component */}
          <SocialLogin />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Already using ChatSphere?{' '}
            <Link href="/login" className="text-[#3F0B3F] hover:text-[#5B2C5E] font-medium">
              Sign in to an existing workspace
            </Link>
          </p>
        </div>
      </div>

      {/* Terms & Privacy Links */}
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