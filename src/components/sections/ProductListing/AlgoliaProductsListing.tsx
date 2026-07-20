'use client';

import { useEffect, useState } from 'react';

import { HttpTypes } from '@medusajs/types';
import { useSearchParams } from 'next/navigation';

import {
  ProductListingLoadingView,
  ProductListingNoResultsView,
  ProductListingProductsView
} from '@/components/molecules';
import {
  AlgoliaProductSidebar,
  ProductListingActiveFilters,
  ProductsPagination
} from '@/components/organisms';
import { ProductListingSkeleton } from '@/components/organisms/ProductListingSkeleton/ProductListingSkeleton';
import { FacetModel } from '@/components/organisms/ProductSidebar/AlgoliaProductSidebar';
import { PRODUCT_LIMIT } from '@/const';
import { getFacedFilters } from '@/lib/helpers/get-faced-filters';
import { SEARCH_INDEX_NAME, searchClient } from '@/lib/data/search';

export const AlgoliaProductsListing = ({
  category_name,
  initialQuery
}: {
  category_name?: string;
  initialQuery?: string;
}) => {
  const searchParams = useSearchParams();

  const facetFilters: string = getFacedFilters(searchParams);
  const query: string = initialQuery ?? searchParams.get('query') ?? '';
  const page: number = +(searchParams.get('page') || 1);

  return (
    <ProductsListing
      category_name={category_name}
      filter={facetFilters}
      query={query}
      page={page}
    />
  );
};

const ProductsListing = ({
  category_name,
  filter,
  query,
  page
}: {
  category_name?: string;
  filter: string;
  query: string;
  page: number;
}) => {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [facets, setFacets] = useState<Record<string, FacetModel[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);
  filter = filter.length && category_name ? `(${filter})` : filter;
  filter += category_name
    ? `${filter.length ? ' AND ' : ''}categories.name="${category_name}"`
    : '';
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const { results } = await (searchClient as any).search([
          {
            indexName: SEARCH_INDEX_NAME,
            params: {
              query,
              page: page - 1,
              hitsPerPage: PRODUCT_LIMIT,
              filter: filter || undefined,
              facets: ['*'],
            },
          },
        ]);
        const result = results[0];

        if (!result) {
          throw new Error('Unable to search products');
        }

        setProducts(result.hits);
        setFacets(result.facetDistribution || {});
        setCount(result.nbHits);
        setPages(result.nbPages);
      } catch (error) {
        setProducts([]);
        setFacets({});
        setCount(0);
        setPages(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [filter, query, page]);

  if (isLoading && products.length === 0) return <ProductListingSkeleton />;

  return (
    <div className="min-h-[70vh]">
      <div className="flex w-full items-center justify-between">
        <div className="label-md my-4">{`${count} listings`}</div>
      </div>
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="gap-4 md:flex">
        <div className="hidden w-[280px] flex-shrink-0 md:block">
          <AlgoliaProductSidebar facets={facets} />
        </div>
        <div className="flex w-full flex-col">
          {isLoading && <ProductListingLoadingView />}

          {!isLoading && !products.length && <ProductListingNoResultsView />}

          {!isLoading && products.length > 0 && <ProductListingProductsView products={products} />}

          <div className="mt-auto">
            <ProductsPagination pages={pages} />
          </div>
        </div>
      </div>
    </div>
  );
};
