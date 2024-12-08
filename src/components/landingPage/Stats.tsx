export function Stats() {
    return (
        <section className="py-20 bg-[#3F0B3F]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "100+", label: "Active Users" },
                        { value: "50K+", label: "Downloads" }, 
                        { value: "99.9%", label: "Uptime" },
                        { value: "24/7", label: "Support" }
                    ].map((stat: { value: string | number, label: string }, index: number) => (
                        <div key={index} className="p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-white/80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

