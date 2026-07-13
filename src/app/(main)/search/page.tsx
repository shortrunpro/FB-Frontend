import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const metadata = {
  title: 'Search Products',
  description: 'Search for products in our store.',
};

export default function SearchPage() {
  return (
    <main className="container flex-grow py-8">
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
