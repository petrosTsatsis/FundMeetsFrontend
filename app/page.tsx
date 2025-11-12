"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const scriptId = "waitlister-embed-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://prod-waitlister.s3.us-east-2.amazonaws.com/waitlist-embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-sky-50 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
              FM
            </span>
            FundMeets
          </div>
          <span className="text-sm text-slate-500">Coming soon</span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 py-16">
        <section className="w-full max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Introducing FundMeets
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Where investors connect and collaborate effortlessly
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Join our waitlist to be the first to experience curated deal rooms,
            collaborative fundraising tools, and meaningful investor networking
            that helps your next round come together faster.
          </p>
        </section>

        <section className="mt-12 w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-sky-100/50 backdrop-blur">
          <h2 className="text-left text-xl font-semibold text-slate-900">
            Join the waitlist
          </h2>
          <p className="mt-2 text-left text-sm text-slate-500">
            Share your email to receive launch updates and early access.
          </p>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{
              __html:
                '<div class="waitlister-form" data-waitlist-key="6au6BYrnEmfh" data-height="197px"></div>',
            }}
          />
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-white/80 py-6">
        <div className="mx-auto w-full max-w-5xl px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} FundMeets. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
