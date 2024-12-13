import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { LucideKanban } from "lucide-react";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
          <div>
            {/* There are a couple ways we can use the Button styles here. */}
            {/* The first way is to use the Button component with asChild prop. */}
            <Button asChild variant="ghost">
              <Link href={paths.home()}>
                <LucideKanban className="!h-6 !w-6" />
                <h1 className="text-lg font-semibold">TicketBounty</h1>
              </Link>
            </Button>
          </div>
          <div>
            {/* The second way is to use the buttonVariants() utility. */}
            <Link
              href={paths.tickets()}
              className={buttonVariants({ variant: "default" })}
            >
              Tickets
            </Link>
          </div>
        </nav>
        <main className="bg-secondary/20 flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden px-8 py-24">
          {children}
        </main>
      </body>
    </html>
  );
}
