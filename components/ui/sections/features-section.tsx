'use client';

import React, { useRef } from "react";
import { FaUserEdit, FaHandshake, FaSearch, FaDoorOpen, FaRegNewspaper, FaRobot, FaLock } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const timelineColor = "bg-[var(--primary-700)]/10";

const featureIcons = [
    <FaUserEdit className="w-7 h-7 text-[var(--primary-700)]" />,      // Customize Profile
    <FaDoorOpen className="w-7 h-7 text-[var(--primary-700)]" />,      // Deal Room
    <FaSearch className="w-7 h-7 text-[var(--primary-700)]" />,        // Search
    <FaHandshake className="w-7 h-7 text-[var(--primary-700)]" />,     // Interest Request
    <FaRegNewspaper className="w-7 h-7 text-[var(--primary-700)]" />,  // Posts (upcoming)
    <FaRobot className="w-7 h-7 text-[var(--primary-700)]" />          // AI Startup Tutor (upcoming)
];

export const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            title: "Customize Profile",
            description:
                "Startups and Investors can edit their profiles, including details like name, stage, equity, valuation and more.",
            icon: featureIcons[0],
            isPremium: false,
        },
        {
            title: "Deal Room",
            description:
                "A dedicated workspace for Investors and Startups to collaborate during deal closure.",
            icon: featureIcons[1],
            isPremium: false,
        },
        {
            title: "Advanced Search",
            description:
                "Find exactly what you need with powerful filters. Save profiles, optimize your queries, and enjoy fast, relevant results using a robust search mechanism.",
            icon: featureIcons[2],
            isPremium: false,
        },
        {
            title: "Interest Request",
            description:
                "Investors can send Interest Requests to Startups with a personalized message. Startups can accept or reject, and accepted requests create a Match for further collaboration.",
            icon: featureIcons[3],
            isPremium: false,
        },
        {
            title: "Posts (Upcoming)",
            description:
                "Startups and Investors will soon be able to create posts and share updates in a dedicated feed.",
            icon: featureIcons[4],
            isPremium: true,
        },
        {
            title: "AI Startup Tutor (Upcoming)",
            description:
                "Each Startup will have access to a personal AI tutor for tailored growth suggestions and investor attraction strategies.",
            icon: featureIcons[5],
            isPremium: true,
        },
    ];

    return (
        <section id="features" className="py-20 px-4 bg-white relative">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--primary-700)]/10 opacity-20 blur-3xl"></div>
            </div>
            <motion.div
                ref={ref}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-3xl mx-auto relative z-10"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)]">
                            Platform Features
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Everything you need to connect with the right opportunities
                    </p>
                </motion.div>

                <div className="relative flex flex-col gap-14">
                    {/* Timeline vertical line with AboutSection color */}
                    <div className={`absolute left-1/2 top-0 bottom-0 w-2 ${timelineColor} z-0 transform -translate-x-1/2 rounded-full`} />
                    {features.map((feature, idx) => {
                        const isRight = idx % 2 === 0;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                                animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7, delay: 0.2 + (idx * 0.15) }}
                                className={`relative flex items-center z-10 group`}
                                tabIndex={0}
                                aria-label={feature.title}
                            >
                                {/* Icon on one side, description on the other */}
                                {isRight ? (
                                    <>
                                        {/* Icon left of timeline */}
                                        <div className="flex-1 flex justify-end pr-8">
                                            <div className="flex items-center justify-end h-full">
                                                <motion.div
                                                    whileHover={{ scale: 1.15, boxShadow: "0 0 24px #2563eb22" }}
                                                    className="bg-[var(--primary-700)]/10 group-hover:bg-[var(--primary-700)]/20 transition-colors shadow-xl rounded-full p-5 flex items-center justify-center mx-auto duration-300"
                                                >
                                                    {feature.icon}
                                                </motion.div>
                                            </div>
                                        </div>
                                        {/* Timeline icon spacer */}
                                        <div className="w-0 flex flex-col items-center justify-center relative">
                                            {/* Animated dot */}
                                            <motion.div
                                                initial={{ scale: 0.7, opacity: 0.5 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                                className="w-6 h-6 rounded-full bg-[var(--primary-700)]/10 border-4 border-white shadow-lg z-10"
                                            />
                                        </div>
                                        {/* Description right of timeline */}
                                        <div className="flex-1 flex justify-start pl-8">
                                            <motion.div
                                                whileHover={{ scale: 1.03, boxShadow: "0 4px 32px #2563eb11" }}
                                                className="max-w-md bg-white transition-all duration-300 rounded-xl p-5 shadow-lg text-left"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-[var(--primary-800)]">{feature.title}</h3>
                                                    {feature.isPremium && (
                                                        <span className="flex items-center gap-1 bg-[var(--primary-700)] text-white text-xs px-2 py-1 rounded-full">
                                                            <FaLock className="w-3 h-3" />
                                                            Coming Soon
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 mt-2">{feature.description}</p>
                                            </motion.div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Description left of timeline */}
                                        <div className="flex-1 flex justify-end pr-8">
                                            <motion.div
                                                whileHover={{ scale: 1.03, boxShadow: "0 4px 32px #2563eb11" }}
                                                className="max-w-md bg-white transition-all duration-300 rounded-xl p-5 shadow-lg text-left"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-[var(--primary-800)]">{feature.title}</h3>
                                                    {feature.isPremium && (
                                                        <span className="flex items-center gap-1 bg-[var(--primary-700)] text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                                            <FaLock className="w-3 h-3" />
                                                            Coming Soon
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 mt-2">{feature.description}</p>
                                            </motion.div>
                                        </div>
                                        {/* Timeline icon spacer */}
                                        <div className="w-0 flex flex-col items-center justify-center relative">
                                            {/* Animated dot */}
                                            <motion.div
                                                initial={{ scale: 0.7, opacity: 0.5 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                                className="w-6 h-6 rounded-full bg-[var(--primary-700)]/10 border-4 border-white shadow-lg z-10"
                                            />
                                        </div>
                                        {/* Icon right of timeline */}
                                        <div className="flex-1 flex justify-start pl-8">
                                            <div className="flex items-center justify-start h-full">
                                                <motion.div
                                                    whileHover={{ scale: 1.15, boxShadow: "0 0 24px #2563eb22" }}
                                                    className="bg-[var(--primary-700)]/10 group-hover:bg-[var(--primary-700)]/20 transition-colors shadow-xl rounded-full p-5 flex items-center justify-center mx-auto duration-300"
                                                >
                                                    {feature.icon}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};