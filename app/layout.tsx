import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Psychologists Services",
  description: "Psychologists Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
