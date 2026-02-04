import type { Metadata } from "next";
import { Libre_Baskerville, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  weight: ["300", "400", "500"], // Thin/Light/Regular for that technical feel
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drewsky Hulett",
  description: "Senior Creative Developer & Web Architect",
};

import { Sidebar } from "@/components/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${sourceCodePro.variable} antialiased`}
      >
        <div className="relative min-h-screen w-full">
          <Sidebar />
          <main className="pl-[280px] min-h-screen">
            <div className="max-w-5xl mx-auto p-12 md:px-24 md:pb-24 md:pt-12 relative z-10">
              {children}
            </div>
          </main>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
