import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/header";
import Providers from "./_providers/providers";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/sidebar/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicketBounty",
  description: "Ticket bounty platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <div className="flex h-screen border-collapse overflow-hidden bg-secondary/20">
            <Sidebar />
            <main className="flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden px-8 py-24">
              {children}
            </main>
          </div>
          <Toaster expand />
        </Providers>
      </body>
    </html>
  );
}
