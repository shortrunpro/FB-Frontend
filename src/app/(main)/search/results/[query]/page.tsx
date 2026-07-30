import { Suspense } from 'react';

import { Metadata } from 'next';

import { PRODUCT_LIMIT } from '@/const';
import { SITE_NAME } from '@/lib/config';
import { searchProducts } from '@/lib/data/products';
import { ProductListingSkeleton } from '@/modules/products/components';
import { SearchResults } from '@/modules/search/templates';

export const metadata: Metadata = {
  title: `Search Results | ${SITE_NAME}`,
  description: 'Explore all of our products.',
  robots: {
    index: false
  }
};

type Props = {
  params: { query: string };
  searchParams: {
    page?: string;
  };
};

export default async function Results(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { query } = params;
  const { page } = searchParams;
  return (
    <div className="container-columns my-8 flex-grow">
      <Suspense
        fallback={
          <div data-testid="all-categories-page-loading">
            <ProductListingSkeleton />
          </div>
        }
      >
        <SearchResults
          query={query}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
