import { Container, Text } from '@medusajs/ui';
import { useHits } from 'react-instantsearch';

import { InteractiveLink } from '@/modules/common/components';

const ShowAll = () => {
  const { results } = useHits();
  console.log(results);
  return (
    <Container className="small:flex-row mb-4 flex h-fit items-center justify-evenly gap-2 py-2 sm:flex-row">
      {!results || results.nbHits == 0 ? (
        <Text>No results found.</Text>
      ) : (
        <>
          {results.nbHits < results.hitsPerPage ? (
            <Text className="mb-0 text-left">{results.nbHits} results</Text>
          ) : (
            <>
              <Text className="mb-0">
                Showing the first {results.hitsPerPage} of {results.nbHits} results
              </Text>
              <InteractiveLink href={`/results/${results?.query}`}>View all</InteractiveLink>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ShowAll;
