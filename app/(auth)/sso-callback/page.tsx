'use client';

import { useEffect, useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface RedirectCallbackResult {
  createdSessionId?: string;
  status?: string;
  [key: string]: any;
}

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsLoading(true);
        // Handle the OAuth callback
        const result = await handleRedirectCallback({
          redirectUrl: window.location.href,
        }) as RedirectCallbackResult;

        // Check if we have a session (user is authenticated)
        if (result?.createdSessionId) {
          // Success - Clerk will handle the redirect based on redirectUrlComplete
          console.log('Authentication successful');
        } else {
          // No session created - this could be due to various reasons
          setError('Authentication failed. Please try again.');
          toast.error('Authentication failed. Redirecting to home page...');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } catch (err: any) {
        console.error('Error handling OAuth callback:', err);

        // Check for specific error types
        if (err.errors?.[0]?.code === 'form_identifier_exists') {
          setError('An account with this email already exists. Redirecting to sign-in...');
          toast.error('An account with this email already exists. Redirecting to sign-in...');
        } else {
          setError('Authentication failed. Please try again.');
          toast.error('Authentication failed. Redirecting to sign-in page...');
        }

        // Redirect to sign-in page after a delay
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [handleRedirectCallback, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--primary-950)]/80">
      {/* Decorative blurred circles for elegance */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[var(--orange-500)]/20 opacity-30 mix-blend-multiply blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-[var(--primary-500)]/20 opacity-30 mix-blend-multiply blur-3xl pointer-events-none"></div>
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--primary-950)]/70 p-8 shadow-2xl border border-[var(--orange-500)]/30 backdrop-blur-xl">
        <div className="text-center">
          {error ? (
            <>
              <h1 className="mb-4 text-2xl font-bold text-[var(--primary-500)] drop-shadow">Authentication Error</h1>
              <p className="mb-6 text-[var(--primary-500)] font-medium">{error}</p>
              <p className="text-sm text-neutral-400">Redirecting to sign-in page...</p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-2xl font-bold text-white drop-shadow">Completing sign in...</h1>
              <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 text-[var(--primary-500)]"></div>
              <p className="text-sm text-neutral-400">Please wait while we complete the process</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 