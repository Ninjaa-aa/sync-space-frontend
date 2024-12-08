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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
                    What our customers are saying
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center gap-4 mb-6">
                                <Image src={story.logo} alt="" width={48} height={48} className="rounded-full" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{story.company}</h3>
                                    <p className="text-gray-600">{story.title || 'Customer Success Story'}</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic">&ldquo;{story.title || 'See how ' + story.company + ' achieved success'}&rdquo;</blockquote>
                            <div className="mt-4 text-[#3F0B3F] font-medium hover:text-[#5B2C5E] transition-colors">
                                Read full story →
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

