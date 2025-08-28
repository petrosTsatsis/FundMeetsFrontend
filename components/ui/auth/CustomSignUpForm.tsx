"use client";

import React, { useRef, useState } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

// Define the form schema with Zod
const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function CustomSignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [oauthLoading, setOAuthLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const captchaRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setFormData(data);
      await signOut();
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (!captchaRef.current) {
        toast.error("CAPTCHA failed to load. Please refresh and try again.");
        return;
      }
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/select-role");
      } else {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setVerifying(true);
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        toast.error("An account with this email already exists. Redirecting to sign in...");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        toast.error("An error occurred during sign up. Please try again.");
        console.error("Error during sign up:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;
    setCode(otp);

    if (!otp || !signUp || !formData) return;

    try {
      setIsLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code: otp });
      if (completeSignUp.status !== "complete") throw new Error("Verification failed");
      if (setActive) await setActive({ session: completeSignUp.createdSessionId });
      router.push("/select-role");
    } catch (err) {
      toast.error("Verification failed. Please try again.");
      console.error("Error during verification:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    try {
      setOAuthLoading(true);
      await signOut();
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (!captchaRef.current) {
        toast.error("CAPTCHA failed to load. Please refresh and try again.");
        return;
      }
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/select-role`,
      });
    } catch (err) {
      toast.error("An error occurred during Google sign up. Please try again.");
      console.error("Error during Google sign up:", err);
      setOAuthLoading(false);
    }
  };

  if (verifying) {
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
              Verify Email
            </div>
            <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-[var(--primary-900)] md:text-5xl">
              Check your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent">
                  inbox
                </span>
              </span>
            </h1>
            <p className="text-lg text-gray-700">
              We've sent a verification code to your email address
            </p>
          </div>
          <div className="w-full space-y-8 rounded-2xl bg-white/80 p-8 border border-[var(--primary-700)]/20 shadow-lg transition-all duration-300 hover:shadow-xl">
            <form className="flex w-full flex-col items-center gap-6" onSubmit={handleVerification}>
              <label className="mb-2 block text-sm font-medium text-[var(--primary-700)]">
                Verification Code
              </label>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={val => setCode(val)}
                name="otp"
                containerClassName="mb-6"
                required
                aria-label="OTP input field"
                placeholder="Enter code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] text-white font-semibold transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-[var(--primary-700)]/30"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    );
  }

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
            Join FundMeets
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-[var(--primary-900)] md:text-5xl">
            Create your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] bg-clip-text text-transparent">
                account
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
            <div className="form-control w-full">
              <label className="mb-2 block text-sm font-medium text-[var(--primary-700)]">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full rounded-xl border border-[var(--primary-700)]/20 bg-white px-4 py-3 text-[var(--primary-900)] transition-all duration-300 focus:border-[var(--primary-700)] focus:ring-2 focus:ring-[var(--primary-700)]/30"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="text-xs text-[var(--primary-700)]">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[var(--primary-700)] to-[var(--primary-900)] px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-[var(--primary-700)]/30"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
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
            onClick={handleGoogleSignUp}
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
                Sign up with Google
              </>
            )}
          </button>
          <div className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-medium text-[var(--primary-700)] hover:text-[var(--primary-900)]"
            >
              Sign in
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
