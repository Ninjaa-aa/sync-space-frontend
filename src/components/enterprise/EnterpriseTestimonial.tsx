import Image from 'next/image'

export function EnterpriseTestimonial() {
    return (
        <section className="py-24 bg-[#F4F4F4]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <blockquote className="text-xl md:text-2xl text-gray-600 italic mb-8">
                        &quot;Slack has been the hammer that has helped us tear down the walls of silos. It has enabled us to position Slack as the operating system of collaboration across 194 countries and 171 offices, pulling us together like nothing else has.&quot;
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                            alt="Spotify"
                            width={60}
                            height={30}
                        />
                        <div>
                            <div className="font-semibold text-gray-900">Daniel Ek</div>
                            <div className="text-gray-600">Co-founder and Chief Executive Officer (CEO) of music streaming service Spotify</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 