"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import SmoothScrollCards from "@/components/SmoothScrollCards";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mt-8 md:mt-16 max-w-4xl mx-auto text-center"
        >
          <TextHoverEffect
            text="Neurovia.AI"
            duration={0.5}
            className="text-7xl md:text-9xl font-bold"
          />
        </motion.div>

        <div className="space-y-6 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl text-center font-light tracking-wide 
              bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"
          >
            Accessible, personalized, predictive healthcare for all
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-center text-gray-300 max-w-2xl mx-auto"
          >
            Empowering better health decisions with AI-driven insights
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 animate-bounce"
        >
          <svg 
            className="w-6 h-6 text-blue-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Smooth Scroll Cards Section */}
      <section className="w-full">
        <SmoothScrollCards />
      </section>
    </main>
  );
}