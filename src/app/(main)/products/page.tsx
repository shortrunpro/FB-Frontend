import { Suspense } from 'react';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';

import { Breadcrumbs } from '@/components/atoms';
import { listProducts } from '@/lib/data/products';
import isBot from '@/lib/helpers/isBot';
import { ProductListingSkeleton } from '@/modules/products/components';
import { FacetedProductsListing, ProductListing } from '@/modules/products/templates';

// TODO validate usecase
export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const title = 'All Products';
  const description = `Browse all products on ${process.env.NEXT_PUBLIC_SITE_NAME || 'our store'}`;
  const canonical = `${baseUrl}/products`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME || 'Storefront'}`,
      description,
      url: canonical,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Storefront',
      type: 'website'
    }
  };
}

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

async function AllProducts({ params }: { params: Promise<{ locale: string }> }) {
  // TODO determine a way to identify the usefulness of this bot logic
  const ua = (await headers()).get('user-agent') || '';
  const bot = isBot(ua);

  const breadcrumbsItems = [
    {
      path: '/',
      label: 'All Products'
    }
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const {
    response: { products: jsonLdProducts }
  } = await listProducts({
    countryCode: 'us',
    queryParams: { limit: 8, order: 'created_at', fields: 'id,title,handle' }
  });

  const itemList = jsonLdProducts.slice(0, 8).map((p, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `${baseUrl}/products/${p.handle}`,
    name: p.title
  }));

  return (
    <main className="container">
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
                item: `${baseUrl}/products`
              }
            ]
          })
        }}
      />
      <Script
        id="ld-itemlist-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: itemList
          })
        }}
      />
      <div className="mb-2 hidden md:block">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">All Products</h1>

      <Suspense
        fallback={
          <div data-testid="all-categories-page-loading">
            <ProductListingSkeleton />
          </div>
        }
      >
        {bot || !ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing
            showSidebar
            locale={'us'}
          />
        ) : (
          <FacetedProductsListing />
        )}
      </Suspense>
    </main>
  );
}

export default AllProducts;
