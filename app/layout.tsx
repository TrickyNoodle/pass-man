import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import MouseReactiveBackground from "@/components/MouseReactiveBackground";

export const metadata: Metadata = {
  title: "Pass-Man",
  description: "Yet Another Password Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased md:w-3/4 dark md:mx-auto px-2`}
      >
        <MouseReactiveBackground />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
