import type { Metadata } from 'next';

import { BASE_URL, SITE_NAME } from '@/lib/config';
import { ContactUsPage } from '@/modules/contact-us/templates';

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  alternates: {
    canonical: `${BASE_URL}/contact-us`
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    url: `${BASE_URL}/contact-us`,
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
    title: `Contact Us | ${SITE_NAME}`,
    images: [`${BASE_URL}/federal-brace-logo.jpg`]
  }
};

export default function ContactUs() {
  return (
    <main className="container-columns my-6 flex flex-grow justify-center px-4 lg:my-12">
      <ContactUsPage />
    </main>
  );
}
