import Link from 'next/link'
import { Button } from "@/components/ui/Button"

export function Navbar() {
    return (
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50">
            <div className="absolute inset-0 border-b border-gray-200/80"></div>
            <nav className="container relative mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-bold text-xl text-[#3F0B3F] hover:opacity-90 transition-opacity">ChatSphere</Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-[#5B2C5E] transition-colors">Features</Link>
                        <Link href="/#solutions" className="text-sm font-medium text-gray-600 hover:text-[#5B2C5E] transition-colors">Solutions</Link>
                        <Link href="/#enterprise" className="text-sm font-medium text-gray-600 hover:text-[#5B2C5E] transition-colors">Enterprise</Link>
                        <Link href="/#resources" className="text-sm font-medium text-gray-600 hover:text-[#5B2C5E] transition-colors">Resources</Link>
                        <Link href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-[#5B2C5E] transition-colors">Pricing</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="outline" className="bg-[#3F0B3F] hover:bg-[#5B2C5E] text-white transition-colors shadow-sm hover:shadow">Sign in</Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="hidden sm:inline-flex border-[#3F0B3F] text-[#3F0B3F] hover:bg-[#3F0B3F] hover:text-white transition-all">
                            TALK TO SALES
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-[#3F0B3F] hover:bg-[#5B2C5E] text-white transition-colors shadow-sm hover:shadow">
                            GET STARTED
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

