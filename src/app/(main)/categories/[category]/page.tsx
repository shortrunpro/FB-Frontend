import { Suspense } from 'react';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { Breadcrumbs } from '@/components/atoms';
import { ProductListingSkeleton } from '@/components/organisms/ProductListingSkeleton/ProductListingSkeleton';
import { AlgoliaProductsListing, ProductListing } from '@/components/sections';
import { BASE_URL, SITE_NAME, ROBOTS_METADATA } from '@/lib/config';
import { getCategoryByHandle } from '@/lib/data/categories';
import { listProducts } from '@/lib/data/products';
import isBot from '@/lib/helpers/isBot';
import { CategoryCard } from '@/modules/categories/components';

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categoryHandle } = await params;

  const cat = await getCategoryByHandle(categoryHandle);
  if (!cat) {
    return {};
  }
  const title = `${cat.name}`;
  const description = `${cat.name} Category - ${SITE_NAME || 'Storefront'}`;
  const canonical = `${BASE_URL}/categories/${categoryHandle}`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    robots: ROBOTS_METADATA,
    openGraph: {
      title: `${title} | ${SITE_NAME || 'Storefront'}`,
      description,
      url: canonical,
      siteName: SITE_NAME || 'Storefront',
      type: 'website'
    }
  };
}

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

async function Category({
  params
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category: categoryHandle } = await params;

  const category = await getCategoryByHandle(categoryHandle);
  if (!category) {
    return notFound();
  }
  const ua = (await headers()).get('user-agent') || '';
  const bot = isBot(ua);

  const breadcrumbsItems = [
    {
      path: '/categories',
      label: 'Categories'
    },
    ...(category.parent_category?.handle && category.parent_category?.name
      ? [
          {
            path: `/categories/${category.parent_category?.handle}`,
            label: category.parent_category.name
          }
        ]
      : []),
    {
      path: `/categories/${categoryHandle}`,
      label: category.name
    }
  ];

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const {
    response: { products: jsonLdProducts }
  } = await listProducts({
    countryCode: 'us',
    queryParams: { limit: 8, order: 'created_at', fields: 'id,title,handle' },
    category_id: category.id
  });

  const itemList = jsonLdProducts.slice(0, 8).map((p, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `${BASE_URL}/products/${p.handle}`,
    name: p.title
  }));

  return (
    <main className="container flex-grow">
      <Script
        id="ld-breadcrumbs-category"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Categories',
                item: `${BASE_URL}/categories`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: category.name,
                item: `${BASE_URL}/categories/${categoryHandle}`
              }
            ]
          })
        }}
      />
      <Script
        id="ld-itemlist-category"
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

      <h1 className="heading-xl uppercase">{category.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: category?.description }} />
      <Suspense
        fallback={
          <div data-testid="category-page-loading">
            <ProductListingSkeleton />
          </div>
        }
      >
        {category?.category_children?.length > 0 ? (
          <div className="grid grid-cols-6 gap-x-2 gap-y-4">
            {category.category_children.map(cat => (
              <CategoryCard
                key={cat.id}
                category={cat}
              />
            ))}
          </div>
        ) : bot || !ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing
            category_id={category.id}
            showSidebar
            locale={'us'}
          />
        ) : (
          <AlgoliaProductsListing category_name={category.name} />
        )}
      </Suspense>
    </main>
  );
}

export default Category;
