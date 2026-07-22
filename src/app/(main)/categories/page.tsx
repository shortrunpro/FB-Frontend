import { Suspense } from 'react';

import type { Metadata } from 'next';
import Script from 'next/script';

import { Breadcrumbs } from '@/components/atoms';
import { BASE_URL, SITE_NAME } from '@/lib/config';
import { listCategories } from '@/lib/data/categories';
import { CategoryList } from '@/modules/categories/templates';
import { ProductListingSkeleton } from '@/modules/products/components';

export const metadata: Metadata = {
  title: 'All Categories',
  description: `Browse all categories on ${SITE_NAME || 'our store'}`,
  alternates: {
    canonical: `${BASE_URL}/categories`
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: `"All Categories" | ${SITE_NAME || 'Storefront'}`,
    description: `Browse all categories on ${SITE_NAME || 'our store'}`,
    url: `${BASE_URL}/categories`,
    siteName: SITE_NAME || 'Storefront',
    type: 'website'
  }
};

async function AllCategories({ params }: { params: Promise<{ locale: string }> }) {
  const breadcrumbsItems = [
    {
      path: '/',
      label: 'All Categories'
    }
  ];
  const categories = listCategories();
  return (
    <main className="container flex-grow">
      <Script
        id="ld-breadcrumbs-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'All Products',
                item: `${BASE_URL}/categories`
              }
            ]
          })
        }}
      />

      <div className="mb-2 hidden md:block">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">All Categories</h1>

      <Suspense
        fallback={
          <div data-testid="all-categories-page-loading">
            <ProductListingSkeleton />
          </div>
        }
      >
        <CategoryList categories={categories} />
      </Suspense>
    </main>
  );
}

export default AllCategories;
