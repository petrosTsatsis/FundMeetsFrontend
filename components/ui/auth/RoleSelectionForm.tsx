"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApi } from "@/lib/api";
import { motion } from "framer-motion";
import { FaBuilding, FaUser } from "react-icons/fa";

export default function RoleSelectionForm() {
  const [role, setRole] = useState<"STARTUP" | "INVESTOR" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const api = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    try {
      setIsLoading(true);
      if (!api) return;

      await api.syncUserRecord(role);

      toast.success("Role selected successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error syncing user:", error);
      toast.error("Failed to set role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 bg-white flex items-center justify-center">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[var(--primary-700)]/10 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-[var(--primary-900)]/10 opacity-20 blur-3xl"></div>
      </div>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-md mx-auto z-10"
      >
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-[var(--primary-700)]/10 px-3 py-1 text-sm font-medium text-[var(--primary-700)]">
            <span className="mr-2 h-2 w-2 rounded-full bg-[var(--primary-700)]"></span>
            Choose Your Path
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-[var(--primary-900)] md:text-5xl">
            <span className="relative z-10 bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent">
              Select your role
            </span>
          </h1>
          <p className="text-lg text-gray-700">
            Choose how you want to use FundMeets
          </p>
        </div>

        <div className="w-full space-y-8 rounded-2xl bg-white/80 p-8 border border-[var(--primary-700)]/20 shadow-lg transition-all duration-300 hover:shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => setRole("STARTUP")}
                className={`group relative w-full flex items-center gap-4 py-4 px-4 border text-sm font-medium rounded-xl transition-all duration-300
                  ${role === "STARTUP"
                    ? "bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)] shadow-lg text-white border-transparent"
                    : "bg-white/40 hover:bg-[var(--primary-700)]/5 border border-[var(--primary-700)]/20 text-[var(--primary-700)]"
                  } `}
              >
                <FaBuilding className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">I am a Startup</div>
                  <div className="text-xs opacity-80">
                    Looking for investors and funding
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole("INVESTOR")}
                className={`group relative w-full flex items-center gap-4 py-4 px-4 border text-sm font-medium rounded-xl transition-all duration-300
                  ${role === "INVESTOR"
                    ? "bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-800)] shadow-lg text-white border-transparent"
                    : "bg-white/40 hover:bg-[var(--primary-700)]/5 border border-[var(--primary-700)]/20 text-[var(--primary-700)]"
                  } `}
              >
                <FaUser className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">I am an Investor</div>
                  <div className="text-xs opacity-80">
                    Looking for investment opportunities
                  </div>
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={!role || isLoading}
              className={`w-full rounded-lg px-6 py-3 text-white font-semibold transition-all duration-300
                ${role && !isLoading
                  ? "bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
                } focus:outline-none focus:ring-4 focus:ring-[var(--primary-700)]/30`}
            >
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Setting Role...
                  </>
                ) : (
                  <>
                    Continue
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
