// import { Button } from "@/components/ui/button"
// import Image from 'next/image'
// import Link from 'next/link'

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
        <section className="py-24 bg-white" id="resources">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
                    Resources to help you get started
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {resources.map((resource, index) => (
                        <div key={index} className="group">
                            <div className="aspect-video rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all duration-200">
                                <img src={resource.image} alt="" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#3F0B3F] transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600">{resource.type}</p>
                            <div className="mt-4 text-[#3F0B3F] font-medium group-hover:text-[#5B2C5E] transition-colors">
                                Learn more →
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

