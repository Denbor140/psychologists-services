import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ModalProvider } from "@/components/ModalProvider/ModalProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Psychologists Services",
  description: "Create by GO IT - Denys Boreiko",
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
            <ModalProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 5000,
                }}
              />
              <Header />
              <main>{children}</main>
            </ModalProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
