import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PaginationProvider } from "./contexts/usePagination";
import { SearchFilterProvider } from "./contexts/useSearchFilter";
import { ComboboxValuesProvider } from "./contexts/useComboboxValues";
import { ThemeProvider } from "./providers/theme-provider";
import opengraphImage from "./opengraph-image.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://task-manager-maik.vercel.app/"),
  title: "Task manager",
  description:
    "Task Manager is a versatile tool designed for efficient project management and task tracking. From planning to execution, users can easily create and manage development tasks, ensuring seamless collaboration and progress tracking. Simplify your workflow and boost productivity with Task Manager.",
  creator: "Maik Emanoel",
  keywords: [
    "Tasks",
    "Task Management",
    "Productivity",
    "Task Tracking",
    "Web Development",
    "Progress Monitoring",
  ],
  openGraph: {
    title: "Task Manager",
    description:
      "Task Manager is a versatile tool designed for efficient project management and task tracking.",
    images: opengraphImage.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PaginationProvider>
            <SearchFilterProvider>
              <ComboboxValuesProvider>{children}</ComboboxValuesProvider>
            </SearchFilterProvider>
          </PaginationProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
