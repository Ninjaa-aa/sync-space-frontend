import Image from 'next/image'

export function Metrics() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Millions of people love to work in ChatSphere.
                </h2>
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="text-5xl font-bold">700M</div>
                            <p className="text-lg text-muted-foreground">messages sent daily</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold">4M</div>
                            <p className="text-lg text-muted-foreground">
                                ChatSphere Connect users working directly with external teams each week
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold">3M</div>
                            <p className="text-lg text-muted-foreground">daily workflows</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold">1.7M</div>
                            <p className="text-lg text-muted-foreground">apps actively used each week</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Don&apos;t just take our word for it.</h3>
                        <p className="text-lg text-muted-foreground">
                            ChatSphere is a leader in over 150 G2 market reports.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="relative w-24 h-24">
                                    <Image
                                        src="/placeholder.svg"
                                        alt={`G2 Badge ${i + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

