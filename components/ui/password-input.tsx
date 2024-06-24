import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "./input";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

interface PasswordInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

export default function PasswordInput<T extends FieldValues>({ register }: PasswordInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <>
      <Input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        className="pr-10"
        {...register("password" as FieldPath<T>, { required: true, minLength: 6 })}
      />
      <div
        className="absolute -top-0.5 right-1 size-8 flex items-center justify-center cursor-pointer"
        onClick={handleTogglePasswordVisibility}
      >
        {!isPasswordVisible ? (
          <EyeSlash className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </div>
    </>
  );
}
