"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CircleNotch } from "@phosphor-icons/react";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import PasswordInput from "./ui/password-input";
import ErrorMessage from "./ui/error-message";

interface DataProps {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignIn(data: DataProps) {
    setIsLoading(true)
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false)
    if (!signInData?.ok) {
      toast.error("Something went wrong, try again!");
      return;
    }

    toast.success("User logged in successfully");
    router.replace("/");
  }

  return (
    <form className=" w-full" onSubmit={handleSubmit(handleSignIn)}>
      <div className="space-y-3">
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.password?.type === "required" && (
            <ErrorMessage message="Email is required" />
          )}
        </div>

        <div className="space-y-1 relative">
          <PasswordInput register={register} />
          {errors.password?.type === "required" && (
            <ErrorMessage message="Password is required" />
          )}
          {errors.password?.type === "minLength" && (
            <ErrorMessage message="Too short! Password must be at least 4 characters." />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-8 select-none"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircleNotch className="size-5 animate-spin" />
        ) : (
          <span>Sign in</span>
        )}
      </Button>
    </form>
  );
}
