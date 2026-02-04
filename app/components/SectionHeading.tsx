
interface propTypes {
    badge?: string,
    title: string,
    sub?: string
}

function SectionHeading({ badge, title, sub }: propTypes) {
    return (
        <div className="text-center mb-14">
            {
                badge && (
                    <span className="inline-block px-3.5 py-1 text-[#a78bfa] bg-[rgba(139,92,246,0.1)] border 
                        border-[rgba(139,92,246,0.25)] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
                        {badge}
                    </span>
                )
            }
            <h2 className="text-3xl md:text-5xl font-bold text-white font-['Playfair_Display',serif]" >
                {title}
            </h2>
            {
                sub && (
                    <p className="mt-3 max-w-xl mx-auto text-base text-[rgba(160,160,190,0.7)]">
                        {sub}
                    </p>
                )
            }
        </div>
    )
}

export default SectionHeading;