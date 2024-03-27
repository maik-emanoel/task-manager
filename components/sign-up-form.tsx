"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleNotch } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ui/error-message";
import PasswordInput from "./ui/password-input";

interface FormSchema {
  username: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSignUp(data: FormSchema) {
    setIsLoading(true);
    const signUpUser = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await signUpUser.json();

    setIsLoading(false);
    if (response.errorType === "emailExists") {
      toast.error("This email already is used, please try another one!");
      return;
    }

    if (response.errorType === "usernameExists") {
      toast.error("This username already is used, please try another one!");
      return;
    }

    toast.success("User created successfully!");

    setTimeout(() => {
      router.replace("/sign-in");
    }, 1500);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSignUp)}>
      <div className="space-y-3">
        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: true, minLength: 4 })}
          />
          {errors.username?.type === "required" && (
            <ErrorMessage message="Username is required" />
          )}
          {errors.username?.type === "minLength" && (
            <ErrorMessage message="Too short! Username must be at least 4 characters." />
          )}
        </div>
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
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
          <span>Sign up</span>
        )}
      </Button>
    </form>
  );
}
