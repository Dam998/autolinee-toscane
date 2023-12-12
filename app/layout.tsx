import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autolinee Toscane",
  description: "Orari realtime autolinee toscane",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <main className="dark:bg-zinc-900 bg-zinc-300 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
