import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
