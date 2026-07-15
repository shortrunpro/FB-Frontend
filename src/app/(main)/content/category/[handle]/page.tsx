import { Suspense } from 'react';

import type { Metadata } from 'next';

import { queryResources } from '@/lib/data/resources';
import { generateResourceCategoryMetadata } from '@/lib/helpers/seo';
import { Spinner } from '@/modules/common/components';
import { ResourceCategoryPageContent } from '@/modules/content/templates';
import { StoreFetchResourceCategories, StoreGetResourceCategoryResponse } from '@/types/resources';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds
export const revalidate = 3600;
export async function generateStaticParams() {
  try {
    const posts = (await queryResources({
      url: '/category',
      query: { limit: 999, fields: 'handle' },
      next: { tags: ['resource-handles'], revalidate: 3600 }
    })) as StoreFetchResourceCategories;
    if (!posts.resource_categories || !posts.ok) {
      return [];
    }
    return posts.resource_categories.map(post => ({
      handle: post.handle
    }));
  } catch (error) {
    console.error("Failed to generate static params for resource categories:", error);
    return [];
  }
}
export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  //   TODO validate fallback logic in case unseen error is thrown
  const { data, ok } = (await queryResources({
    url: `/category/${handle}`,
    next: { tags: [`resource-category-${handle}`], revalidate: 3600 }
  })) as StoreGetResourceCategoryResponse;
  return generateResourceCategoryMetadata(data);
}
export default async function ResourceCategoryPage({
  params
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return (
    <main className="container-columns my-4 flex flex-grow justify-center gap-x-4 py-4">
      <Suspense fallback={<Spinner />}>
        <ResourceCategoryPageContent handle={handle} />
      </Suspense>
    </main>
  );
}
