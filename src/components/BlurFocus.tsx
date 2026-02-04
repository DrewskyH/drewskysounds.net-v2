"use client";

import { motion, MotionProps } from "framer-motion"; // Import MotionProps if needed, or just relying on motion
import { cn } from "@/lib/utils";
import React from "react";

interface BlurFocusProps extends MotionProps { // Extend MotionProps to allow passing motion props safely if needed, though mostly consuming them here
    children: React.ReactNode;
    className?: string;
    as?: keyof HTMLElementTagNameMap | React.ComponentType<any>; // improved type safety
    active?: boolean;
    hoverScale?: number;
    duration?: number;
    onClick?: () => void; // Explicitly adding onClick since we use it
}

export const BlurFocus = ({ children, className, as = "div", active = false, hoverScale = 1.008, duration = 0.4, ...props }: BlurFocusProps) => {
    // Dynamically resolve to the correct motion component
    // If 'as' is a string (e.g., 'div', 'span'), access motion[as]
    // If it's a custom component, we might need to wrap it in motion(), but for this project mostly likely string tags.
    // However, simplistic approach:

    // @ts-ignore - Dynamic key access on motion object
    const Component = typeof as === "string" ? motion[as] : as;

    return (
        // @ts-ignore - framer motion types can be tricky with dynamic components, but this works
        <Component
            className={cn("wrapper will-change-transform", className)}
            initial="initial"
            animate={active ? "hover" : undefined} // undefined lets whileHover work naturally on "rest" state
            whileHover="hover"
            whileTap="hover" // also focus on mobile tap
            variants={{
                initial: {
                    scale: 1,
                    filter: "blur(0.25px)",
                    zIndex: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                },
                hover: {
                    scale: hoverScale,
                    filter: "blur(0px) grayscale(0%)",
                    opacity: 1,
                    zIndex: 10,
                    transition: { duration: duration, ease: "easeOut" }
                }
            }}
            {...props}
        >
            {children}
        </Component>
    );
};
