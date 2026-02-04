"use client"

import { Star } from "lucide-react";
import { useState } from "react";


interface propType  {
    icon: string,
    title: string,
    category: string,
    desc: string,
    users: string,
    rating: number,
    color: string
}

function ToolCard({ tool }: {tool: propType}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative rounded-2xl p-0.5 transition-all duration-500 cursor-pointer"
            style={{
                background: hovered ? `linear-gradient(135deg, ${tool.color}44, transparent 70%)` : "transparent",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="relative h-full rounded-2xl p-6 flex flex-col gap-3 bg-[rgba(20,20,36,0.7)] backdrop-blur-md transition-all duration-300"
                style={{ border: hovered ? `1px solid ${tool.color}44` : "1px solid rgba(100,100,140,0.12)" }}
            >
                {/* Icon badge */}
                <div className="flex items-start justify-between">
                    <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: `${tool.color}18`, color: tool.color }}
                    >
                        {tool.icon}
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: `${tool.color}12`, color: tool.color }}>
                        {tool.category}
                    </span>
                </div>

                <h3 className="text-base font-semibold text-white font-['Playfair_Display',serif]">
                    {tool.title}
                </h3>
                <p className="text-xs leading-relaxed flex-1 text-[rgba(150,150,180,0.75)]">
                    {tool.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(100,100,140,0.1)" }}>
                    <span className="text-xs text-[rgba(130,130,160,0.7)]">{tool.users} users</span>
                    <div className="flex items-center gap-1">
                        <Star size={18} className="text-amber-400"/>
                        <span className="text-xs text-amber-400 font-semibold">{tool.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolCard;