"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
    text = "Neurovia.AI", // Default text set to "Neurovia.AI"
    duration = 0.2,
    className = ""
}) => {
    const svgRef = useRef(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 1400 400" // Increased width to 1400 and height to 400 for "Neurovia.AI"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className={`select-none ${className}`}>
            <defs>
                {/* Enhanced gradient with subtle animation */}
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%">
                    <stop offset="0%" stopColor="#eab308">
                        <animate
                            attributeName="stop-color"
                            values="#eab308;#fcd34d;#eab308"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="offset"
                            values="0;0.05;0"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="25%" stopColor="#ef4444">
                        <animate
                            attributeName="stop-color"
                            values="#ef4444;#f87171;#ef4444"
                            dur="2.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="offset"
                            values="0.25;0.3;0.25"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="50%" stopColor="#3b82f6">
                        <animate
                            attributeName="stop-color"
                            values="#3b82f6;#60a5fa;#3b82f6"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="offset"
                            values="0.5;0.55;0.5"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="75%" stopColor="#06b6d4">
                        <animate
                            attributeName="stop-color"
                            values="#06b6d4;#22d3ee;#06b6d4"
                            dur="2.2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="offset"
                            values="0.75;0.8;0.75"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="100%" stopColor="#8b5cf6">
                        <animate
                            attributeName="stop-color"
                            values="#8b5cf6;#a78bfa;#8b5cf6"
                            dur="2.7s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="offset"
                            values="1;0.95;1"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
                
                {/* Glossy highlight gradient with subtle animation */}
                <linearGradient id="glossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.7)">
                        <animate
                            attributeName="stop-color"
                            values="rgba(255,255,255,0.7);rgba(255,255,255,0.9);rgba(255,255,255,0.7)"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="50%" stopColor="rgba(255,255,255,0.2)">
                        <animate
                            attributeName="stop-color"
                            values="rgba(255,255,255,0.2);rgba(255,255,255,0.4);rgba(255,255,255,0.2)"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)">
                        <animate
                            attributeName="stop-color"
                            values="rgba(255,255,255,0);rgba(255,255,255,0.1);rgba(255,255,255,0)"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r={hovered ? "35%" : "80%"} // Increased visible area when not hovered
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={maskPosition}
                    transition={{ duration: duration, ease: "easeOut" }}>
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                
                <mask id="textMask">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                </mask>
                
                {/* Simple glossy filter with subtle animation */}
                <filter id="simpleGloss" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" result="specular">
                        <fePointLight x="50" y="50" z="100">
                            <animate 
                                attributeName="z" 
                                values="100;120;100" 
                                dur="4s" 
                                repeatCount="indefinite" 
                            />
                        </fePointLight>
                    </feSpecularLighting>
                    <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular2" />
                    <feComposite in="SourceGraphic" in2="specular2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                </filter>
            </defs>
            
            {/* Shadow for subtle depth */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="250" // Increased font size for "Neurovia.AI"
                fill="rgba(0,0,0,0.15)"
                filter="blur(2px)"
                transform="translate(2,2)"
                className="font-[helvetica] font-bold">
                {text}
            </text>
            
            {/* Base outline text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="1.5"
                fontSize="250" // Increased font size for "Neurovia.AI"
                className="fill-transparent stroke-neutral-200 font-[helvetica] font-bold dark:stroke-neutral-800"
                style={{ opacity: hovered ? 0.7 : 0.4 }}> {/* Made slightly visible even when not hovered */}
                {text}
            </text>
            
            {/* Animated outline text */}
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="1.5"
                fontSize="500" // Increased font size for "Neurovia.AI"
                className="fill-transparent stroke-neutral-200 font-[helvetica] font-bold dark:stroke-neutral-800"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                }}>
                {text}
            </motion.text>
            
            {/* Main color text with mask */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="3"
                fontSize="250" // Increased font size for "Neurovia.AI"
                mask="url(#textMask)"
                filter="url(#simpleGloss)"
                className="fill-transparent font-[helvetica] font-bold">
                {text}
                <animate 
                    attributeName="stroke-width" 
                    values="3;3.5;3" 
                    dur="2s" 
                    repeatCount="indefinite" 
                />
            </text>
            
            {/* Glossy overlay text - subtle */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="200" // Increased font size for "Neurovia.AI"
                fill="url(#glossGradient)"
                mask="url(#textMask)"
                opacity="0.35"
                className="font-[helvetica] font-bold">
                {text}
                <animate 
                    attributeName="opacity" 
                    values="0.35;0.5;0.35" 
                    dur="3s" 
                    repeatCount="indefinite" 
                />
            </text>
        </svg>
    );
};