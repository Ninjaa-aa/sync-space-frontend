'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <>
      <div className="flex justify-center">
        <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center transform transition-transform hover:scale-105">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">First, enter your email</h1>
        <p className="mt-3 text-gray-600">We suggest using your work email address.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md" role="alert">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              {error === ERROR_MESSAGES['Email already registered'] && (
                <a href="/login" className="text-sm text-red-700 underline hover:text-red-800">
                  Click here to sign in
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
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
            className={`block w-full px-4 py-3 rounded-lg border ${
              error ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
          />
        </div>
        
        <button
          onClick={handleContinue}
          disabled={!email || isLoading}
          className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </div>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </>
  );
}