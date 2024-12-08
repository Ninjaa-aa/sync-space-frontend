// import Image from 'next/image'
// import { features } from 'process'
import React from 'react';
// import { JSX, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react'

export function Features() {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transform the way you work
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Bring your team together and build your workflow with ChatSphere&apos;s features
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: () => <svg />,
                            title: "Channels",
                            description: "Organize your team into channels to keep conversations and files organized."
                        },
                        {
                            icon: () => <svg />,
                            title: "Messaging",
                            description: "Work with your team in real-time, no need to switch between apps."
                        },
                        {
                            icon: () => <svg />,
                            title: "File Sharing",
                            description: "Share files with your team, no need to switch between apps."
                        }
                    ].map((feature: {
                        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
                        title: string;
                        description: string;
                    }, index: number) => (
                        <div key={index} className="p-6 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="w-12 h-12 bg-[#3F0B3F]/10 rounded-lg flex items-center justify-center mb-4">
                                {React.createElement(feature.icon, { className: "w-6 h-6 text-[#3F0B3F]" })}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

