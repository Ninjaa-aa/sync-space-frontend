import { useState } from 'react';
import { ChevronDown, Search, Plus, Bell, History, MessageSquare, Layout } from 'lucide-react';

export default function ChatInterface() {
  const [channels] = useState([
    'all-chatsphere',
    'chatsphere-initial-development-phase',
    'social'
  ]);
  
  const [directMessages] = useState([
    { name: 'Dawood Qamar', unread: 1, online: true },
    { name: 'Ab', online: false },
    { name: 'Hammad Zahid', status: 'you', online: true }
  ]);

  return (
    <div className="flex h-screen bg-[#1a1d21]">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#19171D] flex flex-col items-center py-4">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl mb-4">
          C
        </div>
        <nav className="flex-1 w-full">
          <button className="w-full p-2 hover:bg-[#27242C] flex justify-center">
            <MessageSquare className="w-6 h-6 text-gray-400" />
          </button>
          <button className="w-full p-2 hover:bg-[#27242C] flex justify-center">
            <Bell className="w-6 h-6 text-gray-400" />
          </button>
          <button className="w-full p-2 hover:bg-[#27242C] flex justify-center">
            <History className="w-6 h-6 text-gray-400" />
          </button>
          <button className="w-full p-2 hover:bg-[#27242C] flex justify-center">
            <Layout className="w-6 h-6 text-gray-400" />
          </button>
        </nav>
      </div>

      {/* Main Sidebar */}
      <div className="w-64 bg-[#2B1F31] text-gray-300">
        <div className="p-4">
          <button className="w-full flex items-center justify-between p-2 hover:bg-[#350D36] rounded">
            <span className="font-bold">ChatSphere</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <div className="mt-4 p-2 bg-[#401D41] rounded flex items-center">
            <Search className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">Search ChatSphere</span>
          </div>

          {/* Trial Banner */}
          <div className="mt-4 p-3 bg-[#401D41] rounded-lg">
            <div className="flex items-center text-sm">
              <History className="w-4 h-4 mr-2" />
              <span>20 days left in trial</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </div>
          </div>

          {/* Channels */}
          <div className="mt-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-sm">Channels</span>
              <button className="w-6 h-6 hover:bg-[#350D36] rounded flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {channels.map((channel) => (
              <button
                key={channel}
                className="w-full flex items-center px-2 py-1 text-gray-400 hover:bg-[#350D36] rounded"
              >
                <span className="mr-2">#</span>
                {channel}
              </button>
            ))}
            <button className="w-full flex items-center px-2 py-1 text-gray-400 hover:bg-[#350D36] rounded">
              <Plus className="w-4 h-4 mr-2" />
              Add channels
            </button>
          </div>

          {/* Direct Messages */}
          <div className="mt-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-sm">Direct messages</span>
              <button className="w-6 h-6 hover:bg-[#350D36] rounded flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {directMessages.map((dm, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-2 py-1 text-gray-400 hover:bg-[#350D36] rounded"
              >
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="w-4 h-4 bg-gray-500 rounded-full" />
                    {dm.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#2B1F31]" />
                    )}
                  </div>
                  <span>{dm.name}</span>
                  {dm.status && <span className="ml-1 text-xs">({dm.status})</span>}
                </div>
                {dm.unread && (
                  <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                    {dm.unread}
                  </span>
                )}
              </button>
            ))}
            <button className="w-full flex items-center px-2 py-1 text-gray-400 hover:bg-[#350D36] rounded">
              <Plus className="w-4 h-4 mr-2" />
              Add coworkers
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#1A1D21] flex flex-col">
        {/* Pro Plan Banner */}
        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Your team is on a free trial!</h1>
            <p className="text-gray-300 mb-6">
              To help you get started on ChatSphere, your team is on a free 30-day trial of our Pro plan. 
              Upgrade anytime to stay on this plan when your trial ends.
            </p>
            <button className="bg-[#007a5a] hover:bg-[#006c4f] text-white px-6 py-2 rounded-md transition-colors">
              I&apos;m Ready to Upgrade
            </button>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-white mb-8">
                With a paid plan, your team can...
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[#222529] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">UNLIMITED MESSAGES</h3>
                  <p className="text-gray-400">
                    Find the information you need, when you need it
                  </p>
                </div>
                {/* Add more feature cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}