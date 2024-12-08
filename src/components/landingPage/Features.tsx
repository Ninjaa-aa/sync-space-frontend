import Image from 'next/image'

export function Features() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            Your people, projects, apps and AI, all on the world&apos;s most beloved work operating system.
                        </h2>
                        <div className="flex gap-8">
                            <div className="text-center">
                                <span className="text-purple-600 font-bold text-4xl">80%</span>
                                <p className="text-sm text-muted-foreground mt-2">
                                    of the Fortune 100 use ChatSphere Connect to work with partners and customers
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-xl overflow-hidden">
                        <Image
                            src="/placeholder.svg"
                            alt="ChatSphere interface showcase"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

