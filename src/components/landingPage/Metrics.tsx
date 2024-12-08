"use client"

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Users, Clock, Zap } from 'lucide-react';

function AnimatedMetric({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    return (
        <div ref={ref} className="relative group">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-[#3F0B3F]/10 flex items-center justify-center">
                        {Icon && <Icon className="w-6 h-6 text-[#3F0B3F]" />}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-[#3F0B3F] mb-1">{value}</div>
                <div className="text-gray-600">{label}</div>
            </div>
        </div>
    );
}

export function Metrics() {
    const metrics = [
        { value: "85%", label: "Team Engagement", icon: Users },
        { value: "2.5x", label: "Faster Response Time", icon: Clock },
        { value: "60%", label: "Productivity Boost", icon: Zap }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {metrics.map((metric, index) => (
                        <AnimatedMetric key={index} {...metric} />
                    ))}
                </div>
            </div>
        </section>
    );
}

