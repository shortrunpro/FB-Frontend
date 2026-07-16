import { Container, Text } from '@medusajs/ui';
import { useHits, useSearchBox } from 'react-instantsearch';

import { InteractiveLink } from '@/modules/common/components';

const ShowAll = () => {
  const { hits } = useHits();
  const { query } = useSearchBox();
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;

  if (query === '') return null;
  if (hits.length > 0 && hits.length <= 6) return null;

  if (hits.length === 0) {
    return (
      <Container
        className="flex h-fit justify-center gap-2 bg-white py-2"
        data-testid="no-search-results-container"
      >
        <Text>No results found.</Text>
      </Container>
    );
  }

  return (
    <Container className="small:flex-row mb-4 flex h-fit items-center justify-evenly gap-2 py-2 sm:flex-row">
      <Text className="mb-0">Showing the first {width > 640 ? 12 : 3} results</Text>
      <InteractiveLink href={`/results/${query}`}>View all</InteractiveLink>
    </Container>
  );
};

export default ShowAll;
