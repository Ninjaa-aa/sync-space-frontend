"use client"

import React from 'react';
import { MessageSquare, Users, FileText, Lock, Zap, Bot, Share2, BarChart } from 'lucide-react';
import { useEffect, useState } from 'react';

const features = [
    {
        icon: MessageSquare,
        title: "Channels",
        description: "Organize your team into channels to keep conversations and files organized."
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Work seamlessly with your team in real-time."
    },
    {
        icon: FileText,
        title: "File Sharing",
        description: "Share and organize files efficiently with your team."
    },
    {
        icon: Lock,
        title: "Security",
        description: "Enterprise-grade security for all your communications."
    },
    {
        icon: Zap,
        title: "Instant Updates",
        description: "Get real-time notifications and stay up to date."
    },
    {
        icon: Bot,
        title: "AI Integration",
        description: "Leverage AI to automate routine tasks and boost productivity."
    },
    {
        icon: Share2,
        title: "Integration",
        description: "Connect with your favorite tools and services."
    },
    {
        icon: BarChart,
        title: "Analytics",
        description: "Track team performance and engagement metrics."
    }
];

export function Features() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerPage = 3;
    const totalSlides = Math.ceil(features.length / itemsPerPage);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(timer);
    }, [totalSlides]);

    return (
        <section className="py-24 bg-white overflow-hidden" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transform the way you work
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Bring your team together and build your workflow with ChatSphere&apos;s features
                    </p>
                </div>
                <div className="relative px-12">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                width: `${totalSlides * 100}%`,
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, groupIndex) => (
                                <div key={groupIndex} className="w-full flex-shrink-0 px-4">
                                    <div className="flex gap-8">
                                        {features.slice(groupIndex * itemsPerPage, (groupIndex * itemsPerPage) + itemsPerPage).map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 p-8 rounded-lg bg-white border border-gray-100 
                                                         shadow-sm hover:shadow-lg transition-all duration-300 
                                                         group hover:border-[#3F0B3F]/20"
                                            >
                                                <div className="w-12 h-12 bg-[#3F0B3F]/10 rounded-lg 
                                                              flex items-center justify-center mb-6 
                                                              group-hover:bg-[#3F0B3F]/20 transition-colors"
                                                >
                                                    <feature.icon className="w-6 h-6 text-[#3F0B3F] 
                                                                           group-hover:text-[#5B2C5E] 
                                                                           transition-colors" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-3 
                                                             group-hover:text-[#3F0B3F] transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600 group-hover:text-gray-700 
                                                            transition-colors leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 
                                 w-10 h-10 rounded-full bg-white shadow-lg flex items-center 
                                 justify-center text-[#3F0B3F] hover:bg-[#3F0B3F] hover:text-white 
                                 transition-all duration-200"
                        aria-label="Previous features"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 
                                 w-10 h-10 rounded-full bg-white shadow-lg flex items-center 
                                 justify-center text-[#3F0B3F] hover:bg-[#3F0B3F] hover:text-white 
                                 transition-all duration-200"
                        aria-label="Next features"
                    >
                        →
                    </button>
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-200 
                                          ${currentSlide === index
                                        ? 'bg-[#3F0B3F] w-4'
                                        : 'bg-gray-300 hover:bg-[#5B2C5E]/50'}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

