'use client';

import React from "react";
import { FaGithub, FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa";

export const FooterSection = () => {
    return (
        <footer className="relative overflow-hidden bg-white" style={{ backgroundColor: 'white' }}>

            <div className="relative mx-auto max-w-screen-xl px-4 py-12 sm:py-16 lg:px-6">
                <div className="md:flex md:justify-between">
                    <div className="mb-8 md:mb-0">
                        <a href="/" className="group flex items-center">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src="/logo.png"
                                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                                    alt="FundMeets Logo"
                                />
                            </div>
                            <span className="font-display ml-3 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-2xl font-bold text-transparent">
                                FundMeets
                            </span>
                        </a>
                        <p className="mt-4 max-w-md text-gray-400">
                            Connecting innovative startups with visionary investors to shape the future of technology.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                Resources
                            </h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <a href="/" className="transition-colors duration-300 hover:text-primary-700">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="transition-colors duration-300 hover:text-primary-700">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <a href="/" className="transition-colors duration-300 hover:text-primary-700">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="transition-colors duration-300 hover:text-primary-700">
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                Legal
                            </h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="transition-colors duration-300 hover:text-primary-700">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors duration-300 hover:text-primary-700">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-primary-700/20 sm:mx-auto lg:my-10" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-400 sm:text-center">
                        © 2025{" "}
                        <a href="/" className="transition-colors duration-300 hover:text-primary-700">
                            FundMeets™
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaLinkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaTwitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaGithub className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaDiscord className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 