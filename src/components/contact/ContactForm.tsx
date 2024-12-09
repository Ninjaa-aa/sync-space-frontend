"use client"

import { Button } from "@/components/ui/Button"
import { useState } from "react"

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log(formData)
    }

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                    Contact our Sales Team
                </h1>
                <p className="text-xl text-gray-600 mb-12 text-center">
                    Learn more about how ChatSphere can help your team work better together.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3F0B3F] focus:border-transparent transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Work Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3F0B3F] focus:border-transparent transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3F0B3F] focus:border-transparent transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3F0B3F] focus:border-transparent transition-colors"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#3F0B3F] hover:bg-[#5B2C5E] text-white transition-colors py-6"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    )
} 