"use client";

import { BlurFocus } from "@/components/BlurFocus";
import { InfoPopup } from "@/components/InfoPopup";
import { WavyDivider } from "@/components/WavyDivider";

import Image from "next/image";

export default function StudioPage() {
    return (
        <div className="space-y-12 max-w-3xl">
            {/* Header */}
            <section>
                <BlurFocus as="div" className="w-fit">
                    <h1 className="font-serif text-4xl tracking-tight text-sunset-orange border-b-2 border-sunset-orange pb-2">
                        The Studio
                    </h1>
                </BlurFocus>
                <br></br>
                {/* Top Images Grid */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <BlurFocus className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-lg hoverScale={1.04}">
                        <Image
                            src="/images/studio/studio-2.png"
                            alt="Wide shot of the studio workspace"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-violet-crown-900/10 mix-blend-multiply" />
                    </BlurFocus>

                    <BlurFocus className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-lg hoverScale={1.04}">
                        <Image
                            src="/images/studio/studio-3.png"
                            alt="Alternative view of the studio"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-violet-crown-900/10 mix-blend-multiply" />
                    </BlurFocus>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="space-y-8">
                <BlurFocus as="div">
                    <p className="font-mono text-md text-violet-crown-900/80 leading-relaxed text-justify">
                        I love all aspects of sound work, so I built a studio that can do it all. Located at my home in Wimberley, Texas, my multi-functional studio is my sound dream come true. You’ll find me mixing, sound designing, and composing for film, mixing and mastering records, writing and recording music, and more.
                    </p>
                </BlurFocus>
                <BlurFocus as="div">
                    <p className="font-mono text-md text-violet-crown-900/80 leading-relaxed mt-4 text-justify">
                        Whether your project brings you to Wimberley or needs to be remote, the studio is a highly flexible, fully capable space in which to develop and deliver sound projects of all kinds.
                    </p>
                </BlurFocus>
            </section>

            {/* Divider */}
            <div className="py-1">
                <WavyDivider className="text-violet-crown-900/40 h-16" freq={8} amp={1} />
            </div>

            {/* Specs Section - More Technical/Mono */}
            <section className="space-y-8">
                <BlurFocus as="div">
                    <h2 className="font-serif text-2xl text-violet-crown-900 mb-8">Sound Services</h2>
                </BlurFocus>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-xs tracking-wider text-violet-crown-800/70">
                    <BlurFocus as="div" className="space-y-4" hoverScale={1.02}>
                        <h3 className="uppercase font-bold text-twilight-pink mb-2">Film/TV</h3>
                        <ul className="space-y-2 list-none">
                            <li>Sound Design</li>
                            <li>Composition</li>
                            <li>Mixing</li>
                            <li>Stereo | 5.1 Surround</li>
                            <li>Dialogue Edit</li>
                            <li>Music Edit</li>
                        </ul>
                    </BlurFocus>

                    <BlurFocus as="div" className="space-y-4" hoverScale={1.02}>
                        <h3 className="uppercase font-bold text-sunset-orange mb-2">Music</h3>
                        <ul className="space-y-2 list-none">
                            <li>Production</li>
                            <li>Performance</li>
                            <li>Recording</li>
                            <li>Mixing</li>
                            <li>Mastering</li>
                        </ul>
                    </BlurFocus>

                    <BlurFocus as="div" className="space-y-4" hoverScale={1.02}>
                        <h3 className="uppercase font-bold text-deep-blue mb-2">Production Recording</h3>
                        <ul className="space-y-2 list-none">
                            <li>Commercial</li>
                            <li>Documentary</li>
                            <li>Branded Content</li>
                            <li>Narrative</li>
                            <li>
                                <InfoPopup trigger="Zaxcom Kit" className="!cursor-default">
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Nova Recorder</li>
                                        <li>MKH50</li>
                                        <li>4017b</li>
                                        <li>ZMT4 Transmitters</li>
                                        <li>DPA 4060/6040 Lav Mics</li>
                                        <li>MRX414 Rx</li>
                                        <li>Smartslate</li>
                                        <li>Tentacle Sync</li>
                                        <li>Comteks</li>
                                        <li>and more...</li>
                                    </ul>
                                </InfoPopup>
                            </li>
                        </ul>
                    </BlurFocus>
                </div>


            </section>

            {/* Texture Grid */}
            <section className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                    <BlurFocus key={num} className="relative aspect-[3/2] rounded-sm overflow-hidden shadow-md group" hoverScale={1.02}>
                        <Image
                            src={`/images/studio/grid-${num}.png`}
                            alt={`Studio texture detail ${num}`}
                            fill
                            className="object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-violet-crown-900/20 mix-blend-overlay opacity-50" />
                    </BlurFocus>
                ))}
            </section>
        </div>
    );
}
