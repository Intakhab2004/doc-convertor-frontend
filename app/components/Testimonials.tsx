import { Star } from "lucide-react";
import Orb from "./BackgroundBlur";
import SectionHeading from "./SectionHeading";


const testimonials = [
    { name: "Sarah Chen", role: "Product Manager @ Stripe", rating: 4, text: "NexusTools completely transformed how our team handles data pipelines. DataFlow Studio alone saved us 15+ hours weekly." },
    { name: "Marcus Rivera", role: "Founder @ BuildAI", rating: 5, text: "The AI Code Assistant is genuinely the smartest tool in our stack. It catches bugs before we even think to look for them." },
    { name: "Priya Mehta", role: "Senior Designer @ Figma", rating: 4, text: "MockFlow's interactive prototyping is a game changer. Our design-to-dev handoff has never been smoother." },
    { name: "James Okafor", role: "CTO @ FinTechX", rating: 5, text: "SecureVault's zero-knowledge architecture gave us the confidence we needed to consolidate all credentials in one place." },
    { name: "Aisha Patel", role: "Marketing Lead @ Notion", rating: 4, text: "ContentForge nails our brand voice every single time. The SEO output alone has driven a 40% traffic increase." },
    { name: "Lena Schmidt", role: "Engineer @ Vercel", rating: 5, text: "CloudSync Pro handles our multi-cloud setup flawlessly. Conflict resolution that actually works — rare find in this space." },
]


function RatingStars({count}: {count: number}) {
    return (
        <div className="flex gap-0.5">
        {
            [1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`w-4 h-4 transition ${n <= count ? "fill-amber-400 text-amber-400" : "fill-transparent text-amber-400"}`} />
                ))
            }
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section className="relative py-24 px-5 overflow-hidden">
            <Orb style="w-[300px] h-[300px] bg-[#ec4899] bottom-[-60px] left-[-60px]" />
            <div className="max-w-6xl mx-auto">
                <SectionHeading 
                    badge="Testimonials" 
                    title="What People Are Saying" 
                    sub="Real words from real users no scripts, no cherry-picks."
                />

                {/* Overall rating card */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-6 px-8 py-4 rounded-2xl bg-[rgba(20,20,36,0.55)] border border-[rgba(100,100,140,0.15)] backdrop-blur-[10px]">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white font-['Playfair_Display', serif]">
                                4.8
                            </div>
                            <div className="text-xs mt-0.5 text-[rgba(140,140,170,0.7)]">
                                out of 5.0
                            </div>
                        </div>
                        <div className="w-px h-10 bg-gray-700" />
                        <div>
                            <RatingStars count={5} />
                            <div className="text-xs mt-1 text-[rgba(140,140,170,0.7)]">
                                Based on 2,400+ reviews
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        testimonials.map((t) => (
                            <div
                                key={t.name}
                                className="relative rounded-2xl p-6 bg-[rgba(20,20,36,0.55)] border border-[rgba(100,100,140,0.12)]
                                    backdrop-blur-sm group transition-all duration-300"
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)")}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(100,100,140,0.12)")}
                            >
                                {/* quote mark */}
                                <div className="text-4xl font-bold leading-none mb-2 text-[rgba(139,92,246,0.25)] font-['Playfair_Display',serif]">
                                    "
                                </div>
                                <RatingStars count={t.rating}/>
                                <p className="text-sm text-[rgba(165,165,195,0.82)] leading-relaxed mt-3 mb-5">
                                    {t.text}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-white">
                                            {t.name}
                                        </div>
                                        <div className="text-xs text-[rgba(130,130,160,0.65)]">
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}