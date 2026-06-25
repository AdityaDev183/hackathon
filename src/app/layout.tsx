import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🚀 Creator Copilot AI | Build Smarter. Faster. With AI.",
  description: "Replace your entire content team with one AI copilot. Generate scripts, thumbnails, videos, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background overflow-x-hidden`}>
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
