import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import { UIProvider } from "./contexts/ui-context";
import GlobalDialog from "@/components/ui/global-dialog";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} antialiased`}>
        <UIProvider>
          {children}
          <GlobalDialog />
        </UIProvider>

        <Toaster />

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
