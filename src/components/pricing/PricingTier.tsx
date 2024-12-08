import { Button } from "@/components/ui/Button"
import Link from 'next/link'
import { Check } from 'lucide-react'

interface PricingFeature {
    text: string;
}

interface PricingTierProps {
    name: string;
    description: string;
    price: string;
    features: PricingFeature[];
    highlight?: boolean;
    buttonText?: string;
    buttonLink?: string;
}

export function PricingTier({
    name,
    description,
    price,
    features,
    highlight = false,
    buttonText = "GET STARTED",
    buttonLink = "/register"
}: PricingTierProps) {
    return (
        <div className={`bg-white rounded-lg p-8 transition-all duration-200 hover:shadow-lg ${highlight
            ? 'ring-2 ring-[#3F0B3F] shadow-md'
            : 'ring-1 ring-gray-200 shadow-sm'
            }`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="mb-6">
                <span className="text-4xl font-bold text-[#3F0B3F] ">{price}</span>
                {price !== 'Contact sales' && <span className="text-gray-600">/mo</span>}
            </div>
            <Link href={buttonLink}>
                <Button
                    className={`w-full mb-8 transition-all duration-200 ${highlight
                        ? 'bg-[#3F0B3F] hover:bg-[#5B2C5E] text-white shadow-sm hover:shadow'
                        : 'bg-white text-[#3F0B3F] hover:text-white border border-[#3F0B3F] hover:shadow hover:bg-[#3F0B3F]'
                        }`}
                >
                    {buttonText}
                </Button>
            </Link>
            <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                        <Check className="h-5 w-5 text-[#3F0B3F] flex-shrink-0 mt-1 transition-transform group-hover:scale-110" />
                        <span className="text-gray-600">{feature.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
} 