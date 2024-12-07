'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function OtpVerification({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d+$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Redirect to registration completion page
      router.push('/register/complete');
    } catch (err) {
      console.error(err);
      setError('Invalid or expired code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Check your email for a code</h1>
          <p className="text-gray-600">
            We&apos;ve sent a 6-character code to <strong>{email}</strong>.
            <br />The code expires shortly, so please enter it soon.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                aria-label={`Digit ${index + 1} of verification code`}
                placeholder="-"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-md focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            ))}
          </div>

          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || otp.some(d => !d)}
            className="w-full h-12 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>

          <div className="flex justify-center space-x-4">
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-gray-600 hover:text-purple-600">
              <span className="mr-2">Open Gmail</span>
            </a>
            <a href="https://outlook.com" target="_blank" rel="noopener noreferrer"
               className="flex items-center text-gray-600 hover:text-purple-600">
              <span className="mr-2">Open Outlook</span>
            </a>
          </div>

          <p className="text-center text-sm text-gray-500">
            Can&apos;t find your code? Check your spam folder!
          </p>
        </div>
      </div>
    </div>
  );
}