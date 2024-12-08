"use client"

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedNumberProps {
    value: string;
    duration?: number;
}

function AnimatedNumber({ value, duration = 2000 }: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState('0');
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const end = parseInt(value.replace(/[^0-9]/g, ''));
        const incrementTime = duration / end;
        
        const timer = setInterval(() => {
            start += 1;
            setDisplayValue(start.toString() + value.replace(/[0-9]/g, ''));
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration, inView]);

    return <span ref={ref}>{displayValue}</span>;
}

export function Stats() {
    const stats = [
        { value: "100+", label: "Active Users" },
        { value: "50K+", label: "Downloads" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <section className="py-20 bg-[#3F0B3F]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} 
                            className="p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 
                                     transition-all duration-200 transform hover:scale-105">
                            <div className="text-4xl font-bold text-white mb-2">
                                <AnimatedNumber value={stat.value} />
                            </div>
                            <div className="text-white/80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

