"use client";

import { createPortal } from "react-dom";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import globalProjects from "@/lib/projects.json";
import { Sidebar } from "@/components/Sidebar";
import { BlurFocus } from "@/components/BlurFocus";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import { VimeoThumbnail } from "@/components/VimeoThumbnail";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Service colors (active state)
const activeServiceColors: Record<string, string> = {
    "score": "bg-deep-blue text-soft-white border-deep-blue",
    "sound design": "bg-twilight-pink text-violet-crown-900 border-twilight-pink",
    "mix": "bg-sunset-orange text-violet-crown-900 border-sunset-orange",
};

// Fixed orders
const typeOrder = ["commercial", "narrative", "documentary", "art"];
const serviceOrder = ["score", "sound design", "mix"];

export default function WorkPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Video resizing logic
    const [videoContainer, setVideoContainer] = useState<HTMLDivElement | null>(null);
    const videoContainerCallback = useCallback((node: HTMLDivElement | null) => {
        setVideoContainer(node);
    }, []);
    const [videoDims, setVideoDims] = useState<{ width: number; height: number } | null>(null);
    // Real aspect ratio from the loaded video
    const [loadedRatio, setLoadedRatio] = useState<number | null>(null);

    // Reset loaded ratio when project changes
    useEffect(() => {
        setLoadedRatio(null);
    }, [selectedProjectId]);

    useEffect(() => {
        if (!videoContainer) return;

        const updateDims = () => {
            const { clientWidth: availWidth, clientHeight: availHeight } = videoContainer;
            if (availWidth === 0 || availHeight === 0 || !selectedProject) return;

            // Default to 16:9 if loadedRatio is not yet available
            const projectRatio = 16 / 9;

            // Use loaded ratio if available (exact), otherwise fallback to project config
            const ratio = loadedRatio || projectRatio;

            let width = availWidth;
            let height = width / ratio;

            if (height > availHeight) {
                height = availHeight;
                width = height * ratio;
            }
            setVideoDims({ width, height });
        };

        const observer = new ResizeObserver(() => {
            updateDims();
        });

        observer.observe(videoContainer);
        updateDims(); // Initial check

        return () => observer.disconnect();
    }, [videoContainer, loadedRatio]); // Re-run when loadedRatio updates

    // Body scroll lock
    useEffect(() => {
        if (selectedProjectId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProjectId]);

    // toggle helpers
    const toggleType = (t: string) => {
        setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
    };
    const toggleService = (s: string) => {
        setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    // Filter projects
    const filteredProjects = useMemo(() => {
        // 1. Filter
        let result = globalProjects.filter((project) => {
            // Check Type (OR logic within types, but if empty show all)
            const typeMatch = selectedTypes.length === 0 || project.types?.some((t: string) => selectedTypes.includes(t));

            // Check Service (OR logic within services, but if empty show all)
            const serviceMatch = selectedServices.length === 0 || project.services?.some((s: string) => selectedServices.includes(s));

            return typeMatch && serviceMatch;
        });

        // 2. Shuffle (Randomize order first)
        result = result
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        // 3. Sort by Priority (Descending)
        result.sort((a, b) => {
            const priorityA = (a as any).priority || 0;
            const priorityB = (b as any).priority || 0;
            return priorityB - priorityA;
        });

        return result;
    }, [selectedTypes, selectedServices]);

    // Get selected project details
    const selectedProject = useMemo(() =>
        globalProjects.find(p => p.id === selectedProjectId),
        [selectedProjectId]);

    return (
        <div className="space-y-12">

            {/* LIGHTBOX OVERLAY */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedProjectId && selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 h-[100dvh] w-screen z-[60] flex flex-col items-center justify-center bg-violet-crown-900/95 backdrop-blur-md p-4 md:p-12 overflow-hidden"
                            style={{ cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23ff9e64' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E") 10 10, auto` }}
                            onClick={() => setSelectedProjectId(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative w-full max-w-7xl h-full flex flex-col gap-6"
                            >

                                {/* Large Video Player */}
                                <div ref={videoContainerCallback} className="flex-1 min-h-0 w-full flex items-center justify-center relative">
                                    <div
                                        className={cn(
                                            "relative shadow-2xl rounded-sm overflow-hidden bg-black mx-auto cursor-default",
                                            !videoDims && "w-full aspect-video"
                                        )}
                                        style={videoDims ? { width: videoDims.width, height: videoDims.height } : undefined}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="absolute inset-0 w-full h-full">
                                            <VimeoPlayer
                                                videoId={selectedProject.vimeoId}
                                                autoplay={true}
                                                className="w-full h-full"
                                                onReady={(w, h) => {
                                                    if (h > 0) setLoadedRatio(w / h);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details (Cinematic Layout) */}
                                <div
                                    className="shrink-0 flex flex-col md:flex-row justify-between items-start gap-8 text-soft-white bg-violet-crown-900/50 p-4 rounded-sm backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none cursor-default"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="max-w-2xl space-y-4">
                                        <h2 className="font-serif text-3xl md:text-4xl text-soft-white">{selectedProject.title}</h2>
                                        <p className="font-mono text-sm md:text-base text-soft-white/70 leading-relaxed line-clamp-3 md:line-clamp-none">
                                            {selectedProject.description}
                                        </p>
                                        <div className="text-xs uppercase tracking-wider text-soft-white/40 font-mono">
                                            {selectedProject.types?.join(" / ")}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        {selectedProject.services?.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className={cn(
                                                    "font-mono text-xs uppercase tracking-widest border px-3 py-1 rounded-full whitespace-nowrap",
                                                    activeServiceColors[tag] || "bg-violet-crown-900 text-soft-white border-violet-crown-900"
                                                )}
                                            >
                                                {tag === "sound design" ? "S. Design" : tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <div className="flex flex-col gap-8">
                <BlurFocus as="div" className="w-fit">
                    <h1 className="font-serif text-4xl tracking-tight text-deep-blue border-b-2 border-deep-blue pb-2">Selected Work</h1>
                </BlurFocus>

                {/* TWO-TIER FILTER BAR */}
                <div className="flex flex-col gap-6 items-start">

                    {/* Row 1: Types */}
                    <div className="flex flex-col gap-3">
                        <BlurFocus>
                            <span className="font-serif text-sm italic text-violet-crown-900">Filter by:</span>
                        </BlurFocus>
                        <div className="flex flex-wrap gap-3">
                            <BlurFocus className="w-fit" hoverScale={1.05}>
                                <button
                                    onClick={() => setSelectedTypes([])}
                                    className={cn(
                                        "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded-full border transition-colors duration-300",
                                        selectedTypes.length === 0
                                            ? "bg-violet-crown-900 text-soft-white border-violet-crown-900"
                                            : "bg-transparent text-violet-crown-800/50 border-violet-crown-800/20 hover:border-violet-crown-800/50"
                                    )}
                                >
                                    All
                                </button>
                            </BlurFocus>
                            {typeOrder.map((type) => {
                                const isSelected = selectedTypes.includes(type);
                                return (
                                    <BlurFocus key={type} className="w-fit" hoverScale={1.05}>
                                        <button
                                            onClick={() => toggleType(type)}
                                            className={cn(
                                                "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded-full border transition-all duration-300",
                                                isSelected
                                                    ? "bg-violet-crown-900 text-soft-white border-violet-crown-900"
                                                    : "bg-transparent text-violet-crown-800/50 border-violet-crown-800/20 hover:border-violet-crown-800/50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    </BlurFocus>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 2: Services */}
                    <div className="flex flex-col gap-3">
                        <BlurFocus>
                            <span className="font-serif text-sm italic text-violet-crown-900">and</span>
                        </BlurFocus>
                        <div className="flex flex-wrap gap-3">
                            <BlurFocus className="w-fit" hoverScale={1.05}>
                                <button
                                    onClick={() => setSelectedServices([])}
                                    className={cn(
                                        "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded-full border transition-colors duration-300",
                                        selectedServices.length === 0
                                            ? "bg-violet-crown-900 text-soft-white border-violet-crown-900"
                                            : "bg-transparent text-violet-crown-800/50 border-violet-crown-800/20 hover:border-violet-crown-800/50"
                                    )}
                                >
                                    All
                                </button>
                            </BlurFocus>
                            {serviceOrder.map((service) => {
                                const isSelected = selectedServices.includes(service);
                                return (
                                    <BlurFocus key={service} className="w-fit" hoverScale={1.05}>
                                        <button
                                            onClick={() => toggleService(service)}
                                            className={cn(
                                                "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded-full border transition-all duration-300",
                                                isSelected
                                                    ? (activeServiceColors[service] || "bg-violet-crown-900 text-soft-white border-violet-crown-900")
                                                    : "bg-transparent text-violet-crown-800/50 border-violet-crown-800/20 hover:border-violet-crown-800/50"
                                            )}
                                        >
                                            {service}
                                        </button>
                                    </BlurFocus>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="group cursor-pointer" // Added cursor pointer
                            onClick={() => setSelectedProjectId(project.id)} // Trigger lightbox
                        >
                            <BlurFocus className="block space-y-4">
                                {/* Video Thumbnail (using Player but muted/controls hidden or just image? For now using existing player but we'll treat it as a thumbnail since user wants to click to expand) */}
                                {/* NOTE: To prevent the inline player from stealing clicks, we put a cover div or pointer-events-none, BUT the user might still want to play inline? 
                                    Request was "click on a project to expand it and play the video". 
                                    So likely they want the whole card to be the trigger. 
                                    I will add pointer-events-none to the inline player wrapper so clicks go to the card. */}
                                <div className="w-full shadow-lg rounded-sm overflow-hidden pointer-events-none">
                                    <VimeoThumbnail videoId={project.vimeoId} alt={project.title} />
                                </div>

                                {/* Info */}
                                <div className="flex justify-between items-start pt-2">
                                    <div className="max-w-xl">
                                        <h3 className="font-serif text-2xl text-violet-crown-900 mb-2 group-hover:text-deep-blue transition-colors duration-300">{project.title}</h3>
                                        <p className="font-mono text-sm text-violet-crown-800/70 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="mt-2 text-[10px] uppercase tracking-wider text-violet-crown-800/50 font-mono">
                                            {project.types?.join(" / ")}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                                        {project.services?.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className={cn(
                                                    "font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-full whitespace-nowrap",
                                                    activeServiceColors[tag] || "bg-violet-crown-900 text-soft-white border-violet-crown-900"
                                                )}
                                            >
                                                {tag === "sound design" ? "S. Design" : tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </BlurFocus>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center font-serif italic text-violet-crown-800/50">
                        Oops!
                    </div>
                )}
            </div>
        </div>
    );
}
