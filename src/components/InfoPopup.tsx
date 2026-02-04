"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface InfoPopupProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const InfoPopup = ({ trigger, children, className }: InfoPopupProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseLeave={() => setIsOpen(false)}
        >
            <span
                onMouseEnter={() => setIsOpen(true)}
                className="cursor-default font-bold hover:text-twilight-pink transition-colors"
            >
                {trigger}
            </span>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute left-full bottom-0 ml-4 z-50 w-64 p-4",
                            "bg-violet-crown-900/90 backdrop-blur-md border border-white/10 rounded-sm shadow-xl",
                            "origin-bottom-left",
                            className
                        )}
                    >
                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                            <span className="font-mono text-[10px] uppercase text-soft-white/50 tracking-widest">Zaxcom Kit</span>

                        </div>
                        <div className="text-soft-white font-mono text-xs leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
