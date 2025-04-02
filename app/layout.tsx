import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/UI/NavBar";
import { Footer } from "@/components/UI/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Baptist - Encuentra tu próximo trabajo o freelancer",
  description: "Plataforma de freelancing potenciada por blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1 pt-32 px-2 lg:px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
