import Image from 'next/image'

export function LogoCloud() {
    const logos = [
        { name: 'Airbnb', src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
        { name: 'NASA', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg' },
        { name: 'Uber', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
        { name: 'Target', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg' },
        { name: 'Spotify', src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
        { name: 'Etsy', src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg' },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-600 font-medium mb-8">
                    Trusted by thousands of companies worldwide
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
                    {logos.map((logo) => (
                        <div key={logo.name} className="w-32 h-12 relative transition-transform hover:scale-105">
                            <Image
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

