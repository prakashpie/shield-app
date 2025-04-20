import type { Metadata } from "next";
import { Karla } from "next/font/google";
import '@/styles/global.css';

const karlaSans = Karla({
  variable: "--font-kerla-sans",
  weight: ['400', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Prakash Bharti - Building accessible, scalable web applications.",
  description: "Lead Web Developer with 10+ years of experience building accessible, scalable web applications. Deeply passionate about frontend development, I always striving for clean, responsive, and pixel-perfect code that delivers an exceptional user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${karlaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
