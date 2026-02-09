"use client"

import SectionHeading from "@/app/components/SectionHeading"
import ToolCard from "@/app/components/ToolsCard"


const tools = [
    { icon: "✦", title: "AI Code Assistant", category: "Development", desc: "Real-time code completion, bug detection, and intelligent refactoring powered by advanced ML models.", users: "3.2K", rating: 4.8, color: "#8b5cf6" },
    { icon: "◈", title: "DataFlow Studio", category: "Analytics", desc: "Visual pipeline builder to ingest, transform, and visualize complex datasets with zero code required.", users: "2.1K", rating: 4.7, color: "#06b6d4" },
    { icon: "⬡", title: "ContentForge", category: "Marketing", desc: "AI-driven content generation with brand-voice matching, SEO optimization, and multi-platform export.", users: "4.5K", rating: 4.9, color: "#ec4899" },
    { icon: "◆", title: "SecureVault", category: "Security", desc: "End-to-end encrypted password manager with zero-knowledge architecture and biometric unlock.", users: "1.8K", rating: 4.6, color: "#f59e0b" },
    { icon: "◇", title: "CloudSync Pro", category: "Productivity", desc: "Unified file synchronisation across 30+ cloud providers with intelligent conflict resolution.", users: "2.9K", rating: 4.5, color: "#10b981" },
    { icon: "◻", title: "MockFlow", category: "Design", desc: "Rapid wireframing and interactive prototype builder with built-in user-testing simulation.", users: "1.4K", rating: 4.7, color: "#6366f1" },
]


export default function ToolsPage(){
    return (
        <section className="relative py-24 px-5">
			<div className="max-w-6xl mx-auto">
				<SectionHeading
					badge="Our Tools" 
					title="Built for the Modern Creator" 
					sub="Each tool is individually crafted to solve a specific challenge — together they form an unbeatable productivity suite."
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{
						tools.map((t) => <ToolCard key={t.title} tool={t} />)
					}
				</div>
			</div>
		</section>
    )
}