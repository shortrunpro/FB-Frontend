import { Suspense } from 'react';

import type { Metadata } from 'next';

import { BASE_URL, SITE_NAME, ROBOTS_METADATA } from '@/lib/config';
import { BlogsList } from '@/modules/blog/templates';
import { Breadcrumbs } from '@/modules/common/components';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export const metadata: Metadata = {
  title: `Blog`,
  description:
    'Follow the Federal Brace blog for information on our products, updates in the industry, and more!',
  robots: ROBOTS_METADATA,
  alternates: {
    canonical: `${BASE_URL}/blog`
  },
  openGraph: {
    title: `Blog`,
    description:
      'Follow the Federal Brace blog for information on our products, updates in the industry, and more!',
    url: `${BASE_URL}/blog`,
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
    title: `Blog`,
    description:
      'Follow the Federal Brace blog for information on our products, updates in the industry, and more!',
    images: [`${BASE_URL}/federal-brace-logo.jpg`]
  }
};

export default async function Blog({ searchParams }: PageProps) {
  const { page } = await searchParams;
  return (
    <main className="container-columns my-4 flex flex-grow flex-col justify-center gap-4">
      <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />
      <Suspense fallback={<>Loading...</>}>
        <BlogsList page={page} />
      </Suspense>
    </main>
  );
}
