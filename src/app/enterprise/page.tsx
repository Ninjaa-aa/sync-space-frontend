import { Navbar } from '@/components/landingPage/Navbar'
import { Footer } from '@/components/landingPage/Footer'
import { EnterpriseHero } from '@/components/enterprise/EnterpriseHero'
import { EnterpriseFeatures } from '@/components/enterprise/EnterpriseFeatures'
import { EnterpriseTestimonial } from '@/components/enterprise/EnterpriseTestimonial'
import { EnterpriseLogos } from '@/components/enterprise/EnterpriseLogos'

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <EnterpriseHero />
                <EnterpriseLogos />
                <EnterpriseFeatures />
                <EnterpriseTestimonial />
            </main>
            <Footer />
        </div>
    )
} 