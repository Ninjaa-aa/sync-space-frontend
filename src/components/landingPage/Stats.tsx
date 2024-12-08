export function Stats() {
    return (
        <section className="py-24 bg-purple-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    We&apos;re in the business of growing businesses.
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-6xl font-bold text-purple-300">61%</div>
                        <p className="text-lg text-purple-100">
                            of users say that ChatSphere helps them to stay more connected
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-6xl font-bold text-purple-300">30</div>
                        <p className="text-lg text-purple-100">
                            The average number of apps used by teams in ChatSphere
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-6xl font-bold text-purple-300">60%</div>
                        <p className="text-lg text-purple-100">
                            of users say that ChatSphere helps them to collaborate more efficiently
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

