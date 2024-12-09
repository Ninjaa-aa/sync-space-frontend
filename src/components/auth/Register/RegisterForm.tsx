import { Link } from 'lucide-react';
import { SocialLogin } from './SocialLogin';
import { EmailForm } from './EmailForm';

export default function RegisterForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl mx-4">
        <EmailForm />
        {/* <SocialLogin className="pt-6" /> */}

        {/* <div className="pt-4 text-center text-sm border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in to existing workspace
            </Link>
          </p>
        </div> */}
      </div>

      {/* <div className="mt-8 text-center text-sm text-gray-500">
        <Link href="/privacy" className="hover:text-gray-700">Privacy & Terms</Link>
        <span className="mx-2">•</span>
        <Link href="/contact" className="hover:text-gray-700">Contact Us</Link>
      </div> */}
    </div>
  );
}