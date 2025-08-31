"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll logic
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const run = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId.replace("#", ""));
    if (section) {
      const headerHeight = document.querySelector("nav")?.offsetHeight || 0;
      const targetPosition =
        section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      smoothScrollTo(targetPosition);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white border-b border-gray-200 shadow-lg text-black ${
        isScrolled ? "shadow-md" : ""
      }`}
      style={{ height: "80px" }}
    >
      <div className="flex items-center justify-between h-full px-4 max-w-5xl mx-auto relative">
        {/* Left: Logo and Brand */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="FundMeets Logo"
            width={56}
            height={56}
            className="h-16 w-16"
          />
          <span
            className="text-xl font-semibold whitespace-nowrap"
            style={{ color: "#164e63" }}
          >
            FundMeets
          </span>
        </Link>

        {/* Center: NavigationMenu */}
        <NavigationMenu>
          <NavigationMenuList className="hidden lg:flex gap-6">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  asChild
                  className="group relative text-black hover:text-[var(--primary-900)] transition-colors cursor-pointer text-md px-2"
                  onClick={() => scrollToSection(item.href)}
                >
                  <span>{item.name}</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>

        {/* Right: Buttons */}
        <div className="hidden lg:flex gap-4">
          <Button
            asChild
            variant="outline"
            className="font-medium text-black hover:text-[var(--primary-900)] transition-colors text-sm"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="default" className="text-sm">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Toggle - absolutely positioned on the right */}
      <button
        className="lg:hidden absolute top-0 right-4 h-20 flex items-center text-black hover:text-[var(--primary-900)] transition-colors"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white pt-4 pb-6 px-4 shadow-md border-t border-gray-200">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className="w-full text-left text-black hover:text-[var(--primary-900)] transition-colors block rounded-lg px-4 py-2 text-base font-small"
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
            </button>
          ))}
          {/* FIX: Show buttons on mobile */}
          <div className="flex flex-col gap-2 mt-4">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-black hover:text-[var(--primary-900)] text-sm"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="w-full justify-start text-sm"
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
