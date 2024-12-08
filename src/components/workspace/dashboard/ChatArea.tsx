  'use client';

  import React from 'react';
  import { Hash, Users, Search, Bell, HelpCircle } from 'lucide-react';

  export function ChatArea() {
    return (
      <div className="flex-1 flex flex-col bg-[#1a1d21]">
        {/* Channel Header */}
        <header className="h-12 border-b border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center text-gray-200">
            <Hash size={20} className="mr-2" />
            <h2 className="font-semibold">chatsphere-initial-development-phase</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-200">
              <Users size={20} />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="bg-gray-700 text-gray-200 px-3 py-1 rounded text-sm w-48 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <Search size={16} className="absolute right-2 top-1.5 text-gray-400" />
            </div>
            <button className="text-gray-400 hover:text-gray-200">
              <Bell size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <Hash size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-200 mb-2">
              Welcome to #chatsphere-initial-development-phase
            </h3>
            <p>
              This is the start of the #chatsphere-initial-development-phase channel
            </p>
          </div>
        </div>

        {/* Message Input */}
        <div className="px-4 pb-6">
          <div className="bg-gray-700 rounded-lg p-2">
            <input
              type="text"
              placeholder="Message #chatsphere-initial-development-phase"
              className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  } 