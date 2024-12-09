import { Button } from "@/components/ui/Button"
import Link from 'next/link'

export function EnterpriseHero() {
    return (
        <section className="pt-32 pb-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[#3F0B3F] font-semibold mb-4 block">ENTERPRISE</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                        Performance and productivity for every level of your enterprise
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Scale your processes, ensure company-wide compliance and maximise tech stack adoption – all with the power of ChatSphere.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button className="bg-[#3F0B3F] hover:bg-[#5B2C5E] text-white text-lg py-6 px-8">
                                TALK TO SALES
                            </Button>
                        </Link>
                        <Link href="#demo">
                            <Button variant="outline" className="text-lg py-6 px-8 text-[#3F0B3F] border-[#3F0B3F] hover:bg-[#3F0B3F] hover:text-white">
                                WATCH DEMO
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
} 