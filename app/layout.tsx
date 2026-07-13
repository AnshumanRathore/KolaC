import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: {
    default: "KolaC — Secure Access",
    template: "%s · KolaC",
  },
  description: "Login, Signup, Google Login, Dashboard, and Profile for KolaC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
