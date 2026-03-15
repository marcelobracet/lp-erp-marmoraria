import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clientConfig from '@/config/client';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://onmarmoraria.com.br';

export const metadata: Metadata = {
  title: clientConfig.system.name,
  description: 'Landing page para marmorarias',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
    ],
    other: [{ rel: 'msapplication-TileImage', url: '/ms-icon-144x144.png' }],
  },
  openGraph: {
    title: clientConfig.system.name,
    description: 'Landing page para marmorarias',
    url: baseUrl,
    siteName: clientConfig.system.name,
    images: [
      {
        url: `${baseUrl}/dekton-1.avif`,
        width: 1200,
        height: 630,
        alt: clientConfig.system.name,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: clientConfig.system.name,
    description: 'Landing page para marmorarias',
    images: [`${baseUrl}/dekton-1.avif`],
  },
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
