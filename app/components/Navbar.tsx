"use client"


import { CircleAlert, House, LockKeyholeIcon, Mail, Settings, User } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import img from "@/assets/logo.png"
import Link from "next/link"


const navLinks = [
    { label: "Home", icon: <House size={18} />, redirectLink: "/" },
    { label: "Tools", icon:<Settings size={20}/>, redirectLink: "/tools"},
    { label: "About", icon: <CircleAlert size={20}/>, redirectLink: "/about"},
    { label: "Contact Us", icon: <Mail size={20}/>, redirectLink: "/contact"}
]

export default function NavBar(){
    const [active, setActive] = useState("Home");
    const [user, setUser] = useState(null);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md bg-[rgba(10,10,18,0.82)] 
            border-b border-[rgba(124,124,192,0.5)]"
        >
            <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
                {/* logo and brand naming */}
                <div className="flex items-center gap-2">
                    <Image 
                        src={img.src}
                        width={40}
                        height={30}
                        alt="logoImage"
                        loading="lazy"
                    />
                    <p className="text-2xl font-semibold tracking-tight bg-gradient-to-br from-violet-500 to-cyan-300 bg-clip-text 
                        text-transparent font-['Playfair_Display',serif]"
                    >
                        DocMaster
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-1">
                    {
                        navLinks.map((link) => {
                            const isActive = active === link.label
                            return (
                                <Link
                                    href={link.redirectLink}
                                    key={link.label}
                                    onClick={() => setActive(link.label)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-thin transition-all duration-300 group ${isActive ? 
                                        "text-white bg-[rgba(139,92,246,0.15)]" : "text-[rgba(180,180,210,0.8)] bg-transparent hover:bg-[rgba(255,255,255,0.06)]" }`}
                                >
                                    {link.icon} 
                                    {link.label}
                                    {
                                        isActive && (
                                            <span
                                                className="absolute bottom-[20px] translate-x-7 w-6 h-0.5 rounded-full bg-[linear-gradient(90deg,#8b5cf6,#06b6d4)]"
                                            />
                                        )
                                    }
                                </Link>
                            )
                        })
                    }
                </div>

                {/* Auth Buttons only show when user is not logged in and in desktop view */}
                {
                    !user ? (
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href={"/log-in"}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-thin text-[rgba(180,180,210,0.9)] 
                                    border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] 
                                    hover:border-[rgba(139,92,246,0.4)] hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                <User size={18}/> Log In
                            </Link>
                            <Link
                                href={"/sign-up"}
                                className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-sm font-semibold text-white transition-all 
                                    duration-300 bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_18px_rgba(139,92,246,0.35)]
                                    hover:shadow-[0_0_18px_rgba(139,92,246,0.55)] cursor-pointer"
                            >
                                <LockKeyholeIcon size={18} /> Sign In
                            </Link>
                        </div>
                    )
                    :
                    (
                        <div className="px-3 py-1.5 rounded-lg text-sm text-[rgba(180,180,210,0.9)] bg-[rgba(255,255,255,0.06)]
                                    hover:bg-[rgba(255,255,255,0.16)] hover:text-white transition-all duration-300 cursor-pointer">
                            <User />   {/* Replace it with desktop dropdown menu */ }
                        </div>
                    )
                }

                {/* Mobile view Menu button for logged in or logged out user */}
                <div className="md:hidden px-3 py-1.5 rounded-lg text-sm text-[rgba(180,180,210,0.9)] bg-[rgba(255,255,255,0.06)]
                                hover:bg-[rgba(255,255,255,0.16)] hover:text-white transition-all duration-300 cursor-pointer">
                    <User />   {/* Replace it with mobile dropdown menu */ }
                </div>
            </div>
        </nav>
	)
}