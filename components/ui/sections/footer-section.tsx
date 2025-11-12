"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa";

export const FooterSection = () => {
    return (
        <footer className="relative overflow-hidden bg-white" style={{ backgroundColor: 'white' }}>

            <div className="relative mx-auto max-w-screen-xl px-4 py-12 sm:py-16 lg:px-6">
                <div className="md:flex md:justify-between">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="group flex items-center">
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src="/logo.png"
                                    alt="FundMeets Logo"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                                    priority
                                />
                            </div>
                            <span className="font-display ml-3 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-2xl font-bold text-transparent">
                                FundMeets
                            </span>
                        </Link>
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
                                    <Link href="#about" className="transition-colors duration-300 hover:text-primary-700">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#features" className="transition-colors duration-300 hover:text-primary-700">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-400">
                                <li className="mb-4">
                                    <Link href="#contact" className="transition-colors duration-300 hover:text-primary-700">
                                        LinkedIn
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#contact" className="transition-colors duration-300 hover:text-primary-700">
                                        Twitter
                                    </Link>
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
                        <Link href="/" className="transition-colors duration-300 hover:text-primary-700">
                            FundMeets™
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Link href="#contact" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaLinkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#contact" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaTwitter className="h-5 w-5" />
                        </Link>
                        <Link href="#contact" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaGithub className="h-5 w-5" />
                        </Link>
                        <Link href="#contact" className="text-gray-400 transition-colors duration-300 hover:text-primary-700">
                            <FaDiscord className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 