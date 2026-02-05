"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "/contact" },
    { name: "Instagram", href: "https://instagram.com/drewsky.sounds", external: true },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <nav className="fixed inset-0 z-50 md:hidden pointer-events-none">
            <motion.div
                initial={false}
                animate={{ y: isOpen ? "0%" : "calc(-100% + 80px)" }}
                transition={{ duration: 0.8, ease: [0.32, 0.725, 0.32, 1] }}
                style={{
                    background: "linear-gradient(165deg, var(--deep-blue-dark), var(--deep-blue))",
                    WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 40px), rgba(0,0,0,0.98) calc(100% - 35px), rgba(0,0,0,0.9) calc(100% - 30px), rgba(0,0,0,0.7) calc(100% - 20px), rgba(0,0,0,0.3) calc(100% - 10px), transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black calc(100% - 40px), rgba(0,0,0,0.98) calc(100% - 35px), rgba(0,0,0,0.9) calc(100% - 30px), rgba(0,0,0,0.7) calc(100% - 20px), rgba(0,0,0,0.3) calc(100% - 10px), transparent 100%)"
                }}
                className="absolute top-0 left-0 w-full h-[100dvh] text-soft-white shadow-xl flex flex-col pointer-events-auto"
            >
                {/* Menu Items Area - Slides down with the card */}
                <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={cn(
                                    "font-serif text-3xl tracking-wide transition-colors",
                                    isActive ? "font-bold text-soft-white" : "text-soft-white/60 hover:text-soft-white/80"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Toggle Bar - Always visible at bottom of card */}
                <div className="h-[80px] shrink-0 flex items-center justify-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col items-center gap-1 focus:outline-none group w-full h-full justify-center px-6"
                    >
                        <h1 className="font-serif text-2xl tracking-tight">
                            drewskysounds<span className="text-[0.7em]">.net</span>
                        </h1>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-soft-white/80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </motion.div>
                    </button>
                </div>
            </motion.div>
        </nav>
    );
}
