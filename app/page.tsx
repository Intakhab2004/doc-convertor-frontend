"use client";


import NavBar from "@/app/components/Navbar"
import Orb from "./components/BackgroundBlur";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import ToolCard from "./components/ToolsCard";
import AboutSection from "./(staticPage)/about/page";
import Footer from "./components/Footer";
import TestimonialsSection from "./components/Testimonials";


const appStats = [
	{ value: "12K+", label: "Active Users" },
	{ value: "48", label: "Premium Tools" },
	{ value: "99.8%", label: "Uptime" },
]

const tools = [
    { icon: "✦", title: "AI Code Assistant", category: "Development", desc: "Real-time code completion, bug detection, and intelligent refactoring powered by advanced ML models.", users: "3.2K", rating: 4.8, color: "#8b5cf6" },
    { icon: "◈", title: "DataFlow Studio", category: "Analytics", desc: "Visual pipeline builder to ingest, transform, and visualize complex datasets with zero code required.", users: "2.1K", rating: 4.7, color: "#06b6d4" },
    { icon: "⬡", title: "ContentForge", category: "Marketing", desc: "AI-driven content generation with brand-voice matching, SEO optimization, and multi-platform export.", users: "4.5K", rating: 4.9, color: "#ec4899" },
    { icon: "◆", title: "SecureVault", category: "Security", desc: "End-to-end encrypted password manager with zero-knowledge architecture and biometric unlock.", users: "1.8K", rating: 4.6, color: "#f59e0b" },
    { icon: "◇", title: "CloudSync Pro", category: "Productivity", desc: "Unified file synchronisation across 30+ cloud providers with intelligent conflict resolution.", users: "2.9K", rating: 4.5, color: "#10b981" },
    { icon: "◻", title: "MockFlow", category: "Design", desc: "Rapid wireframing and interactive prototype builder with built-in user-testing simulation.", users: "1.4K", rating: 4.7, color: "#6366f1" },
]

const enhancements = [
	{ quarter: "Q1 2026", title: "Voice-Powered Workflows", desc: "Hands-free task automation via natural-language voice commands — works across all tools.", status: "In Progress", color: "#8b5cf6" },
	{ quarter: "Q2 2026", title: "AI Agent Marketplace", desc: "Deploy custom AI agents that run autonomously inside your NexusTools workspace.", status: "Planned", color: "#06b6d4" },
	{ quarter: "Q3 2026", title: "Real-Time Co-op Mode", desc: "Google Docs-style live collaboration baked into every tool on the platform.", status: "Planned", color: "#ec4899" },
	{ quarter: "Q4 2026", title: "Mobile-First Apps", desc: "Native iOS & Android apps with full offline capability and biometric auth.", status: "Planned", color: "#f59e0b" },
]

export default function HomePage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-[#000000f5] text-white">
			<NavBar />

			{/* Hero Section */}
			<section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 overflow-hidden">
				{/* BackgroundBlur circle */}
				<Orb style={"w-[500px] h-[500px] bg-[#8b5cf6] top-[-100px] left-[-120px]"} />
				<Orb style={"w-[400px] h-[400px] bg-[#06b6d4] top-[200px] right-[-80px]"} />
				<Orb style={"w-[300px] h-[300px] bg-[#ec4899] bottom-[60px] left-[30%]"} />

				{/* Grid Design */}
				<div className="absolute inset-0 opacity-5 pointer-events-none"
					style={{
						backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>

				{/* Badge */}
				<div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase
						text-[#c4b5fd] bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.28)]"
				>
					<span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
					Welcome to DocMaster v1.0
				</div>
				
				{/* Headline */}
				<h1 className="relative z-10 mt-6 text-white text-center text-5xl md:text-7xl font-bold leading-tight font-['Playfair_Display',serif]">
					Supercharge Your
					<br />
					<span className="bg-gradient-to-br from-violet-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
						Workflow
					</span>
				</h1>

				{/* Sub */}
				<p className="relative z-10 mt-5 max-w-2xl text-[rgba(180,180,210,0.75)] text-center text-lg font-['DM_Sans',sans-serif]">
					A curated ecosystem of intelligent tools designed to accelerate productivity, simplify complex tasks, and elevate 
					every aspect of your digital life.
				</p>

				{/* CTA */}
				<div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
					<button 
						onClick={() => router.push("/tools")}
						className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white 
							bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] shadow-[0_4px_30px_rgba(139,92,246,0.35)] 
							hover:shadow-[0_6px_40px_rgba(139,92,246,0.55)] cursor-pointer transition-all duration-300"
					>
						Explore Tools <ArrowUpRight size={20}/>
					</button>
					<button
						onClick={() => router.push("/log-in")}
						className="px-7 py-3 rounded-xl text-sm font-medium text-[rgba(200,200,230,0.9)] bg-[rgba(255,255,255,0.06)] 
							border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(139,92,246,0.4)] 
							transition-all duration-300"
					>
						Watch Demo
					</button>
				</div>

				{/* Stats row */}
				<div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-12">
					{
						appStats.map((s) => (
							<div key={s.label} className="text-center">
								<div className="text-2xl font-bold font-['Playfair_Display',serif] bg-gradient-to-br from-[#c4b5fd] to-[#67e8f9] bg-clip-text text-transparent">
									{s.value}
								</div>
								<div className="text-xs mt-0.5 text-[rgba(150,150,180,0.7)] tracking-wider uppercase">
									{s.label}
								</div>
							</div>
						))
					}
				</div>
			</section>

			{/* Tools Section */}
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

			{/* About Sections */}
			<AboutSection />

            {/* Testimonials */}
            <TestimonialsSection />

			{/* Future Enhancements */}
			<section className="relative py-24 px-5 overflow-hidden">
				<Orb style="w-[280px] h-[280px] bg-[#8b5cf6] top-[-80px] right-[20%]"/>
				<div className="max-w-5xl mx-auto">
					<SectionHeading 
						badge="Roadmap" 
						title="Future Enhancements" 
						sub="A peek into what's next — transparency is one of our core principles."
					/>

					<div className="flex flex-col gap-4">
						{
							enhancements.map((e, i) => (
								<div
									key={e.title}
									className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl p-5 
										bg-[rgba(20,20,36,0.6)] border border-[rgba(100,100,140,0.12)] backdrop-blur-sm 
										transition-all duration-300 cursor-default"
									onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${[enhancements[0].color, enhancements[1].color, enhancements[2].color, enhancements[3].color][i]}33`)}
									onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(100,100,140,0.12)")}
								>
									{/* Quarter badge */}
									<div
										className="min-w-max px-3 py-1 rounded-lg text-xs font-bold"
										style={{ background: `${e.color}15`, color: e.color }}
									>
										{e.quarter}
									</div>

									{/* Content */}
									<div className="flex-1">
										<h4 className="text-sm font-semibold text-white font-['Playfair_Display',serif]">
											{e.title}
										</h4>
										<p className="text-xs mt-0.5 font-[rgba(150,150,180,0.7)]">
											{e.desc}
										</p>
									</div>

									{/* Status */}
									<span
										className={`text-xs font-semibold px-3 py-1 rounded-full 
												${e.status === "In Progress" ? "bg-[rgba(139,92,246,0.18)] text-[#a78bfa] border border-[rgba(139,92,246,0.3)]" : 
												"bg-[rgba(100,100,140,0.1)] text-[rgba(150,150,180,0.7)] border border-[rgba(100,100,140,0.15)]"}`}
									>
										{
											e.status === "In Progress" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse mr-1.5" />
										}
										{e.status}
									</span>
								</div>
							))
						}
					</div>
				</div>
			</section>

			{/* CTA Banner */}
			<section className="relative py-20 px-5 overflow-hidden">
                <div className="max-w-4xl mx-auto relative">
                    {/* Glow behind */}
                    <div className="absolute bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] inset-0 rounded-3xl blur-2xl opacity-30"/>
                    <div className="relative rounded-3xl p-12 text-center bg-gradient-to-br from-violet-500/15 to-cyan-500/10 border 
                        border-violet-500/25 backdrop-blur-[12px]"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display',serif]">
                            Ready to Elevate Your Work?
                        </h2>
                        <p className="mt-3 text-[rgba(170,170,200,0.8)] text-base max-w-lg mx-auto">
                            Join thousands of creators already using NexusTools. Start free — no credit card required.
                        </p>
                        <button
                            className="mt-8 px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br 
                                from-[#8b5cf6] to-[#06b6d4] shadow-[0_4px_30px_rgba(139,92,246,0.4)] 
                                hover:shadow-[0_6px_40px_rgba(139,92,246,0.6)] transition-all duration-300"  
                        >
                            Get Started Free →
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
		</div>
	)
}