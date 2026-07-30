import { clx } from '@medusajs/ui';

import { PRODUCT_LIMIT } from '@/const';
import { searchProducts } from '@/lib/data/products';
import { ProductsPagination, ProductVariantCard } from '@/modules/products/components';
import { VariantsSearchResponse } from '@/types/variants';

interface SearchResultsProps {
  query: string;
  searchParams: {
    page?: string;
  };
}

export const SearchResults = async ({ query, searchParams }: SearchResultsProps) => {
  const { hits, nbPages, estimatedTotalHits } = await searchProducts({
    query: query || undefined,
    page: Number(searchParams.page) - 1,
    hitsPerPage: PRODUCT_LIMIT,
    indexName: 'product_variants'
  });
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full text-center">
        <span className="text-center text-gray-500">
          Search Results For: {query}({estimatedTotalHits})
        </span>
      </div>
      <div
        className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data-testid="search-results"
      >
        {hits.map((hit, index) => (
          <li
            key={index}
            className={clx('list-none', {
              'hidden sm:block': index > 2
            })}
          >
            <ProductVariantCard variant={hit as unknown as VariantsSearchResponse} />
          </li>
        ))}
      </div>
      <div>
        <ProductsPagination pages={nbPages} />
      </div>
    </div>
  );
};
