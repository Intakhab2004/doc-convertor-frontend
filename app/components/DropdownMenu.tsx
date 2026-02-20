"use client"


import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Blocks, LockKeyholeIcon, LogIn, LogOut, User, Wrench } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { navLinks } from "./Navbar"
import { useRouter } from "next/navigation"


export const DesktopDropdownMenu = () => {
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <User className="text-[rgba(180,180,210,.78)]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-52 p-2 rounded-2xl bg-[rgba(18,18,32,0.85)] backdrop-blur-xl border border-[rgba(100,100,140,.13)] shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95">
                <DropdownMenuGroup>
                    <DropdownMenuItem 
                        onClick={() => router.push("/profile")}
                        className="rounded-lg px-3 py-2 text-[rgba(180,180,210,.78)] cursor-pointer"
                    >
                        <Blocks/> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => router.push("/settings")}
                        className="rounded-lg px-3 py-2 text-[rgba(180,180,210,.78)] cursor-pointer"
                    >
                        <Wrench /> Account Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-[rgba(100,100,140,.13)] my-2" />

                <DropdownMenuItem 
                    variant="destructive"
                    onClick={logout}
                    className="rounded-lg font-bold px-3 py-2 cursor-pointer"
                >
                    <LogOut /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export const MobileDropdownMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <User className="text-[rgba(180,180,210,.78)]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-52 p-2 rounded-2xl bg-[rgba(18,18,32,0.85)] backdrop-blur-xl border border-[rgba(100,100,140,.13)] shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95">
                <DropdownMenuLabel className="text-[rgba(140,140,165,.55)] text-xs px-2 pb-1">
                    Main Menu
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-[rgba(100,100,140,.13)] my-2" />

                <DropdownMenuGroup>
                    {
                        navLinks.map((link) => (
                            <DropdownMenuItem
                                key={link.label}
                                onClick={() => router.push(link.redirectLink)}
                                className="rounded-lg px-3 py-2 text-[rgba(180,180,210,.78)] cursor-pointer"
                            >
                                {link.icon} {link.label}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-[rgba(100,100,140,.13)] my-2" />

                <DropdownMenuGroup>
                    {
                        isAuthenticated && (
                            <>
                                <DropdownMenuItem className="rounded-lg px-3 py-2 text-[rgba(180,180,210,.78)] cursor-pointer">
                                    <Blocks/> View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg px-3 py-2 text-[rgba(180,180,210,.78)] cursor-pointer">
                                    <Wrench /> Account Settings
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuGroup>
                {
                    isAuthenticated && (
                        <DropdownMenuSeparator className="bg-[rgba(100,100,140,.13)] my-2" />
                    )
                }

                {
                    isAuthenticated ? (
                        <DropdownMenuItem 
                            variant="destructive"
                            onClick={logout} 
                            className="rounded-lg font-bold px-3 py-2 cursor-pointer"
                        >
                            <LogOut /> Logout
                        </DropdownMenuItem>
                    )
                    :
                    (
                        <DropdownMenuGroup className="flex justify-between items-center gap-1">
                            <DropdownMenuItem
                                onClick={() => router.push("/sign-in")}
                                className="font-bold text-[rgba(180,180,210)]"
                            >
                                <LogIn className="text-white" /> Login
                            </DropdownMenuItem>

                            <div className="w-[2px] h-6 bg-[rgba(100,100,140,.35)]"></div>

                            <DropdownMenuItem
                                onClick={() => router.push("/sign-up")}
                                className="font-bold text-[rgba(180,180,210)]"
                            >
                                <LockKeyholeIcon className="text-white" /> Sign Up
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
