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
        <main className="bg-black min-h-screen">{children}</main>
      </body>
    </html>
  );
}
