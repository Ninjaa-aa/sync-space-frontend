import Image from 'next/image'

export function CustomerStories() {
    const stories = [
        {
            company: 'Deliveroo',
            logo: '/placeholder.svg',
            image: '/placeholder.svg',
        },
        {
            company: 'Spotify',
            logo: '/placeholder.svg',
            image: '/placeholder.svg',
            title: 'How Spotify boosted ad sales and streamlined operations with Slack',
        },
        {
            company: 'OpenAI',
            logo: '/placeholder.svg',
            image: '/placeholder.svg',
        },
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    The most innovative companies run their business in ChatSphere.
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <div
                            key={story.company}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={story.image}
                                    alt={story.company}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="h-8 relative mb-4">
                                    <Image
                                        src={story.logo}
                                        alt={`${story.company} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                {story.title && <p className="text-lg font-medium">{story.title}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

