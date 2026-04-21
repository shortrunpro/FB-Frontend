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
import { searchProducts } from '@/lib/data/products';
import { getFacedFilters } from '@/lib/helpers/get-faced-filters';

export const AlgoliaProductsListing = ({
  category_id,
  collection_id,
  seller_handle,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION,
  currency_code
}: {
  category_id?: string;
  collection_id?: string;
  locale?: string;
  seller_handle?: string;
  currency_code: string;
}) => {
  const searchParams = useSearchParams();

  const facetFilters: string = getFacedFilters(searchParams);
  const query: string = searchParams.get('query') || '';
  const page: number = +(searchParams.get('page') || 1);

  return (
    <ProductsListing
      locale={locale}
      currency_code={currency_code}
      filter={facetFilters}
      query={query}
      page={page}
    />
  );
};

const ProductsListing = ({
  locale,
  currency_code,
  filter,
  query,
  page
}: {
  locale?: string;
  currency_code: string;
  filter: string;
  query: string;
  page: number;
}) => {
  const [products, setProducts] = useState<(HttpTypes.StoreProduct & { seller?: any })[]>([]);
  const [facets, setFacets] = useState<Record<string, FacetModel[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      if (!locale) return;

      try {
        setIsLoading(true);
        const result = await searchProducts({
          query: query || undefined,
          page: page - 1,
          hitsPerPage: PRODUCT_LIMIT,
          filter
        });

        setProducts(result.hits);
        setFacets(result.facetDistribution);
        setCount(result.estimatedTotalHits);
        setPages(Math.ceil(result.estimatedTotalHits / 20));
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
  }, [locale, filter, query, page, currency_code]);

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
