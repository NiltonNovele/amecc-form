import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMECC Register",
  description: "AMECC Regsitration",
  icons: {
    icon: "/logo-2.png", // main favicon
    shortcut: "/logo-2.png", // optional shortcut icon
    apple: "/logo-2.png", // optional for iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
