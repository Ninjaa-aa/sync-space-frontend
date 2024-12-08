import { Button } from "@/components/ui/Button"
import { Check } from 'lucide-react'

export function Pricing() {
    const plans = [
        {
            name: 'Free',
            description: 'A smarter, simpler way to chat and collaborate.',
            features: [
                '90 days of message history, including search',
                'Ten app integrations',
                '1:1 audio and video meetings, including screen sharing',
                'Create and manage projects in documents and lists',
            ],
        },
        {
            name: 'Pro',
            description: 'More power for small teams who want to accelerate work.',
            features: [
                'Unlimited message history, app integrations and automations',
                'Group audio and video meetings',
                'Collaborate with people outside your organisation',
                'Create and manage projects in documents and lists',
            ],
        },
        {
            name: 'Business+',
            description: 'Scale your business, productivity and team connection.',
            features: [
                'User provisioning and deprovisioning, including SCIM',
                'SAML-based single sign-on',
                'Data exports for all messages, including integrations and automations',
                'Message activity analytics, including user and channel insights',
            ],
        },
        {
            name: 'Enterprise Grid',
            description: 'Maximise performance and productivity at every level of your enterprise.',
            features: [
                'Unlimited workspaces, channels and message history',
                'Built-in employee directory',
                'HIPAA-compliant, distributed and encrypted search',
                'Advanced management tools, security controls and support',
            ],
        },
    ]

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 text-gray-900">
                <h2 className="text-4xl font-bold text-center mb-4">
                    There&apos;s a subscription for every kind of team.
                </h2>
                <p className="text-center text-muted-foreground mb-16">
                    Start with a premium subscription, or try the free version.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                            <p className="text-muted-foreground text-gray-800">{plan.description}</p>
                            <ul className="space-y-3 text-gray-800">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <Button className="w-full bg-purple-700 hover:bg-purple-800">
                                    GET STARTED
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

