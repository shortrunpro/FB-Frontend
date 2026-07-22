import type { Metadata } from 'next';

import { BASE_URL, SITE_NAME } from '@/lib/config';
import { RequestQuotePage } from '@/modules/quotes/templates';

export const metadata: Metadata = {
  title: `Request a Custom Quote | ${SITE_NAME}`,
  alternates: {
    canonical: `${BASE_URL}/request-quote`
  },
  openGraph: {
    title: `Request a Custom Quote | ${SITE_NAME}`,
    url: `${BASE_URL}/request-quote`,
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/federal-brace-logo.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `Request a Custom Quote | ${SITE_NAME}`,
    images: [`${BASE_URL}/federal-brace-logo.jpg`]
  }
};

export default function RequestQuote() {
  return (
    <main className="container-columns my-8 flex flex-grow">
      <RequestQuotePage />
    </main>
  );
}
