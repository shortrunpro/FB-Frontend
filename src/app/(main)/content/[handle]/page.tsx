import { notFound } from 'next/navigation';

import { queryResources } from '@/lib/data/resources';
import { ResourcePageContent } from '@/modules/content/templates';
import { StoreFetchResourceResponse, StoreGetResourcesResponse } from '@/types/resources';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds
export const revalidate = 3600;
export async function generateStaticParams() {
  try {
    const posts = (await queryResources({
      query: { limit: 999, fields: 'handle' },
      next: { tags: ['resource-handles'], revalidate: 3600 }
    })) as StoreGetResourcesResponse;
    if (!posts) {
      return [];
    }
    return posts.resources.map(post => ({
      handle: post.handle
    }));
  } catch (error) {
    console.error("Failed to generate static params for resources:", error);
    return [];
  }
}
export default async function ResourcePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let resource: StoreFetchResourceResponse;

  try {
    resource = (await queryResources({ url: `/${handle}` })) as StoreFetchResourceResponse;
  } catch (error) {
    console.error(`Failed to load resource "${handle}":`, error);
    notFound();
  }

  const { data, ok } = resource!;
  if (!data || !ok) {
    notFound();
  }
  return (
    <main className="container-columns my-4 flex flex-grow justify-center gap-x-4 py-4">
      <ResourcePageContent resource={data} />
    </main>
  );
}
