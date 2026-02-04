import Orb from "@/app/components/BackgroundBlur";
import SectionHeading from "@/app/components/SectionHeading";


const gridData = [
    { title: "Transparency", desc: "We publish our roadmap, uptime stats, and pricing with zero hidden clauses.", emoji: "◇" },
    { title: "Security First", desc: "Every product is built with SOC 2 compliance and end-to-end encryption.", emoji: "◆" },
    { title: "Community", desc: "12K+ active users shape our direction through real-time feedback loops.", emoji: "◈" },
    { title: "Sustainability", desc: "Our servers run on 100% renewable energy — building tech responsibly.", emoji: "✦" }
]

function AboutSection() {
    return (
        <section className="relative py-24 px-5 overflow-hidden">
            <Orb style="w-[350px] h-[350px] bg-cyan-500 top-1/2 right-[-100px] -translate-y-1/2"/>
            <div className="max-w-6xl mx-auto">
                <SectionHeading badge="About Us" title="Who Are We?" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left – story */}
                    <div className="relative rounded-2xl p-8 bg-[rgba(20,20,36,0.6)] border border-[rgba(100,100,140,0.14)] backdrop-blur-md">
                        <span className="inline-block text-3xl mb-3 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                            ✦
                        </span>
                        <h3 className="text-xl font-semibold text-white mb-3 font-['Playfair_Display',serif]">
                            A Team Driven by Innovation
                        </h3>
                        <p className="text-sm leading-7 text-[rgba(160,160,190,0.78)]">
                            DocMaster was founded in 2026 by a collective of engineers, designers, and product thinkers who shared a single frustration, 
                            that the best software tools were either too expensive, too fragmented, or too complex. We set out to build a unified platform 
                            that puts enterprise-grade capabilities directly in the hands of creators and professionals at every stage.
                        </p>
                        <p className="text-sm leading-7 mt-4 text-[rgba(160,160,190,0.78)]">
                            Today, our 40-person team spans four continents. We believe in open collaboration, radical transparency, and shipping products 
                            that genuinely make a difference in how people work.
                        </p>
                    </div>

                    {/* Right – values grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {
                            gridData.map((v) => (
                                <div
                                    key={v.title}
                                    className="rounded-2xl p-5 bg-[rgba(20,20,36,0.55)] border border-[rgba(100,100,140,0.12)] backdrop-blur-sm"
                                >
                                    <span className="text-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                                        {v.emoji}
                                    </span>
                                    <h4 className="text-sm font-semibold text-white mt-2 font-['Playfair_Display',serif]">
                                        {v.title}
                                    </h4>
                                    <p className="text-xs mt-1 text-[rgba(150,150,180,0.7)] leading-relaxed">
                                        {v.desc}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;
