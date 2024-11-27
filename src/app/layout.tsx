import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { inter } from "@/components/ui/fonts";
import connectDB from "./lib/connectDB";

export const metadata: Metadata = {
  title: "Code Stash",
  description: "Organize your essential code snippets in one place",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const DBConnection = await connectDB();
  console.log("DBConnection", DBConnection);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased p-2`}>{children}</body>
    </html>
  );
}

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
