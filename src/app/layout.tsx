"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const currentRoute = usePathname();
  const pathSegments = currentRoute?.split('/').filter(Boolean); 
  const routeWithoutLast = pathSegments.slice(0, -1).join('/'); 

  console.log(routeWithoutLast);

  const handleClick = () => {
    router.push(`/${routeWithoutLast}`); 
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="absolute bottom-4 left-4">
          <button
            className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 h-12"
            onClick={handleClick}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Back
            </span>
          </button>
        </div>
      </body>
    </html>
  );
}
