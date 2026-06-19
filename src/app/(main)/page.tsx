import type { Metadata } from 'next';
import Script from 'next/script';

import { BASE_URL, SITE_NAME } from '@/lib/config';
import { Homepage } from '@/modules/home/templates';

export const metadata: Metadata = {
  title: 'Support Brackets for Counters, Shelves & Mounting',
  description:
    'Shop our American-made support brackets, combining unwavering quality with style. Perfect for floating shelves, countertops, benches & mounting in your home or commercial space.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: `${BASE_URL}`
  },
  openGraph: {
    title: `Support Brackets for Counters, Shelves & Mounting | ${SITE_NAME}`,
    description:
      'Shop our American-made support brackets, combining unwavering quality with style. Perfect for floating shelves, countertops, benches & mounting in your home or commercial space.',
    url: `${BASE_URL}`,
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
    title: 'Support Brackets for Counters, Shelves & Mounting',
    description:
      'Shop our American-made support brackets, combining unwavering quality with style. Perfect for floating shelves, countertops, benches & mounting in your home or commercial space.',
    images: [`${BASE_URL}/federal-brace-logo.jpg`]
  }
};

export default async function Home() {
  return (
    <main className="row-start-2 flex flex-col items-center gap-8 text-primary sm:items-start">
      {/* Organization JSON-LD */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: `${BASE_URL}`,
            logo: `${BASE_URL}/favicon.ico`
          })
        }}
      />
      {/* WebSite JSON-LD */}
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: `${BASE_URL}`
          })
        }}
      />
      <Homepage />
    </main>
  );
}
