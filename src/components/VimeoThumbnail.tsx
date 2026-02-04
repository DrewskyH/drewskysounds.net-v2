"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VimeoThumbnailProps {
    videoId: string;
    className?: string;
    alt?: string;
}

export function VimeoThumbnail({ videoId, className, alt = "Project Video" }: VimeoThumbnailProps) {
    const [thumbUrl, setThumbUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!videoId) return;

        // Fetch oEmbed data
        // Explicitly catch errors to prevent crashes if ID is invalid or network fails
        fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=1920`)
            .then(res => res.json())
            .then(data => {
                // Vimeo oEmbed provides 'thumbnail_url' which is typically adequate res
                if (data.thumbnail_url) {
                    setThumbUrl(data.thumbnail_url);
                }
            })
            .catch(err => {
                console.error(`Failed to fetch Vimeo thumbnail for ${videoId}`, err);
            });
    }, [videoId]);

    return (
        <div className={cn("relative w-full aspect-video bg-violet-crown-800/10 rounded-sm overflow-hidden", className)}>
            {/* Loading/Fallback placeholder */}
            <div className="absolute inset-0 bg-violet-crown-900/10 animate-pulse" />

            {thumbUrl && (
                <Image
                    src={thumbUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-opacity duration-700 opacity-0"
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                />
            )}
        </div>
    );
}
