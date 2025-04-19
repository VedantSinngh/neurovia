"use client";

import { useState } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

const cardData = [
    {
        imageUrl: "/bt1.png",
        title: "Brain Tumor",
        iframeUrl: "http://127.0.0.1:3019",
    },
    {
        imageUrl: "/bf.png",
        title: "Bone Fracture",
        iframeUrl: "http://127.0.0.1:3020",
    },
    {
        imageUrl: "/pd.png",
        title: "Parkinson's Disease",
        iframeUrl: "http://127.0.0.1:5001",
    },
    {
        imageUrl: "/tc1.png",
        title: "Tuberculosis",
        iframeUrl: "http://10.9.135.85:3021/",
    },
    {
        imageUrl: "/med1.jpg",
        title: "Medicine Description",
        iframeUrl: "http://127.0.0.1:5000",
    },
    {
        imageUrl: "/cb.png",
        title: "Healthcare Chatbot",
        iframeUrl: "http://127.0.0.1:7860",
    },
    {
        imageUrl: "/dna.jpg",
        title: "DNA Visualizer",
        iframeUrl: "http://localhost:3001/",
    },
    {
        imageUrl: "/dna1.jpg",
        title: "Genetal Disease Prediction",
        iframeUrl: " http://127.0.0.1:8082",
    },
];

export default function HealthcareCards({ currentPath }) {
    const [iframeUrl, setIframeUrl] = useState("");
    const [showModal, setShowModal] = useState(false);

    const openIframe = (url) => {
        setIframeUrl(url);
        setShowModal(true);
    };

    const closeModal = () => {
        setIframeUrl("");
        setShowModal(false);
    };

    return (
        <section className="w-full relative">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300">
                {currentPath} Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => openIframe(card.iframeUrl)}
                    >
                        <DirectionAwareHover imageUrl={card.imageUrl}>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                        </DirectionAwareHover>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-[90%] h-[80%] bg-white rounded-xl shadow-xl overflow-hidden">
                        <button
                            className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <iframe
                            src={iframeUrl}
                            title="Medical AI Prediction"
                            className="w-full h-full border-0"
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}
