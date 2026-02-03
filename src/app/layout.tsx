import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kleinanzeigen Finder - Find Your Perfect Items",
  description: "Advanced search tool for Kleinanzeigen with powerful filters for free items, appliances, furniture, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
