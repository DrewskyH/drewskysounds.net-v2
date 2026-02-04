import React from 'react';

interface WavyDividerProps {
    className?: string;
    freq?: number; // Number of waves
    amp?: number; // Height of waves
}

export function WavyDivider({
    className = "",
    freq = 20,
    amp = 10
}: WavyDividerProps) {
    // Generate the path for a clean sine wave
    // We'll create a viewbox that allows for the waves to stretch
    // A standard sine wave: y = A * sin(kx)
    // We'll approximate with a simple repeating quadratic curve mechanism or just use points for an svg polylines/path
    // For a smoother, perfect SVG look, a path with cubic beziers is best, but a long set of points works too.

    // Let's generate a path data string.
    // Width 1000 units (arbitrary, scales with CSS).
    const width = 1000;
    const points = [];
    const segments = 100; // Resolution

    // Construct the path: M x y ...
    // using sine function
    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        // Normalized x (0 to 1) * frequency * 2PI
        const angle = (i / segments) * (freq * 2 * Math.PI);
        const y = amp * Math.sin(angle) + amp + 2; // Offset by amp+2 to keep positive and some padding
        points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }

    const height = (amp * 2) + 4; // Total height based on amplitude

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={`w-full overflow-visible ${className}`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d={points.join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}
