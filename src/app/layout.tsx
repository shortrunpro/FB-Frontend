import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';

import { Toaster } from '@medusajs/ui';
import Head from 'next/head';

import { retrieveCart } from '@/lib/data/cart';

import { Providers } from './providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // Select the weights you need
  variable: '--font-montserrat' // Define a CSS variable name
});
export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: process.env.NEXT_PUBLIC_SITE_NAME || ''
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || '')
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await retrieveCart();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang={'en'}
      className={`${montserrat.variable}`}
    >
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={`relative m-0 w-full overflow-x-hidden bg-primary p-0 text-secondary antialiased`}
      >
        <Providers cart={cart}>{children}</Providers>
        <Toaster position="top-right" />
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
