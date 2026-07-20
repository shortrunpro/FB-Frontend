import { AlgoliaProductsListing } from '@/components/sections';

export default async function SearchResultsPage({
  params
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  return (
    <main className="container flex-grow py-8">
      <h1 className="heading-xl uppercase">Search Results</h1>
      <AlgoliaProductsListing initialQuery={query} />
    </main>
  );
}
