import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ChatSphereLanding({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header with glass effect */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/75 border-b border-gray-200/50">
        <div className="w-full px-6 py-4 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl flex items-center justify-between"
          >
            {/* ChatSphere Logo */}
            <svg className="h-8 w-auto text-purple-700 hover:text-purple-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
        </div>

        {/* Email confirmation with modern design */}
        <div className="w-full bg-gradient-to-r from-purple-50 to-white">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Confirmed as</span>
              <span className="font-semibold text-purple-700">{email}</span>
              <button className="ml-2 text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Change
              </button>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main content with enhanced layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Get started on{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                ChatSphere
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect and collaborate in a more intuitive way. Experience real-time messaging, seamless file sharing, and organized conversations — all in one secure platform.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg py-4 px-6 text-lg font-medium shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300"
            >
              Create a Workspace
            </motion.button>

            <div className="text-sm text-gray-500 leading-relaxed">
              By continuing, you&apos;re agreeing to our{' '}
              <Link href="#" className="text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2">agreements</Link>
              {' '}and{' '}
              <Link href="#" className="text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2">policies</Link>.
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl transform rotate-3 blur-xl opacity-20" />
            <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white to-purple-50 aspect-w-4 aspect-h-3">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 text-center">
                  <svg className="w-24 h-24 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span className="text-lg text-purple-700 font-medium">Collaborate in real-time</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team lookup section with modern card design */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Is your team already on ChatSphere?
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any existing workspaces for {email}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-purple-200 rounded-lg text-purple-700 font-medium hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
            >
              Try a Different Email
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modern footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-purple-600 transition-colors">Privacy & Terms</Link>
            <Link href="#" className="hover:text-purple-600 transition-colors">Contact Us</Link>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <select className="bg-transparent text-purple-600 hover:text-purple-700 cursor-pointer focus:outline-none font-medium">
              <option>🌐 Change region</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}