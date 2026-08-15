import type { Metadata } from 'next';

import { BASE_URL, SITE_NAME } from '@/lib/config';
import { ShopperApprovedReviewsPage } from '@/modules/shopper-approved/templates';

export const metadata: Metadata = {
  title: `Company Reviews`,
  alternates: {
    canonical: `${BASE_URL}/reviews`
  },
  openGraph: {
    title: `Company Reviews | ${SITE_NAME}`,
    url: `${BASE_URL}/reviews`,
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
    title: `Company Reviews | ${SITE_NAME}`,
    images: [`${BASE_URL}/federal-brace-logo.jpg`]
  },
  robots: 'index, nofollow'
};

export default function Reviews() {
  return (
    <main className="container-columns flex-grow">
      <ShopperApprovedReviewsPage />
    </main>
  );
}
