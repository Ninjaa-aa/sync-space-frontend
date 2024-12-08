import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-white text-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#features" className="text-gray-400 hover:text-[#3F0B3F]">Features</Link></li>
                            <li><Link href="#enterprise" className="text-gray-400 hover:text-[#3F0B3F]">Enterprise</Link></li>
                            <li><Link href="#security" className="text-gray-400 hover:text-[#3F0B3F]">Security</Link></li>
                            <li><Link href="#pricing" className="text-gray-400 hover:text-[#3F0B3F]">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-text-[#3F0B3F]">Blog</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-text-[#3F0B3F]">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-text-[#3F0B3F]">Partners</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-text-[#3F0B3F]">Events</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#about" className="text-gray-400 hover:text-text-[#3F0B3F]">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-text-[#3F0B3F]">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">News</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">Privacy</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">Terms</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">Cookie Policy</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-[#3F0B3F]">Licenses</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-[#3F0B3F]">
                    <p>&copy; {new Date().getFullYear()} ChatSphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

