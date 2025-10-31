"use client"

import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
    hasPro?: boolean
}

const Navbar = ({ hasPro = false }: NavbarProps) =>{
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <div className="w-full flex justify-center py-2 bg-black md:py-4">
            <nav className="w-full max-w-4xl px-4">
                <div className="glass-card px-6 py-4 flex items-center justify-between">
                    {/* Profile image */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/60 to-white/40 flex items-center justify-center text-black font-bold text-sm">
                            CC
                        </div>
                        {hasPro && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-full uppercase tracking-wider">
                                PRO
                            </span>
                        )}
                    </div>
                    
                    {/* Navigation links - centered */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-white/90 hover:text-white transition-all duration-200 text-sm font-medium">
                            Home
                        </Link>
                        <SignedIn>
                            <Link href="/dashboard" className="text-white/70 hover:text-white transition-all duration-200 text-sm font-medium">
                                Dashboard
                            </Link>
                        </SignedIn>
                        <Link href="/pricing" className="text-white/70 hover:text-white transition-all duration-200 text-sm font-medium">
                            Pricing
                        </Link>
                    </div>

                    {/* Contact button and auth */}
                    <div className="flex items-center space-x-4">
                        <SignedIn>
                            <SignOutButton>
                                <button className="glass-button px-4 py-2.5 text-white/90 hover:text-white text-sm font-medium transition-all duration-300">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton>
                                <button className="glass-button px-6 py-2.5 text-white/90 hover:text-white text-sm font-medium bg-white/[0.08] rounded-full transition-all duration-300 hover:bg-white/[0.12] border border-white/[0.15]">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-xl hover:bg-white/[0.05] transition-all duration-300"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5 text-white"/>
                                ) : (
                                    <Menu className="h-5 w-5 text-white"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
            
            {/* Mobile menu overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeMenu}
                    />
                    
                    {/* Menu content */}
                    <div className="fixed left-4 right-4 top-10 z-50">
                        <div className="glass-card px-6 py-6 border border-white/[0.08] relative">
                            {/* Close button */}
                            <button
                                onClick={closeMenu}
                                className="absolute top-2 right-2 w-12 h-10 rounded-md  hover:bg-white/[0.15] border border-white/[0.15] hover:border-white/[0.25] flex items-center justify-center transition-all duration-200 group"
                            >
                                <X className="w-4 h-4 text-white/70 group-hover:text-white" />
                            </button>
                            
                            <div className="flex flex-col space-y-3 text-center mt-8">
                                <Link href="/" onClick={closeMenu} className="text-white/90 hover:text-white px-4 py-4 rounded-xl hover:bg-white/[0.08] transition-all duration-200 text-base font-medium">
                                    Home
                                </Link>
                                <SignedIn>
                                    <Link href="/dashboard" onClick={closeMenu} className="text-white/80 hover:text-white px-4 py-4 rounded-xl hover:bg-white/[0.08] transition-all duration-200 text-base font-medium">
                                        Dashboard
                                    </Link>
                                </SignedIn>
                                <Link href="/pricing" onClick={closeMenu} className="text-white/80 hover:text-white px-4 py-4 rounded-xl hover:bg-white/[0.08] transition-all duration-200 text-base font-medium">
                                    Pricing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar