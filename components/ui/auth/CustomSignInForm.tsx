"use client";

import { useRef, useState } from "react";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function CustomSignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const captchaRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      await signOut();
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        toast.error("Sign in failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("An error occurred during sign in. Please try again.");
      console.error("Error during sign in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      setOAuthLoading(true);
      await signOut();
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (!captchaRef.current) {
        toast.error("CAPTCHA failed to load. Please refresh and try again.");
        return;
      }
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err) {
      toast.error("An error occurred during Google sign in. Please try again.");
      console.error("Error during Google sign in:", err);
      setOAuthLoading(false);
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
            Welcome Back
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-[var(--primary-900)] md:text-5xl">
            Sign in to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent">
                FundMeets
              </span>
            </span>
          </h1>
        </div>

        <div className="w-full space-y-8 rounded-2xl bg-white/80 p-8 border border-[var(--primary-700)]/20 shadow-lg transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div id="clerk-captcha" ref={captchaRef} className="mb-4"></div>
            <div className="form-control w-full">
              <label className="mb-2 block text-sm font-medium text-[var(--primary-700)]">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-xl border border-[var(--primary-700)]/20 bg-white px-4 py-3 text-[var(--primary-900)] transition-all duration-300 focus:border-[var(--primary-700)] focus:ring-2 focus:ring-[var(--primary-700)]/30"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-xs text-[var(--primary-700)]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="mb-2 block text-sm font-medium text-[var(--primary-700)]">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full rounded-xl border border-[var(--primary-700)]/20 bg-white px-4 py-3 text-[var(--primary-900)] transition-all duration-300 focus:border-[var(--primary-700)] focus:ring-2 focus:ring-[var(--primary-700)]/30"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-xs text-[var(--primary-700)]">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-[var(--primary-700)]/30"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--primary-700)]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex justify-center py-3 px-4 border border-[var(--primary-700)]/20 rounded-lg text-sm font-medium text-[var(--primary-700)] transition-all duration-300 hover:bg-[var(--primary-700)]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-700)]"
            disabled={oauthLoading}
          >
            {oauthLoading ? (
              "Connecting..."
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          <div className="text-center text-sm text-gray-700 mt-4">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-medium text-[var(--primary-700)] hover:text-[var(--primary-900)]"
            >
              Sign up
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
