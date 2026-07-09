import { Suspense } from 'react';

import { Spinner } from '@/modules/common/components';
import { ResourcePageContent } from '@/modules/content/templates';

export default async function ResourcePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  return (
    <main className="container-columns my-4 flex flex-grow justify-center gap-x-4 py-4">
      <Suspense fallback={<Spinner />}>
        <ResourcePageContent handle={handle} />
      </Suspense>
    </main>
  );
}
