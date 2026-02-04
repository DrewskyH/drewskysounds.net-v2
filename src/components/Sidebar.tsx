"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
    { name: "Work", href: "/work" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "/contact" },
    { name: "Instagram", href: "https://instagram.com/drewsky.sounds", external: true },
];

import { BlurFocus } from "@/components/BlurFocus";

// ... imports remain same ...

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 h-full w-[280px] px-12 pt-12 pb-5 flex flex-col justify-between z-50 pointer-events-none mix-blend-darken">
            {/* mix-blend-difference was causing issues with colors, switching to darken or normal for now since we have a light theme */}
            <div className="pointer-events-auto">
                <BlurFocus className="mb-12 w-fit" hoverScale={1.02}>
                    <Link href="/" className="block group">
                        <h1 className="font-serif text-2xl tracking-tight text-deep-blue transition-colors duration-300">
                            drewskysounds<span className="text-[0.7em]">.net</span>
                        </h1>
                    </Link>
                </BlurFocus>

                <nav className="flex flex-col gap-4 items-start">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <BlurFocus key={item.name} active={isActive} className="w-fit" hoverScale={1.056}>
                                <div className="relative w-fit">
                                    <Link
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className={cn(
                                            "font-serif text-sm tracking-wide transition-colors block",
                                            isActive ? "text-violet-crown-900 font-bold" : "text-violet-crown-800/80"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                    {/* Indicator removed as per user request - relying on Blur-to-Focus */}
                                </div>
                            </BlurFocus>
                        );
                    })}
                </nav>
            </div>

            <div className="pointer-events-auto">
                <BlurFocus className="w-fit group" hoverScale={3} duration={5}>
                    <img
                        src="/images/ofavicon-2.webp"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                    />
                </BlurFocus>
            </div>
        </aside>
    );
}
