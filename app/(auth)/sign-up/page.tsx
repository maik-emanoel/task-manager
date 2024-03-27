import Link from "next/link";

import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/sign-up-form";

export default function SignUp() {
  return (
    <div className="flex flex-col h-full">
      <Link href="/sign-in" className="ml-auto">
        <Button variant="ghost">
          Login
        </Button>
      </Link>

      <div className="max-w-80 w-full mx-auto mt-40">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your infos below to create your account
          </p>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
