"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function FadeInImage({ className, onLoad, ...props }: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Image
            className={cn(
                "transition-opacity duration-1000 ease-out",
                isLoaded ? "opacity-100" : "opacity-0",
                className
            )}
            onLoad={(e) => {
                setIsLoaded(true);
                // Call the original onLoad if provided
                if (onLoad) onLoad(e);
            }}
            {...props}
        />
    );
}
