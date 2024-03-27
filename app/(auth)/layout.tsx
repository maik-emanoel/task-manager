import Image from "next/image";
import logo from "@/public/logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen">
      <div className="flex-1 bg-primary-foreground flex items-center">
        <div className="space-y-3 mx-auto">
          <Image src={logo} alt="Logo" className="w-40" />
          <p className="text-4xl text-muted-foreground tracking-wide font-medium">
            Task manager
          </p>
        </div>
      </div>
      <div className="flex-1 p-6 max-w-[50%]">{children}</div>
    </section>
  );
}
