"use client";

import { BlurFocus } from "@/components/BlurFocus";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="max-w-2xl space-y-8">


            <BlurFocus as="div" hoverScale={1.02} className="w-fit">
                <Link
                    href="mailto:drewsky.hulett@gmail.com"
                    className="group inline-flex items-center gap-4"
                >
                    <h1 className="font-serif italic text-4xl text-twilight-pink tracking-tight border-b-2 border-twilight-pink pb-2 group-hover:border-twilight-pink transition-ease-in-out duration-800">
                        Email Me
                    </h1>
                    <span className="text-3xl text-twilight-pink transition-transform duration-2400 group-hover:translate-x-48">→</span>
                </Link>
            </BlurFocus>

            <BlurFocus as="div">
                <p className="font-mono text-sm text-violet-crown-800/70 leading-relaxed mb-6">
                    Available for new projects, collaborations, and sonic explorations.
                </p>
            </BlurFocus>
            <BlurFocus className="relative w-2/5 aspect-[6/9] rounded-sm overflow-hidden shadow-lg mb-6" hoverScale={1.007}>
                <Image
                    src="/images/contact-me-2.png"
                    alt="Drewsky answering 7 phones"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-violet-crown-900/10 mix-blend-multiply" />
            </BlurFocus>
            <BlurFocus as="div">
                <p className="font-mono text-sm text-violet-crown-800/70 leading-relaxed">
                    Operators are standing by.
                </p>
            </BlurFocus>


        </div>
    );
}
