"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface propType {
    icon: LucideIcon,
    contactMode: string,
    contactDetail: string,
    desc: string,
    color: string
}


export default function ContactCard({card}: {card: propType}){
    return (
        <div className="flex flex-col gap-2.5 justify-center items-center bg-[rgba(18,18,32,0.72)] p-6 rounded-[18px] cursor-pointer border 
            border-[rgba(100,100,140,.13)] backdrop-blur-[10px] transform transition-all duration-300
              hover:-translate-y-1 hover:border-[#8b5cf6]/30 hover:shadow-[0_10px_36px_rgba(0,0,0,0.15)]"
        >
            <card.icon 
                size={25} 
                style={{color: card.color}}
            />

            <p className="text-white font-bold font-['Cormorant_Garamond',serif]">
                {card.contactMode}
            </p>
            <Link 
                href="#"
                className="text-[14px] font-medium text-[#06b6d4] font-['Outfit',sans-serif]"
            >
                {card.contactDetail}
            </Link>
            <p className="text-[12px] text-[rgba(140,140,165,.55)] font-['Outfit',sans-serif]">
                {card.desc}
            </p>
        </div>
    )
}