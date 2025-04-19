"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardData = [
    { videoUrl: "/ai-doctor.mp4", title: "AI Doctor" },
    { videoUrl: "/med.mp4", title: "Medicine Overview" },
    { videoUrl: "/features.mp4", title: "Disease Prediction Model" },
    { videoUrl: "/parkinsons.mp4", title: "Parkinsons Disease" },
    { videoUrl: "/dna.mp4", title: "DNA" },
];

export default function SmoothScrollCards() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="w-full bg-transparent py-24 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-6xl font-extrabold font-display text-white text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Explore Our Videos
                    </h2>
                    {/* <div className="w-28 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div> */}
                </div>

                {/* Stacked Video Cards */}
                <div className="flex flex-col gap-y-14 items-center">
                    {cardData.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm cursor-pointer relative group"
                            onClick={() => setSelectedVideo(card)}
                        >
                            <div className="p-4">
                                <div className="rounded-xl overflow-hidden relative">
                                    <video
                                        className="w-full h-[500px] object-cover rounded-xl"
                                        src={card.videoUrl}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                    {/* Title on hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <span className="text-white text-3xl font-bold font-display drop-shadow-lg">
                                            {card.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            className="bg-black rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full mx-4"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                className="w-full h-[600px] object-cover"
                                src={selectedVideo.videoUrl}
                                autoPlay
                                muted
                                controls
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
