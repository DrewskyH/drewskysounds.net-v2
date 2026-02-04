"use client";

import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { cn } from "@/lib/utils";

interface VimeoPlayerProps {
    videoId: string;
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    onReady?: (width: number, height: number) => void;
}

export function VimeoPlayer({
    videoId,
    className,
    autoplay = false,
    loop = false,
    muted = false,
    onReady
}: VimeoPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize player
        const player = new Player(containerRef.current, {
            id: Number(videoId),
            autoplay,
            loop,
            muted,
            controls: true, // We need controls usually, but we can style them or hide via pro account settings embedded in the ID
            responsive: true,
            dnt: true, // Do Not Track
            title: false,
            byline: false,
            portrait: false,
        });

        playerRef.current = player;

        player.ready().then(() => {
            setIsLoaded(true);
            Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(([w, h]) => {
                onReady?.(w, h);
            });
        });

        return () => {
            player.destroy();
        };
    }, [videoId, autoplay, loop, muted]);

    return (
        <div className={cn("relative w-full aspect-video bg-black rounded-sm overflow-hidden flex items-center justify-center", className)}>
            <div
                ref={containerRef}
                className={cn("w-full transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-violet-crown-800/10">
                    {/* Loading state or placeholder */}
                    <div className="w-8 h-8 border-2 border-sunset-orange border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
