import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buddy Tasks",
  description: "Every day Tasks Tracker for ShypBuddy Team.",
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
        <Toaster position="top-center"/>
        <div className='flex py-20 px-80'>
      
      <div className='w-full h-120 bg-white text-black rounded-lg p-8'>
        <h1 className='font-bold text-2xl mb-4'>Buddy Tasks</h1>
       {children}
      </div>

    </div>
      </body>
    </html>
  );
}
