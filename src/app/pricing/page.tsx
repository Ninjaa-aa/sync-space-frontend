import { PricingHeader } from '@/components/pricing/PricingHeader'
import { PricingGrid } from '@/components/pricing/PricingGrid'
import { CtaSection } from '@/components/landingPage/CtaSection'
import { Footer } from '@/components/landingPage/Footer'
import { Navbar } from '@/components/landingPage/Navbar'

export default function PricingPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <PricingHeader />
                <PricingGrid />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
} 