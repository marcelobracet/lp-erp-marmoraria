import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import clientConfig from "@/config/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: clientConfig.system.name,
  description: "Sistema ERP para marmorarias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
