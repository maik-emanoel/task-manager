import { LogoWithTitle, LogoWrapper } from "@/components/logo-with-title";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen">
      <div className="flex-1 bg-primary-foreground hidden sm:flex items-center">
        <LogoWrapper className="space-y-3 mx-auto">
          <LogoWithTitle widthImage="w-40" textSize="text-4xl" />
        </LogoWrapper>
      </div>
      <div className="flex-1 p-6 w-full sm:max-w-[50%]">{children}</div>

      <LogoWrapper className="block sm:hidden absolute left-1/2 -translate-x-1/2 bottom-2">
        <LogoWithTitle widthImage="w-20" />
      </LogoWrapper>
    </section>
  );
}
