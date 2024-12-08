import { Button } from "@/components/ui/Button"
import Link from 'next/link'

export function Hero() {
    return (
        <section className="pt-32 pb-16 text-center bg-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                    Where <span className="text-[#3F0B3F]">work</span> happens
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    ChatSphere is free to try for as long as you like
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/pricing">
                        <Button variant="outline" className="bg-[#3F0B3F] text-white hover:bg-white hover:text-[#3F0B3F] text-lg py-6 px-8 transition-all shadow-sm hover:shadow">
                            GET STARTED
                        </Button>
                    </Link>
                    <Link href="/pricing">
                        <Button variant="outline" className="text-lg py-6 px-8 text-[#3F0B3F] border-[#3F0B3F] hover:bg-[#3F0B3F] hover:text-white transition-all shadow-sm hover:shadow">
                            FIND YOUR SUBSCRIPTION →
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

