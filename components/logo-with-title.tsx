import Image from "next/image";
import logo from "@/public/logo.png";
import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LogoWithTitleProps {
  widthImage: string;
  textSize?: string;
}

interface LogoWrapperProps extends ComponentProps<'div'> {
  children: ReactNode
}

function LogoWithTitle({ widthImage, textSize = "text-sm" }: LogoWithTitleProps) {
  return (
    <>
      <Image src={logo} alt="Logo" className={widthImage} />
      <p className={cn("text-muted-foreground tracking-wide font-medium", textSize)}>
        Task manager
      </p>
    </>
  );
}

function LogoWrapper({ children, className, ...rest }: LogoWrapperProps) {
  return <div className={className} {...rest}>{children}</div>;
}

export {
  LogoWithTitle,
  LogoWrapper
}