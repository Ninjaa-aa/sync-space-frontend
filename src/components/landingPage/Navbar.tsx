import Link from 'next/link'
import { Button } from "@/components/ui/Button"

export function Navbar() {
    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
            <nav className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-bold text-xl text-purple-700">ChatSphere</Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="#features" className="text-sm font-medium hover:text-purple-600">Features</Link>
                        <Link href="#solutions" className="text-sm font-medium hover:text-purple-600">Solutions</Link>
                        <Link href="#enterprise" className="text-sm font-medium hover:text-purple-600">Enterprise</Link>
                        <Link href="#resources" className="text-sm font-medium hover:text-purple-600">Resources</Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-purple-600">Pricing</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost">Sign in</Button>
                    <Button variant="outline" className="hidden sm:inline-flex">TALK TO SALES</Button>
                    <Button className="bg-purple-700 hover:bg-purple-800">GET STARTED</Button>
                </div>
            </nav>
        </header>
    )
}

