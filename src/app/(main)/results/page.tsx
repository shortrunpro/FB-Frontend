import { AlgoliaProductsListing } from '@/components/sections';

export default function SearchResultsPage() {
  return (
    <main className="container flex-grow py-8">
      <h1 className="heading-xl uppercase">Search Results</h1>
      <AlgoliaProductsListing />
    </main>
  );
}
