'use client';

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const faqs = [
        {
            question: "What is FundMeets?",
            answer:
                "FundMeets is a digital platform that connects startups with investors seeking new opportunities. Startups create detailed profiles showcasing their team, product, funding needs, and business stage, while investors browse, filter, and engage with ventures that match their interests.",
        },
        {
            question: "How does FundMeets work?",
            answer:
                "The platform acts as a matchmaking ecosystem and does not handle transactions or funding directly. Instead, it facilitates discovery, communication, and potential collaboration between founders and funders.",
        },
        {
            question: "Who can use FundMeets?",
            answer: (
                <span>
                    FundMeets is designed for anyone involved or interested in the startup ecosystem, including:
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>Startup founders and teams looking to showcase their ventures and attract funding</li>
                        <li>Angel investors and Venture Capital firms seeking early-stage opportunities</li>
                        <li>Accelerators and incubators interested in sourcing or supporting promising startups</li>
                        <li>Corporate innovation teams, advisors, and other stakeholders in the entrepreneurial landscape</li>
                    </ul>
                    <span className="block mt-2">
                        Whether you're building a startup or investing in the next big idea, FundMeets offers tools to help you connect, discover, and grow.
                    </span>
                </span>
            ),
        },
        {
            question: "How do I get started?",
            answer:
                "Getting started with FundMeets is quick and completely free. Simply sign up as a startup or investor, create your profile, and you’ll immediately gain access to the platform’s features. Startups can showcase their venture, funding needs, and vision, while investors can explore startups that align with their interests.",
        },
    ];

    return (
        <section id="faq" className="py-20 px-4 bg-white">
            <motion.div
                ref={ref}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)]">
                            Common Questions
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700">
                        Everything you need to know about FundMeets
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        >
                            <motion.div
                                initial={false}
                                animate={{ backgroundColor: openIndex === index ? "rgba(14, 116, 144, 0.07)" : "#fff" }} // --primary-700
                                className="border border-[var(--primary-700)]/20 rounded-xl overflow-hidden shadow-lg transition-colors duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-[var(--primary-700)]/10 transition-colors duration-300"
                                >
                                    <span className="text-lg font-medium text-gray-700 pr-8">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        {openIndex === index ? (
                                            <FaMinus className="w-5 h-5 text-[var(--primary-700)]" />
                                        ) : (
                                            <FaPlus className="w-5 h-5 text-[var(--primary-700)]" />
                                        )}
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="pt-4 border-t border-[var(--primary-700)]/10">
                                                    {typeof faq.answer === "string" ? (
                                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                                    ) : (
                                                        <div className="text-gray-700 leading-relaxed">{faq.answer}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};