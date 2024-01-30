import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataContextProvider } from "@/context/dataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VS Code File System",
  description: "Complete functional VS code file system clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataContextProvider>{children}</DataContextProvider>
      </body>
    </html>
  );
}
