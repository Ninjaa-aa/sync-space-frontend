import { PricingTier } from './PricingTier'

export function PricingGrid() {
    const tiers = [
        {
            name: "Free",
            description: "A smarter, simpler way to chat and collaborate.",
            price: "$0",
            features: [
                { text: "90 days of message history, including search" },
                { text: "Ten app integrations" },
                { text: "1:1 audio and video meetings, including screen sharing" },
                { text: "Create and manage projects in documents and lists" }
            ]
        },
        {
            name: "Pro",
            description: "More power for small teams who want to accelerate work.",
            price: "$4.38",
            highlight: true,
            features: [
                { text: "Unlimited message history, app integrations and automations" },
                { text: "Group audio and video meetings" },
                { text: "Collaborate with people outside your organisation" },
                { text: "Create and manage projects in documents and lists" }
            ]
        },
        {
            name: "Business+",
            description: "Scale your business, productivity and team connection.",
            price: "$15",
            features: [
                { text: "User provisioning and deprovisioning, including SCIM" },
                { text: "SAML-based single sign-on" },
                { text: "Data exports for all messages, including integrations and automations" },
                { text: "Message activity analytics, including user and channel insights" }
            ]
        },
        {
            name: "Enterprise Grid",
            description: "Maximise performance and productivity at every level of your enterprise.",
            price: "Contact sales",
            buttonText: "TALK TO SALES",
            buttonLink: "/contact",
            features: [
                { text: "Unlimited workspaces, channels and message history" },
                { text: "Built-in employee directory" },
                { text: "HIPAA-compliant, distributed and encrypted search" },
                { text: "Advanced management tools, security controls and support" }
            ]
        }
    ]

    return (
        <div className=" container mx-auto px-4 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tiers.map((tier) => (
                    <PricingTier key={tier.name} {...tier} />
                ))}
            </div>
        </div>
    )
} 