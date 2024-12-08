import { Navbar } from '@/components/landingPage/Navbar'
import { Hero } from '@/components/landingPage/Hero'
import { LogoCloud } from '@/components/landingPage/LogoCloud'
import { Features } from '@/components/landingPage/Features'
import { Stats } from '@/components/landingPage/Stats'
import { Metrics } from '@/components/landingPage/Metrics'
import { CustomerStories } from '@/components/landingPage/CustomerStories'
import { Resources } from '@/components/landingPage/Resources'
import { Pricing } from '@/components/landingPage/Pricing'
import { CtaSection } from '@/components/landingPage/CtaSection'
import { Footer } from '@/components/landingPage/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <Stats />
        <Metrics />
        <CustomerStories />
        <Resources />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

