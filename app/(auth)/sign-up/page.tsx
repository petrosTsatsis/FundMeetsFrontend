import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--primary-50)] px-4 py-12">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/onboarding"
      />
    </div>
  );
}
