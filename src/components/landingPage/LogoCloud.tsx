import Image from 'next/image'

export function LogoCloud() {
    const logos = [
        { name: 'Airbnb', src: '/placeholder.svg' },
        { name: 'NASA', src: '/placeholder.svg' },
        { name: 'Uber', src: '/placeholder.svg' },
        { name: 'Target', src: '/placeholder.svg' },
        { name: 'NYT', src: '/placeholder.svg' },
        { name: 'Etsy', src: '/placeholder.svg' },
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

