import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "JD Beddings & Interiors | Premium Home Comfort",
  description: "Transform your home with JD Beddings & Interiors. Specializing in premium bedding, luxury curtains, bath essentials, and interior décor that bring comfort, elegance, and peace to your space.",
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
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
