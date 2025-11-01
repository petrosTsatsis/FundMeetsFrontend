"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  FaDoorOpen,
  FaHandshake,
  FaLock,
  FaRegNewspaper,
  FaRobot,
  FaSearch,
  FaUserEdit,
} from "react-icons/fa";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
  Icon: IconType;
  comingSoon?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "Customize Profile",
    description:
      "Startups and investors can tailor their profiles with rich details like name, stage, equity, and valuation.",
    Icon: FaUserEdit,
  },
  {
    title: "Deal Room",
    description:
      "A dedicated workspace where investors and startups collaborate seamlessly through the deal closing journey.",
    Icon: FaDoorOpen,
  },
  {
    title: "Advanced Search",
    description:
      "Pinpoint the right opportunities with powerful filters, saved profiles, and lightning-fast, relevant results.",
    Icon: FaSearch,
  },
  {
    title: "Interest Request",
    description:
      "Investors reach startups with tailored requests. Accepted requests open a match to accelerate collaboration.",
    Icon: FaHandshake,
  },
  {
    title: "Posts",
    description:
      "Soon, startups and investors will share updates and milestones in a vibrant, dedicated feed.",
    Icon: FaRegNewspaper,
    comingSoon: true,
  },
  {
    title: "AI Startup Tutor",
    description:
      "Each startup will receive insights from a personal AI tutor to fuel growth and investor readiness.",
    Icon: FaRobot,
    comingSoon: true,
  },
];

const sectionVariants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const headingVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const featureVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative bg-white px-4 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--primary-700)]/10 opacity-20 blur-3xl" />
      </div>

      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <motion.header
          variants={headingVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl">
            <span className="bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent">
              Platform Features
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-700">
            Everything you need to connect with the right opportunities.
          </p>
        </motion.header>

        <div className="relative flex flex-col gap-14">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full bg-[var(--primary-700)]/10"
            aria-hidden
          />
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

type FeatureRowProps = {
  feature: Feature;
  index: number;
  isInView: boolean;
};

const FeatureRow = ({ feature, index, isInView }: FeatureRowProps) => {
  const isIconLeft = index % 2 === 0;
  const baseDelay = 0.2 + index * 0.15;

  return (
    <motion.article
      role="article"
      tabIndex={0}
      aria-label={feature.title}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={featureVariants}
      transition={{ duration: 0.7, delay: baseDelay }}
      className="group relative flex items-center gap-6"
    >
      {isIconLeft ? (
        <>
          <FeatureSide alignment="end" aria-hidden>
            <FeatureIcon feature={feature} />
          </FeatureSide>
          <TimelineDot index={index} />
          <FeatureSide alignment="start">
            <FeatureCard feature={feature} />
          </FeatureSide>
        </>
      ) : (
        <>
          <FeatureSide alignment="end">
            <FeatureCard feature={feature} />
          </FeatureSide>
          <TimelineDot index={index} />
          <FeatureSide alignment="start" aria-hidden>
            <FeatureIcon feature={feature} />
          </FeatureSide>
        </>
      )}
    </motion.article>
  );
};

type FeatureSideProps = {
  children: ReactNode;
  alignment: "start" | "end";
  "aria-hidden"?: boolean;
};

const FeatureSide = ({ children, alignment, ...props }: FeatureSideProps) => (
  <div
    className={cn(
      "flex flex-1",
      alignment === "start" ? "justify-start pl-8" : "justify-end pr-8"
    )}
    {...props}
  >
    <div className="flex h-full items-center justify-center">{children}</div>
  </div>
);

type FeatureIconProps = {
  feature: Feature;
};

const FeatureIcon = ({ feature }: FeatureIconProps) => (
  <motion.div
    aria-hidden
    whileHover={{ scale: 1.15, boxShadow: "0 0 24px #2563eb22" }}
    className="mx-auto flex items-center justify-center rounded-full bg-[var(--primary-700)]/10 p-5 shadow-xl transition-colors duration-300 group-hover:bg-[var(--primary-700)]/20"
  >
    <feature.Icon className="h-7 w-7 text-[var(--primary-700)]" />
  </motion.div>
);

type FeatureCardProps = {
  feature: Feature;
};

const FeatureCard = ({ feature }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0 4px 32px #2563eb11" }}
    className="max-w-md rounded-xl bg-white p-5 text-left shadow-lg transition-all duration-300"
  >
    <div className="flex items-center gap-2">
      <h3 className="text-lg font-semibold text-[var(--primary-800)]">{feature.title}</h3>
      {feature.comingSoon && (
        <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[var(--primary-700)] px-2 py-1 text-xs text-white">
          <FaLock className="h-3 w-3" />
          Coming Soon
        </span>
      )}
    </div>
    <p className="mt-2 text-gray-700">{feature.description}</p>
  </motion.div>
);

type TimelineDotProps = {
  index: number;
};

const TimelineDot = ({ index }: TimelineDotProps) => (
  <div className="relative flex h-full flex-col items-center justify-center">
    <motion.span
      initial={{ scale: 0.7, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="z-10 h-6 w-6 rounded-full border-4 border-white bg-[var(--primary-700)]/10 shadow-lg"
      aria-hidden
    />
  </div>
);
