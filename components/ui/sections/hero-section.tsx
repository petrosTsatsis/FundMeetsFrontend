"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scriptId = "waitlister-embed-script";
    const renderWaitlister = () => {
      const waitlister = (window as typeof window & { Waitlister?: { init?: () => void } }).Waitlister;
      waitlister?.init?.();
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      if ((existingScript as HTMLScriptElement).dataset.loaded === "true") {
        renderWaitlister();
      } else {
        existingScript.addEventListener("load", renderWaitlister);
      }
      return () => {
        existingScript.removeEventListener("load", renderWaitlister);
      };
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://waitlister.me/js/embed.js";
    script.async = true;
    script.dataset.loaded = "false";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      renderWaitlister();
    });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", renderWaitlister);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen py-20 px-4 relative bg-white"
      style={{ backgroundColor: "white" }}
    >
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-[1400px] mx-auto w-full gap-16 pt-32 md:pt-35"
      >
        {/* Hero Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block max-w-3xl text-center justify-center"
        >
          <h1 className="font-display text-5xl leading-none tracking-tight md:text-6xl lg:text-7xl text-black text-center">
            Where Startups Meet{" "}
            <span className="block relative mx-auto w-fit">
              <span className="block bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)] bg-clip-text text-transparent">
                Investors
              </span>
              <span className="absolute bottom-0 left-0 -z-10 h-3 w-full -rotate-1 transform bg-[var(--primary-700)]/20"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto mt-6">
            A digital ecosystem empowering startups and investors to connect,
            collaborate, and unlock funding opportunities.
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div
              className="waitlister-form"
              data-waitlist-key="6au6BYrnEmfh"
              data-height="197px"
              data-theme="light"
              style={{ width: "100%", maxWidth: "420px" }}
            />
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-6xl backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-800 p-6"
        >
          <div className="flex justify-center">
            <img
              src="/Screenshot.png"
              alt="Dashboard Preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
