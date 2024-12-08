import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-white text-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Features</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Enterprise</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Security</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Blog</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Partners</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Events</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">News</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Privacy</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Terms</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Cookie Policy</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-purple-700">Licenses</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-purple-700">
                    <p>&copy; {new Date().getFullYear()} ChatSphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

