"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div
            className="relative inline-block"
            onMouseLeave={() => {
                if (window.matchMedia("(min-width: 768px)").matches) {
                    setIsOpen(false);
                }
            }}
        >
            <span
                onMouseEnter={() => {
                    if (window.matchMedia("(min-width: 768px)").matches) {
                        setIsOpen(true);
                    }
                }}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-default font-bold hover:text-twilight-pink transition-colors"
            >
                {trigger}
            </span>

            {/* Mobile Portal - Fixed Full Screen Overlay */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="md:hidden">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 z-[60]"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Popup Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-64 p-6",
                                    "bg-violet-crown-900/95 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl",
                                    className
                                )}
                            >
                                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                                    <span className="font-mono text-[10px] uppercase text-soft-white/50 tracking-widest leading-none">Zaxcom Kit</span>
                                    {/* Close Button for UX clarity */}
                                    <button onClick={() => setIsOpen(false)} className="text-soft-white/50">
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="text-soft-white font-mono text-xs leading-relaxed text-left">
                                    {children}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Desktop Inline - Absolute Positioning */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "hidden md:block absolute left-full bottom-0 ml-4 z-50 w-64 p-4",
                            "bg-violet-crown-900/90 backdrop-blur-md border border-white/10 rounded-sm shadow-xl",
                            "origin-bottom-left",
                            className
                        )}
                    >
                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                            <span className="font-mono text-[10px] uppercase text-soft-white/50 tracking-widest">Zaxcom Kit</span>
                        </div>
                        <div className="text-soft-white font-mono text-xs leading-relaxed text-left">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
