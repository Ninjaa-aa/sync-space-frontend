import { Navbar } from '@/components/landingPage/Navbar'
import { Footer } from '@/components/landingPage/Footer'
import { ContactForm } from '@/components/contact/ContactForm'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-16">
                <ContactForm />
            </main>
            <Footer />
        </div>
    )
} 