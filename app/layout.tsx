import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paola Rioseco | Vida Consciente",
  description: "Conocimiento para la transformación personal.",
  icons: {
    icon: [
      { url: "/isotipo.png", type: "image/png" }
    ],
    shortcut: "/isotipo.png",
    apple: [
      { url: "/isotipo.png", type: "image/png" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
