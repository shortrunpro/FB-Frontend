import { Suspense } from 'react';

import type { Metadata } from 'next';

import { fetchResourceCategoryByHandle } from '@/lib/data/resources';
import { generateResourceCategoryMetadata } from '@/lib/helpers/seo';
import { Spinner } from '@/modules/common/components';
import { ResourceCategoryPageContent } from '@/modules/content/templates';

export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  //   TODO validate fallback logic in case unseen error is thrown
  const { data, ok } = await fetchResourceCategoryByHandle({ handle });
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
