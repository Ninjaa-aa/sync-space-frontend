import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { pricingPlans, Plan } from "@/data/plan";
import { workspaceService } from "@/services/workspaceService";
import type { CreateWorkspaceDto } from "@/types/workspace";
import { ChannelVisibility } from "@/types/workspace";

interface PlanStepProps {
  workspaceName: string;
  adminName: string;
  adminPhoto: File | null;
  channels: string[];
  pendingInvites: string[];
  onSelectPlan: (plan: Plan) => void;
  error?: string;
}

export const PlanStep = ({
  workspaceName,
  adminName,
  channels,
  pendingInvites,
  error: propError,
}: PlanStepProps) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("free");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(propError);

  const formatChannels = (channelNames: string[]) => {
    return channelNames.map((channel) => ({
      name: channel.toLowerCase().trim().replace(/\s+/g, "-"),
      visibility: ChannelVisibility.PUBLIC,
      description: `Channel for ${channel}`,
    }));
  };

  const handleContinue = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (!token) {
      setError('You must be logged in to create a workspace');
      router.push('/login');
      return;
    }

    const selectedPlan = pricingPlans.find(
      (plan) => plan.id === selectedPlanId
    );
    if (!selectedPlan) return;

    setIsCreating(true);
    setError("");

    try {
      const workspaceData: CreateWorkspaceDto = {
        name: workspaceName,
        adminName,
        channels: formatChannels(channels),
        pendingInvites,
        plan: {
          id: selectedPlan.id,
          name: selectedPlan.name,
          billingPeriod,
        },
      };

      const response = await workspaceService.createWorkspace(workspaceData);
      router.push(`/workspace/${response.workspaceId}/dashboard`);
    } catch (err) {
      if (err instanceof Error && (err as { response?: { status: number } }).response?.status === 401) {
        setError('Your session has expired. Please log in again.');
        router.push('/login');
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to create workspace"
        );
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">
        Choose a plan for {workspaceName}
      </h1>
      <p className="text-gray-400 mb-8">
        You can always change your plan later or cancel anytime.
      </p>

      {/* Billing Period Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-md transition-colors ${
              billingPeriod === "monthly"
                ? "bg-purple-600 text-white"
                : "text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 rounded-md transition-colors ${
              billingPeriod === "yearly"
                ? "bg-purple-600 text-white"
                : "text-gray-400"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-gray-800 rounded-lg p-6 border-2 transition-colors ${
              selectedPlanId === plan.id
                ? "border-purple-500"
                : "border-transparent"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              {selectedPlanId === plan.id && (
                <span className="bg-purple-500 text-white p-2 rounded-full">
                  <Check className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-white">
                ${plan.price}
              </span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="space-y-4 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start space-x-3 ${
                    feature.included ? "text-white" : "text-gray-400"
                  }`}
                >
                  <Check className={`w-5 h-5 ${feature.included ? "text-green-500" : "text-gray-600"}`} />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setSelectedPlanId(plan.id)}
              variant={selectedPlanId === plan.id ? "default" : "outline"}
              className="w-full"
            >
              {selectedPlanId === plan.id ? "Selected" : "Select Plan"}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {selectedPlanId === "free"
            ? "Start with the basics and upgrade when you need to"
            : "Your workspace will be set up with advanced features"}
        </p>
        <Button
          onClick={handleContinue}
          disabled={isCreating}
          className="min-w-[200px]"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Your Workspace...
            </>
          ) : (
            `Get Started with ${
              selectedPlanId.charAt(0).toUpperCase() + selectedPlanId.slice(1)
            }`
          )}
        </Button>
      </div>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
};