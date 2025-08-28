'use client';

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export const PricingSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const router = useRouter();

    const features = [
        "All Platform Features",
        "Personalized Dashboard",
        "Secure Profile Viewing",
        "Community Access",
        "Email Support"
    ];

    return (
        <section id="pricing" className="relative overflow-hidden py-32 bg-white">
            {/* Soft background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[var(--primary-700)]/10 opacity-20 mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-[var(--primary-900)]/10 opacity-20 mix-blend-multiply blur-3xl"></div>
            </div>

            <motion.div
                ref={ref}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative mx-auto max-w-screen-xl px-4"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto mb-16 max-w-screen-md text-center"
                >
                    <h2 className="mb-4 text-4xl tracking-tight md:text-4xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)]">
                            Start Free
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700">
                        All platform features, no hidden costs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mx-auto max-w-lg"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative rounded-3xl bg-white border border-[var(--primary-700)]/10 shadow-xl p-10 flex flex-col items-center"
                    >
                        <div className="mb-8 w-full flex flex-col items-center">
                            <div className="text-6xl font-bold bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent mb-2">0€</div>
                            <div className="text-gray-700 text-lg mb-2">/ month</div>
                            <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-700)]/10 text-[var(--primary-700)] font-semibold text-sm mb-4">
                                Free for limited time
                            </span>
                        </div>

                        <ul className="w-full grid gap-3">
                            {features.map((feature, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + (idx * 0.07) }}
                                    className="flex items-center gap-3 text-gray-700"
                                >
                                    <FaCheckCircle className="text-[var(--success-700)] w-5 h-5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <Button
                            className="mt-10 w-full text-white font-medium"
                            variant="default"
                            onClick={() => router.push("/sign-up")}
                        >
                            Get Started now
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};