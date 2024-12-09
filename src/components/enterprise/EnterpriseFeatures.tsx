import Image from 'next/image'
import Link from 'next/link'

export function EnterpriseFeatures() {
    const features = [
        {
            title: "PRODUCTIVITY AT SCALE",
            heading: "Meet the needs of your organisation with powerful productivity tools",
            description: [
                "Automate everyday tasks and get more time back for what's most important",
                "Get a glimpse of your entire org with ease using Slack Atlas, our built-in team directory tool",
                "Visualise team productivity and measure tech stack adoption with advanced analytics"
            ],
            link: "Learn more about Slack at scale →",
            href: "#",
            image: "/enterprise-scale.png"
        },
        {
            title: "PLATFORM",
            heading: "Customise Slack to work the way that you do",
            description: [
                "Choose from over 2,600 apps to help bring all your tools together",
                "Build time-saving automations and integrate your favourite apps",
                "Integrate internal tools, processes and data with ease"
            ],
            link: "Learn more about apps and integrations →",
            href: "#",
            image: "/enterprise-platform.png"
        }
    ]

    return (
        <div className="bg-[#F4F4F4]">
            {features.map((feature, index) => (
                <section key={index} className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <span className="text-sm font-semibold text-[#3F0B3F]">{feature.title}</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{feature.heading}</h2>
                                <ul className="space-y-4">
                                    {feature.description.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-[#3F0B3F] mt-1">✓</span>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={feature.href} className="text-[#3F0B3F] hover:text-[#5B2C5E] font-medium inline-block transition-colors">
                                    {feature.link}
                                </Link>
                            </div>
                            <div className="relative h-[400px]">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
} 