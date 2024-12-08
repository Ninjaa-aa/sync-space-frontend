import { Button } from "@/components/ui/Button"
import Link from 'next/link'

export function CtaSection() {
    return (
        <section className="relative py-24 bg-[#3F0B3F] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    See all that you can accomplish in ChatSphere.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/pricing">
                        <Button size="lg" variant="outline" className="bg-white border-white text-[#3F0B3F] hover:bg-[#5B2C5E] hover:text-white">
                            GET STARTED
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-[#5B2C5E]">
                            TALK TO SALES
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    )
}

