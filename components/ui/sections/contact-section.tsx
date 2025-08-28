'use client';

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";

export const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const router = useRouter();

    return (
        <section id="contact" className="relative overflow-hidden py-32 bg-white">
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
                    className="mx-auto max-w-2xl text-center mb-16"
                >
                    <h2 className="text-4xl tracking-tight md:text-4xl text-gray-700">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)]">
                            Get in Touch
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mx-auto max-w-md"
                >
                    <motion.form
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-6"
                        onSubmit={e => {
                            e.preventDefault();
                            router.push("/signup");
                        }}
                    >
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <div className="grid w-full gap-3">
                                <Label htmlFor="name" className="text-[var(--primary-800)]">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="border-[var(--primary-700)] focus-visible:border-[var(--primary-800)] text-[var(--primary-900)]"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <div className="grid w-full gap-3">
                                <Label htmlFor="email" className="text-[var(--primary-800)]">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    className="border-[var(--primary-700)] focus-visible:border-[var(--primary-800)] text-[var(--primary-900)]"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <div className="grid w-full gap-3">
                                <Label htmlFor="message" className="text-[var(--primary-800)]">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here."
                                    className="border-[var(--primary-700)] focus-visible:border-[var(--primary-800)] text-[var(--primary-900)] min-h-24"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                        >
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] text-white font-medium text-md py-3"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Send Message
                                    <FaEnvelope className="w-4 h-4" />
                                </span>
                            </Button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </section>
    );
};