import React from 'react';

import { clx } from '@medusajs/ui';
import { useHits, UseHitsProps, useSearchBox } from 'react-instantsearch';

import ShowAll from '../ShowAll/ShowAll';

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

const SearchHits = ({ hitComponent: Hit, className, ...props }: HitsProps<any>) => {
  const { query } = useSearchBox();
  const { items, results } = useHits(props);
  return (
    <div
      className={clx(
        'mb-1 w-full p-px transition-[height,max-height,opacity] duration-300 ease-in-out sm:overflow-hidden',
        className,
        {
          'max-h-full opacity-100': !!query,
          'max-h-0 opacity-0': !query && !items.length
        }
      )}
    >
      <ShowAll />
      <div
        className="800p:grid-cols-3 mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        data-testid="search-results"
      >
        {items.map((hit, index) => (
          <li
            key={index}
            className={clx('list-none', {
              'hidden sm:block': index > 2
            })}
          >
            <Hit hit={hit as any} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default SearchHits;
