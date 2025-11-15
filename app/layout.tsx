import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Curtains & Home Decor | Premium Quality",
  description: "Discover premium curtains, bedding, towels, and home decor items to transform your living space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
