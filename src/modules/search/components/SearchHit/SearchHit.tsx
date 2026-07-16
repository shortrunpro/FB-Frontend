import { Container, Text } from '@medusajs/ui';
import Link from 'next/link';

import { BRAND_LOGO } from '@/lib/config';
import { Thumbnail } from '@/modules/products/components';

// TODO give proper type
const SearchHit = ({ hit }: { hit: any }) => {
  return (
    <Link
      href={`/products/${hit.handle}`}
      data-testid="search-result"
      className="flex h-full"
    >
      <Container
        key={hit.id}
        className="shadow-elevation-card-rest hover:shadow-elevation-card-hover flex w-full items-center gap-2 bg-white p-4 sm:flex-col sm:justify-center"
      >
        <Thumbnail
          thumbnail={hit?.thumbnail ?? BRAND_LOGO}
          size="square"
          className="group h-12 w-12 sm:h-full sm:w-full"
        />
        <div className="group flex flex-col justify-between">
          <div className="flex flex-col">
            <Text
              className="text-ui-fg-subtle"
              data-testid="search-result-title"
            >
              {hit.title}
            </Text>
          </div>
        </div>
      </Container>
    </Link>
  );
};

export default SearchHit;
