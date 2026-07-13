'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlgoliaProductsListing } from '@/components/sections';
import { MagnifyingGlass } from '@medusajs/icons';

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  // Sync state if URL changes externally (e.g. back button)
  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('query', query.trim());
    } else {
      params.delete('query');
    }
    params.set('page', '1'); // reset page pagination
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="heading-xl uppercase">Search Results</h1>
        <form onSubmit={handleSubmit} className="flex max-w-md gap-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded border border-ui-border-strong px-4 py-2 pl-10 text-black focus:border-brand focus:outline-none bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass className="text-ui-fg-muted" />
            </div>
          </div>
          <button
            type="submit"
            className="rounded bg-brand px-6 py-2 text-white hover:bg-brand-dark transition-colors font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      <AlgoliaProductsListing />
    </div>
  );
}
