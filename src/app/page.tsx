"use client";

import { BlurFocus } from "@/components/BlurFocus";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
      {/* Visual Column */}
      <BlurFocus className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
        <Image
          src="/images/portrait2.png"
          alt="Drewsky Hulett"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-crown-900/40 to-transparent mix-blend-overlay pointer-events-none" />
      </BlurFocus>

      {/* Content Column */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-deep-blue leading-[1.1]">
            <BlurFocus as="span" className="inline-block" hoverScale={1.02}>Howdy,</BlurFocus>
            <br />
            <BlurFocus as="span" className="inline-block">
              <span className="italic text-sunset-orange">welcome to my site.</span>
            </BlurFocus>
          </h2>

          <BlurFocus as="div">
            <p className="font-mono text-sm md:text-base text-violet-crown-800/80 max-w-lg leading-relaxed mt-6">
              I&apos;m Drewsky Hulett. I specialize in sounds: recording, manipulating, and delivering sonic magic.
            </p>
          </BlurFocus>

          <BlurFocus as="div">
            <p className="font-mono text-sm md:text-base text-violet-crown-800/80 max-w-lg leading-relaxed mt-6">
              Feel free to wander in this space for a while.
            </p>
          </BlurFocus>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-4">

          <BlurFocus className="w-fit" hoverScale={1.03}>
            <Link href="/work" className="group flex items-center gap-2 border-b border-violet-crown-900/20 pb-1 w-fit hover:border-deep-blue transition-colors duration-[600ms] hover:duration-[400ms]">
              <span className="font-serif italic text-lg text-violet-crown-900 group-hover:text-deep-blue transition-colors duration-[600ms] group-hover:duration-[400ms]">See my work</span>
              <MoveRight className="w-4 h-4 text-violet-crown-900 group-hover:translate-x-1 group-hover:text-deep-blue transition-all duration-[600ms] group-hover:duration-[400ms]" />
            </Link>
          </BlurFocus>

          <BlurFocus className="w-fit" hoverScale={1.03}>
            <Link href="/contact" className="group flex items-center gap-2 border-b border-violet-crown-900/20 pb-1 w-fit hover:border-twilight-pink transition-colors duration-[600ms] hover:duration-[400ms]">
              <span className="font-serif italic text-lg text-violet-crown-900 group-hover:text-twilight-pink transition-colors duration-[600ms] group-hover:duration-[400ms]">Get in touch</span>
              <MoveRight className="w-4 h-4 text-violet-crown-900 group-hover:translate-x-1 group-hover:text-twilight-pink transition-all duration-[600ms] group-hover:duration-[400ms]" />
            </Link>
          </BlurFocus>
        </div>
      </div>
    </div >
  );
}
