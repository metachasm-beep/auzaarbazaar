import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "@/components/auth/NextAuthProvider";

export const metadata: Metadata = {
  title: "auzaarbazaar | Industrial Machine Tools & ERP Solutions",
  description: "Modern marketplace for machine tools and specialized ERP implementation services for the manufacturing industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
