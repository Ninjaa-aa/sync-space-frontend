"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { workspaceApi } from "@/services/api";

interface WorkspaceFormData {
  name: string;
  allowedDomain: string;
  allowAnyoneWithDomain: boolean;
  adminName: string;
  profilePhoto?: File;
  invitedEmails: string[];
  channels: string[];
  currentProject: string;
}

interface WorkspaceSubmitData {
  name: string;
  invitedEmails: string[];
  initialChannels: string[];
  adminName: string;
  allowAnyoneWithDomain: boolean;
}

interface CreateWorkspaceFormProps {
  onNameChange: (name: string) => void;
  onInvitedEmailsChange: (emails: string[]) => void;
  onChannelsChange: (channels: string[]) => void;
}

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  onNameChange,
  onInvitedEmailsChange,
  onChannelsChange,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WorkspaceFormData>({
    name: "",
    allowedDomain: "nu.edu.pk",
    allowAnyoneWithDomain: false,
    adminName: "",
    invitedEmails: [],
    channels: [],
    currentProject: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "name") {
      onNameChange(value || "Example");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (step === 5) {
      handleSubmit({
        name: formData.name,
        invitedEmails: formData.invitedEmails,
        initialChannels: formData.channels,
        adminName: formData.adminName,
        allowAnyoneWithDomain: formData.allowAnyoneWithDomain,
      });
    } else if (step === 1 && formData.name.trim()) {
      setStep(2);
    } else if (step === 2 && formData.adminName.trim()) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleEmailInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const email = input.value.trim();
      if (email && isValidEmail(email)) {
        const newEmails = [...formData.invitedEmails, email];
        setFormData((prev) => ({
          ...prev,
          invitedEmails: newEmails,
        }));
        onInvitedEmailsChange(newEmails);
        input.value = "";
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const newEmails = formData.invitedEmails.filter(
      (email) => email !== emailToRemove
    );
    setFormData((prev) => ({
      ...prev,
      invitedEmails: newEmails,
    }));
    onInvitedEmailsChange(newEmails);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.currentProject.trim()) {
      const newChannels = [
        ...formData.channels,
        formData.currentProject.toLowerCase(),
      ];
      setFormData((prev) => ({
        ...prev,
        channels: newChannels,
        currentProject: "",
      }));
      onChannelsChange(newChannels);
    }
  };

  const handleSubmit = async (data: WorkspaceSubmitData) => {
    try {
      const workspace = await workspaceApi.create(data);

      if (data.invitedEmails.length > 0) {
        await workspaceApi.inviteMembers(workspace.id, data.invitedEmails);
      }

      if (data.initialChannels.length > 0) {
        await Promise.all(
          data.initialChannels.map((channelName) =>
            workspaceApi.createChannel(workspace.id, { name: channelName })
          )
        );
      }

      // Handle success (e.g., redirect to workspace)
    } catch (error) {
      // Handle error
      console.error("Failed to create workspace:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="text-sm text-gray-500">Step {step} of 5</div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What&apos;s the name of your company or team?
            </h1>
            <p className="text-gray-500 mb-4">
              This will be the name of your ChatSphere workspace.
            </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Example"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allowDomain"
              name="allowAnyoneWithDomain"
              checked={formData.allowAnyoneWithDomain}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="allowDomain" className="text-sm text-gray-700">
              Let anyone with an @{formData.allowedDomain} email join this
              workspace
            </label>
          </div>

          <button
            onClick={handleNext}
            disabled={!formData.name.trim()}
            className={`px-6 py-2 rounded-md text-white ${
              formData.name.trim()
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What&apos;s your name?
            </h1>
            <p className="text-gray-500 mb-4">
              Help your teammates recognize and connect with you more easily.
            </p>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Your profile photo (optional)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              aria-label="Upload profile photo"
              className="hidden"
            />
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload Photo
              </button>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!formData.adminName.trim()}
            className={`px-6 py-2 rounded-md text-white ${
              formData.adminName.trim()
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Who else is on the {formData.name} team?
            </h1>
            <p className="text-gray-500 mb-4">Add coworker by email</p>
            <div className="border border-gray-300 rounded-md p-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.invitedEmails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm"
                  >
                    <span className="mr-1">{email}</span>
                    <button
                      onClick={() => removeEmail(email)}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="email"
                placeholder="name@work-email.com"
                className="w-full border-none focus:ring-0 p-1 text-sm"
                onKeyDown={handleEmailInput}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Next
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Skip this step
            </button>
            <button
              onClick={() => {
                /* Handle copy invite link */
              }}
              className="px-6 py-2 rounded-md text-purple-600 hover:bg-purple-50 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy Invite Link
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What&apos;s your team working on right now?
            </h1>
            <p className="text-gray-500 mb-4">
              This could be anything: a project, campaign, event, or the deal
              you&apos;re trying to close.
            </p>
            <form onSubmit={handleProjectSubmit}>
              <input
                type="text"
                name="currentProject"
                value={formData.currentProject}
                onChange={handleInputChange}
                placeholder="Ex: Q4 budget, autumn campaign"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Add Channel
                </button>
              </div>
            </form>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 mr-2">✨</span>
              <p className="text-gray-500">Your workspace is ready to go!</p>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Start with ChatSphere Pro
            </h1>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Unlimited message history</h3>
                  <p className="text-gray-500 text-sm">
                    Search and view all of your team&apos;s public messages and
                    files. On a paid plan, your team&apos;s message and file
                    history is stored indefinitely.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">
                    Unlimited voice and video huddles
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">
                    Work with people at other organizations
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">More connected apps</h3>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎁</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-lg">50% off 3 months</h3>
                  <p className="text-gray-600">$4.38 USD per person/month</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-2 px-4 bg-[#007a5a] hover:bg-[#006c4f] text-white rounded-md transition-colors">
                  Start with Pro
                </button>
                <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Start with the Limited Free Version
                </button>
              </div>
            </div>

            <button
              className="mt-4 text-blue-600 hover:underline text-sm flex items-center"
              onClick={() => {
                /* Handle compare plans click */
              }}
            >
              <span className="mr-1">+</span> Compare plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWorkspaceForm;
