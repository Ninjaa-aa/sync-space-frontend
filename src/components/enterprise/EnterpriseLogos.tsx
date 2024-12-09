"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

export function EnterpriseLogos() {
    const logos = [
        {
            src: "https://cdn.worldvectorlogo.com/logos/deliveroo-1.svg",
            alt: "Deliveroo",
            width: 120
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
            alt: "Spotify",
            width: 140
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
            alt: "VSCode",
            width: 130
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            alt: "Amazon",
            width: 120
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
            alt: "Github",
            width: 100
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
            alt: "OpenAI",
            width: 110
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {logos.map((logo, index) => (
                        <motion.div
                            key={index}
                            className="relative h-16 flex items-center justify-center"
                            style={{ width: logo.width }}
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
} 