import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoDiscord • Plataforma de Criação Automática de Servidores Discord",
  description: "Crie servidores Discord profissionais e totalmente configurados de forma automática e personalizada com nosso bot oficial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[#111214] text-[#DBDEE1] antialiased">
        {children}
      </body>
    </html>
  );
}
