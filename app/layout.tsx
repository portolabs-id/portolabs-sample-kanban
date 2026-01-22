import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OrganizeIt - Mini Kanban Board",
  description: "Kanban board untuk manajemen tugas tim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} bg-zinc-50 text-zinc-900 antialiased h-screen flex flex-col overflow-hidden selection:bg-zinc-200`}>
        {children}
      </body>
    </html>
  );
}
