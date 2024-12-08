// import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export function Resources() {
    const resources = [
        {
            type: 'Event',
            title: 'Ready for the future of AI in ChatSphere?',
            image: '/placeholder.svg',
        },
        {
            type: 'On demand',
            title: 'Big things are launching. Relive the highlights of World Tour New York!',
            image: '/placeholder.svg',
        },
        {
            type: 'Customer story',
            title: 'How OpenAI expands ChatGPT with ChatSphere',
            image: '/placeholder.svg',
        },
        {
            type: 'Webinar',
            title: 'Top ChatSphere tips to boost productivity',
            image: '/placeholder.svg',
        },
    ]

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Your ChatSphere deep dive starts here.
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {resources.map((resource) => (
                        <div key={resource.title} className="group cursor-pointer">
                            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src={resource.image}
                                    alt={resource.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">{resource.type}</div>
                                <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                                    {resource.title}
                                </h3>
                                <Link
                                    href="#"
                                    className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
                                >
                                    READ MORE →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

