import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import img from "@/assets/logo.png"


const footerLinks = {
    Company: ["About Us", "Careers", "Blog", "Press", "Legal"],
    Products: ["AI Code Assistant", "DataFlow Studio", "ContentForge", "SecureVault", "Pricing"],
    Resources: ["Documentation", "API Reference", "Status Page", "Community", "Tutorials"],
    Support: ["Help Center", "Contact Us", "Feedback", "Terms of Service", "Privacy Policy"],
}


function Footer() {
    return (
        <footer className="relative py-16 px-5 border-t border-[rgba(100,100,140,0.12)]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-2">
                                <Image 
                                    src={img.src}
                                    width={30}
                                    height={20}
                                    alt="logoImage"
                                />
                                <p className="text-xl font-semibold tracking-tight bg-gradient-to-br from-violet-500 to-cyan-300 bg-clip-text 
                                    text-transparent font-['Playfair_Display',serif]"
                                >
                                    DocMaster
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-[rgba(140,140,170,0.6)] leading-relaxed">
                            Empowering creators and professionals with a unified suite of intelligent productivity tools.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3 mt-5">
                        {
                            [<Github />, <Twitter />, <Linkedin />, <Mail />].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.05)] 
                                        text-[rgba(150,150,180,0.65)] transition-all duration-300 hover:bg-violet-500/20 
                                        hover:text-violet-300"
                                >
                                    {Icon}
                                </button>
                            ))
                        }
                        </div>
                    </div>

                {/* Link columns */}
                {
                    Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-xs text-[rgba(180,180,210,0.65)] font-bold tracking-widest uppercase mb-4">
                                {heading}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {
                                    links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-xs transition-all duration-300 text-[rgba(150,150,180,0.6)] hover:text-[#c4b5fd]"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
                </div>

                {/* Bottom bar */}
                <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[rgba(100,100,140,0.1)]">
                    <p className="text-xs" style={{ color: "rgba(120,120,150,0.5)" }}>
                        © 2026 DocMaster Inc. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        {
                            ["Cookie Policy", "Do Not Sell My Info", "Accessibility"].map((l) => (
                                <a
                                    key={l}
                                    href="#"
                                    className="text-xs text-[rgba(120,120,150,0.5)] hover:text-[#a78bfa] transition-colors duration-300"
                                >
                                    {l}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;