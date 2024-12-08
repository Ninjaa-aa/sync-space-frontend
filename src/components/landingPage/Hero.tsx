import { Button } from "@/components/ui/Button"

export function Hero() {
    return (
        <section className="pt-32 pb-16 text-center bg-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                    Where <span className="text-purple-600">work</span> happens
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-gray-900">
                    ChatSphere is free to try for as long as you like
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="bg-purple-700  hover:bg-white hover:text-purple-700 text-lg py-6 px-8">
                        GET STARTED
                    </Button>
                    <Button variant="outline" className="text-lg py-6 px-8 text-gray-900  hover:bg-purple-800 hover:text-white">
                        FIND YOUR SUBSCRIPTION →
                    </Button>
                </div>
            </div>
        </section>
    )
}

