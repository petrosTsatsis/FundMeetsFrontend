"use client";

import { FaShieldAlt, FaRocket, FaUserFriends } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";

export const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-20 px-4 bg-white">
            <motion.div
                ref={ref}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)]">
                            About FundMeets
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        FundMeets is an online platform designed to facilitate direct
                        interaction between startups and investors, enabling a more efficient
                        and transparent funding process within a digital startup ecosystem.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Card 1: Guided Discovery */}
                    <Card className="group relative bg-white border border-[var(--primary-700)]/20 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
                        <CardHeader className="flex flex-col items-center p-0 pt-6 pb-0">
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-[var(--success-700)]/10 group-hover:bg-[var(--success-700)]/20 transition-colors rounded-full shadow">
                                    <FaShieldAlt className="w-6 h-6 text-[var(--success-700)] group-hover:text-[var(--success-800)] transition-colors" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--success-700)] to-[var(--success-800)]">
                                Guided Discovery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center px-6 pb-6 pt-2">
                            <p className="text-sm text-gray-700 group-hover:text-[var(--success-800)] transition-colors">
                                Investors and startups can easily navigate relevant opportunities with
                                category-based filters and smart recommendations.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 2: Targeted Matching */}
                    <Card className="group relative bg-white border border-[var(--primary-700)]/20 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
                        <CardHeader className="flex flex-col items-center p-0 pt-6 pb-0">
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-[var(--primary-700)]/10 group-hover:bg-[var(--primary-700)]/20 transition-colors rounded-full shadow">
                                    <FaRocket className="w-6 h-6 text-[var(--primary-700)] group-hover:text-[var(--primary-800)] transition-colors" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)]">
                                Targeted Matching
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center px-6 pb-6 pt-2">
                            <p className="text-sm text-gray-700 group-hover:text-[var(--primary-800)] transition-colors">
                                Intelligent tools that connect startups with the right investors based
                                on funding stage, industry, and traction.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 3: Community Driven */}
                    <Card className="group relative bg-white border border-[var(--primary-700)]/20 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
                        <CardHeader className="flex flex-col items-center p-0 pt-6 pb-0">
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-[var(--orange-700)]/10 group-hover:bg-[var(--orange-700)]/20 transition-colors rounded-full shadow">
                                    <FaUserFriends className="w-6 h-6 text-[var(--orange-700)] group-hover:text-[var(--orange-800)] transition-colors" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--orange-700)] to-[var(--orange-800)]">
                                Community Driven
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center px-6 pb-6 pt-2">
                            <p className="text-sm text-gray-700 group-hover:text-[var(--orange-800)] transition-colors">
                                Join a thriving community of investors and entrepreneurs.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </section>
    );
};
