import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GYPSEY EMPLOYMENT AGENCY",
  description: "UK employment agency",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
