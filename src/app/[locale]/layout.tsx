import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import clientConfig from '@/config/client';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['pt-br', 'en'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: clientConfig.system.name,
  description: 'Landing page para marmorarias',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
