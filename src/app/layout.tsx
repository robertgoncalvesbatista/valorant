import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/assets/globals.css";

const antonRegular = localFont({
  src: "../assets/fonts/AntonRegular.ttf",
  variable: "--font-anton-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Valorant Explorer",
  description: "Explore mapas e agentes de Valorant.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="pt-BR">
      <body className={`${antonRegular.variable} antialiased`}>{children}</body>
    </html>
  );
}
