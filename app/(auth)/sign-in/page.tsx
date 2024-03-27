import Link from "next/link";

import { Button } from "@/components/ui/button";
import SignInForm from "@/components/sign-in-form";

export default function SignIn() {
  return (
    <div className="flex flex-col h-full">
      <Link href="/sign-up" className="ml-auto">
        <Button variant="ghost">Sign up</Button>
      </Link>

      <div className="max-w-80 w-full mx-auto mt-40">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-muted-foreground text-sm">
            Enter your information below to log in to your account.
          </p>
        </div>

        <SignInForm />
      </div>
    </div>
  );
}
